<?php
    require('connect.php');//include 'connect.php'
    // 判断用户密码是否正确
    $username=isset($_GET['username']) ? $_GET['username'] : null;
    $password=isset($_GET['password']) ? $_GET['password'] : null;
 // 密码md5加密
    $password = md5($password);
    
    $sql = "select * from user where username='$username' and password='$password'";


    // 获取查询结果
    $result = $conn->query($sql);
    
    if($result->num_rows > 0){
        echo 'success';
        md5($password) === $password;
    }else{
        echo 'fail';
    }
    // 释放查询内存(销毁)
        $result->free();

        //关闭连接
        $conn->close();
?>