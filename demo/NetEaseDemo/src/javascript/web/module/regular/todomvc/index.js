NEJ.define([
	'{lib}base/klass.js',
	'{lib}util/dispatcher/module.js',
	'{pro}base/module.js',
	'{lib}base/element.js',
	'{lib}base/event.js',
	'{lib}util/template/tpl.js',
	'{pro}ui/regular/todomvc/todolist/todolist.js',
], function(
	_k,
	_m,
	_bm,
	_e,
	_v,
	_t,
	_todolist,
	_p) {

	var _pro;
	var _prof;
	// 扩展模块基类
	_p._$$RegularTodomvcModule = _k._$klass();
	_pro = _p._$$RegularTodomvcModule._$extend(_bm._$$Module);

	// 对于顶级模块, 可以重写__doParseParent方法
	// 确定整个应用的父容器.
	// 这里的module-box是容器的id.
	_pro.__doParseParent = function(options) {
		return _e._$get('regular-content');
	}

	// 模块构建阶段
	// this.__body确定模块的html结构, 取出模板的html资源即可.
	_pro.__doBuild = function() {
		this.__body = _e._$html2node(_t._$getTextTemplate('regular-todomvc'));

	}

	// 模块的显示
	_pro.__onShow = function(options) {
		// 除非你有自己的显示方式
		// 否则一定要调用父类方法
		// 此外options参数不要漏掉
		this.__super(options);
		var todos = [
		    {completed: true, description: "sleep" },
    		{completed: false, description: "work" }		
		];
		
		this._todolistUI = new _todolist({data:{todos:todos}}).$inject('#todomvcDemo');
		// magic code
	}

	// 模块刷新
	_pro.__onRefresh = function(options) {
		this.__super(options);

		// magic code

	};

	// 其他 __onHide 等等
	_pro.__onHide = function(){
		this.__super();
		if(!!this._todolistUI){
			this._todolistUI = this._todolistUI.destroy();
		}
	};
	// 监听document的templateready事件, 注册组件.
	_v._$addEvent(document, 'templateready', function() {
		_m._$regist('/regular/todomvc', _p._$$RegularTodomvcModule);
	});
});