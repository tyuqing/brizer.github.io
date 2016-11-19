define([
    'regular!./todoitem.html',
    '{pro}common/ui/base.js'
], function(
    _tpl,
    _base
){
    var _g = window;
    var todoitemUI = _base.extend({
        name:'todoitem',
        template:_tpl
    });

    return todoitemUI;
});