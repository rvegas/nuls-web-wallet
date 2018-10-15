import Vue from 'vue';
import Vuex from 'vuex';

import users from './modules/users';
import status from './modules/status';

Vue.use(Vuex);

export const store = new Vuex.Store({
  modules:{
    users,
    status
  }
});
export default store
