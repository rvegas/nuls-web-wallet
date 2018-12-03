<template>
  <div class="bottom">
    <div class="footer">
      <div class="footer-left">
        <!--<p class="footer-left1"><i class="icon-bottom icon-common"></i></p>-->
        <p class="footer-left1"><img src="../assets/images/logo.svg"/></p>
        <p class="footer-left2">
          <span>{{ $t('message.nodeAddress') }}</span><span @click="toServiceAddress" class="cursor-p text-d">{{nodeAddress}}&nbsp;</span>
          <span style="display:none">{{ $t('message.delay') }}{{this.delay}} MS</span>
          <span>{{ $t('message.height') }}{{this.heightInfo.height}}</span>
          <span>{{ $t('message.outTime') }}{{this.heightInfo.createTime}}</span>
        </p>
        <p class="footer-left3">
          <!-- <span>{{ $t('message.nowHeightInof') }}:</span>-->
          <!--<span>{{ $t('message.transactionNumber') }}：{{this.heightInfo.txCount}}</span>-->
          <!--<span>{{ $t('message.profit') }}：{{this.heightInfo.reward}} NULS</span>-->
          <!--<span-->
            <!--:title=heightInfo.consensusAddress>{{ $t('message.outName') }}：{{this.heightInfo.consensusAddresss}} </span>-->
        </p>
      </div>
      <div class="footer-right">
        <div class="cursor-p height-footer">{{ $t('message.height') }}{{this.heightInfo.height}}</div>
        <div class="cursor-p" @click="termsService">{{ $t('message.termsService') }}</div>
        <div class="cursor-p" @click="privacyPolicy">{{ $t('message.privacyPolicy') }}</div>
        <div class="cursor-p" @click="about">{{ $t('message.about') }}</div>
      </div>
    </div>
  </div>
</template>

<script>
  import moment from 'moment'
  import nulsJs from 'nuls-jssdk'
  import {LeftShiftEight} from './../utils/util'

  export default {
    name: "bottom-bar",
    data() {
      return {
        delay: 0,
        heightInfo: [],
      };
    },
    computed: {
      nodeAddress() {
        return this.$store.getters.getNodeAddress ? this.$store.getters.getNodeAddress : 'https://apiserver.nuls.io'
        // return this.$store.getters.getNodeAddress ? this.$store.getters.getNodeAddress : 'http://testnet.apiserver.nuls.io'
      }
    },
    created() {
      if (localStorage.getItem('nodeAddress')) {
        this.$store.commit('refresh', localStorage.getItem('nodeAddress'))
      }
      this.setResetUrl();
      //this.getHeightInfo();
    },

    mounted() {
      let time1 = new Date().getTime();
      setInterval(() => {
        this.getHeightInfo();
        this.delay = parseInt((new Date().getTime() - time1)/1000);
        this.$store.commit('setDelay', this.delay);
        localStorage.setItem("delay",this.delay);
        time1 = new Date().getTime();
        this.$store.commit('setHeightFlg', "1");
      }, 10000);
    },
    methods: {

      /**
       * 获取高度信息
       * Get height info
       */
      getHeightInfo() {
        let _this = this;
        nulsJs.getBlockBesthashDetail(function (data) {
          //console.log(data);
          if (data.success) {
            _this.heightInfo = data.data;
            _this.heightInfo.createTime = moment(data.data.createTime).format('YYYY-MM-DD HH:mm:ss');
            _this.heightInfo.reward = LeftShiftEight(data.data.reward).toString();
            _this.heightInfo.consensusAddresss = data.data.consensusAddress.substr(0, 4) + '...' + data.data.consensusAddress.substr(data.data.consensusAddress.length - 4, 4);
            sessionStorage.setItem("nodeError","1")
          } else {
            sessionStorage.setItem("nodeError","0");
            if(_this.$store.getters.getHeightFlg==='0'){
              if (sessionStorage.getItem('nodeError') === '0') {
                _this.$message({
                  message: _this.$t('message.nodeError'), type: 'warning', duration: '1000'
                });
              }else{
                _this.$message({
                  message: _this.$t('message.failed') +':'+_this.$t('message.'+data.code), type: 'warning', duration: '1000'
                });
              }
            }
          }
        })
      },

      setResetUrl() {
        let _this = this;
        let params = {"url": this.nodeAddress};
        //console.log(params);
        nulsJs.resetUrl(params, function (data) {
          //console.log(data);
          if (data.success) {
            _this.getHeightInfo();
          } else {
            _this.$message({
              message: _this.$t('message.failed') +':'+_this.$t('message.'+data.code), type: 'warning', duration: '1000'
            });
          }
        });
      },

      /**
       * 修改节点地址列表
       **/
      toServiceAddress() {
        this.$store.commit('setActiveNav', '');
        sessionStorage.setItem("activeNav", '');
        this.$router.push({
          name: '/serviceAddressList'
        });
      },
      /**
       * 服务条款
       **/
      termsService() {
        this.$router.push({
          name: '/serviceClause'
        });
      },
      /**
       * 隐私政策
       **/
      privacyPolicy() {
        this.$router.push({
          name: '/privacyPolicy'
        });
      },
      /**
       * 关于
       **/
      about() {
        this.$router.push({
          name: '/about'
        });
      }
    }
  }
</script>

<style lang="less" type="text/less">
  @import url("./../assets/css/style.less");

  .bottom {
    background-color: @h-bg-color;
    position: fixed;
    bottom: 0;
    width: 100%;
    z-index: 2;
    .footer {
      font-size: @font-size-14;
      max-width: @width;
      margin: auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .footer-left {
        text-align: left;
        .footer-left1 {
          margin-top: 5px;
          margin-bottom: 1px;
          img{
            width: 70px;
            //height: 29px;
          }
          .icon-bottom {
            width: 71px;
            height: 29px;
            background-position: -3px -179px;
            cursor: initial;
          }
        }
        .footer-left2 {
          /*span {*/
            /*max-width: 100px;*/
          /*}*/
          .height-footer{
            display:none;
          }
          span:nth-child(4){
            padding-left:15px;
          }
          span:nth-child(5){
            padding-left:15px;
          }
        }
        p {
          margin-bottom: 6px;
        }
      }
      .footer-right {
        display: flex;
        justify-content: right;
        align-items: center;
        .height-footer{
          display:none;
        }
        div {
          border-left: @border4;
          padding: 0 18px 0;
          &:hover{
            color: @c-select-font-hover;
           /* background-color: @bg-h-color;*/
          }
        }
        div:first-child {
          border-left: none;
          padding-left: 0;
        }
        div:last-child {
          padding-right: 0;
        }
      }
    }
    @media screen and (max-width: 825px) {
      .footer {
        display: block;
      }
    }
  }
  @media screen and (max-width: 768px){
    .bottom{
      padding:10px 0;
      .footer{
        .footer-left1,.footer-left2{
          display:none;
        }
        .footer-right{
          justify-content: center!important;
          .height-footer{
            display:block;
          }
          div{
            padding:0 0.25rem;
          }
        }
      }
    }
  }
</style>
