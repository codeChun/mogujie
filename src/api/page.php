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
    $cat = isset($_GET['category']) ? $_GET['category'] : null;
    $page_no = isset($_GET['pageNo']) ? $_GET['pageNo'] : 1;
    $qty = isset($_GET['qty']) ? $_GET['qty'] : 5;
    // 查询sql语句
    $sql = "select * from list_goods where category='$cat'";
    // 得到查询结果集合（对象）
    $res = $conn->query($sql);

    // 使用查询结果集
    // 得到一个数组
    $row = $res->fetch_all(MYSQLI_ASSOC);
    // var_dump($row);
    // 根据分页截取数据
    $arr = array(
        'data'=>array_slice($row, ($page_no-1)*$qty,$qty),
        'total'=>count($row),
        'qty'=>$qty,
        'pageNo'=>$page_no*1
    );
    
    // 输出json字符串
    echo json_encode($arr,JSON_UNESCAPED_UNICODE);
?>