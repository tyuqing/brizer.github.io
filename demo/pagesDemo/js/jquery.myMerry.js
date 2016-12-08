/**
 * Created by liufang on 2016/12/8.
 */
;(function ($) {
    $.fn.myMerry = function(options) {
        var defaults = {
            /* 节点绑定 */
            contentCls: 'content',      //轮播内容列表的class
            /* 动画相关 */
            hoverCls: 'hover',          //当鼠标移至相应区域时获得的class
            direction: 'x',             //轮播的方向
            reverse: false,             //是否反向自动播放
            immediately: false,         //悬浮是否立即停止
            delay: 0,                //开始播放前的时间间隔
            speed:1              //移动速度
        };
        var options = $.extend({}, defaults, options);
        return this.each(function(){
            //定义对象
            var $this = $(this);
            var $list1 = $this.find('.'+options.contentCls);
            var $list2 = $list1.clone();
            var $lis = $list1.children();
            var $container = $list1.parent();
            //全局变量
            var _top = 0;
            var _lisCount = $lis.length;
            var _liHeight = $lis.eq(0).outerHeight(true);
            var _liWidth = $lis.eq(0).outerWidth(true);
            var _listHeight = _lisCount*_liHeight;
            var _listWidth = _lisCount*_liWidth;
            var _listLength = (options.direction=='x'?_listHeight:_listWidth);
            var _ani;
            //初始化样式
            $list1.css('position','relative');
            $list2.css('position','relative');
            $list1.addClass('list1');
            $list2.addClass('list2');
            if(!!options.reverse){
                $list1.css((options.direction == 'x'?'top':'left'),-_listLength);
                $list2.css((options.direction == 'x'?'top':'left'),-_listLength);
            };
            function setAnimate(){
                if(_top != (!!options.reverse?0:-_listLength)){
                    _top = (!!options.reverse?(_top+options.speed):(_top-options.speed));
                    $list1.css((options.direction == 'x'?'top':'left'),_top);
                    $list2.css((options.direction == 'x'?'top':'left'),_top);
                }else{
                    _top = (!!options.reverse?-_listLength:0);
                }
                _ani = setTimeout(setAnimate,1000/60);
            };
            function stopAnimate(){
                clearTimeout(_ani);
            };
            //初始化步骤
            if(!!options.immediately){
                $container.hover(stopAnimate,setAnimate);
            };
            $container.hover(function(){
                $this.addClass(options.hoverCls);
            },function(){
                $this.removeClass(options.hoverCls);
            });
            $container.append($list2);
            setTimeout(function(){
                setAnimate();
            },options.delay);
        });
    };
})(jQuery);
