require.config({
    // baseUrl:
    // 设置别名（虚拟路径）
    paths:{
        'jquery':'../lib/jquery-3.2.1',
        'slider':'../lib/jquery.autoBanner/js/jquery.autoBanner',
        // 'zoom':'../lib/jquery.gdsZoom/jquery.gdsZoom'
    },
    shim:{
        //zoom依赖jquery
        // 'zoom':['jquery']
        // 'zoom':{
        //      deps: ["jquery"],//设置依赖
        //      exports:'jQuery.prototype.gdsZoom'
        // },
        'slider':{
             deps: ["jquery"],//设置依赖
             exports:'jQuery.prototype.jasonCarousel'
        },
        'base':{
            deps:['com_plus']
        },
    }
 })

require(['jquery','com_plus','base','ajax_plugin','slider','dateFormat'],function($,common,base){
    $("#mgjHeader").load("html/header.html");
    $("#mgjFooter").load("html/footer.html");   
    $("#rightbar").load("html/rightbar.html");
    $(".datalir").load("../html/list.html .datalir");

        // 头部搜索框ajax请求
        // base.searchAjax();

    $.ajax({
        url:'../api/list.php',
        dataType:'json',
        // data:{
        //     id:''
        // },
        success:function(data){
            var datalist = $.map(data,function(item,idx){  
                return `
                    <li data-id="${item.id}">
                        <img src="${item.imgurl}"/>
                        <h4>${item.name}</h4>
                        <p class="price">
                            <span class="sale">${item.sale}</span>
                            <span class="yuanjia"><del>${item.price}</del></span>
                            <span class="xingxing"><img src="../img/beauty/xingxing.png">${item.haoping}</span>
                        </p>
                        <p class="xiangsi">找相似</p>
                    </li>
                `
            })
            $(".datalir").html(datalist);  
        }
    });


    

    // banner 轮播图
    let focus = document.querySelector('.focus');
    let ul = focus.querySelector('ul');
    // 无缝滚动
    // 关键1：把第一张复制到最后
    ul.appendChild(ul.children[0].cloneNode(true));
    let len = ul.children.length;//5
    let index = 0;
    let imgWidth = focus.clientWidth;        

    // 生成页码
    let page = document.createElement('div');
    page.classList.add('page');

    for(let i=1;i<len;i++){
        let span = document.createElement('span');
        span.innerText = i;

        if(i==index+1){
            span.classList.add('active');
        }
        page.appendChild(span);
    }

     // page写入页面
    focus.appendChild(page);
    // 1）设置ul宽度，达到水平排列的效果
    ul.style.width = imgWidth*len + 'px';

    let timer = setInterval(autoPlay,3000);

    // 鼠标移入移出
    focus.addEventListener('mouseenter',()=>{
        clearInterval(timer);
    });

    focus.addEventListener('mouseleave',()=>{
        timer = setInterval(autoPlay,3000);
    });

    // 事件委托
    focus.addEventListener('click',e=>{
        if(e.target.parentNode.classList.contains('page')){
            index = e.target.innerText-1;
            show();
        }
    });

    function autoPlay(){
        index++;
        show();
    }

    function show(){
        if(index>=len){
            // 当滚动到复制那张图片时，瞬间重置回初始状态
            ul.style.left = 0;
            index = 1;
        }
        let target = -index*imgWidth;
        animate(ul,{left:target});

        // 高亮页码
        // 高亮前先清除
        page.querySelector('.active').classList.remove('active');

        if(index<len-1){
            page.children[index].className = 'active';
        }else{
            page.children[0].className = 'active';
        }
    }

    // 秒杀倒计时
    // function autotime(){
    //     var now = new Date();

    //     var date_str = now.format('YYYY/MM/DD');

    //     var new_str = String(date_str.slice(-2)*1+1);

    //     date_str = date_str.substr(0,8);
    //     var final_str = date_str + new_str;
    //     console.log(final_str);

    //     var future = new Date(final_str);
    //     var daojishi = parseInt((Date.parse(future) - Date.parse(now))/1000);
    //     console.log(daojishi);

    //     // 将相差的毫秒数转化成天/时/分/秒
    //     var secLeft = daojishi%60;
    //     var minLeft = parseInt(daojishi/60)%60;
    //     var hourLeft = Math.floor(daojishi/60/60)%24;
    //     console.log(secLeft,minLeft,hourLeft);


    //     // 补0操作
    //     secLeft<10?secLeft = '0' + secLeft:secLeft;
    //     minLeft<10?minLeft = '0' + minLeft:minLeft;
    //     hourLeft<10?hourLeft = '0' + hourLeft:hourLeft;        
    //     $('.hour').html(hourLeft);
    //     $('.min').html(minLeft);
    //     $('.second').html(secLeft);
    // }
    // let lefttime = document.querySelector(".lefttime");
    // lefttime = setInterval(autotime,1000);


    let bagphoto = document.querySelector(".bagphoto");
    let manphoto = document.querySelector(".manphoto");
    let accphoto = document.querySelector(".accphoto");
    let familyphoto = document.querySelector(".familyphoto");
    let infantphoto = document.querySelector(".infantphoto");
    let idx = 1;
    showphoto();
    function showphoto() {
        idx++;
        if(idx > 2) {
            idx = 1;
        }
        bagphoto.src = "../img/bag/100" + idx + ".jpg";
        manphoto.src = "../img/man/100" + idx + ".jpg";
        accphoto.src = "../img/acc/100" + idx + ".jpg";
        familyphoto.src = "../img/family/100" + idx + ".jpg";
        infantphoto.src = "../img/infant/100" + idx + ".jpg";
    }
    let timers = setInterval(showphoto, 2000);
    bagphoto.onmouseenter = function() {
        clearInterval(timers);
    }
    bagphoto.onmouseleave = function(){
        timers = setInterval(showphoto, 2000);
    }
    

    var par = '';
    // 点击页面任意商品位置实现跳转到详情页ajax请求
    function detailAjax(data){
        $.ajax({
            url:'../api/hometodetail.php',
            dataType:'json',
            data:{id:data},
            success:function(res){
                console.log(res);
            },
        })
    }
    function detailHref(data){
        par += '?' + 'id' + '=' + data;
        console.log(par);
        location.href='html/detail.html' + par;
    }

    // 延时500ms执行点击首页商品跳转到详情页
    // setTimeout(function(){
       $('.datalir').on('click','li img',function(e){
            var id = e.target.parentNode.getAttribute("data-id");
            console.log(id);
            detailAjax(id);
            detailHref(id);
            
      })
    // },500)
    

})
