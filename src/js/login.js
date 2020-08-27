$('.submit').click(function(){
    var data = {
        username :$('#user').val(),
        password :$('#password').val(),
    }
    $.ajax({
        url:"http://localhost/project/php/login.php",
        dataType:"json",
        data :{
            username : data.username,
            password : data.password
        },
        success:function( res ){
           
            if( res.type === "success"){
                $('.alert-success').fadeIn().html('登陆成功');
                setTimeout(function(){
                    // localStorage.setItem("user",JSON.stringify(res.detail.username));
                    // console.log(res.detail.username);
                    cookie( "user" , res.detail.username)
                    location.href = "../html/index.html";
                },1500)
            }else{
                $('.alert-success').fadeIn().html(res.detail);
                setTimeout(function(){
                    $('.alert-success').fadeOut()
                },2000)
            }
        }
    })
 });
