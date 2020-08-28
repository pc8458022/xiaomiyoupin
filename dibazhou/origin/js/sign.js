 // 实现用户名验证功能
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
        console.log("用户可以使用");
        // 发送请求
        $.get("/php/checkusername.php",
         {  username:username.val() },function (data) {
            console.log(data);
            if (!data.error) {
               console.log(data.msg);
                user_lock = true;
            } else {
                console.log(data.msg);
            }
        },"json");
   
    
        // $.ajax({
        //     url:"../../php/checkusername.php",
        //     type:"post",
        //     data:{
        //         username:username.val()
        //     },
        //     dataType:"json",
        //     success:function(data){
        //         if (!data.error) {
        //             console.log(data.msg)
        //             user_lock = true;
        //         }else{
        //             console.log(data.msg);
        //         }
        //     },
           
        // })
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
        console.log("hahahha");
        // 思路： 我们不可以直接发送请求 而是要先看用户名和密码是否都通过了验证 都通过才发送  任何一个不通过的话 不发送请求
        // 通过判定 两把锁的状态决定是否发送请求

        if (!(user_lock && pass_lock)) {
            return;
        }



        // $.ajax({
        //                 url: "../../php/r.php",
        //                 type: "post",
        //                 data: {
        //                        username:username.val(),
        //                         password:password.val()
        //                 },
        //                 dataType: "json",
        //                 // 下面这条设置 表示不设置请求头中的content-type字段
        //                 // contentType: false, 
        //                 // 下面这条设置 表示不要自动序列化数据
        //                 // processData: false,
        //                 // 正常情况下 上面这两条不需要设置  只有当特殊需求(比如 传递文件) 才需要使用
        //                success(data){
        //                 if (!data.error) {
        //                     console.log(data.msg)
        //                     //         // 成功之后 我们要跳转到登录页面 
        //                             location.href = "./test.html";
        //                         }
        //             }        
        //             })
            



        $.ajax({
            url:"/php/regist.php",
            type:"post",
            data:{
                username:username.val(),
                password:password.val()
            },
            dataType:"json",
           
            success(data){
                if (!data.error) {
                    console.log(data.msg)
                    //         // 成功之后 我们要跳转到登录页面 
                            location.href = "./test.html";
                        }
            }          
        })
    })
});
