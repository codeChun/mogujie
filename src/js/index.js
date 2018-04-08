document.addEventListener('DOMContentLoaded',function(){
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

});

jQuery(function($) {
    $("#mgjHeader").load("html/mgjHeader.html");
    $("#mgjFooter").load("html/mgjFooter.html");   
    $("#mgjRightbar").load("html/mgjrightbar.html");

});