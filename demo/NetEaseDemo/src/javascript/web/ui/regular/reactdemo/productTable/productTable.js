define([
    'regular!./productTable.html',
    '{pro}ui/regular/reactdemo/productCategoryRow/productCategoryRow.js', 
    '{pro}ui/regular/reactdemo/productRow/productRow.js',     
    '{pro}common/ui/base.js'
], function(
    _tpl,
    _productCategoryRow,
    _productRow,
    _base
){
    var _g = window;
    var productTableUI = _base.extend({
        name:'productTable',
        template:_tpl,
        getProducts:function(){
            var _products = this.data.products;
            if(!!this.data.inStockOnly){
                _products = this.data.products.filter(function(item,index,arr){
                   return !!item.stocked; 
                });                
            }
            return _products;
        }
    });

    return productTableUI;
});