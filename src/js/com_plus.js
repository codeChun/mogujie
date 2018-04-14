define(function(){
    return{
                /**
         * [生成一个范围内的随机整数]
         * @param  {Number} min [范围最小值]
         * @param  {Number} max [范围内最大值]
         * @return {Number}     [返回随机整数]
         */
        randomNumber(min,max){
            return parseInt(Math.random()*(max-min+1)) + min
        },
        vCode(){
            var res = '';
            for(var i=0;i<4;i++){
                res += parseInt(Math.random()*10);//'' + 8=>'8'+6=>'86'+5=>'865'+0=>'8650'
            }
            return res;
        },
         randomColor(){
            // 随机r,g,b
            var r = parseInt(Math.random()*256);
            var g = parseInt(Math.random()*256);
            var b = parseInt(Math.random()*256);
            return 'rgb(' + r + ',' + g + ',' + b + ')';
        },
        getCss(ele,attr){
            // 兼容的思路：判断当前浏览器是否支持这个方法
            // 而不是判断当前时什么浏览器
            if(window.getComputedStyle){
                return getComputedStyle(ele)[attr]
            }else if(ele.currentStyle){
                return ele.currentStyle[attr];
            }else{
                // 如果以上两个都不支持，则直接返回内联样式
                return ele.style[attr];
            }
        },
         //      * [数据类型判断]
         // * @param  {All} data [数据类型]
         // * @return {String}      [返回数据类型字符串]
         // */
        type(data){
            return Object.prototype.toString.call(data).slice(8,-1).toLowerCase();
        },
        Cookie:{
                /**
                 * [写入修改cookie]
                 * @param {String} name   [cookie名]
                 * @param {String} val    [cookie值]
                 * @param {[Object]} params [cookie参数]
                    * expires {Date} 
                    * path    {String}
                    * domain  {String}
                    * secure  {Boolean}
                 */
                set:function(name,val,params){
                    // params={expires,path,domain,secure}

                    // cookie名与cookie值
                    var cookieStr = name +'=' + val;

                    params = params || {};

                    // 有效期
                    if(params.expires){
                        cookieStr += ';expires=' + params.expires.toUTCString();
                    }

                    // 路径
                    if(params.path){
                        cookieStr += ';path=' + params.path;
                    }

                    // 域名
                    if(params.domain){
                        cookieStr += ';domain=' + params.domain;
                    }


                    // 安全性
                    if(params.secure){
                        cookieStr += ';secure';
                    }


                    document.cookie = cookieStr;
                },
                /**
                 * [获取cookie]
                 * @param  {String} name [description]
                 * @return {[type]}      [description]
                 */
                get:function(name){
                    var cookies = document.cookie;

                    // 如果cookie不存在，直接返回空字符串
                    if(cookies.length===0){
                        return '';
                    }

                    var res = '';

                    cookies = cookies.split('; ');
                    for(var i=0;i<cookies.length;i++){
                        var arr = cookies[i].split('=');
                        if(arr[0] === name){
                            res = arr[1];
                            break;
                        }
                    }


                    return res;
                },
                /**
                 * [删除cookie]
                 * @param  {String} name [删除cookie]
                 */
                remove:function(name){
                    var now = new Date();
                    now.setDate(now.getDate()-10);

                    // document.cookie = name + '=x;expires=' + now.toUTCString(); 
                    this.set(name,'x',{expires:now});
                }
            },
            element:{
                // 方法
                /**
                 * [获取元素节点]
                 * @param  {Node} nodes [传入的节点]
                 * @return {Element}       [返回元素节点]
                 */
                get:function(nodes){
                    var res = [];
                    for(var i=0;i<nodes.length;i++){
                        if(nodes[i].nodeType === 1){
                            res.push(nodes[i])
                        }
                    }
                    return res;
                },
                /**
                 * [获取子元素]
                 * @param  {[type]} element [description]
                 * @return {[type]}         [description]
                 */
                children:function(element){
                    var nodes = element.childNodes;

                    var res = element.get(nodes);//得到子元素

                    return res;
                },

                //获取下一个元素
                next:function(element){

                },

                // 获取前一个元素
                prev:function(){

                }
            },
            // element.children(links)
            Event:{
                /**
                 * [绑定事件的方法，兼容所有浏览器]
                 * @param  {Element}  ele       [绑定事件的元素]
                 * @param  {String}  type      [事件类型]
                 * @param  {Function}  handler   [事件处理函数]
                 * @param  {Boolean} isCapture [是否捕获]
                 */
                bind:function(ele,type,handler,isCapture){console.log(isCapture)
                    // W3C标准的事件监听器
                    if(ele.addEventListener){
                        ele.addEventListener(type,handler,isCapture)
                    }

                    // IE8以下浏览器
                    else if(ele.attachEvent){
                        ele.attachEvent('on'+type,handler)
                    }

                    // DOM节点绑定方式
                    else{
                        ele['on' + type] = handler;
                    }
                },
                remove(ele,type,handler,isCapture){
                    if(ele.removeEventListener){
                        ele.removeEventListener(type,handler,isCapture)
                    }

                    // IE8以下浏览器
                    else if(ele.detachEvent){
                        ele.detachEvent('on'+type,handler)
                    }

                    else{
                        ele['on' + type] = null;
                    }
                }
            },
            // 给元素绑定事件
            // event.bind(box,'click',function(){},true);
            // Event.remove(box,'click',fn,true)
            //专用于吸顶效果的函数（a:页面头部盒子 b:需要做吸顶效果的盒子）
            catchTop(a,b){
            var divt=a.offsetTop;
            // 获取当前页面的滚动条纵坐标位置
            var scrollT = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
            // 判断滚动条位置
            if(scrollT>=divt){
                b.style.display='block';
                b.style.position='fixed';
                b.style.top=0;
                b.style.left=0;
            }else{
                b.style.display='none';
                b.style.position='';
            }
          },
          // 专用于生成验证码的函数randomCode()（n：需要生成二维码的位数）
            randomCode(n){
            var res='';
            var str='0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
            for(var i=0;i<n;i++){
                var idx=parseInt(Math.random()*str.length);
                res+=str.charAt(idx);
            }
            return res;
          },
          // 返回顶部函数toTop()
            toTop(){ 
            var timer=setInterval(function(){
               // 获取滚动条滚动过的距离
              var scrollT=window.scrollY;
              // 计算速度
              var speed=Math.floor(scrollT/5);
              if(scrollT<=5 || speed===0){
                clearInterval(timer);
              }
              window.scrollBy(0, -speed);
            }, 30);
          },
          // 获取url函数getUrl()
           getUrl(n,m,k){
        // 遍历商品列表截取里面的url（n：需要遍历的数据数组 m:需要绑定事件处理函数的页面元素 k:需要传参的页面名称）
        n.forEach(function(item,ind){
           m[ind].onclick=function(){
            var itemlist;
            itemlist=item;
            var params='';
              for(var attr in itemlist){
                params+=attr+'='+itemlist[attr]+'&';
              }
              params=params.slice(0,-1);
              console.log(params);
              location.href="k.html?"+params;
              console.log(m[ind].href);
              }   
        });       
        }       
     }
});