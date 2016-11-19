define([
    'regular!./searchBar.html',
    '{pro}common/ui/base.js'
], function(
    _tpl,
    _base
){
    var _g = window;
    var searchBarUI = _base.extend({
        name:'searchBar',
        template:_tpl
    });

    return searchBarUI;
});