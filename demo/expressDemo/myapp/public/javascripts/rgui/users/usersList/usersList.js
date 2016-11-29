/**
 * Created by liufang on 2016/11/28.
 */
define(['regular','text!./usersList.html'],function(Regular,tpl){
    var usersListUI = Regular.extend({
        name:'usersList',
        template:tpl
    });
    return usersListUI;
});