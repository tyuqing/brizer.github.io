;(function($,window,document,undefined){
	var MerryGo = function(ele,opt){
		this.$element = ele;
		this.defaults = {
			'speed':1,
			'showNum':4
		};
		this.options = $.extend({},this.defaults,opt);
	}
	var _pro = MerryGo.prototype;
	var _top = 0;
	var _top2 = 0;
    var _ani1;
    var _ani2;
    var _lists1;
    var _lists2;
    var _showNum;
    var _count;
    var _speed;
    
    function setAnimate1(){
        if(_top != -400){
            _top = _top-_speed;
            _lists1.css('top',_top);
            _ani1 =  setTimeout(setAnimate1,1000/60);  
        }else{
            _top = 0;
            _ani1 = setTimeout(setAnimate1,1000/60); 
        }
    }
    function setAnimate2(){
    	if(_top2 != -400){
            _top2 = _top2-_speed;
            _lists2.css('top',_top2);
            _ani2 = setTimeout(setAnimate2,1000/60);    		
    	} else {
    		_top2 = 0;
            _ani2 = setTimeout(setAnimate2,1000/60);    		
    	}
    };    
	_pro.init = function(){
		var _this = this;
		this.getNodes();
		this.setHtml();
		this.setStyle();
		setTimeout(function(){
			_this.setAnimate();
		},200);
	};
	_pro.getNodes = function(){
		this.$items = this.$element.find('.item');
		this.$lists1 = _lists1 = $('<div class="j-list1 lists"></div>');
		this.$lists2 = _lists2 = $('<div class="j-list2 lists"></div>');
	};
	_pro.setHtml = function(){
		this.$lists1.append(this.$items);
		this.$lists2.append(this.$items.clone());
		this.$element.append(this.$lists1);
		this.$element.append(this.$lists2);
	};
	_pro.setStyle = function(){
		var _itemHeight = 0;
		_showNum = this.options.showNum;
		_speed = this.options.speed;
		_itemHeight = this.$items.eq(0).height();
		_count = this.$item.count();
		this.$element.css('height',_itemHeight*_showNum);
	};
	_pro.setAnimate = function(){
		setAnimate1();
		setAnimate2();
	};
	_pro.stopAnimate = function(){
    	clearTimeout(_ani1);
    	clearTimeout(_ani2);		
	};
	_pro.bindEvent = function(){
		var _this = this;
    	this.$element.on('mouseover',function(){
    		_this.stopAnimate();
    	});
    	this.$element.on('mouseleave',function(){
    		_this.setAnimate();
    	});
	};
	
	$.fn.merryGo = function(options){
		var merryGo = new MerryGo(this,options);
		return merryGo.init();
	};
})(jQuery,window,document);
