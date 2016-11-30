/**
 * Created by liufang on 2016/11/28.
 */
//;(function(){
//    console.log('this is allUsers Page!')
//})();
define(['jquery','regular','/javascripts/rgui/users/usersList/usersList.js'],function(jq,Regular,usersListUI){
    var usersList;
    var addNewNode = $('.j-addNew');
    function init() {
        jq.get('/users/getAllUsers', cbGetAllUsers);
        bindEvent();
    }

    function cbGetAllUsers(data){
        if(!!data && data.result == 1){
            console.log(data);
            bulidUsersListUI(data.data);
        }else {
            alert('getAllUsers is Wrong!');
        }
    }
    function bulidUsersListUI(data){
        usersList = new usersListUI({
            data:{
                users:data
            }
        });
        usersList.$inject('#j-allUsers');
    }
    function bindEvent(){
        addNewNode.on('click',function(){
            window.location.href = '/users/addEditUser';
        });
    }

    init();
});