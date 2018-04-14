/* 
* @Author: Marte
* @Date:   2018-03-30 16:33:54
* @Last Modified by:   Marte
* @Last Modified time: 2018-04-14 10:37:32
*/
// document.addEventListener('DOMContentLoaded', function() {
//  let datalir=document.querySelector('.datalir');

//     ajax.get({
//         url:'../api/list.php',
//         success:function(data){

//             let ul=document.createElement('ul');
//             ul.innerHTML=data.map(function(item){

//                 return `
//                         <li data-id="${item.id}">
//                             <div class="imt"><img src="${item.imgurl}"/></div>
//                             <h4>${item.name}</h4>
//                             <p class="price">
//                                 <span class="sale">${item.sale}</span>
//                                 <span class="yuanjia"><del>${item.price}</del></span>
//                                 <span class="xingxing"><img src="../img/beauty/xingxing.png">${item.haoping}</span>
//                             </p>
//                             <p class="xiangsi">找相似</p>
//                         </li>
//                 `
//             }).join('');

//             datalir.appendChild(ul);

//          imt = document.querySelectorAll('.imt');
//          // imt.onmouseenter=function(){ console.log(23333)
//          //    animate(imt,{opacity:0.5})
//          //   } 
//          //    imt.onmouseleave=function(){
//          //    animate(imt,{opacity:1})
//          //   }
           
//            // function add(){

//                 for(let i=0;i<imt.length;i++){
//                     imt[i].onclick=function(){

//                         parame(i,data);
//                     }
//                 }
//             // }
//             // add();

//                 function parame(idx,data){

//                     var str='';
//                     for(var arr in data[idx]){
//                         str+=arr+'='+encodeURI(data[idx][arr])+'&';
//                     }
//                     str=str.slice(0,-1);
//                     location.href='detail.html?'+str;
//                 }
//         }
//     })
// })

// jQuery(function($){
//     $("#rightbar").load("./rightbar.html");
//     $("#listheader").load("./header.html");
//     $("#listfooter").load("./footer.html"); 
// })


require.config({
    paths:{
        'jquery':'../lib/jquery-3.2.1',
        'zoom':'../lib/jquery.jasonZoom/jquery.jasonZoom'
    },
    shim:{
        
    }
 })
require(['jquery','com_plus','base','ajax_plugin'],function($,common,base){
    $("#rightbar").load("./rightbar.html");
    $("#listheader").load("./header.html");
    $("#listfooter").load("./footer.html"); 
//         // 远程加载html导航条结构
//         // $('.list_main_nav').load('../index.html #nav_left',function(){
            // 根据导航条分类发起ajax请求
    // var data_gory;
    // var par='';
    // cateGory('#nav_left');

    // function listHref(data){
    //  par+='?'+'category'+'='+data;
    // location.href='list.html'+par;
    // }
            // 导航条分类ajax请求函数
    // function listAjax(data){
    //     $.ajax({
    //         url:'../api/list.php',
    //         dataType:'json',
    //          data:{category:data},
    //         success:function(res){
    //             console.log(res);
    //         }
    //     })
    // }
    // 根据url发起ajax请求
    // var par=location.search;
    // par=decodeURI(par);
    // var url=par.substring(1);
    // url=url.split('=');
    // par=url[1];
    // var pro_arr=[];
    // function create(arr){
    //    $.each($(arr),function(idx,item){
    //         var ul=$.map($(arr),function(val){
    //             return '<li><img src="'+val.imgurl+'" id="'+val.id+'"/><h2>'+val.name+'</h2><span>￥'+val.price+'</span><br/><button>快速购买</button><button id="addTocar">加入购物车</button></li>'
    //         }).join('\n');
    //         $('.list_main_r_m').html(ul);
    //    })
    // }

    // $.ajax({
    //         url:'../api/list.php',
    //         dataType:'json',
    //         data:{category:par},
    //         success:function(res){
    //             pro_arr=res;   
    //             // create(res);
    //         }
    // }) 

   
    // document.addEventListener('DOMContentLoaded', function() {
    let datalir=document.querySelector('.datalir');
    ajax.get({
        url:'../api/list.php',
        success:function(data){
            let ul=document.createElement('ul');
            ul.innerHTML=data.map(function(item){
                return `
                        <li data-id="${item.id}">
                            <div class="imt"><img src="${item.imgurl}"/></div>
                            <h4>${item.name}</h4>
                            <p class="price">
                                <span class="sale">${item.sale}</span>
                                <span class="yuanjia"><del>${item.price}</del></span>
                                <span class="xingxing"><img src="../img/beauty/xingxing.png">${item.haoping}</span>
                            </p>
                            <p class="xiangsi">找相似</p>
                        </li>
                `
            }).join('');

            datalir.appendChild(ul);

            imt = document.querySelectorAll('.imt');
         // imt.onmouseenter=function(){ console.log(23333)
         //    animate(imt,{opacity:0.5})
         //   } 
         //    imt.onmouseleave=function(){
         //    animate(imt,{opacity:1})
         //   }
           
        // function add(){

            for(let i=0;i<imt.length;i++){
                imt[i].onclick=function(){
                    parame(i,data);
                }
            }
        // }
        // add();

            function parame(idx,data){

                var str='';
                for(var arr in data[idx]){
                    str+=arr+'='+encodeURI(data[idx][arr])+'&';
                }
                str=str.slice(0,-1);
                location.href='detail.html?'+str;
            }
        }
    });
    // 分页加载
    var pageNo=1;
    var qty=20;
    var par='';

    tab(pageNo,qty);
    function tab(pageNo,qty){
        $.ajax({
            url:'../api/page.php',
            data:{
                'category':par,
                'pageNo':pageNo,
                'qty':qty
            },
            dataType:'json',
            success:function(res){
                var data_arr = res.data;
                // $("")
                // console.log(data_arr);
                // create(data_arr);
                //  // 价格查询及排序
                //     $('.selectbox').on('click',function(e){
                //         switch(e.target.id){
                //             case 'lowTohigh':
                //                 var arr1 = data_arr.sort(function(a,b){return a.price- b.price});
                //                 create(arr1);
                //                 break;
                //             case 'highTolow':
                //                 var arr2 = data_arr.sort(function(a,b){return a.price- b.price}).reverse();
                //                 create(arr2);
                //                 break;
                //             case 'priceCheck':
                //                 var minPrice = $('#low').val();
                //                 var maxPrice = $('#high').val();
                //                 priceFliter(minPrice,maxPrice);
                //                 function priceFliter(minPrice,maxPrice){
                //                     var arr3 = data_arr.filter(function(item){
                //                         return item.price >= minPrice && item.price <= maxPrice;
                //                     });
                //                     create(arr3);
                //                 }
                //             break;
                //         }
                //     })
                // 处理分页
                let pageQty = Math.ceil(res.total/res.qty);
                $('#page').html('');
                for(let i=1;i<=pageQty;i++){
                    var span=$('<span/>');
                        console.log(span);
                    $(span).html(i);
                    if(i===res.pageNo){
                       $(span).addClass('active');
                    }
                    $(span).appendTo('#page');
                }
                $('')
            }
        })    
    }
    $('#page').on('click',function(e){
        console.log("nishizhu");
        let newpageNo=e.target.innerText*1;
         tab(newpageNo,qty);
    })
      
})
 