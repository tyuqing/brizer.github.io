/**
 * Created by liufang on 2016/11/28.
 */
define(['jquery','regular','text!./usersList.html'],function(jq,Regular,tpl){
    var usersListUI = Regular.extend({
        name:'usersList',
        template:tpl,
        removeUser:function(name){
            jq.post('/users/removeUser',{'name':name},this.cbRemoveUser);
        },
        editUser:function(name){
            window.location.href='/users/addEditUser?name='+name;
        },
        cbRemoveUser:function(data){
            if(!!data&&data.result == 1){
                window.location.reload();
            }else{
                alert('删除失败');
            }
        }
    });
    return usersListUI;
});