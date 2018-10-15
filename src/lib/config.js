module.exports = {
	/*server*/
	nuls_server:{
		nodeList:[
			{host:"http://192.168.1.109:8765"},
			{host:"http://192.168.1.233:8765"},
			{host:"http://127.0.0.1:8765"},
			{host:"http://data.nuls.io"},
			{host:"http://39.108.121.242:8005"},
		],
		requestMain: "/nuls"
	},
	nuls_defaultType:{
		showError: true
	},
	/*api request url list*/
	nuls_api:{
		/*根据hash获取交易详情*/
		getTxByHash: "/tx/hash",
		/*交易列表*/
		getTxList: "/tx/list",
		/*交易列表，首页专用*/
		getTxListIndex: "/tx/index",
		/*根据address获取交易*/
		getTxListByAddress: "/tx/list/address",
		/*获取未确认交易*/
		getWebwalletTxByAddress: "/tx/list/webwallet/address",
		/*区块列表*/
		getBlockList: "/block/list",
		/*区块列表，首页专用*/
		getBlockListIndex: "/block/index",
		/*全网共识*/
		getAllConsensus: "/consensus",
		/*根据地址获取别名*/
		getAlias: "/alias/get",
		/*持币账户*/
		getBalanceListRank: "/statistics/balancelist",
		/*出块账户*/
		getAddressMinedlist : "/statistics/minedlist",
		/*根据hash获取块*/
		getBlockHeaderByHash: "/block/hash",
		/*根据高度获取块*/
		getBlockHeaderByHeight: "/block/height",
		/*余额*/
		getAccount: "/balance/get",
		/*共识节点详情*/
		getConsensusAgent: "/consensus/agent",
		/*最新块*/
		getBlockBesthash: "/block/newest",
		/*14天交易历史*/
		getTxHistory: "/statistics/history",
		/*搜索*/
		getSearchData: "/search",
		/*获取冻结列表*/
		getFrozenList: "/utxo/list/address",
		/*获取转账手续费*/
		getTransFee: "/tx/transFee",
		/*转账*/
		tran: "/tx/trans",
		/*广播交易*/
		broadcast: "/tx/broadcast",
		/*委托*/
		entrust: "/tx/trans/entrust",
		/*某节点，我的委托记录*/
		getMyAgentEntrustList: "/deposit/list",
		/*某节点，我的委托记录*/
		getMyConsensusList: "/consensus/list/address",
		/*我的共识*/
		getMyConsensus: "/consensus/address",
		/*共识节点列表*/
		getAgentNodeList: "/consensus/list",
		/*根据公钥获取地址*/
		getAddressByPub: "/account/getAddress"
	},
}
