var _ = require('../util.js');
var parseExpression = require('./parse.js').expression;
var diff = require('./diff.js');
var diffArray = diff.diffArray;
var diffObject = diff.diffObject;

function Watcher(){}

var methods = {
  $watch: function(expr, fn, options){
    var get, once, test, rlen, extra = this.__ext__; //records length
    if(!this._watchers) this._watchers = [];

    options = options || {};
    if(options === true){
       options = { deep: true }
    }
    var uid = _.uid('w_');
    if(Array.isArray(expr)){
      var tests = [];
      for(var i = 0,len = expr.length; i < len; i++){
          tests.push(this.$expression(expr[i]).get)
      }
      var prev = [];
      test = function(context){
        var equal = true;
        for(var i =0, len = tests.length; i < len; i++){
          var splice = tests[i](context, extra);
          if(!_.equals(splice, prev[i])){
             equal = false;
             prev[i] = _.clone(splice);
          }
        }
        return equal? false: prev;
      }
    }else{
      if(typeof expr === 'function'){
        get = expr.bind(this);      
      }else{
        expr = this._touchExpr( parseExpression(expr) );
        get = expr.get;
        once = expr.once;
      }
    }

    var watcher = {
      id: uid, 
      get: get, 
      fn: fn, 
      once: once, 
      force: options.force,
      // don't use ld to resolve array diff
      diff: options.diff,
      test: test,
      deep: options.deep,
      last: options.sync? get(this): options.last
    }
    
    this._watchers.push( watcher );

    rlen = this._records && this._records.length;
    if(rlen) this._records[rlen-1].push(uid)
    // init state.
    if(options.init === true){
      var prephase = this.$phase;
      this.$phase = 'digest';
      this._checkSingleWatch( watcher, this._watchers.length-1 );
      this.$phase = prephase;
    }
    return watcher;
  },
  $unwatch: function( watcher ){
    if(!this._watchers || !watcher) return;
    var watchers = this._watchers;
    if(typeof watcher === 'number'){
      var id = watcher;
      watcher = _.findItem( watchers, function(item){
        return item.id === id;
      } );
      return this.$unwatch(watcher);
    }
    var len = watcher.length;
    if( len ){
      while( (len--) >= 0 ){
        this.$unwatch(watcher[len])
      }
      return;
    }else{
      watcher.removed = true
    }
  },
  $expression: function(value){
    return this._touchExpr(parseExpression(value))
  },
  /**
   * the whole digest loop ,just like angular, it just a dirty-check loop;
   * @param  {String} path  now regular process a pure dirty-check loop, but in parse phase, 
   *                  Regular's parser extract the dependencies, in future maybe it will change to dirty-check combine with path-aware update;
   * @return {Void}   
   */
  /**
   * 运行此方法，进行watch对象的脏检查，
   * 首先给当前的组件一个标记$phase,当正在进行脏检查，
   * 就把这个字段标记为‘digest’，通过该参数可以避免多次同时进行脏检查。
   * 然后递归调用真正的脏检查函数_digest()，这个函数返回脏状态，
   * 如果此组件有children,递归调用子组件的_digest()函数，
   * 当所有组合脏检查递归返回都是true的时候，
   * 才认为本次脏检查进入稳定状态，已经完成，
   * 然后出发$update事件，否则又会进入一次脏检查，
   * 并且会计数，当超过20次脏检查还没让所有的watch进入稳定干净的状态，
   * 说明监听变量存在循环依赖，宣告脏检查失败
   * */
	/*现阶段单纯的脏检测，后期可以加上set方式*/
  $digest: function(){
  	/*digest3.进行脏检测,$phase为标识位，避免多次脏检测*/
    if(this.$phase === 'digest' || this._mute) return;
    this.$phase = 'digest';
    var dirty = false, n =0;
    /*digest4.进行真正的脏检测*/
    while(dirty = this._digest()){

      if((++n) > 20){ // max loop
        throw Error('there may a circular dependencies reaches')
      }
    }
    if( n > 0 && this.$emit) {
      /*digest10.完成脏检测，触发update事件*/
      this.$emit("$update");
      if (this.devtools) {
        this.devtools.emit("flush", this)
      }
    }
    this.$phase = null;
  },
  // private digest logic
  _digest: function(){

    var watchers = this._watchers;
    var dirty = false, children, watcher, watcherDirty;
    var len = watchers && watchers.length;
    /*digest5.对watchers列表递归进行脏检测*/
    if(len){
      for(var i =0; i < len; i++ ){
        watcher = watchers[i];
        if( !watcher ||  watcher.removed ){
          watchers.splice( i--, 1 );
          len--;
        }else{
          /*digest6.对单个值进行检测*/  	
          watcherDirty = this._checkSingleWatch(watcher, i);
          if(watcherDirty) dirty = true;
        }
      }
    }
    // check children's dirty.
    children = this._children;
    if(children && children.length){
      for(var m = 0, mlen = children.length; m < mlen; m++){
        var child = children[m];
        if(child && child._digest()) dirty = true;
      }
    }
    return dirty;
  },
  // check a single one watcher 
  _checkSingleWatch: function(watcher, i){
    /*digest7.将值与记录的值进行对比，刷新*/  	
    var dirty = false;
    if(!watcher) return;

    var now, last, tlast, tnow,  eq, diff;

    if(!watcher.test){
			/*digest8.通过get获取当前值，和last也就是上一次记录的值进行对比*/
      now = watcher.get(this);
      last = watcher.last;
      tlast = _.typeOf(last);
      tnow = _.typeOf(now);
      eq = true, diff;

      // !Object
      if( !(tnow === 'object' && tlast==='object' && watcher.deep) ){
        // Array
        if( tnow === 'array' && ( tlast=='undefined' || tlast === 'array') ){
          diff = diffArray(now, watcher.last || [], watcher.diff)
          if( tlast !== 'array' || diff === true || diff.length ) dirty = true;
        }else{
          eq = _.equals( now, last );
          if( !eq || watcher.force ){
            watcher.force = null;
            dirty = true; 
          }
        }
      }else{
        diff =  diffObject( now, last, watcher.diff );
        if( diff === true || diff.length ) dirty = true;
      }
    } else{
      // @TODO 是否把多重改掉
      var result = watcher.test(this);
      if(result){
        dirty = true;
        watcher.fn.apply(this, result)
      }
    }
    /*digest9.如果两个值不同，则进行赋值*/
    if(dirty && !watcher.test){
      if(tnow === 'object' && watcher.deep || tnow === 'array'){
        watcher.last = _.clone(now);
      }else{
        watcher.last = now;
      }
      watcher.fn.call(this, now, last, diff)
      if(watcher.once) this._watchers.splice(i, 1);
    }

    return dirty;
  },

  /**
   * **tips**: whatever param you passed in $update, after the function called, dirty-check(digest) phase will enter;
   * 
   * @param  {Function|String|Expression} path  
   * @param  {Whatever} value optional, when path is Function, the value is ignored
   * @return {this}     this 
   */
  $set: function(path, value){
    if(path != null){
      var type = _.typeOf(path);
      if( type === 'string' || path.type === 'expression' ){
        path = this.$expression(path);
        path.set(this, value);
      }else if(type === 'function'){
        path.call(this, this.data);
      }else{
        for(var i in path) {
          this.$set(i, path[i])
        }
      }
    }
  },
  // 1. expr canbe string or a Expression
  // 2. detect: if true, if expr is a string will directly return;
  $get: function(expr, detect)  {
    if(detect && typeof expr === 'string') return expr;
    return this.$expression(expr).get(this);
  },
  /*digest1.触发更新数据的操作*/
  $update: function(){
    var rootParent = this;
    do{
      if(rootParent.data.isolate || !rootParent.$parent) break;
      rootParent = rootParent.$parent;
    } while(rootParent)

    var prephase =rootParent.$phase;
    rootParent.$phase = 'digest'
		/*如果设置set方式*/
    this.$set.apply(this, arguments);

    rootParent.$phase = prephase;
	  /*digest2.触发脏检测*/
    rootParent.$digest();
    return this;
  },
  // auto collect watchers for logic-control.
  _record: function(){
    if(!this._records) this._records = [];
    this._records.push([]);
  },
  _release: function(){
    return this._records.pop();
  }
}


_.extend(Watcher.prototype, methods)


Watcher.mixTo = function(obj){
  obj = typeof obj === "function" ? obj.prototype : obj;
  return _.extend(obj, methods)
}

module.exports = Watcher;