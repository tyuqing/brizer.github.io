define([
    'regular!./filterableProductTable.html',
    '{pro}ui/regular/reactdemo/searchBar/searchBar.js', 
    '{pro}ui/regular/reactdemo/productTable/productTable.js', 
    '{pro}common/ui/base.js'
], function(
    _tpl,
    _searchBar,
    _productTable,
    _base
){
    var _g = window;
    var filterableProductTableUI = _base.extend({
        name:'filterableProductTable',
        template:_tpl,
        /*设置初始值*/
        config:function(){
            this.data.filterText = '';
            this.data.inStockOnly = false;
        }
    });

    return filterableProductTableUI;
});