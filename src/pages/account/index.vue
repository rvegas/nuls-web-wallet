<template>
  <div class="main-content">
    <div class="center account-index">
      <h3 class="h3">
        <span>{{$t('message.index1')}}：{{ this.addressAlias !== "null" ? this.addressAlias : $t('message.index2')}}</span>
        <i class="iconfont iconfont-common-white cursor-p" v-show="this.addressAlias !== 'null' ? false : true"
           @click="toSetAlias">&#xe61f;</i>
      </h3>
      <h3 class="h3">
        <span>{{$t('message.index3')}}：</span>
        <span>{{this.address}}</span>
        <i class="iconfont iconfont-common-white cursor-p icon-copy" @click="accountCopy(address)">&#xe60f;</i>
        <i class="iconfont iconfont-common-white cursor-p icon-code" @click="qrCode">&#xe61c;</i>
      </h3>
      <div class="account-property">
        <div class="title">
          <i class="iconfont iconfont-common-green">&#xe624;</i>
          <span>{{$t('message.index4')}}</span>
        </div>
        <div class="table-box">
          <table class="table">
            <thead>
            <tr>
              <th>{{$t('message.index5')}}</th>
              <th>{{$t('message.index6')}}</th>
              <th>{{$t('message.index7')}}</th>
              <th>{{$t('message.index8')}}</th>
              <th>{{$t('message.index9')}}</th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td :data-label="$t('message.index5')">NULS</td>
              <td :data-label="$t('message.index6')">{{this.userInfo.balance}}</td>
              <td :data-label="$t('message.index7')" class="text-d" @click="freezeList">{{this.userInfo.locked}}</td>
              <td :data-label="$t('message.index8')">{{this.userInfo.usable}}</td>
              <td :data-label="$t('message.index9')">
                <span class="cursor-p" @click="transferAccounts">{{$t('message.index10')}}</span>
                <span class="cursor-p" @click="makeCollections"><!--{{$t('message.index11')}}--> {{$t('message.zero')}}</span>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="transaction-record">
        <div class="title">
          <i class="iconfont iconfont-common-green">&#xe620;</i>
          <span>{{$t('message.index12')}}</span>
        </div>
        <div class="search flex">
          <div class="search-left">
            <el-select v-model=typeValue :placeholder="$t('message.type0')" @change="selectType">
              <el-option v-for="item in typeOptions" :label="$t('message.type'+item.key)" :value="item.key"
                         :key="item.value">
              </el-option>
            </el-select>
            <el-select v-model="statusValue" :placeholder="$t('message.statusS1')" @change="selectStatus">
              <el-option v-for="item in statusOptions" :key="item.value" :label="$t('message.statusS'+item.key)"
                         :value="item.key">
              </el-option>
            </el-select>
          </div>
          <div class="search-right">
            <div class="date-text">{{$t('message.index17')}}</div>

            <el-date-picker
              v-model="startTime"
              type="date"
              :placeholder="$t('message.createVote18')"
              :picker-options="startDatePicker"
              @change="changeTime">
            </el-date-picker>
            <span class="date-line">—</span>
            <el-date-picker
              v-model="endTime"
              type="date"
              :placeholder="$t('message.createVote19')"
              :picker-options="endDatePicker"
              @change="changeTime">
            </el-date-picker>
            <div class="search-btn">
              <el-button type="primary" @click="emptyAll">{{$t('message.index20')}}</el-button>
            </div>
          </div>
        </div>
        <table class="table" v-loading="loading">
          <thead>
          <tr>
            <th>{{$t('message.index13')}}</th>
            <th>TxID</th>
            <th>{{$t('message.index14')}}</th>
            <th>{{$t('message.index15')}}</th>
            <th>{{$t('message.index16')}}</th>
          </tr>
          </thead>
          <tbody v-if="txList.length!==0">
          <tr v-for="item in txList">
            <td :data-label="$t('message.index13')">{{ $t('message.type'+item.type) }}</td>
            <td data-label="TxID" v-if="item.state===1" class="text-href" @click="transDetail(item.hash,item.state)">
              {{item.hashs}}
            </td>
            <td data-label="TxID" v-else>{{item.hashs}}</td>
            <td :data-label="$t('message.index14')">{{item.createTime}}</td>
            <td :data-label="$t('message.index15')"><span :class="item.amount > 0 ? 'add':'minus'">{{item.amount> 0 ? '+':''}}{{item.amount }}</span>
            </td>
            <td :data-label="$t('message.index16')">{{$t('message.statusS'+item.state)}}</td>
          </tr>
          </tbody>
          <tbody v-else v-loading="loading">
          <tr class="big-show">
            <td colspan="5" class="no-data">{{ $t('message.noData') }}</td>
          </tr>
          <tr class="small-show">
            <td :data-label="$t('message.index13')">{{ $t('message.noData') }}</td>
            <td data-label="TxID">{{ $t('message.noData') }}</td>
            <td :data-label="$t('message.index14')">{{ $t('message.noData') }}</td>
            <td :data-label="$t('message.index15')">{{ $t('message.noData') }}</td>
            <td :data-label="$t('message.index16')">{{ $t('message.noData') }}</td>
          </tr>
          </tbody>
        </table>
        <div class="bottom-pagination flex" v-show="this.totalAll>8 ?true:false">
          <div class="pagination-left">
            <span>{{$t('message.page1')}} {{(pageNumber-1)* pageSize === 0 ? 1 : (pageNumber-1)* pageSize+1}} - {{pageSize*pageNumber>totalAll ? totalAll : pageSize*pageNumber}} {{$t('message.page2')}}</span>
            <!-- <span>总共 {{this.totalAll}} 条</span>-->
          </div>
          <div class="pagination-right flex">
            <!--<span class="first">首页</span>-->
            <el-pagination layout="prev, pager, next" :page-size="8" :total=this.totalAll class="cb" background
                           :current-page.sync="pageNumber"
                           v-show="totalAllOk = this.totalAll > 8 ? true : false"
                           @current-change="txListPages">
            </el-pagination>
            <!--<span class="last">末页</span>-->
            <span class="total">{{$t('message.page3')}}{{this.totalAll}}{{$t('message.page4')}}</span>
          </div>
        </div>
      </div>
      <el-dialog title="" :visible.sync="codeDialogVisible" width="30%" center class="key-wrapper">
        <div class="qr-code"></div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  import moment from 'moment'
  import nulsJs from 'nuls-jssdk'
  import {LeftShiftEight, RightShiftEight, copys, getLocalTime} from '@/utils/util'
  import "@/assets/js/jquery-1.8.2"
  import '@/assets/js/jquery.qrcode.min'

  export default {
    data() {
      return {

        /**
         * 地址
         * address
         * */
        address: localStorage.getItem('address'),
        //addressAlias: localStorage.getItem('addressAlias'),

        /**
         * 二维码弹框
         * Two dimensional code box
         * */
        codeDialogVisible: false,

        /**
         * 账号资产
         * Account assets
         * */
        userInfo: {
          balance: 0,
          locked: 0,
          usable: 0,
        },

        /**
         * 交易记录list
         * Transaction record list
         * */
        txList: [],
        txAllList: [],
        txHashList: [],
        totalAll: 0,
        pageNumber: 1,
        pageSize: 8,

        /**
         * 交易类型
         * Type of transaction
         * */
        typeOptions: [{key: 0,}, {key: 1,}, {key: 2,}, {key: 3,}, {key: 4,}, {key: 5,}, {key: 6,}, {key: 7,}, {key: 8,}, {key: 9,}, {key: 100,}, {key: 101,}, {key: 102,}, {key: 103,}],
        typeValue: 0,

        /**
         * 交易状态
         * Trading state
         * */
        statusOptions: [{key: 0}, {key: 1}],
        statusValue: 1,

        /**
         * 日期插件
         * Date plug-in
         * */
        startTime: new Date(Date.parse(new Date()) - 7 * 24 * 3600 * 1000),
        endTime: new Date(Date.parse(new Date()) + 24 * 3600 * 1000),
        startDatePicker: this.beginDate(),
        endDatePicker: this.processDate(),
        //timeValue: [new Date(Date.parse(new Date()) - 7 * 24 * 3600 * 1000), new Date(Date.parse(new Date()) + 23 * 3600 * 1000)],

        /**
         * 定时器
         * timer
         * */
        homeSetInterval: null,
        homeSetInterval2: null,
        loading: true,
      }
    },
    computed: {
      addressAlias() {
        return this.$store.getters.getAddressAlias ? this.$store.getters.getAddressAlias : 'null';
      },
    },
    created() {

    },
    mounted() {
      this.pageNumber = 1;
      if (localStorage.hasOwnProperty('address')) {
        this.getAddressInfo();
        this.getAddressTxList();
        this.getAlias();
      }
      this.homeSetInterval = setInterval(() => {
        if (localStorage.hasOwnProperty('address')) {
          this.getAddressInfo();
          this.getAddressTxList();
          this.getAlias();
        }
      }, 10000);
    },
    activated() {
      if (localStorage.hasOwnProperty('address')) {
        this.getAddressInfo();
        this.getAddressTxList();
        this.getAlias();
      }
      this.homeSetInterval2 = setInterval(() => {
        if (localStorage.hasOwnProperty('address')) {
          this.getAddressInfo();
          this.getAddressTxList();
          this.getAlias();
        }
      }, 10000);
    },
    deactivated: function () {
      clearInterval(this.homeSetInterval);
      clearInterval(this.homeSetInterval2);
    },
    // destroyed() {
    //   clearInterval(this.homeSetInterval);
    // },
    methods: {

      /**
       * 根据地址获取账户交易列表
       * Tx info by address
       * @param address
       **/
      getAddressTxList() {
        let _this = this;
        let params = {
          "address": localStorage.getItem("address"),
          "pageNumber": this.pageNumber,
          "pageSize": this.pageSize,
          "type": this.typeValue,
          "startTime": this.startTime ? Date.parse(this.startTime) : '',
          "endTime": this.endTime ? Date.parse(this.endTime) + 24 * 3600 * 1000 : ''
        };
        //console.log(params);
        if (this.statusValue === 0) {
          nulsJs.getWebwalletTxByAddress(params, function (data) {
            //console.log(data);
            if (data.success) {
              _this.loading = false;
              _this.txList = data.data.list;
              _this.totalAll = data.data.total;
              for (let i = 0; i < data.data.list.length; i++) {
                if (data.data.list[i].type.toString() === '4' || data.data.list[i].type.toString() === '5') {
                  data.data.list[i].amount = "lock" + LeftShiftEight(data.data.list[i].amount).toString();
                } else if (data.data.list[i].type.toString() === '6' || data.data.list[i].type.toString() === '9') {
                  data.data.list[i].amount = "unlock" + LeftShiftEight(data.data.list[i].amount).toString();
                } else {
                  data.data.list[i].amount = LeftShiftEight(data.data.list[i].amount).toString();
                }
                data.data.list[i].hashs = data.data.list[i].hash.substr(0, 20) + '...' + data.data.list[i].hash.substr(data.data.list[i].hash.length - 20, 20);
                data.data.list[i].createTime = moment(getLocalTime(data.data.list[i].createTime)).format('YYYY-MM-DD HH:mm:ss');
                data.data.list[i].state = 0;
              }
            } else {
              _this.loading = false;
              console.log('getWebwalletTxByAddress');
              _this.$message({
                message: _this.$t('message.failed') + ':' + _this.$t('message.' + data.code),
                type: 'warning',
                duration: '1000'
              });
            }
          });
        } else {
          nulsJs.getTxListByAddress(params, function (data) {
            //console.log(data);
            if (data.success) {
              _this.loading = false;
              _this.txList = data.data.list;
              _this.totalAll = data.data.total;
              for (let i = 0; i < data.data.list.length; i++) {
                // for (let i in data.data.list) {
                if (data.data.list[i].type.toString() === '4' || data.data.list[i].type.toString() === '5') {
                  data.data.list[i].amount = "lock" + LeftShiftEight(data.data.list[i].amount).toString();
                } else if (data.data.list[i].type.toString() === '6' || data.data.list[i].type.toString() === '9') {
                  data.data.list[i].amount = "unlock" + LeftShiftEight(data.data.list[i].amount).toString();
                } else {
                  data.data.list[i].amount = LeftShiftEight(data.data.list[i].amount).toString();
                }
                data.data.list[i].hashs = data.data.list[i].hash.substr(0, 20) + '...' + data.data.list[i].hash.substr(data.data.list[i].hash.length - 20, 20);
                data.data.list[i].createTime = moment(getLocalTime(data.data.list[i].createTime)).format('YYYY-MM-DD HH:mm:ss');
                data.data.list[i].state = 1;
              }
            } else {
              _this.loading = false;
              console.log('getTxListByAddress');
              _this.$message({
                message: _this.$t('message.failed') + ':' + _this.$t('message.' + data.code),
                type: 'warning',
                duration: '1000'
              });
            }
          });
        }
      },

      /**
       * 根据地址获取账户信息
       * User info by address
       **/
      getAddressInfo() {
        let _this = this;
        nulsJs.getAccountByAddress({"address": localStorage.getItem("address")}, function (data) {
          //console.log(data);
          if (data.success) {
            _this.userInfo.balance = LeftShiftEight(data.data.usable + data.data.locked).toString();
            _this.userInfo.locked = LeftShiftEight(data.data.locked).toString();
            _this.userInfo.usable = LeftShiftEight(data.data.usable).toString();
          } else {
            console.log('index');
            _this.$message({
              message: _this.$t('message.failed') + ':' + _this.$t('message.' + data.code),
              type: 'warning',
              duration: '1000'
            });
          }
        });
      },

      /**
       * 根据地址获取账户交易列表分页
       * Tx list pages by address
       * @param events
       **/
      txListPages(events) {
        this.pageNumber = events;
        this.getAddressTxList(events);
      },

      /**
       *根据交易类型获取交易列表
       * Get tx list by type
       **/
      selectType() {
        this.loading = true;
        this.getAddressTxList();
      },

      /**
       * 根据时间段搜索
       * Search according to time
       */
      changeTime() {
        this.getAddressTxList();
      },

      /**
       *根据交易状态获取交易列表
       * Get tx list by status
       **/
      selectStatus() {
        this.loading = true;
        this.getAddressTxList();
      },

      /**
       * 清空搜索条件
       * Empty search condition
       **/
      emptyAll() {
        this.typeValue = '';
        this.statusValue = '';
        this.startTime = '';
        this.endTime = '';
        this.getAddressTxList();
      },

      /**
       * 去设置别名
       * To set Alias
       **/
      toSetAlias() {
        this.$router.push({
          name: '/setAlias',
        })
      },

      /**
       * 复制方法
       * copy
       **/
      accountCopy(info) {
        copys(info);
        this.$message({
          message: this.$t('message.copyS'), type: 'success', duration: '1000'
        });
      },

      /**
       * 点击生成二维码
       * Click generated two-dimensional code
       * */
      codeMaker(codeInfo) {
        $('.qr-code').html("");
        $('.qr-code').qrcode({
          render: "canvas",
          // width: 276,
          // height: 276,
          text: codeInfo,
          typeNumber: -1,
          correctLevel: 2,
          background: "#fff",
          foreground: "#000"
        });
      },
      qrCode(boolean) {
        this.codeDialogVisible = true;
        this.$nextTick(function () {
          this.codeMaker(this.address);
        })
      },

      /**
       * 转账
       * Transfer accounts
       * */
      transferAccounts() {
        this.$store.commit('setActiveNav', '2');
        sessionStorage.setItem("activeNav", '2');
        this.$router.push({
          name: '/transAccount'
        });
      },

      /**
       * 收款
       * Receivables
       * */
      async makeCollections() {
        this.$store.commit('setActiveNav', '1');
        sessionStorage.setItem("activeNav", '1');
        this.$router.push({
          name: '/zeroToWhole'
        });
      },
      /**
       * 交易详情
       * transaction details
       * */
      transDetail(hash, state) {
        this.$router.push({
          name: '/transDetail',
          query: {hash: hash, state: state}
        });
      },

      /**
       * 跳转冻结列表
       * freeze list
       * */
      freezeList() {
        this.$router.push({
          name: '/freezeList'
        });
      },

      /**
       * 获取别名
       * Get an alias
       **/
      getAlias() {
        let _this = this;
        if (localStorage.getItem('addressAlias') === 'null') {
          nulsJs.getAlias({"address": localStorage.getItem('address')}, function (data) {
            //console.log(data);
            if (data.success) {
              if (data.data.alias) {
                _this.addressAlias = data.data.alias;
                _this.$store.commit('setAddressAlias', data.data.alias);
                localStorage.setItem('addressAlias', data.data.alias);
              }
            } else {
              _this.$message({
                message: _this.$t('message.failed') + ':' + _this.$t('message.' + data.code),
                type: 'warning',
                duration: '1000'
              });
            }
          });
        }
      },
      beginDate() {
        return {
          disabledDate(time) {
            return new Date().getTime() < time.getTime()
          }
        }
      },

      /**
       * 结束时间必须大于开始时间
       * End time must be greater than start time
       * */
      processDate() {
        let _this = this;
        return {
          disabledDate(time) {
            if (_this.startTime) {
              // return new Date(_this.createVoteForm.startTime).getTime() > time.getTime() || time.getTime() > Date.now()
              return new Date(_this.startTime).getTime() - 23 * 3600 * 1000 > time.getTime() || new Date().getTime() < time.getTime();
            } else {
              return new Date().getTime() < time.getTime()
            }
          }
        }
      },
    },

    beforeRouteEnter(to, from, next) {
      if (from.name === '/transDetail') {
        to.meta.keepAlive = true;
      } else {
        to.meta.keepAlive = false;
      }
      next();
    },
    beforeRouteLeave(to, from, next) {
      //清除定时器 Clear timer
      clearInterval(this.homeSetInterval);
      clearInterval(this.homeSetInterval2);
      if (to.name === '/transDetail') {
        from.meta.keepAlive = true;
      } else {
        from.meta.keepAlive = false;
      }
      next();
    },
  }
</script>

<style lang="less" type="text/less">
  @import url("./../../assets/css/style.less");

  .account-index {
    text-align: center;
    margin-top: 55px;
    h3 {
      font-size: @font-size-20;
      margin-bottom: 15px;
    }
    h3:nth-child(1) {
      span {
        padding-right: 10px;
      }
      .icon-alias {
        background-position: -243px -60px;
      }
    }
    h3:nth-child(2) {
      margin-bottom: 20px;
      span:nth-child(2) {
        color: @c-font-yellow1-color;
        padding-right: 10px;
      }
    }
    .account-property {
      margin-bottom: 30px;
      .title {
        text-align: left;
        font-size: @font-size-16;
        margin-bottom: 10px;
        .icon-account {
          background-position: -212px -60px;
          cursor: initial;
        }
      }
      .table-box {
        border: @border1;
        table {
          width: 100%;
          border-collapse: collapse;
          .no-data {
            min-height: 50px;
          }
          th {
            border-bottom: 1px solid @table-td-bd;
            border-right: 1px solid @table-td-bd;
          }
          td {
            border-right: 1px solid @table-td-bd;
          }
          td:nth-child(3) {
            cursor: pointer;
          }
          td:nth-child(3):hover {
            color: @c-font-blue1-color
          }
          td:last-child {
            color: @c-font-blue1-color;
            span {
              padding: 0 5px;
            }
            span:last-child {
              border-left: @border1;
              padding-left: 10px;
            }
          }
        }
      }
    }
    .transaction-record {
      .title {
        text-align: left;
        font-size: @font-size-16;
        margin-bottom: 10px;
        .icon-record {
          height: 16px;
          background-position: -243px -25px;
          cursor: initial;
        }
      }
      .search {
        margin-bottom: 10px;
        .search-left {
          .el-select {
            margin-right: 10px;
            .el-input {
              .el-select__caret {
                color: @c-font-blue1-color;
                line-height: 0;
              }
            }
          }
        }
        .search-right {
          /*position: relative;*/
          display: flex;
          justify-content: start;
          align-items: center;
          div:nth-child(1) {
            display: inline-block;
            margin-right: 5px;
            font-size: @font-size-14;
          }
          .date-line {
            margin: 0 8px;
          }
          .el-date-editor {
            background: @bg-color;
            border: none;
            width: 150px;
            .el-input__inner {
              height: 34px;
              line-height: 34px;
            }

            /*.el-range-separator {*/
            /*line-height: 34px;*/
            /*width: 7%;*/
            /*}*/
            .el-input__icon {
              display: none;
              &:after {
                display: none;
              }
            }
            .el-range-input {
              cursor: pointer;
              background: @bg-1-color;
              border: @border2;
              border-radius: 2px;
              height: 34px;
              line-height: 34px;
              color: @c-color;
              &::-webkit-input-placeholder {
                font-size: @font-size;
                color: @c-ipt-placeholder;
              }
              &::-moz-placeholder {
                font-size: @font-size;
                color: @c-ipt-placeholder;
              }
              &:hover {
                border: @border1;
              }
            }
          }
          .search-btn {
            /*position: absolute;*/
            /*top: 3px;*/
            /*right: 0;*/
            margin-left: 5px;
            .el-button {
              width: 50px;
              height: 34px;
            }
          }
        }
        /*@media screen and (max-width: 768px) {*/
        /*.search-left, .search-right {*/
        /*text-align: left;*/
        /*}*/

        /*.search-right {*/
        /*.search-btn {*/
        /*position: absolute;*/
        /*left: 282px;*/
        /*}*/
        /*}*/
        /*}*/
      }
      table {
        td.no-data {
          height: 100px;
          line-height: 100px;
        }
        th:first-child, td:first-child {
          padding-left: 40px;
        }
        th:last-child, td:last-child {
          padding-right: 40px;
        }
        @media screen and (max-width: 768px) {
          th:first-child, td:first-child {
            padding-left: 0;
          }

          th:last-child, td:last-child {
            padding-right: 0;
          }

          td.no-data {
            text-align: center;
          }
        }
        .add {
          color: #82bd39;
        }
        .minus {
          color: #f64b3e;
        }
      }
      .bottom-pagination {
        margin-top: 10px;
        @media screen and (max-width: 768px) {
          position: relative;
          .pagination-left {
            position: absolute;
            top: 32px;
            left: 49px;
          }

          .pagination-right {
            .total {
              position: absolute;
              top: 32px;
              right: 49px;
            }
          }
        }
      }
    }
    .el-dialog__wrapper {
      .el-dialog {
        min-width: 440px;
        .el-dialog__body {
          .qr-code {
            width: 276px;
            height: 276px;
            margin: 50px auto;
            background: #fff;
            padding: 10px;
          }
        }
      }
    }
    @media screen and (max-width: 768px) {
      h3:nth-child(2) {
        position: relative;
        .iconfont {
          position: absolute;
          top: 4px;
        }
        .icon-copy {
          right: 28px;
        }
        .icon-code {
          right: 58px;
        }
        span:nth-child(2) {
          display: block;
          font-size: @font-size-16;
        }
      }

      .account-property {
        .table-box {
          background: @bg-1-color;
          .table {
            tr {
              border: 0;
              td {
                border-right: 0;
              }
            }
            td:last-child {
              border-bottom: 0;
              margin-bottom: 0;
            }
          }
        }
      }

      .transaction-record {
        .search {
          .search-left {
            text-align: left;
            margin-bottom: 5px;
            display: flex;
            justify-content: start;
            .el-select {
              margin-right: 0;
              .el-input {
                .el-input__inner {
                  /*width:84%;*/
                }
                .el-input__suffix {
                  /*right:40px;*/
                }
              }
            }
            .el-select:nth-child(2) {
              margin-left: 25px;
            }
          }
          .search-right {
            text-align: left;
            display: flex;
            justify-content: start;
            div.date-text {
              display: none;
            }
            .el-date-editor {
              margin-right: 0;
              width: auto;
              .el-range-input {
                width: 50%;
              }
            }
            .search-btn {
              position: initial;
            }
          }
        }
      }

      .el-dialog__wrapper {
        .el-dialog {
          min-width: 320px;
          .el-dialog__body {
            padding: 10px 0;
            .qr-code {
              /*width: 170px;*/
              /*height: 170px;*/
              margin: 10px auto;
              background: #fff;
              padding: 10px;
            }
          }
        }
      }
    }
  }

  .el-popup-parent--hidden {
    padding-right: 0 !important;
  }
</style>
