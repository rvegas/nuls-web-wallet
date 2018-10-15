<template>
  <div class="main-content" v-loading="loading">
    <div class="center set-alias">
      <h1 class="h1">{{$t('message.type3')}}</h1>
      <div class="prompt">
        <div class="flex-common">
          <span class="circle"></span>
          <div>{{$t('message.setAlias1')}}</div>
        </div>
        <div class="flex-common">
          <span class="circle"></span>
          <div>{{$t('message.setAlias2')}}</div>
        </div>
      </div>
      <el-form :model="setAliasForm" :rules="setAliasRules" ref="setAliasForm" @submit.native.prevent>
        <div class="address">
          <div>{{$t('message.index3')}}:</div>
          <div>{{this.address}}</div>
        </div>
        <el-form-item :label="$t('message.setAlias3')" prop="alias">
          <div class="balance">{{$t('message.myConsensus5')}}：{{this.addressUsable}} NULS</div>
          <el-input type="text" v-model="setAliasForm.alias" :placeholder="$t('message.setAlias4')" :maxlength="20"
                    onkeyup="this.value=this.value.replace(/[^a-zA-Z0-9\w]/g,'')"
                    @mouseout.native="setAliasForm.alias=setAliasForm.alias.replace(/[^a-zA-Z0-9\w]/g,'')"
                    @change="getSetAliasFee"></el-input>
          <div class="text-length">{{setAliasForm.alias?setAliasForm.alias.length:0}}/20</div>
        </el-form-item>
        <el-form-item>
          <div class="fee">{{$t('message.fees')}}{{this.fee}} NULS</div>
        </el-form-item>
        <el-form-item class="form-bt">
          <div class="total-fee">{{$t('message.setAlias5')}}：{{(this.fee*1000000 + 1*1000000)/1000000}} NULS</div>
          <el-button type="primary" @click="submitSetAlias('setAliasForm')">{{$t('message.confirm')}}</el-button>
        </el-form-item>
      </el-form>
    </div>
    <Password ref="password" @toSubmit="toSubmit"></Password>
  </div>
</template>

<script>
  import moment from 'moment'
  import nulsJs from 'nuls-jssdk'
  import {LeftShiftEight, getLocalTime} from './../../utils/util'
  import {password} from '@/utils/validate'
  import Password from '@/components/PasswordBar.vue'

  export default {
    data() {
      let aliasing = (rule, value, callback) => {
        let re = /^(?!_)(?!.*?_$)[a-z0-9_]+$/;
        if (!value) {
          callback(new Error(this.$t('message.setAlias4')))
        } else if (!re.exec(value)) {
          callback(new Error(this.$t('message.setAlias4')))
        }else if (this.addressUsable*1 < 1.01) {
          callback(new Error(this.$t('message.noMoney')))
        }else {
          callback()
        }
      };

      return {
        address: localStorage.getItem('address'),
        /**
        * 余额
        * balance
        * */
        addressUsable: 0,
        /**
         * 手续费
         * fee
         * */
        fee: 0,
        setAliasForm: {
          alias: '',
        },
        loading:false,
        setAliasRules: {
          alias: [
            {validator: aliasing, trigger: 'blur'}
          ],
        },
      };
    },
    created() {
      this.getAccountBalance(this.address);
    },
    components: {
      Password,
    },
    methods: {

      /**
       * 获取账户余额
       *  Get balance by address
       **/
      getAccountBalance(address) {
        let _this = this;
        nulsJs.getAccountByAddress({"address": address}, function (data) {
          //console.log(data);
          if (data.success) {
            _this.addressUsable = LeftShiftEight(data.data.usable).toString()
          }else{
            _this.$message({
              message: _this.$t('message.failed') +':'+_this.$t('message.'+data.code), type: 'warning', duration: '1000'
            });
          }
        });
      },

      /**
       * 获取设置别名手续费
       * Get set alias fee
       **/
      getSetAliasFee() {
        let _this = this;
        let params = {
          "address": localStorage.getItem("address"),
          "alias": this.setAliasForm.alias,
          "types": "3",
          "money": "1000"
        };
        //console.log(params);
        nulsJs.getTransFee(params, function (data) {
          //console.log(data);
          if (data.success) {
            _this.fee = LeftShiftEight(data.data.fee).toString()
          }else{
            _this.$message({
              message: _this.$t('message.failed') +':'+_this.$t('message.'+data.code), type: 'warning', duration: '1000'
            });
          }
        });
      },

      /**
       *设置别名提交
       * @param formName
       */
      submitSetAlias(formName) {
        let _this = this;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            _this.$refs.password.showPassword(true);
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },

      /**
       * 获取密码提交请求
       * get password submit
       **/
      toSubmit(password) {
        let _this = this;
        this.loading=true;
        let params = {
          "money": "10",
          "address": localStorage.getItem("address"),
          "pri": localStorage.getItem("encryptedPrivateKey"),
          "pass": password,
          "alias": this.setAliasForm.alias,
          "types": "3",
          "pub":localStorage.getItem('pubKey')
        };
        //console.log(params);
        nulsJs.transaction(params, function (data) {
          //console.log(data);
          if (data.success) {
            _this.loading=false;
            localStorage.setItem('addressAlias', _this.setAliasForm.alias);
            _this.$store.commit('setAddressAlias',_this.setAliasForm.alias);
            _this.$store.commit('setActiveNav', '1');
            sessionStorage.setItem("activeNav", '1');
            _this.$message({
              message: _this.$t('message.success'), type: 'success', duration: '1000'
            });
            _this.$router.push({
              name: '/account',
            })
          } else {
            _this.loading=false;
            _this.$message({
              message: _this.$t('message.failed') +':'+_this.$t('message.'+data.code), type: 'warning', duration: '1000'
            });
          }
        });
      }
    }
  }
</script>

<style lang="less" type="text/less">
  @import url("./../../assets/css/style.less");

  .set-alias {
    clear: both;
    font-size: @font-size-14;
    margin-top: 100px;
    h1 {
      margin-bottom: 40px;
      font-size: @font-size-20;
    }
    .prompt {
      max-width: 550px;
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
    .el-form {
      max-width: 500px;
      margin: auto;
      .address {
        div:nth-child(1) {
          margin: 28px 0 6px;
        }
        div:nth-child(2) {
          background: #17202e;
          border: @border2;
          padding-left: 12px;
          height: 31px;
          line-height: 28px;
        }
      }
      .el-form-item {
        margin-bottom: 0;
        .el-form-item__label {
          margin-top: 28px;
          margin-bottom: 6px;
          font-size: @font-size-14;
        }
        .el-form-item__content {
          line-height: 0;
        }
      }
      .el-form-item:nth-child(2) {
        .el-form-item__label {
          margin-top: 28px;
        }
        .el-form-item__content {
          position: relative;
          .balance {
            position: absolute;
            top: 36px;
            right: 0;
            color: @c-font-gray-color;
          }
          .text-length{
            position: absolute;
            top: 64px;
            right: 3px;
            color: @c-font-gray-color;
            font-size: @font-size;
          }
        }
      }
      .el-form-item:nth-child(3) {
        .el-form-item__content {
          margin-top: 30px;
          color: @c-font-gray-color;
        }
      }
      .form-bt {
        text-align: center;
        margin-top: 35px;
        .el-form-item__content {
          .total-fee {
            margin-bottom: 40px;
          }
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
