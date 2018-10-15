const state = {
  /**
  * 账户地址
  * Account address
  * */
  address:'',
  /**
   * 账户地址
   * Account key
   * */
  addressKey:'',
  /**
   * 账户地址
   * Account list
   * */
  accountTxList: [],

};

const getters = {
  getAddress: state => state.address,
  getAddressKey: state => state.addressKey,
  getAddressList: state => state.addressListItems,
};

const mutations = {
  setAddress (state, data) {
    state.address = data
  },
  refreshAddress(state, data) {
    localStorage.address = data;
    state.address = data;
  },
  setAddressKey (state, data) {
    state.addressKey = data
  },
  setAddressList (state, data) {
    state.addressListItems = data
  },
};

const actions = {};

export default {
  state,
  getters,
  mutations,
  actions
}
