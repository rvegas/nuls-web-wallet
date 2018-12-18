<template>
  <div class="main-content">
    <div class="center service-address-list">
      <div class="title">
        <i class="address-icon iconfont iconfont-common-green">&#xe60c;</i>
        <span>{{$t('message.serviceAddressList1')}}</span>
      </div>
      <div class="list">
        <table class="table">
          <thead>
          <tr>
            <th>{{$t('message.serviceAddressList2')}}</th>
            <th>{{$t('message.serviceAddressList3')}}</th>
            <th>{{$t('message.serviceAddressList6')}}</th>
            <th>{{$t('message.serviceAddressList7')}}</th>
          </tr>
          </thead>
          <tbody v-if="serviceData.length!==0">
          <tr v-for="(item,index) in serviceData">
            <td :data-label="$t('message.serviceAddressList2')">{{item.address}}</td>
            <td :data-label="$t('message.serviceAddressList3')">
              <span v-if="item.status==='0'">{{$t('message.serviceAddressList4')}}</span>
              <span v-else="item.status==='1'">{{$t('message.serviceAddressList5')}}</span>
            </td>
            <td :data-label="$t('message.serviceAddressList6')" v-if="item.status==='0'">{{item.delay}}</td>
            <td :data-label="$t('message.serviceAddressList6')" v-if="item.status==='1'">{{delay}}</td>
            <td :data-label="$t('message.serviceAddressList7')">
              <!--http://testnet.apiserver.nuls.io-->
              <!--https://apiserver.nuls.io-->
              <span class="text1" @click="edit(index,item)" v-show="item.address ==='http://testnet.apiserver.nuls.io'? false:true">{{$t('message.serviceAddressList8')}}</span>
              <span class="text2" @click="useAddress(item)">{{$t('message.serviceAddressList9')}}</span>
            </td>
          </tr>
          </tbody>
          <tbody v-else>
          <tr class="big-show">
            <td colspan="5" class="no-data">{{ $t('message.noData') }}</td>
          </tr>
          <tr class="small-show">
            <td :data-label="$t('message.serviceAddressList2')">{{ $t('message.noData') }}</td>
            <td :data-label="$t('message.serviceAddressList3')">{{ $t('message.noData') }}</td>
            <td :data-label="$t('message.serviceAddressList6')">{{ $t('message.noData') }}</td>
            <td :data-label="$t('message.serviceAddressList7')">{{ $t('message.noData') }}</td>
          </tr>
          </tbody>
        </table>
        <div class="bottom-btn">
          <el-button @click="addSubmit">{{$t('message.serviceAddressList10')}}</el-button>
        </div>
      </div>
      <el-dialog title="" :visible.sync="addAddressVisible" width="30%" center class="">
        <div class="finish-dialog">
          <el-form :model="addAddressForm" :rules="addAddressRules" ref="addAddressForm">
            <h1>{{$t('message.serviceAddressList10')}}</h1>
            <div class="tips">{{$t('message.serviceAddressList12')}}</div>
            <el-form-item :label="$t('message.serviceAddressList13')" prop="newAddress">
              <el-input type="text" v-model.trim="addAddressForm.newAddress"
                        onkeyup="this.value=this.value.replace(/\s+/g,'')"></el-input>
            </el-form-item>
            <div @change="quicklyUse('addAddressForm')">
              <el-form-item label="" prop="type" class="form-checkbox">
                <el-checkbox-group v-model="addAddressForm.type">
                  <el-checkbox :label="$t('message.serviceAddressList14')" name="type"></el-checkbox>
                </el-checkbox-group>
              </el-form-item>
            </div>
            <el-form-item class="form-bt">
              <div class="dialog-footer">
                <el-button @click="addAddressVisible = false">{{$t('message.cancel')}}</el-button>
                <el-button type="primary" @click="addAddressSure('addAddressForm')">{{$t('message.confirm')}}
                </el-button>
              </div>
            </el-form-item>
          </el-form>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  import nulsJs from 'nuls-jssdk'
  import {RUN_DEV} from '@/config'
  import {serviceAddress} from '@/utils/validate'

  export default {
    data() {
      let validateAddress = (rule, value, callback) => {
        if (!value) {
          callback(new Error(this.$t('message.serviceAddressList16')));
        } else if (!serviceAddress(value)) {
          callback(new Error(this.$t('message.serviceAddressList17')));
        } else {
          callback();
        }
      };
      return {
        /**
         * 用于判断 编辑，新增
         * Used to judge editors, add
         * */
        editFlg: true,
        /**
         * 是否使用，0：未使用，1：使用中
         * 0: unused, 1: in use
         * */
        statusFlg: '0',
        /**
         * 列表中tr的索引值
         * Index values for each row in the list
         * */
        rowIndex: '',
        addAddressVisible: false,
        serviceData: [{
          address: RUN_DEV ? 'https://apiserver.nuls.io' : 'http://testnet.apiserver.nuls.io',
          status: '0',
          delay: '0',
        }],
        /**
         * 表单信息
         * List index value
         * */
        addAddressForm: {
          newAddress: '',
          type: false,
        },
        /**
         * 表单验证信息
         * Form validation information
         * */
        addAddressRules: {
          newAddress: [
            {validator: validateAddress, trigger: 'blur'}
          ],
        },
        running:RUN_DEV,
      }
    },
    computed: {
      delay() {
        return this.$store.getters.getDelay ? this.$store.getters.getDelay + 'MS' : '0'
      }
    },
    created() {
      if (localStorage.getItem('serviceData')) {
        this.$store.commit('refreshService', localStorage.getItem('serviceData'));
        this.serviceData = JSON.parse(localStorage.getItem('serviceData'));
      }
      this.useStatus();
    },
    methods: {
      add() {
        this.addAddressVisible = false;
        this.$store.commit('setServiceData', JSON.stringify(this.serviceData));
        localStorage.setItem("serviceData", JSON.stringify(this.serviceData));
      },
      /**
       * 使用状态的判断，0：未使用，1：使用中
       * Judgement of usage state，0: unused, 1: in use
       * */
      useStatus() {
        for (let i = 0; i < this.serviceData.length; i++) {
          if (this.serviceData[i].address === this.$store.getters.getNodeAddress) {
            this.serviceData[i].status = '1'
          } else {
            this.serviceData[i].status = '0'
          }
        }
      },
      /**
       * 新增按钮
       * New button
       * */
      addSubmit() {
        if (this.serviceData.length >= 10) {
          this.$message({
            type: 'warning', message: this.$t('message.serviceAddressList15'), duration: '2000'
          })
        } else {
          this.addAddressVisible = true;
          this.editFlg = false;
          this.addAddressForm.newAddress = '';
        }
      },

      /**
       * 编辑
       * Edit
       * */
      edit(index, row) {
        this.editFlg = true;
        this.addAddressVisible = true;
        this.addAddressForm.newAddress = row.address;
        this.rowIndex = index;
      },

      /**
       * 使用
       * Use
       * */
      useAddress(row) {
        let _this = this;
        let params = {"url": row.address};
        //console.log(params);
        nulsJs.resetUrl(params, function (data) {
          //console.log(data);
          if (data.success) {
            row.status = '1';
            _this.$store.commit('setNodeAddress', row.address);
            localStorage.setItem("nodeAddress", row.address);
            _this.$store.commit('setActiveNav', '1');
            sessionStorage.setItem("activeNav", '1');
            _this.$store.commit('setHeightFlg', "0");
            _this.getHeightInfo();
          } else {
            _this.$message({
              message: _this.$t('message.failed') + ':' + _this.$t('message.' + data.code),
              type: 'warning',
              duration: '1000'
            });
          }
        });
      },

      /**
       * 立即使用
       * Immediate use
       * */
      quicklyUse(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let _this = this;
            nulsJs.resetUrl({"url": _this.addAddressForm.newAddress}, function (data) {
              //console.log(data);
              if (data.success) {
                if (!_this.editFlg) {
                  _this.serviceData.push({address: _this.addAddressForm.newAddress, status: '1', delay: '0'});
                } else {
                  _this.serviceData.splice(_this.rowIndex, 1, {
                    address: _this.addAddressForm.newAddress,
                    status: '1',
                    delay: '0'
                  });
                }
                _this.$store.commit('setNodeAddress', _this.addAddressForm.newAddress);
                localStorage.setItem("nodeAddress", _this.addAddressForm.newAddress);
                _this.add();
                _this.useStatus();
                _this.$store.commit('setActiveNav', '1');
                sessionStorage.setItem("activeNav", '1');
                _this.$store.commit('setHeightFlg', "0");
                _this.getHeightInfo();
              } else {
                _this.$message({
                  message: _this.$t('message.failed') + ':' + _this.$t('message.' + data.code),
                  type: 'warning',
                  duration: '1000'
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
       * 获取高度信息
       * Get height info
       */
      getHeightInfo() {
        let _this = this;
        nulsJs.getBlockBesthashDetail(function (data) {
          //console.log(data);
          if (data.success) {
            sessionStorage.setItem("nodeError", "1")
          } else {
            sessionStorage.setItem("nodeError", "0");
            if (_this.$store.getters.getHeightFlg === '0') {
              if (sessionStorage.getItem('nodeError') === '0') {
                _this.$message({
                  message: _this.$t('message.nodeError'), type: 'warning', duration: '1000'
                });
              } else {
                _this.$message({
                  message: _this.$t('message.failed') + ':' + _this.$t('message.' + data.code),
                  type: 'warning',
                  duration: '1000'
                });
              }
            }
          }
          if (localStorage.hasOwnProperty('address')) {
            _this.$router.push({
              name: '/account',
            })
          } else {
            _this.$router.push({
              name: '/home',
            })
          }
        })
      },

      /**
       * 新增弹框的确定按钮
       * New confirmation button for bomb box
       */
      addAddressSure(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if (!this.editFlg) {
              this.serviceData.push({address: this.addAddressForm.newAddress, status: '0', delay: '0'});
            } else {
              this.serviceData.splice(this.rowIndex, 1, {
                address: this.addAddressForm.newAddress,
                status: '0',
                delay: '0'
              });
            }
            this.add();
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      }
    },
  }
</script>

<style lang="less" type="text/less">
  @import url("./../../assets/css/style.less");

  .service-address-list {
    text-align: center;
    margin-top: 45px;
    .title {
      font-size: @font-size-16;
      text-align: left;
      margin-bottom: 17px;
      .address-icon {
        background-position: -379px -26px;
        height: 16px;
      }
    }
    .list {
      background: @bg-1-color;
      padding-bottom: 15px;
      table {
        td:last-child {
          span {
            cursor: pointer;
          }
          span:hover {
            color: @c-font-blue1-color;
          }
          .text1 {
            border-right: @border1;
            padding-right: 10px;
          }
          .text2 {
            padding-left: 6px;
          }
        }
      }
      .bottom-btn {
        margin-top: 27px;
        margin-bottom: 27px;
        .el-button {
          width: 230px;
        }
      }
    }
    .el-dialog__wrapper {
      .el-dialog--center {
        padding: 40px 52px;
        min-width: 607px;
        .el-dialog__header {
          .el-dialog__headerbtn {
            top: 35px;
            right: 35px;
          }
        }
        .el-dialog__body {
          text-align: center;
          .finish-dialog {
            .el-form {
              .el-form-item.is-error {
                .el-form-item__content {
                  .el-form-item__error {
                    padding-top: 0;
                  }
                }
              }
              h1 {
                font-size: @font-size-18;
                margin-bottom: 24px;
              }
              .tips {
                margin: 22px 0;
                font-size: @font-size-14;
                text-align: left;
              }
              .el-form-item__label, .el-checkbox__label {
                color: @c-font-gray2-color;
              }
              .address-ipt {
                text-align: left;
                margin-bottom: 36px;
                div:nth-child(1), div:nth-child(3) {
                  font-size: @font-size-14;
                  color: @c-font-gray2-color;
                }
                div:nth-child(2) {
                  margin: 10px 0;
                  input {
                    height: 34px;
                    line-height: 34px;
                    padding-left: 12px;
                    border: @border2;
                    background: transparent;
                    width: 422px;
                    &:hover {
                      border: @border1;
                    }
                  }
                }
                div:nth-child(3) {
                  justify-content: flex-start;
                  .circle {
                    display: inline-block;
                    width: 5px;
                    height: 5px;
                    border: 2px solid @c-font-gray2-color;
                    border-radius: 50%;
                    margin: 0 5px 0 0;
                    padding: 3px;
                  }
                }
              }
              .form-checkbox.el-form-item {
                margin-top: -20px;
                text-align: left;
                .el-form-item__content {
                  .el-checkbox-group {
                    .el-checkbox {
                      &:hover {
                        .el-checkbox__input {
                          .el-checkbox__inner {
                            border: 2px solid @c-h-color;
                          }
                        }
                      }
                      .el-checkbox__input {
                        vertical-align: text-top;
                        margin-right: -5px;
                        .el-checkbox__inner {
                          background-image: none;
                          display: inline-block;
                          width: 5px;
                          height: 5px;
                          border: 2px solid @c-font-gray2-color;
                          border-radius: 50%;
                          margin: 0 5px 0 0;
                          padding: 3px;
                          &:after {
                            display: none;
                          }
                        }
                        .el-checkbox__label {
                          color: @c-h-color;
                        }
                      }
                      .el-checkbox__input.is-focus {
                        .el-checkbox__inner {
                          border: 2px solid @c-h-color;
                        }
                      }
                      .el-checkbox__input.is-focus + .el-checkbox__label {
                        color: @c-h-color;
                      }
                    }
                  }
                }
              }
              .form-bt {
                .dialog-footer {
                  .el-button {
                    span {
                      font-size: @font-size-14;
                    }
                  }
                  .el-button:nth-child(1) {
                    margin-right: 47px;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
</style>
