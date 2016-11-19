NEJ.define([
	'{rg}regular.js'
], function(_r) {
    var _event = {};
	
	_event.enter = function(element, fire){
  		Regular.dom.on(element, 'keypress', function(ev){
  			if(ev.which === 13) fire(ev)
 		});
 	};	
    
    return _event;
});