<?php
    $link = mysqli_connect("localhost","root","123456","ly2020db");
    $mysql = 'SELECT * FROM `good_lists`';
    $res = mysqli_query($link,$mysql);
    $data = mysqli_fetch_all($res,MYSQLI_ASSOC);
    echo json_encode($data);
?>