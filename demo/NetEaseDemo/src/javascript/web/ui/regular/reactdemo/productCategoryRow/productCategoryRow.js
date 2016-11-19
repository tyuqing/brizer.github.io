define([
    'regular!./productCategoryRow.html',
    '{pro}common/ui/base.js'
], function(
    _tpl,
    _base
){
    var _g = window;
    var productCategoryRowUI = _base.extend({
        name:'productcategoryrow',
        template:_tpl
    });

    return productCategoryRowUI;
});