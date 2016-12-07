/**
 * Created by liufang on 2016/12/7.
 */
;(function ($) {
    $.fn.myTimer = function (options) {
        var defaults = {
            'starttime': '',//开始时间
            'endtime': '',//结束时间
            'callBack': function (){}//倒计时结束回调事件
        };
        var options = $.extend({},defaults,options);
        var timer;
        var $this = $(this);
        timer = setInterval(countDown,1000);
        function countDown(){
            var end = new Date(options.endtime); //结束时间
            var now = options.starttime ? new Date(options.starttime) : new Date();
            //具体的计算部分
            var date = Math.floor(end-now) / 1000;
            var day = Math.floor(date / (60 * 60 * 24));
            var _hour = date-day * 60 * 60 * 24;
            var hour = Math.floor(_hour / (60 * 60));
            var _minute = _hour-hour * 60 * 60;
            var minute = Math.floor(_minute / (60));
            var _second = _minute-minute * 60;
            var second = Math.floor(_second);
            //一位数的数字前面加0
            function toDou(n){
                if(n < 10){
                    return '0'+n;
                }else{
                    return ''+n;
                }
            }
            if(date > 0){
                var time =  {
                    'day': toDou(day),
                    'hour': toDou(hour),
                    'minute': toDou(minute),
                    'second': toDou(second)
                };
                $this.html(time.day+'天'+time.hour+'时'+time.minute+'分'+time.second+'秒');
            }else{
                clearInterval(timer);
                options.callBack();
            }
        };
    }
})(jQuery);
