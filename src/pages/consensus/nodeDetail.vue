<template>
  <div class="main-content">
    <div class="center node-detail">
      <BackBar :backTitle="$t('message.nodeDetailBackName')"></BackBar>
      <h1>{{nodeInfo.agentId}}</h1>
      <div class="node-basic-info">
        <div class="title">
          <i class="icon-node1 iconfont iconfont-common-green">&#xe609;</i>
          <span>{{$t('message.nodeDetail2')}}</span>
        </div>
        <div class="detail flex" v-loading="loading">
          <ul class="detail-ul-left">
            <li>
              <span>{{$t('message.nodeDetail3')}}</span>
              <span>{{nodeInfo.agentAddress}}</span>
            </li>
            <li>
              <span>{{$t('message.nodeDetail4')}}</span>
              <span>{{nodeInfo.rewardAddress}}</span>
            </li>
            <li>
              <span>{{$t('message.nodeDetail5')}}</span>
              <span>{{nodeInfo.packingAddress}}</span>
            </li>
            <li>
              <span>{{$t('message.nodeDetail20')}}</span>
              <span>{{nodeInfo.commissionRate}}%</span>
            </li>
            <li>
              <span>{{$t('message.allConsensusInfo9')}}</span>
              <span>{{nodeInfo.deposit}} NULS</span>
            </li>
            <li class="flex-common">
              <span>{{$t('message.allConsensusInfo13')}}</span>
              <!--<ProgressBar :colorData="nodeInfo.creditValue < 0 ? '#f64b3e':'#82bd39'"-->
              <!--:widthData="nodeInfo.creditValue < 0 ? (nodeInfo.creditValue+1)/50 +'%': nodeInfo.creditValue === 0 ? '50%':(nodeInfo.creditValue+1)/50 +'%'"></ProgressBar>-->
              <ProgressBar :colorData="nodeInfo.creditValue <=0 ? '#f64b3e':'#82bd39'"
                           :widthData="nodeInfo.creditValue< 0 ? nodeInfo.creditValue*(-50)+'%':nodeInfo.creditValue*100+'%'"></ProgressBar>
              <span>{{this.nodeInfo.creditValue}}</span>

            </li>
          </ul>
          <ul class="detail-ul-right">
            <li>
              <span>{{$t('message.nodeDetail14')}}</span>
              <span>{{nodeInfo.createTime}}</span>
            </li>
            <li>
              <span>{{$t('message.allConsensusInfo11')}}</span>
              <span>{{nodeInfo.depositCount}}</span>
            </li>
            <li>
              <span>{{$t('message.allConsensusInfo12')}}</span>
              <span>{{nodeInfo.totalDeposit}} NULS</span>
            </li>
            <li>
              <span>{{$t('message.nodeDetail15')}}</span>
              <span v-if="nodeInfo.totalReward==='0'">{{nodeInfo.totalReward}} NULS</span>
              <span class="text-href" @click="totalReward" v-else>{{nodeInfo.totalReward}} NULS</span>
            </li>
            <li>
              <span>{{$t('message.nodeDetail6')}}</span>
              <span>{{nodeInfo.yellowCardNum}} {{$t('message.nodeDetail7')}}</span>
            </li>
          </ul>
          <p class="icon-status">
            <i class="icon-common" :class="nodeInfo.status === 1 ? 'icon-status-green' : 'icon-status-red'"></i>
            <span class="icon-text" :class="language === 'cn' ? 'icon-text1' : 'icon-text2'">{{nodeInfo.status === 1 ? $t('message.status1') : $t('message.status0')}}</span>
          </p>
        </div>
      </div>
      <div class="join-before" v-show="join">
        <div class="title">
          <i class="icon-node2 iconfont iconfont-common-green">&#xe60d;</i>
          <span>{{$t('message.nodeDetail8')}}</span>
        </div>
        <div class="join-before-box" v-loading="loading1">
          <div class="join-before-box-main">
            <el-form :model="nodeForm" :rules="nodeRules" ref="nodeForm" @submit.native.prevent>
              <el-form-item :label="$t('message.nodeDetail16')" prop="bond">
                <el-input type="text" v-model="nodeForm.bond" @change="getaddConsensusFee"></el-input>
                <div class="bond-balance">{{$t('message.myConsensus5')}}：{{this.addressUsable}} NULS</div>
              </el-form-item>
              <div class="poundage">
                <span>{{$t('message.fees')}}</span>
                <span>{{this.addConsensusFee}} NULS</span>
              </div>
              <div class="bottom-btn">
                <el-button @click="join = false">{{$t('message.nodeDetail10')}}</el-button>
                <el-button type="primary" @click="addNodeSubmit('nodeForm')">{{$t('message.nodeDetail111')}}</el-button>
              </div>
            </el-form>
          </div>
        </div>
      </div>
      <div class="join-after" v-show="!join && userAddressFlg">
        <div class="title flex">
          <div class="title-left">
            <i class="icon-node3 icon-common"></i>
            <span>{{$t('message.nodeDetail12')}}</span>
          </div>
          <div class="title-right">
            <span class="cursor-p" @click="addNode" v-show="userAddressFlg">{{$t('message.nodeDetail13')}}</span>
          </div>
        </div>
        <div class="join-after-box" v-loading="loading2">
          <table boeder="1">
            <thead>
            <tr>
              <th>{{$t('message.sort0')}}</th>
              <th>{{$t('message.index16')}}</th>
              <th>{{$t('message.index14')}}</th>
              <th>{{$t('message.index9')}}</th>
            </tr>
            </thead>
            <tbody v-if="nodeList.length!=0">
            <tr v-for="(item,index) in nodeList">
              <td :data-label="$t('message.sort0')" :tt="item.state"> {{item.amount}}</td>
              <td :data-label="$t('message.index16')"><span>{{$t('message.statusS'+item.state)}}</span></td>
              <td :data-label="$t('message.index14')">{{item.createTime}}</td>
              <td :data-label="$t('message.index9')" :tt="exitFlg" :tr="index">
                <!--<el-button @click="outNode(index,item.txHash)" type="text" size="small">{{exitFlg===index ? $t('message.exitFlg0') : $t('message.nodeDetail19')}}-->
                <!--</el-button>-->
                <el-button @click="outNode(index,item.txHash)" type="text" size="small" :class="item.exitState==='0' ? 'btn-disabled' : ''" :disabled="item.exitState==='0' ? true : false">{{item.exitState==='0' ? $t('message.exitFlg0') : $t('message.nodeDetail19')}}
                </el-button>
              </td>
            </tr>
            </tbody>
            <tbody v-else>
            <tr class="big-show">
              <td colspan="5" class="no-data">{{ $t('message.noData') }}</td>
            </tr>
            <tr class="small-show">
              <td :data-label="$t('message.sort0')">{{ $t('message.noData') }}</td>
              <td :data-label="$t('message.index16')">{{ $t('message.noData') }}</td>
              <td :data-label="$t('message.index14')">{{ $t('message.noData') }}</td>
              <td :data-label="$t('message.index9')">{{ $t('message.noData') }}</td>
            </tr>
            </tbody>
          </table>
          <div class="bottom-pagination flex" v-show="this.totalAll>5 ?true:false">
            <div class="pagination-left">
              <span>{{$t('message.page1')}} {{(pageNumber-1)* pageSize === 0 ? 1 : (pageNumber-1)* pageSize+1}} - {{pageSize*pageNumber>totalAll ? totalAll : pageSize*pageNumber}} {{$t('message.page2')}}</span>
            </div>
            <div class="pagination-right flex">
              <!-- <span class="first">首页</span>-->
              <el-pagination layout="prev, pager, next" :page-size="5" :total=this.totalAll class="cb" background :current-page.sync="pageNumber"
                             v-show="totalAllOk = this.totalAll>5 ?true:false"
                             @current-change="myNodeListSize">
              </el-pagination>
              <!--<span class="last">末页</span>-->
              <span class="total">{{$t('message.page3')}}{{this.totalAll}}{{$t('message.page4')}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Password ref="password" @toSubmit="toSubmit"></Password>
  </div>
</template>

<script>
  import moment from 'moment'
  import nulsJs from 'nuls-jssdk'
  import {BigNumber} from 'bignumber.js'
  import {LeftShiftEight,RightShiftEight,getLocalTime} from '@/utils/util'
  import Password from '@/components/PasswordBar.vue'
  import ProgressBar from '@/components/ProgressBar.vue'
  import BackBar from './../../components/BackBar'
  import {numbers} from '@/utils/validate'

  export default {
    data() {
      let checkNodeNo = (rule, value, callback) => {
        if (!value) {
          callback(new Error(this.$t('message.nodeDetail17')))
        } else if (!numbers(value)) {
          callback(new Error(this.$t('message.nodeDetail18')))
        } else if (value < 2000 || value > 500000) {
          callback(new Error(this.$t('message.nodeDetail18')))
        }else if(Number(value) >= Number(this.addressUsable)){
          callback(new Error(this.$t('message.noMoney2')));
        }else if(!localStorage.hasOwnProperty('address')){
          callback(new Error(this.$t('message.prompt')))
        } else {
          callback()
        }
      };

      return {
        join: false,
        /**
        * 节点信息 node info
        * node info
        * */
        nodeInfo: [],
        agentHash: this.$route.query.agentHash,
        outTxHash: '',
        /**
         * 是否导入账户标志
         * import account marks
         * */
        userAddressFlg:localStorage.hasOwnProperty('address') ? localStorage.hasOwnProperty('address'):'',
        /**
         * 委托列表
         * Delegate list
         * */
        nodeList: [],
        totalAll: 0,
        pageNumber: 1,
        pageSize: 5,
        /**
         * 余额
         * balance
         * */
        addressUsable: 0,
        /**
         * 手续费
         * fee
         * */
        addConsensusFee: 0,
        /**
         * 表单信息
         * form fields
         * */
        nodeForm: {
          bond: '',
        },
        loading1:false,
        loading2:false,
        /**
         * 列表索引值
         * List index value
         * */
        rowIndex: -1,
        /**
         * 表单验证信息
         * Form validation information
         * */
        nodeRules: {
          bond: [
            {validator: checkNodeNo, trigger: 'blur'}
          ],
        },
        nodeDetailSetInterval:null,
        /**
        * 点击退出时，当前行的索引值
        * Index value of current row when clicking exit
        * */
        tdIndex:'',
        outTxHashList:[],
        loading:true,
      }
    },
    components: {
      Password,
      ProgressBar,
      BackBar
    },
    computed: {
      language () {
        return this.$store.getters.getLang ? this.$store.getters.getLang : 'en'
      },
      exitFlg () {
        return this.$store.getters.getExitFlg ? this.$store.getters.getExitFlg : -1
      },
    },
    created() {
      this.getNodeInfo();
      if(localStorage.hasOwnProperty('address')){
        this.getMyAgentNodeList();
        this.getAccountBalance(localStorage.getItem('address'));
      }
    },
    mounted() {
      this.nodeDetailSetInterval = setInterval(() => {
        //this.$store.commit('setExitFlg',-1);
        if(this.nodeList.length > 0){
          this.pageNumber=1;
          if(localStorage.hasOwnProperty('address')){
            this.getMyAgentNodeList();
            this.getAccountBalance(localStorage.getItem('address'));
          }
        }
        this.getNodeInfo();
      }, 10000);
    },
    destroyed() {
      clearInterval(this.nodeDetailSetInterval)
    },
    methods: {

      /**
       * 获取节点详情
       * Get node info
       */
      getNodeInfo() {
        let _this = this;
        nulsJs.getConsensusAgentDetail({"address": this.$route.query.packingAddress}, function (data) {
          //console.log(data);
          if (data.success) {
            _this.agentHash = data.data.txHash;
            _this.nodeInfo = data.data;
            _this.nodeInfo.yellowCard = 30;
            _this.nodeInfo.deposit = LeftShiftEight(data.data.deposit).toString();
            _this.nodeInfo.createTime = moment(getLocalTime(data.data.createTime)).format('YYYY-MM-DD HH:mm:ss');
            _this.nodeInfo.totalDeposit = LeftShiftEight(data.data.totalDeposit).toString();
            _this.nodeInfo.totalReward = LeftShiftEight(data.data.totalReward).toString();
            _this.loading=false;
          }else{
            _this.loading=false;
            _this.$message({
              message: _this.$t('message.failed') +':'+_this.$t('message.'+data.code), type: 'warning', duration: '1000'
            });
          }
        });
      },

      /**
       * 获取当前节点的我参与记录
       * Get my participation record of the current node
       **/
      getMyAgentNodeList(pageNumber = "1", pageSize = "5") {
        let _this = this;
        _this.$store.commit('setExitFlg',-1);
        nulsJs.getMyAgentEntrustList({
          "pageNumber": pageNumber,
          "pageSize": pageSize,
          "agentHash": _this.agentHash,
          "address": localStorage.getItem("address")
        }, function (data) {
         // console.log(data);
          if (data.success) {
            _this.nodeList = data.data.list;
            _this.totalAll = data.data.total;
            for (let i in data.data.list) {
              data.data.list[i].amount = LeftShiftEight(data.data.list[i].amount).toString();
              data.data.list[i].state = 1;
              data.data.list[i].exitState = 1;
              data.data.list[i].createTime = moment(getLocalTime(data.data.list[i].createTime)).format('YYYY-MM-DD HH:mm:ss');
                let sessionOutTxHash=JSON.parse(sessionStorage.getItem('outTxHashList'));
                  for(let j in sessionOutTxHash){
                    if(data.data.list[i].txHash===sessionOutTxHash[j]){
                      data.data.list[i].exitState='0';
                    }
                  }
            }
            if (data.data.list.length === 0) {
              _this.join = true;
            }
          }else{
            _this.$message({
              message: _this.$t('message.failed') +':'+_this.$t('message.'+data.code), type: 'warning', duration: '1000'
            });
          }
        });
      },

      /**
       * 分页功能
       * pages
       * @param events
       */
      myNodeListSize(events) {
        this.getMyAgentNodeList(events);
      },

      /**
       * 追加节点
       * add node
       */
      addNode() {
        this.join = true;
        this.getAccountBalance(localStorage.getItem('address'));
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
       * 获取手续费
       * Get fee
       **/
      getaddConsensusFee() {
        let _this = this;
        if (this.nodeForm.bond > 0 && Number(this.nodeForm.bond) <= Number(this.addressUsable)) {
          let params = {
            "address": localStorage.getItem("address"),
            "agentHash": _this.agentHash,
            "money": RightShiftEight(_this.nodeForm.bond).toString(),
            "types": "5"
          };
          nulsJs.getTransFee(params, function (data) {
            //console.log(data);
            if (data.success) {
              _this.addConsensusFee = LeftShiftEight(data.data.fee).toString()
            }else{
              _this.$message({
                message: _this.$t('message.failed') +':'+_this.$t('message.'+data.code), type: 'warning', duration: '1000'
              });
            }
          });
        }
      },

      /**
       * 加入共识提交
       * @param formName
       */
      addNodeSubmit(formName) {
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
        let params = '';
        if (this.join) {
          _this.loading1=true;
          params = {
            "address": localStorage.getItem("address"),
            "agentHash": _this.agentHash,
            "pri": localStorage.getItem("encryptedPrivateKey"),
            "pub":localStorage.getItem('pubKey'),
            "pass": password,
            "money": RightShiftEight(_this.nodeForm.bond).toString(),
            "types": "5"
          };
        } else {
          _this.loading2=true;
          params = {
            "address": localStorage.getItem("address"),
            "agentHash": this.outTxHash,
            "pri": localStorage.getItem("encryptedPrivateKey"),
            "pub":localStorage.getItem('pubKey'),
            "pass": password,
            "money": "2",
            "types": "6"
          }
        }
        //console.log(params);
        nulsJs.transaction(params, function (data) {
          //console.log(data);
          if (data.success) {
            _this.loading1=false;
            _this.loading2=false;
            if(!_this.join){
              _this.$store.commit('setExitFlg',_this.rowIndex);
              _this.outTxHashList.push(_this.outTxHash);
              sessionStorage.setItem('outTxHashList',JSON.stringify(_this.outTxHashList));
              let sessionOutTxHash=JSON.parse(sessionStorage.getItem('outTxHashList'));
              for(let i in _this.nodeList){
                for(let j in sessionOutTxHash){
                  if(_this.nodeList[i].txHash===sessionOutTxHash[j]){
                    _this.nodeList[i].exitState='0';
                  }
                }
              }
            }
            _this.join = false;
            _this.nodeForm.bond='';
            _this.$message({
              message: _this.$t('message.success'), type: 'success', duration: '1000'
            });
          } else {
            _this.loading1=false;
            _this.loading2=false;
            _this.$message({
              message: _this.$t('message.failed') +':'+_this.$t('message.'+data.code), type: 'warning', duration: '1000'
            });
          }

        });
      },

      /**
       * 移除节点
       * @param txHash
       */
      outNode(index,txHash) {
        this.outTxHash = txHash;
        this.$refs.password.showPassword(true);
        this.rowIndex=index;
      },
      /**
       * 累计奖励跳转
       * to Accumulative reward
       */
      totalReward(){
        //window.open('https://nulscan.io/accountInfo?address='+this.nodeInfo.packingAddress, '_blank')
        window.open(this.$store.getters.getBrowserAddress+'accountInfo?address='+this.nodeInfo.agentAddress, '_blank')
      },
    },
    beforeRouteLeave(to, from, next) {
      if(to.name ==='/myConsensus'||to.name ==='/allConsensus'){
        to.meta.keepAlive = true;
      }else {
        to.meta.keepAlive = false;
      }
      next();
    },
  }
</script>

<style lang="less" type="text/less">
  @import url("./../../assets/css/style.less");

  .node-detail {
    text-align: center;
    margin-top:10px;
    .back{
      margin-top:20px;
      margin-bottom:0;
    }
    h1 {
      font-size: @font-size-16;
      margin-bottom: 22px;
    }
    .node-basic-info {
      .title {
        font-size: @font-size-16;
        margin-bottom: 12px;
        text-align: left;
        .icon-node1 {
          background-position: -311px -26px;
          height: 16px;
        }
      }
      .detail {
        border: @border1;
        padding: 34px 87px 34px 20px;
        align-items: start;
        position: relative;
        margin-right: 6px;
        ul {
          margin-bottom: 20px;
          li {
            font-size: @font-size-16;
            margin-bottom: 15px;
            text-align: left;
            span:nth-child(1) {
              display: inline-block;
              width: 140px;
              text-align: right;
            }
            span:nth-child(2) {
              text-align: left;
            }
          }
        }
        ul.detail-ul-left {
          .bar-bg{
            width: 280px;
            margin-right:5px;
          }
          li:last-child {
            margin-bottom: -10px;
            justify-content: start;
            .bar-bg {
              margin-top: 5px;
            }
          }
        }
        ul.detail-ul-right {
          li {
            span:nth-child(1) {
              width: 145px;
            }
          }
        }
        .icon-status {
          position: absolute;
          top: -7px;
          right: -6px;
          i {
            width: 56px;
            height: 54px;
          }
          .icon-text{
            position: absolute;
            transform: rotate(45deg);
          }
          .icon-text1{
            top: 11px;
            right: 4px;
          }
          .icon-text2{
            top: 14px;
            right: 9px;
          }
          .icon-status-green {
            background-position: -191px -115px;
          }
          .icon-status-red {
            background-position: -277px -116px;
          }
        }
      }
      @media screen and (max-width: 880px) {
        .detail {
          display:block;
        }
      }
      @media screen and (max-width: 575px) {
        .detail {
          padding-left:0;
          padding-right:0;
        }
      }
    }
    .join-before {
      margin-top: 25px;
      .title {
        font-size: @font-size-16;
        margin-bottom: 12px;
        text-align: left;
        .icon-node2 {
          background-position: -310px -58px;
          height: 16px;
        }
      }
      .join-before-box {
        border: @border1;
        padding: 50px 0 40px;
        .join-before-box-main {
          max-width: 520px;
          margin: auto;
          text-align: left;
          font-size: @font-size-14;
          .el-form {
            .el-form-item {
              display: flex;
              align-items: center;
              justify-content: flex-start;
              .el-form-item__label {
                padding: 0;
                width: 96px;
                text-align: right;
              }
              .el-form-item__content {
                position: relative;
                width: 83%;
                .bond-balance {
                  position: absolute;
                  top: -25px;
                  right: 0;
                  color: @c-font-gray-color;
                  font-size: @font-size;
                }
                .all {
                  position: absolute;
                  top: 0;
                  right: -32px;
                  font-size: @font-size;
                  color: @c-font-blue1-color;
                }
                @media screen and (max-width: 590px) {
                  .all {
                    top: 27px;
                    right: 6px;
                  }
                }
              }
            }
            .poundage {
              span:nth-child(1) {
                display: inline-block;
                width: 96px;
                text-align: right;
              }
            }
            .bottom-btn {
              text-align: center;
              margin-top: 20px;
              .el-button {
                width: 150px;
              }
              .el-button:nth-child(1) {
                margin-right: 84px;
              }
              @media screen and (max-width: 420px) {
                .el-button:nth-child(1) {
                  margin-right: 0;
                }
              }
            }
          }
        }
      }
    }
    .join-after {
      margin-top: 25px;
      .title {
        font-size: @font-size-16;
        margin-bottom: 12px;
        .icon-node3 {
          background-position: -347px -58px;
          height: 16px;
        }
        .title-left {

        }
        .title-right {
          font-size: @font-size-16;
          margin-right: 112px;
          span:first-child {
            color: @c-font-blue1-color;
            /*padding-right:10px;*/
          }
        }
      }
      .join-after-box {
        padding-bottom: 15px;
        .el-table {
          th {
            border-bottom: @border1;
          }
          td:last-child {
            cursor: pointer;
          }
        }
        .bottom-pagination {
          margin: 10px 15px 0;
        }
      }
    }
  }
</style>
