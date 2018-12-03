<template>
  <div class="main-content">
    <div class="center import-file-wallet" v-loading="loading">
      <h2>{{ $t('message.importWallet') }}</h2>
      <el-form>
        <div class="import-keystore" @click="importKeystore">
          <input type="file" id="fileId" class="hidden">
          <div class="upload-text1">{{ $t('message.importKeyFile1') }}Keystore</div>
          <div class="upload-text2">
            <div class="text-href">{{ $t('message.importKeyFile2') }}</div>
            <div class="text-href">{{ $t('message.importKeyFile3') }}</div>
          </div>
        </div>
        <el-form-item class="form-bt">
          <div class="text-href" @click="importKeyCode">{{ $t('message.importKeyCode') }}</div>
        </el-form-item>
      </el-form>
    </div>
    <PasswordTwo ref="passTwo" @toSubmit="toSubmit"></PasswordTwo>
    <Password ref="password" @toSubmit="toSubmit"></Password>
  </div>
</template>
<script>
  import Password from '@/components/PasswordBar.vue'
  import {password} from '@/utils/validate'
  import nulsJs from 'nuls-jssdk'
  import PasswordTwo from '@/components/PasswordTwoBar.vue'
  import {versions} from '@/utils/util'
  export default {
    data() {
      let validatePass = (rule, value, callback) => {
        if (!value) {
          callback(new Error(this.$t('message.passTitle')));
        } else if (!password(value)) {
          callback(new Error(this.$t('message.passTitle_1')));
        } else {
          callback();
        }
      };
      return {
        /**
         * 导入文件信息
         * Import file information
         **/
        keystoreInfo: '',
        /**
        * 是否有密码
        * Whether the password
        * */
        encryptedPri: true,
        loading: false,

      };
    },
    components: {
      Password,
      PasswordTwo,
    },
    methods: {
      /**
       * 导入 keystore
       * import keystore
       **/
      importKeystore() {
        let mobileVersions = versions();
        let _this = this;
        if(!mobileVersions.mobileVersions){
          let obj = document.getElementById("fileId");
          obj.click();
          obj.value='';
          obj.onchange = function () {
            if (this.value !== '') {
              let file = obj.files[0];
              let suffixName = file.name.toLowerCase().split('.').splice(-1);
              if (suffixName[0] === 'keystore') {
                _this.readFiles(obj);
                /**
                 * 延迟执行缓存数据
                 * Delayed execution of cached data
                 **/
                setTimeout(() => {
                  if (_this.keystoreInfo !== '') {
                    //console.log(JSON.parse(_this.keystoreInfo));
                    let keyInfo = JSON.parse(_this.keystoreInfo);
                    // if(!_this.encryptedPri){
                    //   _this.encryptedPri = false;
                    // }else{
                    //   _this.encryptedPri = keyInfo.encryptedPrivateKey.length > 10 ? true : false;
                    // }

                    if(keyInfo.encryptedPrivateKey === 'null' || keyInfo.encryptedPrivateKey === null){
                      _this.$refs.passTwo.showPasswordTwo(true);
                    }else{
                      _this.$refs.password.showPassword(true);
                    }
                  } else {
                    _this.$message({
                      type: 'warning', message: _this.$t('message.importKeyErrorTips1'), duration: '2000'
                    })
                  }
                }, 500)
              } else {
                _this.$message({
                  type: 'warning', message: _this.$t('message.importKeyFile3'), duration: '2000'
                })
              }
            } else {
              _this.$message({
                type: 'warning', message: _this.$t('message.importKeyErrorTips2'), duration: '2000'
              })
            }
          }
        }else{
          _this.$message({
            message: _this.$t('message.mobileVersionsTip'), type: 'warning', duration: '1000'
          });
        }

      },

      /**
       * 读取keystore文件内容
       * read keystore files info
       * @param files
       **/
      readFiles(files) {
        let _this = this;
        /**
         * 支持chrome IE10
         * Support Chrome IE10
         **/
        if (window.FileReader) {
          let file = files.files[0];
          //let filename = file.name.split(".")[0];
          let reader = new FileReader();
          reader.onload = function () {
            _this.keystoreInfo = this.result;
            //console.log(_this.keystoreInfo)
          };
          reader.readAsText(file);
        }
        /**
         * 支持chrome IE10
         * Support IE 7 8 9 10
         **/
        else if (typeof window.ActiveXObject !== 'undefined') {
          let xmlDoc;
          xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
          xmlDoc.async = false;
          xmlDoc.load(files.value);
          _this.keystoreInfo = xmlDoc.xml;
        }
        /**
         * 支持FF
         * Support FF
         **/
        else if (document.implementation && document.implementation.createDocument) {
          let xmlDoc;
          xmlDoc = document.implementation.createDocument("", "", null);
          xmlDoc.async = false;
          xmlDoc.load(files.value);
          _this.keystoreInfo = xmlDoc.xml;
        } else {
          alert('error');
        }
      },

      /**
       * 获取密码提交请求
       * get password submit
       **/
      toSubmit(password) {
        let _this = this;
        _this.loading=true;
        let keyInfo = JSON.parse(this.keystoreInfo);
        let pri
        let priBoolean;
        if(keyInfo.encryptedPrivateKey === 'null' || keyInfo.encryptedPrivateKey === null){
          pri = keyInfo.prikey;
          priBoolean = false;
        }else{
          pri = keyInfo.encryptedPrivateKey;
          priBoolean = true;
        }
        //let pri = keyInfo.encryptedPrivateKey.length > 10 ? keyInfo.encryptedPrivateKey : keyInfo.prikey;
        //let priBoolean = keyInfo.encryptedPrivateKey.length > 10 ? true : false;
        let params = {"pri": pri, "types": priBoolean, "pass": password,"pub":keyInfo.pubKey};
        //console.log(params);
        nulsJs.importWallet(params, function (data) {
          //console.log(data);
          if (data.success) {
            _this.loading=false;
            localStorage.setItem("address", data.data.address);
            _this.$store.commit('setAddress', data.data.address);
            localStorage.setItem("encryptedPrivateKey", data.data.pri);
            localStorage.setItem('pubKey', data.data.pub);
            localStorage.setItem('addressAlias', data.data.alias);
            _this.$store.commit('setAddressAlias', data.data.alias);
            _this.$store.commit('setActiveNav', '1');
            localStorage.setItem("activeNav", '1');
            _this.$router.push({
              name: '/account',
            })
          } else {
            _this.loading=false;
            _this.$message({
              message: _this.$t('message.failed') +':'+_this.$t('message.'+data.code), type: 'warning', duration: '1000'
            });
            document.getElementById("fileId").value = '';
          }
        })
      },

      /**
       * 导入私钥
       * import key
       */
      importKeyCode() {
        this.$router.push({
          name: '/importKeyCode'
        });
      },
    },
  }
</script>

<style lang="less" type="text/less">
  @import url("./../../assets/css/style.less");

  .import-file-wallet {
    clear: both;
    font-size: @font-size-14;
    margin-top: 70px;
    h2 {
      margin-bottom: 57px;
      font-size: @font-size-20;
      text-align: center;
    }
    .prompt {
      width: 472px;
      margin: auto;
      background-color: @bg-blue2-color;
      padding: 12px 34px;
      color: @c-color;
      p:first-child {
        margin-bottom: 6px;
      }
      p {
        .circle {
          display: inline-block;
          width: 3px;
          height: 3px;
          border: 1px solid @c-color;
          border-radius: 50%;
          margin: 2px 8px;
        }
      }
    }
    .el-form {
      max-width: 430px;
      margin: auto;
      .import-keystore {
        max-width: 287px;
        margin: 0 auto 18px;
        border: @border2;
        background: @bg-1-color;
        padding: 87px 50px 110px;
        text-align: center;
        &:hover {
          cursor: pointer;
          border: @border1;
        }
        .el-upload--text {
          .upload-text1 {
            font-size: @font-size-18;
            margin-bottom: 44px;
          }
          .upload-text2 {
            font-size: @font-size-16;
            div:nth-child(1) {
              margin-bottom: 5px;
            }
          }
        }
      }
      .el-form-item {
        margin-bottom: 0;
        .el-form-item__label {
          margin-top: 24px;
          margin-bottom: 6px;
          font-size: @font-size-14;
        }
        .el-form-item__content {
          line-height: 0;
        }
      }
      .el-form-item:nth-child(2) {
        .el-form-item__label {
          margin-top: 16px;
        }
      }
      .el-form-item:nth-child(3) {
        margin-top: 14px;
        .el-form-item__content {
          .el-checkbox-group {
          }
          div {
            display: inline-block;
          }
          .clause {
            width: auto;
            color: @c-font-blue1-color;
            line-height: 0;
            position: initial;
            margin-top: 0;
            margin-left: 0;
          }
        }
      }
      .form-bt {
        text-align: center;
        margin-top: 25px;
        .el-form-item__content {
          .el-button--primary {
            width: @bt-width*2.5;
            margin-bottom: 14px;
          }
        }
        .text-href {
          margin: 10px 0 0;
        }
      }
    }
  }

</style>


