// var inputUsername = $('#inputUsername');
// var password = $('#password');
// var confirmPassword = $('#confirmPassword');
var alertSuccess = $('.alert-success');
var alertError = $('.alert-danger');
var tipError = $('.alert-tip');
function checkUn( username ){
    var res =(/^(\+86\-)?1[3-9]\d{9}$/.test(username));
    if( res){
        return true;
    }
    tipError.fadeIn().html("用户名不符合规则");
    tipHide()
    return false;
}
function checkPw( password ){
    var res = (/^[\w-]{6,20}$/.test(password))
    if( res ){
        return true;
    }
    tipError.fadeIn().html("密码不符合规则");
    tipHide()
    return false;
}
function checkSame( pw,confirm ){
    if(pw === confirm){
        return true;
    }
    tipError.fadeIn().html("两次密码不一致");
    tipHide()
    return false;
}
function tipHide(){
    setTimeout(function(){
        tipError.fadeOut(500);
    },2000)
}
$('.btn_register').click(function(){
    var data = {
        username: $('#inputUsername').val(),
        password:  $('#password').val(),
        confirmPassword: $('#confirmPassword').val()
    }
    if(checkUn(data.username)&&checkPw(data.password)&&checkSame(data.password,data.confirmPassword)){
        $.ajax({
            url:"http://localhost/project/php/register.php",
            dataType:'json',
            data:{
                username:data.username,
                password:data.password
            },
            success:function(res){
                alertError.hide();
                alertSuccess.show();
                if( res.type === 'success'){
                    setTimeout(function(){
                        location.href  = "./login.html";
                    },2000)
                }else{
                    alertError.show();
                    alertSuccess.hide();
                    alertError.html(res.detail);
                    setTimeout(function(){
                        alertError.fadeOut();
                    },3000)
                }
            }
        })
    }
})
