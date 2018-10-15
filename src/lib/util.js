function padLeftZero(str) {
  return ('00' + str).substr(str.length);
}
var weekDay = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
var monTh = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sept","Oct","Nov","Dec"];
module.exports = {
	formatTxClass:function(status){
		switch (status){
		case 1:
			return "consensus-reward";
		case 2:
			return "tokens-trading";
		case 3:
			return "change-money";
		case 4:
			return "change-money";
		case 5:
			return "change-money";
		case 11:
			return "set-alias";
		case 90:
			return "consensus-building";
		case 91:
			return "entrust-consensus";
		case 92:
			return "stop-consensus";
		case 93:
			return "yellow-card";
		case 94:
			return "red-card";
		default:
			return "consensus-reward";
		}
	},
	/*保存临时变量（刷新浏览器依旧存在） save temp data to explorer*/
	saveDataToTemp: function(name,value){
		if (window.localStorage) {
			localStorage.setItem(name, value);
		} else {
			Cookie.write(name, value);
		}
	},
	/*获取保存的临时变量（刷新浏览器依旧存在） get temp data from explorer*/
	getDataToTemp: function(name){
		return window.localStorage? localStorage.getItem(name)||1: Cookie.read(name)||1;
	},
	/*格式化地址  Formatted address*/
	formatString: function(str){
		if(str && str.length>8){
			return str.substring(0,4)+"...."+str.substring(str.length-4,str.length);
		}
		return str;
	},
	/*获取实际数值，如果为0，则保留两位，否则就显示默认长度 Get the actual value. If it is 0, two bits are reserved; otherwise, the default length is displayed.*/
	getInfactCoin: function(count){
		if(count){
			count = count.toString();
			var l = count.length,s=9,d=count/100000000,f=d.toString().split('.');
			if(l>=s){
				if(d > 100000000){
					d -= 100000000;
				}
				if(f[1]){
					if(f[1].toString().length===1){
						d+="0";
					}
				}else{
					d+=".00";
				}
				return d;
			}else{
				if(count === "0"){
					return "0.00";
				}else{
					var k = s-l,r="0.";
					for(var i = 1; i < k; i++){
						r+=0;
					}
					count = parseInt(count.replace(/(0+)\b/gi,""));
					return r+count;
				}
			}
		}
		return 0;
	},
	/*计算输入输出后的实际交易金额 Calculate the actual transaction amount after input and output*/
	getTransactionResultAmount: function(txlist){
		var outputlist = txlist.outputList,inputlist = txlist.inputs,amout = 0;
		for(var i=0,outputObj;outputObj=outputlist[i++];){
			amout+= outputObj.value;
			for(var j=0,inputObj;inputObj=inputlist[j++];){
				if(outputObj.address==inputObj.address){
					amout -= outputObj.value;
					break;
				}
			}
		}
		return amout;	
	},
	/*格式化时间 Formatting time*/
	formatDate: function(data,fmt){
		if(!fmt){
			fmt = "yyyy-MM-dd hh:mm:ss";
		}
		if (/(y+)/.test(fmt)) {
			fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
		}
		let o = {
			'M+': date.getMonth() + 1,
			'd+': date.getDate(),
			'h+': date.getHours(),
			'm+': date.getMinutes(),
			's+': date.getSeconds()
		};
		for (let k in o) {
			if (new RegExp(`(${k})`).test(fmt)) {
				let str = o[k] + '';
				fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
			}
		}
		return fmt;
	},
	formatDateEn(date){
		return weekDay[date.getDay()]+" "+date.getDate()+" "+monTh[date.getMonth()]+" "+date.getFullYear();
	}	
}



