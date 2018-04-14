<?php
    // 引入其他文件
    require('connect.php');//include 'connect.php'
    $username = isset($_GET['username']) ? $_GET['username'] : null;
    $password = isset($_GET['password']) ? $_GET['password'] : null;
    $phone = isset($_GET['phone']) ? $_GET['phone'] : null;
    $email = isset($_GET['email']) ? $_GET['email'] : null;
    

    // 判断用户名是否存在
    $data = $conn->query("select * from user where username ='$username'");
    if($data->num_rows == 0){
        // 密码md5加密
        $password = md5($password);
        
        // 写入数据sql语句
        $sql = "insert into user(username, password, phone, email) values('$username','$password','$phone','$email')";

        $res = $conn->query($sql);
        if($res){
            echo "success";
        }else{
            echo "fail";
        }
    }else {
        echo "success";
    }


    // $sql = "select * from user where username ='$username'";

    // $result = $conn->query($sql);


    // if($result->num_rows>0){
    //     echo "fail";
    // }else{
    //     if($type === 'reg'){
    //         // 加密密码
    //         // md5()
    //         $password = md5($password);

    //         // 注册（保存到数据库）
    //         $sql = "insert into user(username,password,phone,email) values('$username','$password','$phone','$email')";

    //         // 执行sql语句
    //         $res = $conn->query($sql);

    //         if($res){
    //             echo "success";
    //         }else{
    //             echo "fail";
    //         }
    //     }else{
    //         // 验证用户名可注册
    //         echo "success";
    //     }
    // }

    // echo "nihao";
?>