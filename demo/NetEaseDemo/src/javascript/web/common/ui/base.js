
NEJ.define([
    'pro/common/filter/base',
    'pro/common/directive/base',	
    'pro/common/event/base',
    '{rg}/regular.js'
], function (_filter,_directive,_event,_r) {


    var _baseUI = Regular.extend({

    })
    .filter(_filter)
    .directive(_directive)
    .event(_event);

    return _baseUI;
});
