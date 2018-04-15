<?php


    /*
        分页获取数据：
        * pageNo=1    
       分页获取，pageNo指定获取第几页的数据

        json_encode():把数组转成json字符串
        * php5.4+ 使用JSON_UNESCAPED_UNICODE防止中文转义

        $arr[];
        $page_no            $arr
        1                   0,9
        2                   10-19
        3                   20-29
        推导公式：array_slice($arr,($page_no-1)*$qty,$qty)

     */

    // 建立与数据库连接
    require('connect.php');

    $page = isset($_GET['page']) ? $_GET['page'] : 1;
    $qty = isset($_GET['qty']) ? $_GET['qty'] : 10;

    // 查询sql语句
    $idx = ($page-1)*$qty;
    $result = $conn->query("select * from list_goods");

    // 使用查询结果集
    // 得到一个数组
    $res = $result->fetch_all(MYSQLI_ASSOC);

    $result->close();

    // 根据分页截取数据
    $conn->close();
    $res2=array(
        "len"=>count($res),
        "content"=>array_slice($res,$qty*($page-1),$qty),
        "page"=>$page*1,
        "qty"=>$qty*1
    );
    // 输出json字符串
    echo json_encode($res2,JSON_UNESCAPED_UNICODE);


?>