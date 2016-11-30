define(['jquery','regular','/javascripts/rgui/users/addEditUser/addEditUser.js'],function(jq,Regular,addEditUserUI){
    var addEditUser;
    var addNewNode = jq('.j-addNew');
    function init() {
        var name = getUrlParam('name');
        if(!!name){
            jq.get('/users/getOneUser?name='+name,cbEditUser);
        }else{
            buildAddEdiuUserUI();
        }
    }
    function cbEditUser(data){
        buildAddEdiuUserUI(data.data);
    }
    function buildAddEdiuUserUI(data){
        data = data || {name:'',age:''};
        addEditUser = new addEditUserUI({
            data:{
                name:data.name,
                age:data.age
            }
        });
        addEditUser.$inject('#j-addEditUser');
    }
    //解析url
    function getUrlParam(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
        var r = window.location.search.substr(1).match(reg); //匹配目标参数
        if (r != null) return r[2]; return null; //返回参数值
    }
    init();
});