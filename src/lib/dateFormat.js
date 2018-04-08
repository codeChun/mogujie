if(!Date.prototype.format){
    /*
        RegExp.$n：保存正则匹配到的分组
     */
    Date.prototype.format = function(fmt){
        // 这里的This指向实例
    	// 预订字符对应时间
    	var o = {
            "M+": this.getMonth() + 1, //月份 1
            "D+": this.getDate(), //日 22
            "h+": this.getHours(), //小时 14
            "m+": this.getMinutes(), //分 13
            "s+": this.getSeconds(), //秒 44
        };

        // 匹配年份
        // 年份比较特殊，所以单独处理
        // test方法如果返回true，RegExp.$1得到匹配的字符：YYYY
        if(/(Y+)/.test(fmt)){
        	// 得到fmt字符串中Y字符对应的年份
        	// YYYY => 2018
        	// YY => 18
        	var res = String(this.getFullYear()).substr(4 - RegExp.$1.length);//(巧妙)
                                          // '2017'.substr(4-'YYYY'.length)

        	// 替换年份
            // YYYYMMDD => 2018MMDD
        	fmt = fmt.replace(RegExp.$1,res);
        }

        for(var str in o){
        	// 创建正则时设定分组，以便获取匹配到的字符
        	// RegExp.$1
        	var reg = new RegExp('(' + str + ')');//  /(M+)/

        	// 如果有匹配则把fmt中匹配到的字符替换成o中对应的时间，根据fmt中的字符决定是否补0
            // 2018MMDD => 201801DD
        	// 2018MD => 20181DD
        	// YYYY-MM-DD hh:mm:ss => 2017-08-13 20:12:30
        	if(reg.test(fmt)){
        		// 得到匹配字符对应的时间
        		var res = RegExp.$1.length>1 ? ('00' + o[str]).substr(String(o[str]).length) : o[str];//(巧妙)
        		fmt = fmt.replace(RegExp.$1,res);
        	}
        }

        return fmt;
    }
}

