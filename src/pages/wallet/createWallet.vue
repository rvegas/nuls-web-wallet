<template>
  <div class="main-content">
    <div class="center create-account">
      <h3 class="h3" v-show="this.$route.query.isNew===true">{{ $t('message.createWalletTitle1') }}</h3>
      <h3 class="h3">
        <span>{{ $t('message.createWalletTitle2') }}</span>
        <span class="address-box">
          <span>{{this.address}}</span>
          <i class="icon-copy iconfont iconfont-common-white cursor-p" @click="accountCopy(address)">&#xe60f;</i>
        </span>
      </h3>
      <div class="backups cursor-p" @click="keystoreBackups" v-show="!this.mobileVersions.mobileVersions">
        <h4>Keystore{{ $t('message.createWalletBackups') }}</h4>
        <p class="backups-text1 text-href">{{ $t('message.createWalletDownload1') }}.keystore{{
          $t('message.createWalletDownload2') }}</p>
        <p class="backups-text2 text-href">{{ $t('message.createWalletDownload3') }}</p>
      </div>
      <div class="text-href web-backups" @click="keyBackups">{{ $t('message.createWalletBackupsKey') }}</div>
      <div class="bt-bottom">
        <el-button type="primary" @click="keyBackups" class="mobile-backups">{{$t('message.createWalletBackupsKey')}}</el-button>
        <el-button type="primary" @click="finishBackupsVisible = true" class="finish-btn">{{
          $t('message.createWalletBtn1') }}
        </el-button>
        <br/>
        <el-button class="sure-btn" @click="finishBackups">{{ $t('message.createWalletBtn2') }}</el-button>
      </div>
      <el-dialog title="" :visible.sync="keyDialogVisible" width="55%" center class="key-wrapper">
        <div class="key-dialog">
          <h1>{{ $t('message.createWalletDialog1') }}</h1>
          <div class="warn-text">
            <p>{{ $t('message.createWalletDialog2') }}</p>
            <p>{{ $t('message.createWalletDialog3') }}</p>
            <p>{{ $t('message.createWalletDialog4') }}</p>
          </div>
          <div class="key-info">{{this.inputKey}}</div>
          <div class="btn-copy">
            <el-button type="primary" @click="accountCopy(inputKey)" :type="keyBackupsFlg ? '':'primary'">{{ $t('message.copy') }}</el-button>
            <el-button @click="finishBackupsVisible = true" class="finish-btn-mobile" :type="keyBackupsFlg ? 'primary':''">{{ $t('message.createWalletBtn1') }}</el-button>
          </div>
        </div>
      </el-dialog>
      <el-dialog title="" :visible.sync="finishBackupsVisible" center class="finish-wrapper">
        <div class="finish-dialog">
          <h1>{{ $t('message.tip') }}</h1>
          <div class="tips">{{ $t('message.createWalletDialog5') }}</div>
          <div slot="footer" class="dialog-footer">
            <el-button @click="finishBackupsVisible = false">{{ $t('message.createWalletDialog6') }}</el-button>
            <el-button type="primary" @click="finishBackups">{{ $t('message.createWalletDialog7') }}</el-button>
          </div>
        </div>
      </el-dialog>

      <Password ref="password" @toSubmit="toSubmit"></Password>
    </div>
  </div>
</template>
<script>
  import Password from '@/components/PasswordBar.vue'
  import nulsJs from 'nuls-jssdk'
  import {copys,versions} from '@/utils/util'

  export default {
    data() {
      return {
        keyDialogVisible: false,
        address: localStorage.getItem('address'),
        inputKey: '',
        finishBackupsVisible: false,
        mobileVersions: true,
        //手机打开时，点击复制的标志
        keyBackupsFlg: false,
      }
    },
    components: {
      Password,
    },
    mounted(){
      this.mobileVersions=versions();
     // console.log(this.mobileVersions.mobileVersions)
    },
    methods: {

      /**
       * 备份keystore
       * Backups keystore
       **/
      keystoreBackups() {
        let mobileVersions=versions();
        let _this = this;
        if(!this.mobileVersions.mobileVersions){
          nulsJs.getAlias({"address": localStorage.getItem('address')}, function (data) {
            //console.log(data);
            if (data.success) {
              localStorage.setItem('addressAlias', data.data.alias);
              _this.$store.commit('setAddressAlias', data.data.alias);
              let keystoreInfo = '{"address":"' + localStorage.getItem("address") +
                '","encryptedPrivateKey":"' + localStorage.getItem("encryptedPrivateKey") +
                '","alias":' + data.data.alias +
                ',"pubKey":"' + localStorage.getItem("pubKey") +
                '","prikey":"null"}';
              let keystoreName = localStorage.getItem("address") + ".keystore";
              _this.keystoreFiles(keystoreInfo, keystoreName);
            }else{
              _this.$message({
                message: _this.$t('message.failed') +':'+_this.$t('message.'+data.code), type: 'warning', duration: '1000'
              });
            }
          });
        }else{
          _this.$message({
            message: _this.$t('message.mobileVersionsTip'), type: 'warning', duration: '1000'
          });
        }
      },

      /**
       * 文件下载方法
       * Download files
       **/
      keystoreFiles(content, filename) {
        let eleLink = document.createElement('a');
        eleLink.download = filename;
        eleLink.style.display = 'none';
        /**
         * 字符内容转变成blob地址
         * Character content converted to blob address
         **/
        let blob = new Blob([content]);
        eleLink.href = URL.createObjectURL(blob);
        /**
         * 触发点击
         * Trigger Click
         **/
        document.body.appendChild(eleLink);
        eleLink.click();
        /**
         * 然后移除
         * And then remove it
         **/
        document.body.removeChild(eleLink);
      },

      /**
       * 私钥备份
       * Backups key
       **/
      keyBackups() {
        this.$refs.password.showPassword(true);
      },

      /**
       * 获取密码提交请求
       * get password submit
       **/
      toSubmit(password) {
        let _this = this;
        let params = {"pri": localStorage.getItem('encryptedPrivateKey'), "pass": password,"pub":localStorage.getItem('pubKey')};
        //console.log(params);
        nulsJs.decodePri(params, function (data) {
          //console.log(data);
          if (data.success) {
            _this.inputKey = data.data.pri;
            _this.keyDialogVisible = true;
          }else {
            _this.$message({
              message: _this.$t('message.failed') +':'+_this.$t('message.'+data.code), type: 'warning', duration: '1000'
            });
          }
        });
      },

      /**
       * 复制方法
       * copy
       **/
      accountCopy(info) {
        this.keyBackupsFlg=true;
        copys(info);
        this.$message({
          message: this.$t('message.copyS'), type: 'success', duration: '1000'
        });
      },

      /**
       * 完成备份
       * Complete the backup
       */
      finishBackups() {
        this.$store.commit('setActiveNav', '1');
        sessionStorage.setItem("activeNav", '1');
        this.$router.push({
          name: '/account'
        });
      }
    }
  }
</script>
<style lang="less" type="text/less">
  @import url("./../../assets/css/style.less");

  .create-account {
    text-align: center;
    margin-top: 100px;
    h3 {
      font-size: @font-size-20;
      margin-bottom: 20px;
    }
    h3:nth-child(2) {
      margin-bottom: 72px;
      .address-box{
        span {
          color: @c-font-yellow1-color;
          padding-right: 10px;
        }
        .icon-copy {
          height: 18px;
          background-position: -176px -60px;
        }
      }
    }
    .backups {
      width: 284px;
      margin: 0 auto 18px;
      border: @border2;
      background: @bg-1-color;
      padding: 87px 50px 110px;
      text-align: center;
      &:hover {
        cursor: pointer;
        border: @border1;
      }
      h4 {
        font-size: @font-size-18;
        margin-bottom: 44px;
      }
      p {
        font-size: @font-size-16;
        color: @c-color;
      }
      .backups-text1 {
        margin-bottom: 5px;
      }
    }
    .bt-bottom {
      .mobile-backups{
        display:none;
      }
      .el-button--primary {
        width: @bt-width*2.5;
        margin-top: 48px;
        margin-bottom: 10px;
      }
      .el-button {
        width: @bt-width*2.5;
        margin-left:0;
      }
      .sure-btn {
        margin-left: -4px;
        border-radius: 0;
      }
    }
    .el-dialog__wrapper {
      .el-dialog--center {
        padding: 40px 56px;
        max-width: 665px;
        min-width: 320px;
        .el-dialog__header {
          /*display: none;*/
        }
        .el-dialog__body {
          padding:0;
          .key-dialog {
            h1 {
              font-size: @font-size-18;
              margin-bottom: 24px;
              text-align: center;
            }
            .warn-text {
              font-size: @font-size-16;
              p {
                margin-bottom: 8px;
              }
            }
            .key-info {
              border: 1px solid @bd-color;
              /*height: 34px;*/
              /*line-height: 34px;*/
              margin-top: 16px;
              margin-bottom: 40px;
              padding: 12px;
              word-wrap: break-word;
            }
            .btn-copy {
              text-align: center;
              .el-button {
                width: @bt-width*2.5;
              }
            }
            .finish-btn-mobile{
              display:none;
            }
            @media screen and (max-width: 768px) {
              .btn-copy {
                .el-button {
                  width: @bt-width*2;
                }
              }
            }
          }
        }
      }
    }
    .el-dialog__wrapper.finish-wrapper {
      .el-dialog--center {
        padding: 40px 0;
        max-width: 460px;
        min-width:320px;
        .el-dialog__header {
          display: none;
        }
        .el-dialog__body {
          text-align: center;
          .finish-dialog {
            h1 {
              font-size: @font-size-18;
              margin-bottom: 24px;
            }
            .tips {
              margin-bottom: 35px;
              font-size: @font-size-16;
            }
            .dialog-footer {
              .el-button {
                span {
                  font-size: @font-size;
                }
              }
              .el-button:first-child {
                margin-right: 56px;
              }
              @media screen and (max-width: 810px){
                .el-button:first-child {
                  margin-right: 0;
                }
              }
            }
          }
        }
      }
    }
    @media screen and (max-width: 768px) {
      h3:nth-child(2) {
        .address-box{
          display:block;
          span {
            font-size: @font-size-14;
            padding-right: 10px;
          }
        }
      }
      .web-backups{
        display:none;
      }
      .bt-bottom{
        .mobile-backups{
          display:inline-block;
        }
        .finish-btn{
          display:none;
        }
      }
      .key-wrapper{
        .el-dialog--center{
          padding:20px 10px;
          .el-dialog__header{
            display:none;
          }
          .el-dialog__body{
            .key-dialog{
              .el-button{
                margin-bottom:10px;
              }
              .finish-btn-mobile{
                display:inline-block;
                margin-left:0;
              }
            }
          }
        }
      }
    }
  }
</style>
