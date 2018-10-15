<template>
  <div class="main-content">
    <div class="center make-collections">
      <BackBar :backTitle="$t('message.account')"></BackBar>
      <h3 class="h3">NULS {{ $t('message.makeCollectionsTitle') }}</h3>
      <div class="address-div">
        <h3 class="h3">{{ $t('message.makeCollectionsAddress') }}<span>{{this.address}}</span><i @click="accountCopy(address)" class="icon-copy iconfont iconfont-common-white cursor-p">&#xe60f;</i></h3>
        <div class="account-ipt flex-common">
          <div>{{ $t('message.makeCollectionsMoney') }}</div>
          <!--<el-input v-model="sum" @change="changeSum"></el-input>-->
          <el-input v-model="sum"  @keyup.native="changeSum"></el-input>
        </div>
      </div>
      <div class="qr-code"></div>
      <div class="bt-bottom">
       <!-- <el-button type="primary" class="finish-btn">完成备份</el-button>-->
        <div class="tips">{{ $t('message.makeCollectionsTips') }}</div>
      </div>
    </div>
  </div>
</template>
<script>
  import "../../assets/js/jquery-1.8.2"
  import '../../assets/js/jquery.qrcode.min'
  import {copys} from './../../utils/util'
  import BackBar from './../../components/BackBar'
  export default {
    data(){
      return{
        address: localStorage.getItem('address'),
        sum:'',
      }
    },
    methods: {
      /**
       * 生成二維碼
       * Generate two-dimensional code
       */
      codeMaker(codeInfo){
        $('.qr-code').html("");
        $('.qr-code').qrcode({
          render: "canvas",
          // width: 256,
          // height: 256,
          text: codeInfo,
          typeNumber: -1,
          correctLevel: 2,
          background: "#fff",
          foreground: "#000"
        });
      },

      /**
       * 输入金额重新生成二维码
       * Input amount to regenerate two-dimensional code
       */
      changeSum(){
        let codeInfo = this.address+this.sum;
        this.codeMaker(codeInfo)
      },

      /**
       * 复制方法
       * copy
       **/
      accountCopy(info) {
        copys(info);
        this.$message({
          message: this.$t('message.copyS'), type: 'success', duration: '1000'
        });
      },

    },
    components: {
      BackBar
    },
    created(){
      this.$nextTick(function(){
        let codeInfo = this.address+","+this.sum;
        this.codeMaker(codeInfo)
      })
    },
  }
</script>
<style lang="less" type="text/less">
  @import url("./../../assets/css/style.less");
  .make-collections{
    text-align: center;
    margin-top:30px;
    .address-div{
      width:500px;
      margin:0 auto;
      text-align: left;
    }
    h3{
      font-size: @font-size-18;
      margin-bottom:20px;
    }
    h3:nth-child(1){
      margin-top:40px;
    }
    .h3{
      margin-bottom:20px;
      span{
        color:@c-font-yellow1-color;
        padding-right:10px;
      }
      .icon-copy{
        vertical-align: baseline;
      }
    }
    .account-ipt{
      justify-content: start;
      align-items: center;
      div{
        font-size: @font-size-18;
      }
      .el-input{
        width:400px;
      }
    }
    .qr-code{
      width:276px;
      margin:50px auto;
      background:#fff;
      padding:10px;
    }
    .bt-bottom{
      .el-button--primary{
        width:@bt-width*2.5;
        margin-bottom: 10px;
      }
      .el-button{
        width:@bt-width*2.5;
      }
      .finish-btn{
        border:1px solid @bt-color
      }
      .tips{
        color:@c-font-gray-color;
        font-size: @font-size-16;
      }
    }
  }
</style>
