//const IS_DEV = process.env.NODE_ENV === 'production';
import {RUN_DEV} from '@/config'
const state = {
  passwordShow: false,
  /**
  * 获取版本信息
  * Get version information
  * */
  versionInfo: [],
  /**
   * 底部高度信息
   * Get Bottom height information
   * */
  netWorkInfo: [],
  /**
   * 连接节点数小于1不能接操作
   * The number of connections is less than 1.
   * */
  nodeNumberOk:true,
  /**
   * 节点地址
   * Node address
   * */
  //  nodeAddress: 'http://50.62.6.187:8005',
  //  nodeAddress: 'http://testnet.apiserver.nuls.io',
  nodeAddress: RUN_DEV ? 'https://apiserver.nuls.io' : 'http://testnet.apiserver.nuls.io',
  // nodeAddress: 'https://apiserver.baota.io',
  //节点地址延迟
  /**
   * 节点地址延迟
   * Node address delay
   * */
  delay: 0,
  /**
   * 服务地址列表
   * Service address list
   * */
  serviceData:[],
  /**
   * 语言
   * language
   * */
  lang:'en',
  /**
   * 导航的activeNav
   * Navigation activeNav
   * */
  activeNav:'1',
  /**
   * 我的共识查询结果标识
   * My consensus query result ID
   * */
  lengthFlg:'0',
  /**
   * 别名
   * Alias
   * */
  addressAlias:'null',
  /**
   * 共识退出的标志
   * Sign of consensus exit
   * */
  exitFlg:-1,
  /**
   * 请求高度的标志，0 第一次请求，
   * Sign for request height, 0: first request.
   * */
  heightFlg:'0',
  /**
   * 跳转区块链浏览器地址
   * To block chain browser
   * */
  // browserAddress: 'http://192.168.1.130:8088/',
  // browserAddress: 'http://testnet.nulscan.io/',
  // browserAddress: 'https://nulscan.io/',
  browserAddress: RUN_DEV ? 'https://nulscan.io/' : 'http://testnet.nulscan.io/',
};

const getters = {
  getPasswordShow: state => state.passwordShow,
  getNodeAddress: state => state.nodeAddress,
  getDelay: state => state.delay,
  getServiceData: state => state.serviceData,
  getVersionInfo: state => state.versionInfo,
  getNetWorkInfo: state => state.netWorkInfo,
  getNodeNumberOk: state => state.nodeNumberOk,
  getLang: state => state.lang,
  getActiveNav: state => state.activeNav,
  getLengthFlg: state => state.lengthFlg,
  getAddressAlias: state => state.addressAlias,
  getExitFlg: state => state.exitFlg,
  getHeightFlg: state => state.heightFlg,
  getBrowserAddress: state => state.browserAddress,
};

const mutations = {
  setPasswordShow (state, data) {
    state.passwordShow = data
  },
  setNodeAddress (state, data) {
    state.nodeAddress = data
  },
  setDelay (state, data) {
    state.delay = data
  },
  refreshDelay(state, data) {
    localStorage.delay = data;
    state.delay = data;
  },
  setServiceData (state, data) {
    state.serviceData = data
  },
  refresh(state, data) {
    localStorage.nodeAddress = data;
    state.nodeAddress = data;
  },
  refreshService(state, data) {
    localStorage.serviceData = data;
    state.serviceData = data;
  },
  setLang (state, data) {
    state.lang = data
  },
  refreshLanguage(state, data) {
    localStorage.lang = data;
    state.lang = data;
  },
  setVersionInfo (state, data) {
    state.versionInfo = data
  },
  setNetWorkInfo (state, data) {
    state.netWorkInfo = data
  },
  setNodeNumberOk (state, data) {
    state.nodeNumberOk = data
  },
  setActiveNav (state, data) {
    state.activeNav = data
  },
  refreshActiveNav(state, data) {
    sessionStorage.activeNav = data;
    state.activeNav = data;
  },
  setLengthFlg (state, data) {
    state.lengthFlg = data
  },
  setAddressAlias (state, data) {
    state.addressAlias = data
  },
  refreshAddressAlias(state, data) {
    localStorage.addressAlias = data;
    state.addressAlias = data;
  },
  setExitFlg (state, data) {
    state.exitFlg = data
  },
  setHeightFlg (state, data) {
    state.heightFlg = data
  },
  setBrowserAddress (state, data) {
    state.browserAddress = data
  },
};

const actions = {};

export default {
  state,
  getters,
  mutations,
  actions
}
