<?php
     // isset — 检测变量是否设置
    $name = isset($_GET['name']) ? $_GET['name'] : Null;
    $pas = isset($_GET['pas']) ? $_GET['pas'] : Null;
    $phone = isset($_GET['phone']) ? $_GET['phone'] : Null;
    $email= isset($_GET['email']) ? $_GET['email'] : Null;

    $path="cust_mes.json";
    // 打开一个文件fopen
    $file=fopen($path,'r');
    // 获取文件大小（字节数）filesize
    $file_length=filesize($path);
    // 读取文件内容
    $content=fread($file,$file_length);
    $arr = json_decode($content,true);
    // 创建一个关联数组
        $item = array(
            'name'=>$name,
            'password'=> $pas,
            'phone'=>$phone,
            'email'=>$email
        );
    // 追加内容
     array_unshift($arr,$item);
     // 重新写入文件
     $file=fopen($path,'w');
     fwrite($file,json_encode($arr,JSON_UNESCAPED_UNICODE));
     // 将修改后的数据传给前端（防止中文转译JSON_UNESCAPED_UNICODE）
     echo json_encode($arr,JSON_UNESCAPED_UNICODE);
     fclose($file);


?>