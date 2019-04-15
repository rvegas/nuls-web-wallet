<template>
  <div class="main-content" v-loading="loading">
    <div class="center trans-account">
      <h1 class="h1">NULS {{ $t('message.transAccountTitle') }}</h1>
      <el-form :model="transferForm" :rules="transferRules" ref="transferForm">
        <el-form-item :label="$t('message.transAccountTips1')" prop="address">
          <el-input type="text" v-model.trim="transferForm.address" :maxlength="50" @change="getTransFee">
          </el-input>
        </el-form-item>
        <el-form-item :label="$t('message.transAccountTips2')" prop="account">
          <template>
            <div class="balance">{{ $t('message.transAccountTips3') }}{{this.addressUsable}} NULS</div>
          </template>
          <el-input type="text" v-model.trim="transferForm.account" :maxlength="17" @change="getTransFee">
          </el-input>
        </el-form-item>
        <el-form-item :label="$t('message.transAccountTips4')" prop="remark">
          <el-input type="textarea" v-model.trim="transferForm.remark" :maxlength="50"
                    @change="getTransFee">
          </el-input>
          <div class="text-length">{{transferForm.remark.length}}/50</div>
        </el-form-item>

        <el-form-item :label="$t('message.transAccountPrice')" class="custom-fee" v-show="switchValue" prop="fees">
          <template>
            <div class="size">{{ $t('message.transAccountSize') }}{{this.transAccountSize}}kb</div>
          </template>
          <el-input type="text" v-model="transferForm.fees">
          </el-input>
          <div class="fee">{{ $t('message.transAccountTips5') }}{{this.transferFee}} NULS</div>
        </el-form-item>

        <div class="progress" v-show="!switchValue">
          <div>{{ $t('message.transAccountTips5') }}</div>
          <el-slider v-model.trim="transferForm.rate" :format-tooltip="formatTooltip" @change="getTransFee()" :min=1 :max=10>
          </el-slider>
          <div class="flex-common">
            <div>{{ $t('message.low') }}</div>
            <div>{{ $t('message.high') }}</div>
          </div>
          <div class="fee-value">{{this.transferFee}} NULS</div>
        </div>

        <div class="switch">
          <span>{{ $t('message.transAccountOptions') }}</span>
          <el-switch v-model="switchValue" active-color="#658ec7" inactive-color="#222d3f">
          </el-switch>
        </div>
        <el-form-item class="form-bt">
          <el-button type="primary" @click="transferSubmit('transferForm')">{{ $t('message.transAccountTitle') }}
          </el-button>
        </el-form-item>
      </el-form>
    </div>
    <Password ref="password" @toSubmit="toSubmit"></Password>
  </div>
</template>
<script>
  import nulsJs from 'nuls-jssdk'
  import {BigNumber} from 'bignumber.js'
  import {LeftShiftEight, RightShiftEight, getLocalTime,htmlEncodeByRegExp} from '@/utils/util'
  import Password from '@/components/PasswordBar.vue'
  import {address, numbers,numbers2,numbers3} from '@/utils/validate'

  export default {
    data() {
      let toAddress = (rule, value, callback) => {
        if (!value) {
          callback(new Error(this.$t('message.transAccountError1')))
        } /*else if (!address(value)) {
          callback(new Error(this.$t('message.transAccountError2')))
        }*/else {
          this.$refs.transferForm.validateField('fees');
          callback()
        }
      };
      let toAccount = (rule, value, callback) => {
        if (!value) {
          callback(new Error(this.$t('message.transAccountError3')))
        }else if (!numbers(value)) {
          callback(new Error(this.$t('message.transAccountError4')))
        }else if(value < 0.01){
          callback(new Error(this.$t('message.transAccountError6')))
        }else if(Number(value) > Number(this.addressUsable)){
          callback(new Error(this.$t('message.noMoney1')))
        }else {
          this.$refs.transferForm.validateField('fees');
          callback()
        }
      };
      let toFees = (rule, value, callback) => {
        if (0.001 > value * 1) {
          this.transferForm.fees = 0.001
        } else if (value * 1 > 0.01) {
          this.transferForm.fees = 0.01
        } else if (!numbers2(value)) {
          callback(new Error(this.$t('message.transAccountError7')))
        }else if (numbers2(value)) {
          this.getTransFee();
          callback()
        }else {
         callback()
        }
      };
      return {
        /**
        * 高级选项开关的值
        * Value of advanced option switch
        * */
        switchValue: false,
        /**
         * 用户余额
         * User balance
         * */
        addressUsable: 0,
        //转账手续费
        /**
         * 转账手续费
         * Transfer fee
         * */
        transferFee: 0,
        /**
         * 转账表单信息
         * form fields
         * */
        transferForm: {
          address: '',
          account: '',
          remark: '',
          fees: 0,
          rate: 5,
        },
        formNameReset:{},
        /**
         * 内容大小
         * Content size
         * */
        transAccountSize:0,
        loading:false,
        /**
         * 转账表单验证信息
         * Form validation information
         * */
        transferRules: {
          address: [
            {validator: toAddress, trigger: 'blur'}
          ],
          account: [
            {validator: toAccount, trigger: 'blur'}
          ],
          fees: [
            {validator: toFees, trigger: 'blur'}
          ],
        },
      };
    },
    created() {
      this.getAccountBalance(localStorage.getItem("address"));
      this.transferForm.fees = this.transferForm.rate / 1000;
    },
    mounted(){
      this.transferForm.address='';
      this.transferForm.remark='';
      this.transferForm.fees=0;
      this.transferForm.rate=5;
      this.transferForm.account='';
    },
    components: {
      Password,
    },
    methods: {
      /**
       * 滑块显示数字
       * Slider display number
       **/
      formatTooltip(val) {
        if (val === 0) {
          this.transferForm.rate = 0.001;
          this.transferForm.fees = 0.001;
          return 0.001
        }
        return val / 1000;
      },

      /**
       * 高级选择开关
       * Advanced selector switch
       **/
      showClause() {
        this.clauseDialog = true
      },

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
       * 转账提交
       * Transfer submit
       * @param formName
       */
      transferSubmit(formName) {
        this.formNameReset=this.$refs[formName];
        let _this = this;
        try{
          this.$refs[formName].validate((valid) => {
            if (valid) {
              _this.$refs.password.showPassword(true);
            } else {
              //this.$refs[formName].resetFields();
              console.log('error submit!!');
              return false;
            }
          });
        }catch(e){
          console.log(e);
        }
      },

      /**
       * 获取手续费
       * Get fee
       **/
      getTransFee() {
        document.getElementsByTagName('button')[0].style.cursor='pointer';
        document.getElementsByTagName('button')[0].disabled=false;
        let _this = this;
        let allUsable = this.transferForm.account * 1 >this.addressUsable * 1;
        let all = new BigNumber(this.addressUsable);
        if (this.switchValue) {
          this.transferForm.rate = this.transferForm.fees * 1000;
        } else {
          this.transferForm.fees = this.transferForm.rate / 1000;
        }
        if (this.transferForm.address.length > 0 && this.transferForm.account.length > 0 && numbers(this.transferForm.account) && address(this.transferForm.address) && !allUsable) {
          let params = {
            "money": RightShiftEight(this.transferForm.account).toString(),
            "address": localStorage.getItem("address"),
            "toAddress": this.transferForm.address,
            "remark": this.transferForm.remark,
            "price": RightShiftEight(this.transferForm.fees).toString(),
            "types": "2"
          };
          //console.log(params);
            nulsJs.getTransFee(params, function (data) {
              //console.log(data);
              /**
              * data.data.feeType: 1正常  2 >可用金额 3钱不够
              * data.data.feeType: 1 normal ,2 is more than the available amount ,3 money is not enough.
              * */
              if (data.success) {
                _this.transferFee = LeftShiftEight(data.data.fee).toString();
                if(data.data.feeSize){
                  if(parseInt(Number(data.data.feeSize)/1024)<=0){
                    _this.transAccountSize=1;
                  }else{
                    _this.transAccountSize=parseInt(Number(data.data.feeSize)/1024);
                  }
                }else{
                  _this.transAccountSize=0;
                }
                if(data.data.feeType==='1'){
                  //console.log('success');
                }else if(data.data.feeType==='2'){
                  if (parseInt(data.data.maxMoney) > 0) {
                    _this.$message({
                      message: _this.$t('message.tip1') + LeftShiftEight(data.data.maxMoney), type: 'warning', duration: '3000'
                    });
                  }else {
                    _this.transferForm.account = LeftShiftEight(RightShiftEight(_this.addressUsable) - Number(data.data.fee)).toString()
                  }
                }else if(data.data.feeType==='3'){
                  _this.$message({
                    message: _this.$t('message.failed') +':'+_this.$t('message.noMoney1'), type: 'warning', duration: '1000'
                  });
                }else{
                  _this.$message({
                    message: _this.$t('message.failed') +':'+_this.$t('message.'+data.code), type: 'warning', duration: '1000'
                  });
                }
              }else{
                _this.$message({
                  message: _this.$t('message.failed') +':'+_this.$t('message.'+data.code), type: 'warning', duration: '1000'
                });
                document.getElementsByTagName('button')[0].style.cursor='not-allowed';
                document.getElementsByTagName('button')[0].disabled=true;
              }
            });
        }
      },

      /**
       * 获取密码提交请求
       * get password submit
       **/
      toSubmit(password) {
        let _this = this;
        this.loading=true;
        let params = {
          "money": RightShiftEight(this.transferForm.account).toString(),
          "address": localStorage.getItem("address"),
          "toAddress": this.transferForm.address,
          "remark": htmlEncodeByRegExp(this.transferForm.remark),
          "price": RightShiftEight(this.transferForm.fees).toString(),
          "pri": localStorage.getItem("encryptedPrivateKey"),
          "pub":localStorage.getItem('pubKey'),
          "pass": password,
          "types": "2"
        };
        //console.log(params);
        nulsJs.transaction(params, function (data) {
          //console.log(data);
          if (data.success) {
            _this.loading=false;
            _this.$store.commit('setActiveNav', '1');
            sessionStorage.setItem("activeNav", '1');
            _this.$router.push({
              name: '/account',
            });
            _this.$message({
              message: _this.$t('message.success'), type: 'success', duration: '1000'
            });
            /**
             * 请求成功，清空数据
             * Request successful, empty data
             **/
            _this.formNameReset.resetFields();
            _this.addressUsable=0;
           //console.log(_this.transferForm);
          } else {
            _this.loading=false;
            _this.$message({
              message: _this.$t('message.failed')+':'+_this.$t('message.'+data.code), type: 'warning', duration: '1000'
            });
          }
        });
      }
    }
  }
</script>
<style lang="less" type="text/less">
  @import url("./../../assets/css/style.less");

  .trans-account {
    clear: both;
    font-size: @font-size-14;
    margin-top: 35px;
    h1 {
      margin-bottom: 30px;
      font-size: @font-size-20;
    }
    .el-form {
      max-width: 520px;
      margin: auto;
      padding-bottom: 20px;
      .el-form-item {
        margin-bottom: 0;
        .el-form-item__label {
          margin-top: 24px;
          margin-bottom: 6px;
          font-size: @font-size-14;
          text-align: left;
          padding: 0;
        }
        .el-form-item__content {
          line-height: 0;
          .long_height{
            height: 80px;
            input{
              height: 80px;
            }
          }
        }
      }
      .el-form-item:nth-child(2) {
        .el-form-item__content {
          position: relative;
          .balance {
            color: #ccd5e4;
            position: absolute;
            top: 32px;
            right: 0;
            font-size: @font-size-14;
          }
        }
      }
      .el-form-item:nth-child(3) {
        /*margin-top: 10px;*/
        .el-form-item__content {
          position: relative;
          .text-length {
            color: @c-font-gray-color;
            position: absolute;
            bottom: 10px;
            right: 12px;
            font-size: @font-size;
          }
          .el-textarea {
            .el-textarea__inner {
              height: 100px;
            }
          }
        }
      }
      .el-form-item:nth-child(4) {
        .el-form-item__content {
          .el-checkbox-group {
            .el-checkbox {

            }
          }
          div {
            display: inline-block;
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
      .progress {
        margin-top: 24px;
        margin-bottom: 13px;
        .fee-value {
          text-align: center;
        }
        .progress-line {
          height: 8px;
          background: #2b323f;
          border-radius: 5px;
          margin: 10px 0 10px;
        }
        div:nth-child(3) {
          color: #ccd5e4;
        }
      }
      .custom-fee {
        position: relative;
        margin-bottom: 13px;
        .size {
          color: #ccd5e4;
          position: absolute;
          top: 32px;
          right: 0;
          font-size: @font-size-14;
        }
        .fee {
          position: absolute;
          bottom: -25px;
          right: 188px;
          font-size: @font-size-16;
        }
      }
      .switch {
        text-align: right;
        color: #88baff;
      }
    }
    @media screen and (max-width: 768px) {
      h1 {
        margin-bottom: 10px;
      }
      .el-form{
        .custom-fee {
          .size {
            color: #ccd5e4;
            position: absolute;
            top: 32px;
            right: 0;
            font-size: @font-size-14;
          }
          .fee {
            position: absolute;
            bottom: -50px;
            left:0;
            font-size: @font-size-16;
          }
        }
        .switch {
          text-align: left;
          color: #88baff;
        }
      }
    }
  }

</style>
