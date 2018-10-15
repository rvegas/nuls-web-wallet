import Vue from 'vue'
import axios from 'axios'
import App from './App'
import router from './router'
import store from './store'
import i18n from './i18n/i18n'
import Qs from 'qs'

import 'element-ui/lib/theme-chalk/index.css';
import './assets/css/base.less';
import './assets/css/el-index.less';

Vue.http = Vue.prototype.$http = axios;
Vue.config.productionTip = false;
Vue.prototype.$qs = Qs;
axios.defaults.withCredentials=true;

new Vue({
  components: { App },
  router,
  store,
  i18n,
  template: '<App/>'
}).$mount('#app');
