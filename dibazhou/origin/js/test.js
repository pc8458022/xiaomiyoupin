  $(function () {
    // 实现用户名验证功能
    var username = $("#inputEmail3");
    var password = $("#inputPassword3");
    var submitBtn = $("#btn1")
    // 定义两把锁  一把决定用户名是否验证通过 一把决定密码是否验证通过
    var user_lock = false;
    var pass_lock = false;
    // 输入框失去焦点的时候 发送请求
    username.blur(function () {
        // 获取用户输入的文本
        var val = username.val();
        // 定义正则表达式
        var reg = /^[^\d]\w{6,15}$/;
        // 验证是否符合正则的规则
        if (!reg.test(val)) {
        console.log("请输入符合正则验证的字符串")
            user_lock = false;
            return;
        }
        user_lock = true;
        console.log("用户可以使用");
 
    })

    password.blur(function () {
        var val = password.val();
        var reg = /^\w{6,10}$/;
        if (!reg.test(val)) {
            console.log("密码不符合正则验证")
            pass_lock = false;
            return;
        }
        pass_lock = true;
    })

    submitBtn.click(function () {
        
        // 思路： 我们不可以直接发送请求 而是要先看用户名和密码是否都通过了验证 都通过才发送  任何一个不通过的话 不发送请求
        // 通过判定 两把锁的状态决定是否发送请求

        if (!(user_lock && pass_lock)) {
            console.log("hahahha");
            return;
        }

        $.ajax({
            url:"/php/login.php",
            type:"post",
            data:{
                username:username.val(),
                password:password.val()
            },
            dataType:"json",
           
            success(data){
                if (!data.error) {
                    console.log(data.msg)
                    //   var targetURL = location.hash.slice(1) ||"./index.html"; 
                          // 成功之后 我们要跳转到登录页面 
                            location.href = "./index.html";
                        }else{
                            console.log("登陆失败");
                        }
            }          
        })
    })
});
