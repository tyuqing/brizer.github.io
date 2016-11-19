
NEJ.define([
    '{lib}base/klass.js',
    '{lib}util/dispatcher/module.js',
    '{pro}base/module.js',
    '{lib}base/element.js',
    '{lib}base/event.js',
    '{lib}util/template/tpl.js'
], function(_k, _m, _bm, _e, _v, _t, _p) {

    var _pro;

    // 扩展模块基类
    _p._$$PagesTrainModule = _k._$klass();
    _pro = _p._$$PagesTrainModule._$extend(_bm._$$Module);

    // 对于顶级模块, 可以重写__doParseParent方法
    // 确定整个应用的父容器.
    // 这里的module-box是容器的id.
    _pro.__doParseParent = function(options) {
        return _e._$get('pages-content');
    }

    // 模块构建阶段
    // this.__body确定模块的html结构, 取出模板的html资源即可.
    _pro.__doBuild = function() {
        this.__body = _e._$html2node(_t._$getTextTemplate('pages-train'));

    }

    // 模块的显示
    _pro.__onShow = function(options) {
        // 除非你有自己的显示方式
        // 否则一定要调用父类方法
        // 此外options参数不要漏掉
        this.__super(options);

        // magic code
    }

    // 模块刷新
    _pro.__onRefresh = function(options) {
        this.__super(options);
		
        // magic code
	    var _ = NEJ.P,
	        _e = _('nej.e'),
	        _v = _('nej.v'),
	        _j = _('nej.j'),
	        _u = _('nej.u'),
	        _p = _('nej.ut');
	    //获取节点
	    var _parent=_e._$get('trainrun');
	    //滚动效果
	    var _roll=function(_target,_index){
	        if(!_target.style.left) _target.style.left=(_index*3)+"px";
	        else _target.style.left=(parseInt(_target.style.left)>(600-_index*3))?
	                                    "0px":parseInt(_target.style.left)+3*_index+"px";
	    };
	    //车速数组
	    var _carSpeed=[0,0,0,0];
	    //item节点点击事件
	    var _onItemClick=function(_event,_index){
	        var _target=_v._$getElement(_event);
	        _carSpeed[_index-1]+=1;
	        _target.innerHTML=_target.innerHTML.substring(0,2)+"x"+_carSpeed[_index-1];
	        setInterval(_roll._$bind(this,_target,_index),1000);
	    }
	    //item回调函数
	    var _cbWithItem=function(_item,_index,_list){
	        if(_index%2==0)_item.style.backgroundColor="#B4EEB4";
	        _v._$addEvent(_item,"click",_onItemClick._$bind2(this,_index+1));
	    }
	    //获取Item节点
	    var _xItems=_e._$getByClassName(_e._$getChildren(_parent)[1],"x-item");
	    //给Item节点添加事件
	    _u._$forEach(_xItems,_cbWithItem,this);        
    };

    // 其他 __onHide 等等

    // 监听document的templateready事件, 注册组件.
    _v._$addEvent(document, 'templateready', function() {
        _m._$regist('/pages/train', _p._$$PagesTrainModule);
    });
});