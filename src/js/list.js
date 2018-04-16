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

    let datalir = document.querySelector('.datalir');
    ajax.get({
        url:'../api/list.php',
        success:function(data){
            datalir.innerHTML=data.map(function(item){
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

            // imt = document.querySelectorAll('.imt');
            
            $(datalir).on("click","li",function(){
                var id = $(this).attr("data-id");
                location.href = "detail.html?id=" + id;
            })
        }
    });
    // 分页加载
    let pageNo = 1;
    let qty = 20;
    let par = '';
    tab(pageNo,qty);
    var page = $('#page');
    function tab(pageNo,qty){
        $.ajax({
            url:'../api/page.php',
            data:{
                'page':pageNo,
                'qty':qty
            },
            dataType:'json',
            success:function(res){
                // var data_arr = res.data;
                // console.log(data_arr);
                // create(data_arr);
                //  // 价格查询及排序
                // $('.selectbox').on('click',function(e){
                //     switch(e.target.id){
                //         case 'lowTohigh':
                //             var arr1 = data_arr.sort(function(a,b){return a.price- b.price});
                //             create(arr1);
                //             break;
                //         case 'highTolow':
                //             var arr2 = data_arr.sort(function(a,b){return a.price- b.price}).reverse();
                //             create(arr2);
                //             break;
                //         case 'priceCheck':
                //             var minPrice = $('#low').val();
                //             var maxPrice = $('#high').val();
                //             priceFliter(minPrice,maxPrice);
                //             function priceFliter(minPrice,maxPrice){
                //                 var arr3 = data_arr.filter(function(item){
                //                     return item.price >= minPrice && item.price <= maxPrice;
                //                 });
                //                 create(arr3);
                //             }
                //         break;
                //     }
                // })
                
                // 处理分页
                let spanlen = Math.ceil(res.len/res.qty);
                // console.log(res)
                page.html('');
                for(let i=1;i<=spanlen;i++){
                    var span = $('<span/>');
                    span.html(i);
                    if(i == pageNo){
                       $(span).addClass('active');
                    }
                    $(span).appendTo(page);
                }
                datalir.innerHTML = res.content.map(function(item){
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
            }
        })    
    }
    page.on('click',"span",function(e){
        let newpageNo = this.innerText*1;
        tab(newpageNo,qty);
    })
      

})
 