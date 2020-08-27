<?php
    if(!array_key_exists("username",$_REQUEST) || !array_key_exists("password",$_REQUEST)){
        die('{"type" : "error", "detail" : "参数不全"}');
    }
    $username = $_REQUEST["username"];
    $password = $_REQUEST["password"];
    $password = md5($password);
    $link = mysqli_connect("localhost","root","123456","ly2020db");
    if(!$link){
        die('{"type" : "error", "detail" : "数据库故障"}');
    }
    $select_sql = "SELECT `username`,`password` FROM `userlist` WHERE (`username`='$username' AND `password`='$password')";
    $select_res = mysqli_query($link,$select_sql);
    if(!$select_res){
        mysqli_close($link);
        die('{"type" : "error", "detail" : "'.mysqli_error($link).'"}');
    }
    $select_arr = mysqli_fetch_assoc($select_res);
    if($select_arr){
        mysqli_close($link);
        die('{ "type" : "success", "detail" : {"username":"'.$username.'", "password" : "'.$password.'"}}');
    }
    mysqli_close($link);
    echo '{"type" : "error" , "detail":"账号与密码不符,请重新输入"}';
?>