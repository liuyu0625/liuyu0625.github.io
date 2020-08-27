<?php
    if(!array_key_exists("username",$_REQUEST) || !array_key_exists("password",$_REQUEST)){
        die('{"type" : "error", "detail" : "信息不全"}');
    }
    $username = $_REQUEST["username"];
    $password = $_REQUEST["password"];
    $password = md5($password); 
    $link = mysqli_connect("localhost","root","123456","ly2020db");
    $select_sql = "SELECT `username` FROM  `userlist` WHERE `username`='$username'";
    $select_res = mysqli_query($link,$select_sql);
    $data  = mysqli_fetch_assoc($select_res);
    if( $data ){
        mysqli_close($link);
        die('{"type" : "error", "detail" : "用户名重名,请重新输入"}');
    }
    $insert_sql = "INSERT INTO `userlist` (`username`,`password`) VALUES('$username' , '$password')";
    $insert_res = mysqli_query($link,$insert_sql);
    if(!$insert_res){
        mysqli_close($link);
        die('{"type" : "error", "detail" : "'.mysqli_error($link).'"}');
    }
    echo '{"type" : "success", "detail" : {"username" : "'.$username.'","password" : "'.$password.'"}}';

    mysqli_close($link);
?>
