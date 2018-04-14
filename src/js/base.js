define(function(){
    return{
        searchAjax(){
            // 头部搜索框ajax请求
            var timer;
            var res=$('.res').val();
            $('.searchtxt').val().focus();
            $('.searchtxt').val().oninput = function(){
                let key = $('.searchtxt').get(0).value;
                clearTimeout(timer);
                timer = setTimeout(function(){
                    ajax({
                        type:'jsonp',
                        url:'http://suggest.taobao.com/sug?code=utf-8&q='+key,
                        // data:{json:1,wd:key},
                        jsonpName:'callback',
                        success:function(data){
                            var data_arr=[];
                            data_arr=data.result;
                            var $ul=$('<ul/>');
                            var item_arr=[];
                            $.each($(data_arr),function(idx,item){
                                item_arr.push(item[0])
                            })
                            $ul.get(0).innerHTML=$.map(item_arr,function(val,idx){
                                return '<li>'+val+'</li>'
                            }).join('\n');
                            res.innerHTML = '';
                            res.appendChild($ul.get(0));
                            $('.res').on('click','li',function(){
                                // 这里的this指向事件源对象
                                $('.searchtxt').get(0).value=$(this).html();
                            })
                        }
                    })
                    if(key==''){
                        res.style.display='none';
                    }else{
                        res.style.display='block';
                    }
                },500); 
            }
        },
        
        // 添加购物车效果
        addcarAnimation(fathersel,btnsel,targetsel,duration){
            $(fathersel).on('click',btnsel,function(){
                $li = $(this).closest('li');
                $img = $li.children('img');
                $cloneImg = $img.clone();
                    console.log($img.offset().left);
                $cloneImg.css({
                    position:'absolute',
                    left:$img.offset().left,
                    top:$img.offset().top,
                    width:$img.outerWidth()
                });

                $('body').append($cloneImg);
                $cloneImg.animate({
                    left: $(targetsel).offset().left,
                    top:$(targetsel).offset().top,
                    opcatity:0.5,
                    width:0,
                },duration);
            })  
        },
    }
})