require.config({
    paths:{
        'jquery':'../lib/jquery-3.2.1'
    },
    shim:{
    }
})
require(['jquery','com_plus','ajax_plugin'],function($,com){
    // 加载远程html文件，load取html结构
    $('footer').load('./footer.html');
    
    $('.loginbox').on('change','input',function(e){
        switch(e.target.id){
            case 'account':
            // 用户名是否注册验证
                var name = $('#account').get(0).value;
                $.ajax({
                    url:'../api/check.php',
                    data:{'tryname':name},
                    success:function(data){
                        console.log(data);
                        if(data == 'exsit') {
                        } else {
                             alert('该用户不存在');
                        }
                    }
                })
                break;    
        }
    }).on('click','#signin',function(){
        var password = $('#password').val();
        var username = $('#account').val();
        $.ajax({
            url:'../api/login.php',
            data:{'username':username,'password':password},
            success:function(data){
                console.log(data);
                if(data=='success'){
                    alert(''+username+'您好，欢迎登录蘑菇街，我们将竭诚为您服务！')
                    location.href="../index.html";
                }else{
                     alert('密码输入有误');
                }
            }
        })
    }).on('click','#check',function(){
          // 如果勾选七天免登录
        if($('#check').get(0).checked){
             var now=new Date();
            now.setDate(now.getDate()+7);
            document.cookie='username='+$('#account').val()+';expires='+now.toUTCString()+';path=/';
            console.log(document.cookie);
        }
    })
});
