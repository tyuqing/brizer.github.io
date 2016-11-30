define(['jquery','regular','text!./addEditUser.html'],function(jq,Regular,tpl){
    var addEditUserUI = Regular.extend({
        name:'addEditUser',
        template:tpl,
        saveUserInfo:function(){
            if(!!this.data.name&&!!this.data.age){
                var name = this.data.name;
                var age = this.data.age;
                console.log(this.data);
                this.sendUserInfo({'name':name,'age':age});
            }else{
                alert('不能为空!');
            }
        },
        sendUserInfo:function(data){
            jq.post('/users/sendUserInfo',data,this.cbSubmit);
        },
        cbSubmit:function(data){
            if(!!data&&data.result == 1){
                window.location.href = '/users/allUsers';
            }else{
                alert('保存失败');
            }
        }
    });
    return addEditUserUI;
});