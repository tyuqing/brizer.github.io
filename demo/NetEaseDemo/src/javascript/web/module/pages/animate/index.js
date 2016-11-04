
NEJ.define([
    '{lib}base/klass.js',
    '{lib}util/dispatcher/module.js',
    '{pro}base/module.js',
    '{lib}base/element.js',
    '{lib}base/event.js',
    '{lib}util/template/tpl.js',
    '{lib}util/animation/bounce.js'
], function(_k, _m, _bm, _e, _v, _t, _boun,_p) {

    var _pro;

    // 扩展模块基类
    _p._$$PagesAnimateModule = _k._$klass();
    _pro = _p._$$PagesAnimateModule._$extend(_bm._$$Module);

    // 对于顶级模块, 可以重写__doParseParent方法
    // 确定整个应用的父容器.
    // 这里的module-box是容器的id.
    _pro.__doParseParent = function(options) {
        return _e._$get('pages-content');
    }

    // 模块构建阶段
    // this.__body确定模块的html结构, 取出模板的html资源即可.
    _pro.__doBuild = function() {
        this.__body = _e._$html2node(_t._$getTextTemplate('pages-animate'));

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
	        _p = _('nej.ut');
	
	    var _ac = _p._$$AnimBounce._$allocate({from:{offset:70,velocity:1000},acceleration:500,springtension:0.5,onstop:_onBounceStop,onupdate:_onBounceUpdate})
	
	    function _onBounceStop(_offset){
	        //todo
	    }
	    function _onBounceUpdate(_offset){
	        _e._$get('ball').style.left = _offset.offset +'px';
	    }
	
	    _v._$addEvent(_e._$get('bnt2'),'click',_onBnt2Click._$bind(this));
	    function _onBnt2Click(event){
	        _ac._$play();
	    };
    }

    // 其他 __onHide 等等

    // 监听document的templateready事件, 注册组件.
    _v._$addEvent(document, 'templateready', function() {
        _m._$regist('/pages/animate', _p._$$PagesAnimateModule);
    });
});