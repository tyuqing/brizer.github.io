// (c) 2010-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
// Backbone may be freely distributed under the MIT license.
// For all details and documentation:
// http://backbonejs.org

// klass: a classical JS OOP façade
// https://github.com/ded/klass
// License MIT (c) Dustin Diaz 2014
  
// inspired by backbone's extend and klass
var _ = require("../util.js"),
  fnTest = /xy/.test(function(){"xy";}) ? /\bsupr\b/:/.*/,
  isFn = function(o){return typeof o === "function"};

var hooks = {
  events: function( propertyValue, proto ){
    var eventListeners = proto._eventListeners || [];
    var normedEvents = _.normListener(propertyValue);

    if(normedEvents.length) {
      proto._eventListeners = eventListeners.concat( normedEvents );
    }
    delete proto.events ;
  }
}


function wrap( k, fn, supro ) {
  return function () {
    var tmp = this.supr;
    this.supr = supro[k];
    var ret = fn.apply(this, arguments);
    this.supr = tmp;
    return ret;
  }
}

function process( what, o, supro ) {
  for ( var k in o ) {
    if (o.hasOwnProperty(k)) {
      if(hooks[k]) {
        hooks[k](o[k], what, supro)
      }
      what[k] = isFn( o[k] ) && isFn( supro[k] ) && 
        fnTest.test( o[k] ) ? wrap(k, o[k], supro) : o[k];
    }
  }
}

// if the property is ["events", "data", "computed"] , we should merge them
var merged = ["data", "computed"], mlen = merged.length;
/*new1.o为组件的参数对象*/
module.exports = function extend(o){
	/*o为Regular对象*/
  o = o || {};
  var supr = this, proto,
    supro = supr && supr.prototype || {};
	/*6.将该作用域内方法挂载*/
  if(typeof o === 'function'){
  	/*初次加载o为Regular构造函数，则进入此逻辑，实例化组件时o为参数对象则跳过该逻辑*/
    proto = o.prototype;
    o.implement = implement;
    o.extend = extend;
    return o;
  } 
  /*新的一个子类*/
  function fn() {
    supr.apply(this, arguments);
  }

  proto = _.createProto(fn, supro);
	/*合并属性,将当前对象的原型中同
	 *名属性或者方法名覆盖成传入的新属性*/
  function implement(o){
    // we need merge the merged property
    var len = mlen;
    for(;len--;){
      var prop = merged[len];
      if(proto[prop] && o.hasOwnProperty(prop) && proto.hasOwnProperty(prop)){
        _.extend(proto[prop], o[prop], true) 
        delete o[prop];
      }
    }


    process(proto, o, supro); 
    return this;
  }



  fn.implement = implement;
  //覆盖fn的原型，proto的原型supro不会覆盖
  fn.implement(o)
  if(supr.__after__) supr.__after__.call(fn, supr, o);
  /*递归赋值，每个返回子类*/
  fn.extend = extend;
  /*new2.将组件函数返回为实例*/
  return fn;
}

