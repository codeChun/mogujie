<?php
// 引入其他文件
    require('connect.php');//include 'connect.php'
    $tryname=isset($_GET['tryname']) ? $_GET['tryname'] : null;
    // 判断用户名是否存在
    $firstTry=$conn->query("select * from user where username ='$tryname '");
    if($firstTry->num_rows !== 0){
        echo "exsit";    
    }
?>