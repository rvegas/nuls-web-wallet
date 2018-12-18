import Vue from 'vue'
import Router from 'vue-router'

// import Home from '@/pages/Home'


Vue.use(Router);

export default new Router({
  //mode:'history',
  routes: [
    {
      path: '*',
      component: resolve => require(['@/pages/Home'], resolve),
      beforeEnter: (to, from, next) => {
        if(localStorage.getItem('address')){
          next({
            path: '/account',
          })
        }else{
          next();
        }
      },
    },
    {
      path: '/home',
      name: '/home',
      component: resolve => require(['@/pages/Home'], resolve),
    },
    /**
    * 钱包
    * wallet
    * */
    {
      path: '/wallet/newWallet',
      name: '/newWallet',
      component: resolve => require(['@/pages/wallet/newWallet'], resolve),
    },
    {
      path: '/wallet/createWallet',
      name: '/createWallet',
      component: resolve => require(['@/pages/wallet/createWallet'], resolve),
      beforeEnter: (to, from, next) => {
        if(localStorage.getItem('address')){
          next();
        }else{
          next({
            path: '/home',
          })
        }
      },
    },
    {
      path: '/wallet/importKeyCode',
      name: '/importKeyCode',
      component: resolve => require(['@/pages/wallet/importKeyCode'], resolve),
    },
    {
      path: '/wallet/importKeyFile',
      name: '/importKeyFile',
      component: resolve => require(['@/pages/wallet/importKeyFile'], resolve),
    },
    {
      path: '/wallet/freezeList',
      name: '/freezeList',
      component: resolve => require(['@/pages/wallet/freezeList'], resolve),
      beforeEnter: (to, from, next) => {
        if(localStorage.getItem('address')){
          next();
        }else{
          next({
            path: '/home',
          })
        }
      },
    },
    /**
     * 账户
     * account
     * */
    {
      path: '/account',
      name: '/account',
      component: resolve => require(['@/pages/account/index'], resolve),
      meta: {
        keepAlive: true
      },
      beforeEnter: (to, from, next) => {
        if(localStorage.getItem('address')){
          next();
        }else{
          next({
            path: '/home',
          })
        }
      },
    },
    /**
     * 转账
     * transfer
     * */
    {
      path: '/transfer/transAccount',
      name: '/transAccount',
      component: resolve => require(['@/pages/transfer/transAccount'], resolve),
      beforeEnter: (to, from, next) => {
        if(localStorage.getItem('address')){
          next();
        }else{
          next({
            path: '/home',
          })
        }
      },
    },
    {
      path: '/transfer/makeCollections',
      name: '/makeCollections',
      component: resolve => require(['@/pages/transfer/makeCollections'], resolve),
      beforeEnter: (to, from, next) => {
        if(localStorage.getItem('address')){
          next();
        }else{
          next({
            path: '/home',
          })
        }
      },
    },
    {
      path: '/transfer/transDetail',
      name: '/transDetail',
      component: resolve => require(['@/pages/transfer/transDetail'], resolve),
      beforeEnter: (to, from, next) => {
        if(localStorage.getItem('address')){
          next();
        }else{
          next({
            path: '/home',
          })
        }
      },
    },
    /**
     * 共识
     * consensus
     * */
    {
      path: '/consensus/allConsensus',
      name: '/allConsensus',
      component: resolve => require(['@/pages/consensus/allConsensus'], resolve),
      meta: {
        keepAlive: true
      },
    },
    {
      path: '/consensus/myConsensus',
      name: '/myConsensus',
      component: resolve => require(['@/pages/consensus/myConsensus'], resolve),
      meta: {
        keepAlive: true
      },
    },
    {
      path: '/consensus/nodeDetail',
      name: '/nodeDetail',
      component: resolve => require(['@/pages/consensus/nodeDetail'], resolve),
    },
    /**
     * 服务地址列表
     * serviceAddress
     * */
    {
      path: '/serviceAddress/serviceAddressList',
      name: '/serviceAddressList',
      component: resolve => require(['@/pages/serviceAddress/serviceAddressList'], resolve),
    },
    /**
     * 设置
     * setting
     * */
    {
      path: '/setting/setPassword',
      name: '/setPassword',
      component: resolve => require(['@/pages/setting/setPassword'], resolve),
      beforeEnter: (to, from, next) => {
        if(localStorage.getItem('address')){
          next();
        }else{
          next({
            path: '/home',
          })
        }
      },
    },
    {
      path: '/setting/setAlias',
      name: '/setAlias',
      component: resolve => require(['@/pages/setting/setAlias'], resolve),
      beforeEnter: (to, from, next) => {
        if(localStorage.getItem('address')){
          next();
        }else{
          next({
            path: '/home',
          })
        }
      },
    },
    /**
     * 其它
     * others
     * */
    {
      path: '/others/serviceClause',
      name: '/serviceClause',
      component: resolve => require(['@/pages/others/serviceClause'], resolve),
    },
    {
      path: '/others/privacyPolicy',
      name: '/privacyPolicy',
      component: resolve => require(['@/pages/others/privacyPolicy'], resolve),
    },
    {
      path: '/others/help',
      name: '/help',
      component: resolve => require(['@/pages/others/help'], resolve),
    },
    {
      path: '/others/about',
      name: '/about',
      component: resolve => require(['@/pages/others/about'], resolve),
    },
    /**
     * 申请测试币
     * Apply for test currency
     * */
    {
      path: '/testNetNULS/testNetNULS',
      name: '/testNetNULS',
      component: resolve => require(['@/pages/testNetNULS/testNetNULS'], resolve),
    },
    //投票
    {
      path: '/vote/voteList',
      name: '/voteList',
      component: resolve => require(['@/pages/vote/voteList'], resolve),
      meta: {
        keepAlive: true
      },
    },
    {
      path: '/vote/voteHistory',
      name: '/voteHistory',
      component: resolve => require(['@/pages/vote/voteHistory'], resolve),
      meta: {
        keepAlive: true
      },
      beforeEnter: (to, from, next) => {
        if(localStorage.getItem('address')){
          next();
        }else{
          next({
            path: '/home',
          })
        }
      },
    },
    {
      path: '/vote/createVote',
      name: '/createVote',
      component: resolve => require(['@/pages/vote/createVote'], resolve),
      beforeEnter: (to, from, next) => {
        if(localStorage.getItem('address')){
          next();
        }else{
          next({
            path: '/home',
          })
        }
      },
    },
    {
      path: '/vote/voteDetail',
      name: '/voteDetail',
      component: resolve => require(['@/pages/vote/voteDetail'], resolve),
    },
  ]
})
