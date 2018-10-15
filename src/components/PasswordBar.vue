<template>
  <el-dialog :title="this.$t('message.inputPassword')"
             :visible.sync="passwordVisible" top="30vh" class="password-dialog"
             @open="passwordShow" @close="passwordClose('passwordForm')">
    <el-form ref="passwordForm" :model="passwordForm" :rules="passwordRules" @submit.native.prevent @keyup.enter.native="dialogSubmit('passwordForm')">
      <el-form-item prop="password">
        <el-input v-model.focus="passwordForm.password" type="password" :autofocus="true" :maxlength="22"
                  id="passwords"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="passwordClose('passwordForm')">{{this.$t('message.cancel')}}</el-button>
      <el-button type="primary" @click="dialogSubmit('passwordForm')" id="passwordInfo">{{this.$t('message.confirm')}}
      </el-button>
    </div>
  </el-dialog>
</template>

<script>
  export default {
    props: {
      TitleBl: {
        type: Boolean,
        default: true
      },
    },
    data() {
      let validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error(this.$t('message.passTitle')));
        } else {
          callback()
        }
      };
      return {
        passwordVisible: false,
        passwordShows: 0,
        passwordForm: {
          password: '',
        },
        passwordRules: {
          password: [
            {validator: validatePass, trigger: 'blur'}
          ]
        },
      }
    },
    mounted() {

    },
    methods: {
      //密码框显示执行事件
      passwordShow() {
        this.$store.commit('setPasswordShow', true);
      },
      //关闭和取消
      passwordClose(formName) {
        this.passwordVisible = false;
        this.$refs[formName].resetFields();
      },
      //
      showPassword(boolean) {
        this.$store.commit('setPasswordShow', false);
        this.passwordForm.password = '';
        this.passwordVisible = boolean
      },
      //弹出密码输入框
      dialogSubmit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$emit('toSubmit', this.passwordForm.password);
            this.passwordVisible = false;
            this.$refs[formName].resetFields();
          } else {
            console.log('error submit!!');
            return false
          }
        })
      },
    }
  }
</script>

<style lang="less" type="text/less">
  @import url("./../assets/css/style.less");

  .password-dialog {
    .el-dialog {
      max-width: 450px;
      min-width: 320px;
      background-color: @bg-1-color;
      .el-dialog__header {
        .el-dialog__title {
          color: @c-color;
        }
      }
      .el-dialog__body {
        .el-form {
          .el-form-item {
            .el-form-item__label {
              line-height: 0;
              padding: 28px 0 20px 0;
            }
          }
        }
      }
      .el-dialog__footer {
        .dialog-footer {
          text-align: center;
          .el-button--default {
            /*margin-left: 50px;*/
          }
          .el-button--primary {
            /*margin-right: 50px;*/
            /*float: right;*/
          }
        }
      }
    }
  }
</style>
