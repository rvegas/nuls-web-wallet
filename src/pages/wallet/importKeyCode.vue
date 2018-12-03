<template>
  <div class="main-content">
    <div class="center import-key-code" v-loading="loading">
      <h1 class="h1">{{ $t('message.importKeyCode') }}</h1>
      <el-form :model="importKeyForm" :rules="importKeyRules" ref="importKeyForm">
        <el-form-item :label="$t('message.importKeyCodeLabel1')" prop="keyInfo">
          <el-input type="textarea" v-model.trim="importKeyForm.keyInfo"
                    onkeyup="this.value=this.value.replace(/[^a-zA-Z0-9\w]/g,'')"></el-input>
        </el-form-item>
        <el-form-item :label="$t('message.pass')" prop="pass">
          <el-input type="password" v-model="importKeyForm.pass"></el-input>
        </el-form-item>
        <el-form-item :label="$t('message.passTwo')" prop="checkPass">
          <el-input type="password" v-model="importKeyForm.checkPass"></el-input>
        </el-form-item>
        <el-form-item label="" prop="type">
          <el-checkbox-group v-model="importKeyForm.type">
            <el-checkbox :label="$t('message.clauseTitle')" name="type"></el-checkbox>
          </el-checkbox-group>
          <div class="clause">
            <span class="text-href cursor-p" @click="termsService">{{ $t('message.termsService') }}</span>
            <span class="text-href cursor-p" @click="privacyPolicy">{{ $t('message.privacyPolicy') }}</span>
          </div>
        </el-form-item>
        <el-form-item class="form-bt">
          <el-button type="primary" @click="importKey('importKeyForm')">{{ $t('message.importWallet') }}</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
  import {password} from '@/utils/validate'
  import nulsJs from 'nuls-jssdk'

  export default {
    data() {
      let validatekeyInfo = (rule, value, callback) => {
        if (!value) {
          callback(new Error(this.$t('message.keyCodeErrorTips1')));
        } else {
          callback();
        }
      };
      let validatePass = (rule, value, callback) => {
        if (!value) {
          callback(new Error(this.$t('message.passTitle')));
        } else if (!password(value)) {
          callback(new Error(this.$t('message.passTitle_1')));
        } else {
          callback();
        }
      };
      let validatePass2 = (rule, value, callback) => {
        if (!value) {
          callback(new Error(this.$t('message.passTwoTitle')));
        } else if (value !== this.importKeyForm.pass) {
          callback(new Error(this.$t('message.passTwoTitle_1')));
        } else {
          callback();
        }
      };

      return {
        /**
         * 导入私钥信息
         * form fields
         * */
        importKeyForm: {
          keyInfo: '',
          pass: '',
          checkPass: '',
          type: [],
        },
        /**
         * 表单验证信息
         * Form validation information
         * */
        importKeyRules: {
          keyInfo: [
            {validator: validatekeyInfo, trigger: 'blur'}
          ],
          pass: [
            {validator: validatePass, trigger: 'blur'}
          ],
          checkPass: [
            {validator: validatePass2, trigger: 'blur'}
          ],
          type: [
            {required: true, type: 'array', message: this.$t('message.clauseTitle_1'), trigger: 'change'}
          ]
        },
        /**
        * 服务条款及隐私条款 默认隐藏
        * The terms of service and privacy clauses are hidden by default.
        * */
        clauseDialog: false,
        loading: false,
      };
    },
    methods: {

      /**
       *显示服务条款
       * show privacy
       **/
      showClause() {
        this.clauseDialog = true
      },
      /**
       * 创建钱包提交
       * Create wallet submit
       * @param formName
       */
      importKey(formName) {
        let _this = this;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            _this.loading=true;
            const params = {"pri": _this.importKeyForm.keyInfo, "types": false, "pass": _this.importKeyForm.pass,"pub":''};
            //console.log(params);
            nulsJs.importWallet(params, function (data) {
              //console.log(data);
              if (data.success) {
                _this.loading=false;
                localStorage.setItem('pubKey', data.data.pub);
                localStorage.setItem("address", data.data.address);
                _this.$store.commit('setAddress', data.data.address);
                localStorage.setItem("encryptedPrivateKey", data.data.pri);
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
              }
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      /**
       * 服务条款
       * Terms of service
       **/
      termsService() {
        this.$router.push({
          name: '/serviceClause'
        });
      },
      /**
       * 隐私政策
       * Privacy policy
       **/
      privacyPolicy() {
        this.$router.push({
          name: '/privacyPolicy'
        });
      }
    }
  }
</script>
<style lang="less" type="text/less">
  @import url("./../../assets/css/style.less");

  .import-key-code {
    clear: both;
    font-size: @font-size-14;
    margin-top: 100px;
    h1 {
      margin-bottom: 40px;
      font-size: @font-size-20;
      @media (max-width: 768px) {
        margin: 1.5rem 0;
      }
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
      max-width: 500px;
      margin: auto;
      .el-form-item {
        margin-bottom: 0;
        .el-form-item__label {
          margin-top: 24px;
          margin-bottom: 6px;
          font-size: @font-size-14;
          text-align: left;
        }
        .el-form-item__content {
          line-height: 0;
        }
      }
      .el-form-item:nth-child(1) {
        margin-top: 10px;
        .el-form-item__content {
          .el-textarea {
            .el-textarea__inner {
              height: 100px;
            }
          }
        }
      }
      .el-form-item:nth-child(3) {
        .el-form-item__label {
          margin-top: 18px;
        }
      }
      .el-form-item:nth-child(4) {
        margin-top: 16px;
        .el-form-item__content {
          .el-checkbox-group {
            .el-checkbox {
              color: @c-color;
              .el-checkbox__input{

              }
            }
          }
          div {
            display: inline-block;
          }
          .clause {
            width: auto;
            /*height:9px;*/
            color: @c-font-blue1-color;
            line-height: 0;
            position: initial;
            margin-top: 0;
            margin-left: 0;
            @media (max-width: 768px) {
              line-height: 1.5rem;
            }
          }
        }
      }
      .form-bt {
        text-align: center;
        margin-top: 48px;
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
