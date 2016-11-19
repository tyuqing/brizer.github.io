NEJ.define([
    '{lib}base/klass.js',
    '{lib}util/dispatcher/module.js',
    '{pro}base/module.js',
    '{lib}base/element.js',
    '{lib}base/event.js',
    '{lib}util/template/tpl.js',
    '{pro}ui/regular/reactdemo/filterableProductTable/filterableProductTable.js',    
], function(
    _k,
    _m,
    _bm,
    _e,
    _v,
    _t,
    _filterableProductTableUI,
    _p) {

    var _pro;
    var _prof;
    // 扩展模块基类
    _p._$$RegularReactdemoModule = _k._$klass();
    _pro = _p._$$RegularReactdemoModule._$extend(_bm._$$Module);

    // 对于顶级模块, 可以重写__doParseParent方法
    // 确定整个应用的父容器.
    // 这里的module-box是容器的id.
    _pro.__doParseParent = function(options) {
        return _e._$get('regular-content');
    }

    // 模块构建阶段
    // this.__body确定模块的html结构, 取出模板的html资源即可.
    _pro.__doBuild = function() {
        this.__body = _e._$html2node(_t._$getTextTemplate('regular-reactdemo'));

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

        var products = [
            {category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football'},
            {category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball'},
            {category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball'},
            {category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch'},
            {category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5'},
            {category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7'}
        ];
        
        this._filterableProductTableUI = new _filterableProductTableUI({data:{products:products}}).$inject('#reactDemo');
        // magic code

    };

    // 其他 __onHide 等等
    _pro.__onHide = function(){
        this.__super();
        if(!!this._filterableProductTableUI){
            this._filterableProductTableUI = this._filterableProductTableUI.destroy();
        }
    };
    // 监听document的templateready事件, 注册组件.
    _v._$addEvent(document, 'templateready', function() {
        _m._$regist('/regular/reactdemo', _p._$$RegularReactdemoModule);
    });
});