<template>
  <div class="main-content">
    <div class="center new-wallet">
      <h1 class="h1">{{ $t('message.newWallet') }}</h1>
      <div class="prompt">
        <div class="flex-common"><span class="circle"></span><div>{{ $t('message.newWalletTitle') }}</div></div>
        <div class="flex-common"><span class="circle"></span><div>{{ $t('message.newWalletTitle_1') }}</div></div>
      </div>
      <el-form :model="newWalletForm" :rules="newWalletRules" ref="newWalletForm">
        <el-form-item :label="$t('message.pass')" prop="pass">
          <el-input type="password" v-model.trim="newWalletForm.pass"></el-input>
        </el-form-item>
        <el-form-item :label="$t('message.passTwo')" prop="checkPass">
          <el-input type="password" v-model.trim="newWalletForm.checkPass"></el-input>
        </el-form-item>
        <el-form-item label="" prop="type">
          <el-checkbox-group v-model="newWalletForm.type">
            <el-checkbox :label="$t('message.clauseTitle')" name="type"></el-checkbox>
          </el-checkbox-group>
          <div class="clause">
            <span class="text-href cursor-p"  @click="termsService">{{ $t('message.termsService') }}</span>
            <span class="text-href cursor-p" @click="privacyPolicy">{{ $t('message.privacyPolicy') }}</span>
          </div>
        </el-form-item>
        <el-form-item class="form-bt">
          <el-button type="primary" @click="submitNewWallet('newWalletForm')">{{ $t('message.newWallet') }}</el-button>
          <br/>
          <div class="text-href" @click="importAccount">{{ $t('message.importWallet') }}</div>
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
        } else if (value !== this.newWalletForm.pass) {
          callback(new Error(this.$t('message.passTwoTitle_1')));
        } else {
          callback();
        }
      };

      return {
        /**
        * 表单信息
        * form fields
        * */
        newWalletForm: {
          pass: '',
          checkPass: '',
          type: [],
        },
        /**
         * 表单验证信息
         * Form validation information
         * */
        newWalletRules: {
          pass: [
            {validator: validatePass, trigger: 'blur'}
          ],
          checkPass: [
            {validator: validatePass2, trigger: 'blur'}
          ],
          type: [
            { required: true,type: 'array', message: this.$t('message.clauseTitle_1'), trigger: 'change'}
          ]
        },
        /**
         * 服务条款及隐私条款 默认隐藏
         * The terms of service and privacy clauses are hidden by default.
         * */
        clauseDialog: false
      };
    },
    // components: {Clause},
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
      submitNewWallet(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let _this = this;
            nulsJs.getPriAndPub({"pass": this.newWalletForm.checkPass,"pub":''}, function (data) {
              //console.log(data);
              if (data.success) {
                localStorage.setItem('pubKey', data.data.pub);
                localStorage.setItem('encryptedPrivateKey', data.data.pri);
                localStorage.setItem('addressAlias', 'null');
                _this.$store.commit('setAddressAlias', 'null');
                nulsJs.getAddressByPub({"pub": data.data.pub}, function (data) {
                  //console.log(data);
                  if (data.success) {
                    localStorage.setItem('address', data.data);
                    _this.$store.commit('setAddress', data.data);
                    _this.$router.push({
                      name: '/createWallet',
                      query: {isNew: true},
                    });
                  }else {
                    _this.$message({
                      message: _this.$t('message.failed')+':'+_this.$t('message.'+data.code), type: 'warning', duration: '1000'
                    });
                  }
                })
              }else{
                _this.$message({
                  message: _this.$t('message.failed') +':'+_this.$t('message.'+data.code), type: 'warning', duration: '1000'
                });
              }
            });
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },

      /**
       * 根据公钥获取地址
       * get address by pub
       * @param pub
       **/
      getAddress(pub) {
        let _this = this;
        nulsJs.getAddressByPub({"pub": pub}, function (data) {
          //console.log(data);
          if (data.success) {
            //console.log(data.data);
            _this.$router.push({
              name: '/finishWallet'
            });
          }else{
            _this.$message({
              message: _this.$t('message.failed') +':'+_this.$t('message.'+data.code), type: 'warning', duration: '1000'
            });
          }
        })
      },

      /**
       * 导入钱包跳转
       * To import account
       */
      importAccount() {
        this.$router.push({
          name: '/importKeyFile'
        });
      },
      /**
       * 服务条款
       * Terms of service
       **/
      termsService(){
        this.$router.push({
          name: '/serviceClause'
        });
      },
      /**
       * 隐私政策
       * Privacy policy
       **/
      privacyPolicy(){
        this.$router.push({
          name: '/privacyPolicy'
        });
      }
    }
  }
</script>

<style lang="less" type="text/less">
  @import url("./../../assets/css/style.less");

  .new-wallet {
    clear: both;
    font-size: @font-size-14;
    margin-top: 100px;
    h1 {
      margin-bottom: 40px;
      font-size: @font-size-20;
    }
    .prompt {
      max-width: 526px;
      margin: auto;
      background-color: @bg-blue2-color;
      padding: 12px 34px;
      color: @c-color;
      div:first-child {
        margin-bottom: 6px;
      }
      div {
        align-items: start;
        justify-content: start;
        .circle {
          display: inline-block;
          width: 3px;
          height: 3px;
          border: 1px solid @c-color;
          border-radius: 50%;
          margin: 8px;
        }
      }
    }
    @media screen and (max-width: 768px) {
      .prompt{
        padding: 12px 0;
      }
    }
    .el-form {
      max-width: 500px;
      margin: auto;
      .el-form-item {
        margin-bottom: 10px;
        .el-form-item__label {
          margin-top: 24px;
          margin-bottom: 6px;
          font-size: @font-size-14;
          text-align: left;
        }
        .el-form-item__content {
          line-height: 0;
          margin-top: 10px;
        }
      }
      .el-form-item:nth-child(2) {
        .el-form-item__label {
          margin-top: 16px;
        }
      }
      .el-form-item:nth-child(3) {
        margin-top: 10px;
        .el-form-item__content {
          .el-checkbox-group {
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
