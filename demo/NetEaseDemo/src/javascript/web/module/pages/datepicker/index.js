
NEJ.define([
    '{lib}base/klass.js',
    '{lib}util/dispatcher/module.js',
    '{pro}base/module.js',
    '{lib}base/element.js',
    '{lib}base/event.js',
    '{lib}util/template/tpl.js',
    '{lib}ui/datepick/datepick.js'
], function(_k, _m, _bm, _e, _v, _t,_datepicker, _p) {

    var _pro;

    // 扩展模块基类
    _p._$$PagesDatepickerModule = _k._$klass();
    _pro = _p._$$PagesDatepickerModule._$extend(_bm._$$Module);

    // 对于顶级模块, 可以重写__doParseParent方法
    // 确定整个应用的父容器.
    // 这里的module-box是容器的id.
    _pro.__doParseParent = function(options) {
        return _e._$get('pages-content');
    }

    // 模块构建阶段
    // this.__body确定模块的html结构, 取出模板的html资源即可.
    _pro.__doBuild = function() {
        this.__body = _e._$html2node(_t._$getTextTemplate('pages-datepicker'));

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
	    var _  = NEJ.P,
	        _e = _('nej.e'),
	        _u = _('nej.u'),
	        _v = _('nej.v'),
	        _p = _('nej.ui');
	
	     var _input = _e._$get('datepick');
	     _v._$addEvent(_input,'click',onInputClick)
	
	     function onInputClick(_event){
	        _v._$stop(_event);//因为日历控件是卡片，在document上接收到click 事件都会回调到卡片，所以阻止掉事件
	        var _datepick = _p._$$DatePick._$allocate({
	                    parent: _input.parentNode,
	                    clazz: 'm-dt',      //通过这个样式改变日历控件的表现
	                    onchange: onChange
	                }); 
	     }
	
	    //选中时回调，把值设到input中
	    function onChange(_value){
	        _input.value = _u._$format(_value,'yyyy-MM-dd');
	    }     
    }

    // 其他 __onHide 等等

    // 监听document的templateready事件, 注册组件.
    _v._$addEvent(document, 'templateready', function() {
        _m._$regist('/pages/datepicker', _p._$$PagesDatepickerModule);
    });
});