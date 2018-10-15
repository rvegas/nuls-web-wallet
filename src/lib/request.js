const axios = require("axios");
const nuls_config = require("./config");

/*load url*/
function v(p){
  return nuls_config.nuls_server.nodeList[0].host+nuls_config.nuls_server.requestMain+p;
}
function e(){
	return {"success":arguments[0]||false,"code":arguments[1]||"","msg":arguments[2]||""};
}
function g(){
	return {"success":true,"code":10000,"msg":"success",data:arguments[0]||""};
}

module.exports = {
	e: function(){
		return {"success":arguments[0]||false,"code":arguments[1]||"","msg":arguments[2]||""};
	},
	g: function(){
		return {"success":true,"code":10000,"msg":"success",data:arguments[0]||""};
	},
	/*request get param type example: ?t=1&x=2*/
	m:function(url,callback,param){
		if(!param){param={};}
		param.t=new Date().getTime();
		axios.get(v(url),{params:param}).then(function (response){
			callback(response.data);
		}).catch(function (error) {
			callback(e(false,10002,error));
		});
	},
	/*request get param type example: a/1*/
	n:function(url,callback,param){
		url = v(url);
		for (var i in param) {url += "/"+param[i];}
		url += "?t="+new Date().getTime();
		axios.get(url).then(function (response){
			callback(response.data);
		}).catch(function (error) {
			callback(e(false,10002,error));
		});
	},
	/*request post*/
	o:function(url,callback,param){
		axios.post(v(url),param||{}).then(function (response){
			callback(response.data);
		}).catch(function (error) {
			callback(e(false,10002,error));
		});
	},
}