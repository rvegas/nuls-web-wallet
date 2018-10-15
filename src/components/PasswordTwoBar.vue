<template>
    <el-dialog title="" :visible.sync="passVisible" top="15vh" class="password-two-dialog" @open="passwordShow"
               @close="passwordClose('passForm')">
        <h2>{{$t('message.setPssword')}}</h2>
        <el-form :model="passForm" status-icon :rules="rulesPass" ref="passForm" class="set-pass">
            <el-form-item :label="$t('message.pass')" prop="pass" style="margin-bottom: 5px">
                <el-input type="password" v-model="passForm.pass" :maxlength=20></el-input>
            </el-form-item>
            <el-form-item :label="$t('message.passTwoTitle')" prop="checkPass" style="margin-bottom: 5px">
                <el-input type="password" v-model="passForm.checkPass" :maxlength=20></el-input>
            </el-form-item>
            <!--<div class="set-pass-title">{{$t('message.cancel')}}</div>-->
            <el-form-item>
              <el-button @click="passwordClose('passForm')">{{$t('message.cancel')}}</el-button>
                <el-button type="primary" @click="submitForm('passForm')" class="set-pass-submit" id="setPassTwo">
                    {{$t('message.confirm')}}
                </el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>

<script>
  import {password} from '@/utils/validate'
  export default {
    data () {
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
        } else if (value !== this.passForm.pass) {
          callback(new Error(this.$t('message.passTwoTitle_1')));
        } else {
          callback();
        }
      };
      return {
        passVisible: false,
        passForm: {
          pass: '',
          checkPass: '',
        },
        rulesPass: {
          pass: [
            {validator: validatePass, trigger: 'blur'}
          ],
          checkPass: [
            {validator: validatePass2, trigger: 'blur'}
          ]
        }
      }
    },
    created () {

    },
    methods: {

      //密码框显示执行事件
      passwordShow () {
        //this.$store.commit('setPasswordShow', true);
      },
      passwordClose (formName) {
        this.passVisible = false;
        this.$refs[formName].resetFields();
      },

      showPasswordTwo (boolean) {
        this.passForm.password = '';
        this.passVisible = boolean
      },

      /**
       * Set the password for the user
       **/
      submitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$emit('toSubmit',this.passForm.checkPass);
            this.passVisible = false
          } else {
            return false
          }
        })
      },
    }
  }
</script>
<style lang="less" type="text/less">
  @import url("./../assets/css/style.less");
    .password-two-dialog{
        .el-dialog{
          max-width: 450px;
          min-width: 320px;
          background-color:@bg-1-color;
            .el-dialog__header{}
            .el-dialog__body{
                h2{
                  margin:auto;
                  padding-bottom: 30px;
                  color:@c-color;
                  font-size: @font-size-18;
                }
                .set-pass{
                    .el-form-item{
                        margin-bottom: 5px;
                      .el-form-item__label{
                        text-align: left;
                      }
                        .el-form-item__content{
                          .el-input__suffix{
                            display:none;
                          }
                            .el-input__inner{
                                padding: 0 5px;
                                color: #FFFFFF;
                            }
                            .el-input__icon{
                                line-height: 27px;
                            }
                            text-align: center;
                            .el-button--primary{
                                margin-bottom: 14px;
                            }
                            .new-no-pass{
                                line-height: 28px;
                                font-size: 12px;
                                border: 1px solid #24426c;
                                width: 230px;
                                margin: 0 auto 30px;
                                &:hover{
                                    border-color: #c1c5c9;
                                    cursor: pointer;
                                }
                            }
                        }
                    }
                    .el-form-item:nth-child(2),.el-form-item:nth-child(3){
                      margin-top:18px;
                    }
                    .set-pass-title{
                        font-size: 12px;
                        padding: 25px 0;
                    }
                }
            }
        }
    }
</style>
