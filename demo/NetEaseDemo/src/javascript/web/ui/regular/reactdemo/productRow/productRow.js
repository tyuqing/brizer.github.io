define([
    'regular!./productRow.html',
    '{pro}common/ui/base.js'
], function(
    _tpl,
    _base
){
    var _g = window;
    var productRowUI = _base.extend({
        name:'productrow',
        template:_tpl
    });

    return productRowUI;
});