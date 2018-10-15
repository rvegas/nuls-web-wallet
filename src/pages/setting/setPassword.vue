<template>
  <div class="main-content">
    <div class="center set-password">
      <h1 class="h1">{{$t('message.editPassword')}}</h1>
      <el-form :model="setPassForm" :rules="setPassRules" ref="setPassForm">
        <el-form-item :label="$t('message.setPassword1')" prop="pass">
          <el-input type="password" v-model.trim="setPassForm.pass"></el-input>
        </el-form-item>
        <el-form-item :label="$t('message.setPassword2')" prop="newPass">
          <el-input type="password" v-model.trim="setPassForm.newPass"></el-input>
        </el-form-item>
        <el-form-item :label="$t('message.setPassword3')" prop="checkPass">
          <el-input type="password" v-model.trim="setPassForm.checkPass"></el-input>
        </el-form-item>
        <el-form-item class="form-bt">
          <el-button type="primary" @click="setPassword('setPassForm')">{{$t('message.confirm')}}</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  import nulsJs from 'nuls-jssdk'
  import {password} from '@/utils/validate'

  export default {
    data() {
      let validatePass = (rule, value, callback) => {
        if (!(value)) {
          callback(new Error(this.$t('message.passTitle')));
        } else {
          callback();
        }
      };
      let validateNewPass = (rule, value, callback) => {
        if (!password(value)) {
          callback(new Error(this.$t('message.setPassword2')));
        } else {
          callback();
        }
      };
      let validateCheckPass = (rule, value, callback) => {
        if (value !== this.setPassForm.newPass) {
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
        setPassForm: {
          pass: '',
          newPass: '',
          checkPass: '',
        },
        /**
         * 表单验证信息
         * Form validation information
         * */
        setPassRules: {
          pass: [
            {validator: validatePass, trigger: 'blur'}
          ],
          newPass: [
            {validator: validateNewPass, trigger: 'blur'}
          ],
          checkPass: [
            {validator: validateCheckPass, trigger: 'blur'}
          ],
        },
      };
    },
    methods: {

      /**
       * 修改密码提交
       * Change Password submit
       * @param formName
       */
      setPassword(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.changePass();
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },

      /**
       * 修改密码方法
       * Change Password
       */
      changePass() {
        let _this = this;
        let params = {
          "pri": localStorage.getItem('encryptedPrivateKey'),
          "pass": this.setPassForm.pass,
          "newPass": this.setPassForm.newPass,
          "pub":localStorage.getItem('pubKey')
        };
        //console.log(params);
        nulsJs.changePass(params, function (data) {
          //console.log(data);
          if(data.success){
            localStorage.setItem('encryptedPrivateKey',data.data.enpri);
            _this.$store.commit('setActiveNav', '1');
            sessionStorage.setItem("activeNav", '1');
            _this.$message({
              message: _this.$t('message.success'), type: 'success', duration: '1000'
            });
            _this.$router.push({
              name: '/account',
            })
          }else {
            _this.$message({
              message: _this.$t('message.failed')+':'+_this.$t('message.'+data.code), type: 'danger', duration: '1000'
            })
          }
        })
      },

    }
  }
</script>

<style lang="less" type="text/less">
  @import url("./../../assets/css/style.less");

  .set-password {
    clear: both;
    font-size: @font-size-14;
    margin-top: 100px;
    h1 {
      margin-bottom: 40px;
      font-size: @font-size-20;
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
      .el-form-item {
        .el-form-item__label {
          margin-top: 20px;
        }
      }
      .el-form-item:nth-child(3) {
        .el-form-item__content {
          .el-checkbox-group {
            .el-checkbox {
              color: @c-color;
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
      }
    }
  }

</style>
