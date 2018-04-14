require.config({
    paths:{
        'jquery':'../lib/jquery-3.2.1',
        'zoom':'../lib/jquery.jasonZoom/jquery.jasonZoom'
    },
    shim:{
        'zoom':{
             deps: ["jquery"],//设置依赖
             exports:'jQuery.prototype.jasonZoom'
        },
        'base':{
             deps: ["jquery,com_plus,ajax_plugin"],
        }
    }
 })
