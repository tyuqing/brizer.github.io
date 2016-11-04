
NEJ.define([
    '{lib}base/klass.js',
    'base/element',
    '{lib}util/dispatcher/module.js'
], function(_k, _e, _t, _p) {

    var _pro;

    _p._$$Module = _k._$klass();
    _pro = _p._$$Module._$extend(_t._$$ModuleAbstract);

    _pro.__onShow = function(options) {
        this.__super(options);
        // magic
    }
	_pro.__onHide = function(){
        _e._$removeByEC(this.__body);
    };
    return _p;

});