require.config({
    paths:{
        'jquery':'../lib/jquery-3.2.1',
        'zoom':'../lib/jquery.jasonZoom/jquery.jasonZoom',
        // 'gdszomm':'../lib/jquery.gdsZoom/jquery.gdsZoom'
    },
    shim:{
        'zoom':{
             deps: ["jquery"],//设置依赖
             exports:'jQuery.prototype.jasonZoom'
        },
    }
 })
require(['jquery','com_plus','base','config','zoom','ajax_plugin'],function($,common,base,config){       
        // 加载远程html文件，load取html结构
        $(".rightbar").load("./rightbar.html");
        $("header").load("./header.html");
        $("footer").load("./footer.html"); 
 
        // 商品信息介绍
        // 根据url发起ajax请求
        var par = location.search;
        par = decodeURI(par);
        // var par = decodeURI(location.search);
        var url = par.substring(1);
        url = url.split('=');
        par = url[1];
        // console.log(par);
        // 接收来自页面的参数然后发起请求
        function getAndajax(url){
            $.ajax({
                url:url,
                dataType:'json',
                data:{id:par},
                success:function(res){
                    $.each($(res),function(idx,item){

                        var imgurl = item.imgurl.substring(1);

                        imgurl = '.'+imgurl;

                        var listurl;

                        listurl = '../img/'+item.category+'/';
                        // console.log(listurl);

                        var $pmml = $('.pro_mes_main_l');
                        $pmml.html('');
                        var $pm_l = $('<img src="'+imgurl+'" id="proimg"/>').appendTo($pmml);
                        // console.log($pmml)
                        var imglist = $(`
                            <div class="imglist fl">
                                <ul>
                                    <li><img src="${listurl}001.jpg"/></li>
                                    <li><img src="${listurl}002.jpg"/></li>
                                    <li><img src="${listurl}003.jpg"/></li>
                                    <li><img src="${listurl}004.jpg"/></li>
                                    <li><img src="${listurl}005.jpg"/></li>
                                </ul>
                            </div>
                            `).appendTo('.pro_mes_main');
                        var det_box = $(`
                            <h2>${item.name}</h2>
                            <div>
                                <p><span id="price">蘑菇价：<del>￥${item.price}</del></span></p>
                                <p><span id="sale"><b>抢购价</b>￥${item.sale}</span></p>
                            </div>
                            <div>
                                <p>温馨提示：该商品不支持<span style="color:red;">货到付款</span></p>
                                <p>服务：由<a href="#"style="color:red;">蘑菇街</a>配送并提供服务</p>
                                <p>商品评价：质量特好，你值得拥有</p>
                            </div>
                            <div class="buybox">
                                <p>购买数量：<button id="jian">-</button><input type="text"id="pro_qty"/ value="1"><button id="add">+</button></p>
                                <span id="buy">立即购买</span><span id="addTocar">加入购物车</span>
                            </div>

                            `).appendTo('.pro_mes_main_r');
                        // 点击加减按钮实现数量的增减
                        $('.buybox').on('click',function(e){
                             // 先获取当前页面cookie
                            var cookies=document.cookie;
                            cookies=cookies.split('; ');  
                            cookies.forEach(function(item){
                                var arr=item.split('=');
                                if(arr[0] === 'res'){
                                    res=JSON.parse(arr[1]);
                                    console.log(res);
                                }
                            }); 
                            var num = $('#pro_qty').val();
                              if(num <= 1){
                                    num = 1;
                                }
                            switch(e.target.id){
                                case 'jian':
                                    num--;
                                    $('#pro_qty').get(0).value = num;
                                    break;
                                case 'add':
                                    num++;
                                    $('#pro_qty').get(0).value = num;
                                    break;
                                // 添加购物车
                                case 'addTocar':
                                    // 添加购物车效果
                                    $img = $('#proimg');
                                    $cloneImg = $img.clone();
                                    $cloneImg.css({
                                        position:'absolute',
                                        left:$img.offset().left,
                                        top:$img.offset().top,
                                        width:$img.outerWidth()
                                    });
                                    $('body').append($cloneImg);
                                    $cloneImg.animate({
                                        'left': $('.gouwuche').offset().left,
                                        'top':$('.gouwuche').offset().top,
                                        opcatity:0.5,
                                        width:0,
                                    },500);
                                    // 将购物信息添加到cookie中
                                    res.push(item);
                                    res[res.length-1].qty = num;
                                    console.log(res);
                                    console.log(res[res.length-1].qty); 
                                    var now = new Date();
                                    now.setDate(now.getDate()+7);
                                    document.cookie = 'res='+JSON.stringify(res)+';expires='+now.toUTCString()+';path=/';
                                    break;
                                    // 去结算
                                case 'buy':
                                    location.href = 'car.html';
                                    break;
                            }
                        })
                           // 引入放大镜插件
                        $('.pro_mes_main_l').jasonZoom({
                            // 放大区域的宽高
                            width:300,
                            height:300,
                            // 放大镜位置的定位方式
                            position:'zidingyi',
                            // 定位参数
                            positionSetX:0,
                            positionSetY:0,
                            gap:0
                        });
                            // 点击小图片实现图片切换并添加放大镜效果
                        $('.imglist').on('click','img',function(){
                            $('#proimg').attr({
                                src:this.src,
                                'data-big':this.dataset.big || this.src
                            })
                            $(this).parents('li').addClass('li_active').siblings('li').removeClass('li_active');
                        })
                    })
                }
            }) 
        } 
        getAndajax('../api/listtodetail.php');
})