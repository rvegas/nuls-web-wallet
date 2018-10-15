const nuls_config = require("./lib/config");
const nuls_request = require("./lib/request");
const nuls_wallet = require('./lib/wallet.js');
const nuls_util = require("./lib/config");

module.exports = {
	/*根据hash获取交易详情*/
	getTxByHash: function(param, callback){
		return nuls_request.n(nuls_config.nuls_api.getTxByHash,callback,param);
	},
	/*交易列表*/
	getTxList: function(param, callback) {
		return nuls_request.m(nuls_config.nuls_api.getTxList,callback,param);
	},
	/*交易列表，首页专用*/
	getTxListIndex: function(param, callback) {
		return nuls_request.m(nuls_config.nuls_api.getTxListIndex,callback,param);
	},
	/*根据address获取交易*/
	getTxListByAddress: function(param, callback) {
		return nuls_request.m(nuls_config.nuls_api.getTxListByAddress,callback,param);
	},
	/*获取未确认交易*/
	getWebwalletTxByAddress: function(param, callback) {
		return nuls_request.m(nuls_config.nuls_api.getWebwalletTxByAddress,callback,param);
	},
	/*区块列表*/
	getBlockList: function(param, callback) {
		return nuls_request.m(nuls_config.nuls_api.getBlockList,callback,param);
	},
	/*区块列表，首页专用*/
	getBlockListIndex: function(param, callback) {
		return nuls_request.m(nuls_config.nuls_api.getBlockListIndex,callback,param);
	},
	/*全网共识*/
	getAllConsensus: function(callback) {
		return nuls_request.m(nuls_config.nuls_api.getAllConsensus,callback);
	},
	/*根据地址获取别名*/
	getAlias: function(param,callback){
		return nuls_request.n(nuls_config.nuls_api.getAlias,callback,param);
	},
	/*持币账户*/
	getBalanceListRank: function(param,callback){
		return nuls_request.m(nuls_config.nuls_api.getBalanceListRank,callback,param);
	},
	/*出块账户*/
	getAddressMinedlist: function(param,callback){
		return nuls_request.m(nuls_config.nuls_api.getAddressMinedlist,callback,param);
	},
	/*根据hash获取块*/
	getBlockHeaderDetailByHash: function(param,callback){
		return nuls_request.n(nuls_config.nuls_api.getBlockHeaderByHash,callback,param);
	},
	/*根据高度获取块*/
	getBlockHeaderDetailByHeight: function(param,callback){
		return nuls_request.n(nuls_config.nuls_api.getBlockHeaderByHeight,callback,param);
	},
	/*余额*/
	getAccountByAddress: function(param,callback){
		return nuls_request.n(nuls_config.nuls_api.getAccount,callback,param);
	},
	/*共识节点详情*/
	getConsensusAgentDetail: function(param,callback){
		return nuls_request.n(nuls_config.nuls_api.getConsensusAgent,callback,param);
	},
	/*最新块*/
	getBlockBesthashDetail: function(callback){
		return nuls_request.n(nuls_config.nuls_api.getBlockBesthash,callback);
	},
	/*14天交易历史*/
	getTxHistoryList: function(callback){
		return nuls_request.m(nuls_config.nuls_api.getTxHistory,callback);
	},
	/*搜索*/
	getSearchDataDetail: function(param,callback){
		return nuls_request.n(nuls_config.nuls_api.getSearchData,callback,param);
	},
	/*获取冻结列表*/
	getFrozenList: function(param,callback){
		nuls_request.m(nuls_config.nuls_api.getFrozenList,callback,param);
	},
	/*根据公钥获取地址*/
	getAddressByPub: function(param,callback){
		nuls_request.n(nuls_config.nuls_api.getAddressByPub,callback,param);
	},
	/*某节点，我的委托记录 {"pageNumber":"1","pageSize":20,"agentHash":"xxxx","address":"xxxxxxxx"} */
	getMyAgentEntrustList: function(param,callback){
		return nuls_request.m(nuls_config.nuls_api.getMyAgentEntrustList,callback,param);
	},
	/*我委托的节点的列表*/
	getMyConsensusList: function(param,callback){
		return nuls_request.m(nuls_config.nuls_api.getMyConsensusList,callback,param);
	},
	/*我的共识信息 某地址的共识信息*/
	getMyConsensus: function(param,callback){
		return nuls_request.n(nuls_config.nuls_api.getMyConsensus,callback,param);
	},
	/*共识节点列表*/
	getAgentNodeList: function(param,callback){
		return nuls_request.m(nuls_config.nuls_api.getAgentNodeList,callback,param);
	},
	/*委托*/
	entrust: function(param,callback){
		return nuls_request.o(nuls_config.nuls_api.entrust,callback,param);
	},
	/*获取转账手续费*/
	getTransFee: function(param,callback){
		nuls_request.m(nuls_config.nuls_api.getTransFee,callback,param);
	},
	/*转账*/
	transaction: function(param,callback){
		if(param.pri && param.pass){
			var parampass = {"pri":param.pri,"pass":param.pass};
			delete param["pri"];
			delete param["pass"];
			nuls_request.o(nuls_config.nuls_api.tran,function(data){
				if(data.success){
					var obj = data.data;
					var seri = obj.seri;
					var hash = obj.hash;
					if(seri.length > 0 && hash.length > 0){
						var pri = nuls_wallet.decodePriByPass(parampass);
						var pub = nuls_wallet.getPublicKeyByprivateKey(pri);
						var signparam = {"hash":hash,"pri":pri,"pub":pub};
						var signture = nuls_wallet.signTrans(signparam);
						if(signture.length > 200){
							//签名成功
							var broadcastparam = {"serializ":seri,"sign":signture,"types":param.types,"address":param.address}
							nuls_request.o(nuls_config.nuls_api.broadcast,callback,broadcastparam);
						}else{
							callback(nuls_request.e(false,"10011",data));
						}
					}else{
						callback(nuls_request.e(false,"10011",data));
					}
				}else{
					callback(nuls_request.e(false,"10011",data));
				}
			},param);
		}else{
			callback(nuls_request.e(false,"10011",data));
		}
	},
	
	/*签名交易*/
	signTrans: function(param,callback){
		callback(nuls_request.g(nuls_wallet.signTrans(param)));
	},
	/*广播交易*/
	broadcast: function(param,callback){
		return nuls_request.o(nuls_config.nuls_api.broadcast,callback,param);
	},
	/*------------------------------------------------------------------------------*/
	/*获取公私钥对 私钥直接加密之后返回 需要用户输入的密码*/
	getPriAndPub: function(param,callback){
		return nuls_wallet.getPriAndPub(callback,param);
	},
	/*根据私钥，导入钱包，返回地址*/
	importWallet: function(param,callback){
		if(param.pass && param.pri && null!=param.types){
			var pub = "",pri = "",alias = "",addr="";
			if(param.types){
				//加密了
				//解密私钥
				pri = nuls_wallet.decodePriByPass(param);
				//获取公钥
				pub = nuls_wallet.getPublicKeyByprivateKey(pri);
				pri = param.pri;
			}else{
				//没加密
				//获取公钥
				pub = nuls_wallet.getPublicKeyByprivateKey(param.pri);
				//加密
				pri = nuls_wallet.encryptedPrivateKey(param);
			}
			if(pub != "0"){
				//加载地址
				nuls_request.n(nuls_config.nuls_api.getAddressByPub,function(data){
					addr = data.data;
					//加载别名
					nuls_request.n(nuls_config.nuls_api.getAlias,function(aliasdata){
						alias = aliasdata.data.alias;
						callback(nuls_request.g({"alias":alias,"pri":pri,"address":addr}));
					},{"address":addr});
					
				},{"pub":pub});
			}
		}else{
			callback(nuls_request.e(false,"10011","param error"));
		}
	},
	/*根据私钥，获取公钥*/
	getPublicKeyByprivateKey: function(param,callback){
		callback(nuls_request.g(nuls_wallet.getPublicKeyByprivateKey(param.pri)));
	},
	/*加密私钥*/
	encryptedPrivateKey: function(param,callback){
		callback(nuls_request.g(nuls_wallet.encryptedPrivateKey(param)));
	},
	/*****************************************************************/
	/*保存临时值*/
	saveDataToTemp: function(name,value){
		nuls_util.saveDataToTemp(name,value);
	},
	/*获取临时值*/
	getDataToTemp: function(name){
		nuls_util.getDataToTemp(name);
	},
	/*获取Na*/
	getInfactCoin: function(count){
		nuls_util.getInfactCoin(count);
	}
}

