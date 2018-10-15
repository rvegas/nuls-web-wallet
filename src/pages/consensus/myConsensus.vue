<template>
  <div class="main-content">
    <div class="center my-consensus">
      <div class="consensus-describe flex">
        <div class="describe-left describe">
          <div class="describe-title flex-common">
            <div class="title-left">
              <i class="icon-consensus1 iconfont iconfont-common-green">&#xe618;</i>
              <span>{{$t('message.myConsensus1')}}</span>
            </div>
            <div class="title-right cursor-p" @click="toAllConsensus">{{$t('message.myConsensus2')}}</div>
          </div>
          <div class="describe-box">
            <!--<div class="flex-common">-->
              <!--<div>{{$t('message.myConsensus3')}}</div>-->
              <!--<div v-show="!myConsensusInfo.packingAddress">0</div>-->
              <!--<div v-show="myConsensusInfo.packingAddress" class="text-href" @click="nodeDetail(myConsensusInfo.packingAddress)">1</div>-->
            <!--</div>-->
            <div class="flex-common">
              <div>{{$t('message.myConsensus4')}}</div>
              <div>{{this.myConsensusInfo.depositMoney}} NULS</div>
            </div>
            <div class="flex-common">
              <div>{{$t('message.myConsensus5')}}</div>
              <div>{{this.myConsensusInfo.usable}} NULS</div>
            </div>
            <div class="flex-common">
              <div>{{$t('message.allConsensusInfo4')}}</div>
              <div>{{this.myConsensusInfo.totalDeposit}} NULS</div>
            </div>
          </div>
        </div>
        <div class="describe-right describe">
          <div class="describe-title flex-common">
            <div class="title-left">
              <i class="icon-consensus2 iconfont iconfont-common-green">&#xe61e;</i>
              <span>{{$t('message.allConsensusInfo1')}}</span>
            </div>
            <div class="title-right cursor-p" @click="toMoreConsensus">{{$t('message.myConsensus6')}}</div>
          </div>
          <div class="describe-box">
            <div class="flex-common">
              <div>{{$t('message.allConsensusInfo2')}}</div>
              <div>{{this.allConsensusInfo.totalDeposit}} NULS</div>
            </div>
            <div class="flex-common">
              <div>{{$t('message.myConsensus7')}}</div>
              <div>{{this.allConsensusInfo.agentCount}}</div>
            </div>
            <div class="flex-common last-box">
              <div>{{$t('message.allConsensusInfo4')}}</div>
              <div>{{this.allConsensusInfo.rewardOfDay}} NULS</div>
            </div>
            <div class="flex-common">
              <div></div>
              <div></div>
            </div>
          </div>
        </div>
      </div>
      <div class="consensus-my">
        <div class="title flex">
          <div class="title-left">
            <i class="icon-consensus3 iconfont iconfont-common-green">&#xe619;</i>
            <span>{{$t('message.myConsensus8')}}</span>
          </div>
          <div class="title-right">
            <i class="icon-search iconfont iconfont-common-gray">&#xe614;</i>
            <input v-model="keyword" class="search-ipt" type="text" :placeholder="$t('message.allConsensusInfo6')">
            <span @click="searchConsensusList('noData')">{{$t('message.allConsensusInfo7')}}</span>
          </div>
        </div>
        <div class="no-node" v-if="lengthFlg==='0'">
          <div class="notInvolved">
            <span>{{$t('message.myConsensus9')}}，</span>
            <span class="text-href" @click="toAllConsensus">{{$t('message.myConsensus10')}}</span>
          </div>
        </div>
        <div class="no-data" v-else-if="lengthFlg==='2'">
          <div class="notInvolved">{{$t('message.myConsensus11')}}</div>
        </div>
        <div class="node" v-else-if="lengthFlg==='1'" v-loading="loading">
          <ul class="node-box" v-for="item in nodeData" @click="nodeDetail(item.packingAddress,item.agentHash)">
            <li class="node-id">{{item.agentId}}</li>
            <li class="">
              <span>{{$t('message.allConsensusInfo8')}}</span>
              <span>{{item.agentName!=='null' ? item.agentName:item.agentAddresss}}</span>
            </li>
            <li class="overflow">
              <span>{{$t('message.allConsensusInfo9')}}</span>
              <span :title="item.deposit+'NULS'">{{item.deposit}} NULS</span>
            </li>
            <li class="">
              <span>{{$t('message.allConsensusInfo10')}}</span>
              <span>{{item.commissionRate}}%</span>
            </li>
            <li class="">
              <span>{{$t('message.allConsensusInfo11')}}</span>
              <span>{{item.memberCount}}人</span>
            </li>
            <li class="overflow">
              <span>{{$t('message.allConsensusInfo12')}}</span>
              <span :title="item.totalDeposit">{{item.totalDeposit}}</span>
            </li>
            <li class="progress-li">
              <span>{{$t('message.allConsensusInfo13')}}</span>
              <ProgressBar :colorData="item.creditVal <=0 ? '#f64b3e':'#82bd39'"
                           :widthData="item.creditVal< 0 ? item.creditVal*(-50)+'%':item.creditVal*100+'%'"></ProgressBar>
              <span>{{item.creditVal}}</span>
            </li>
            <p class="icon-status">
              <i class="icon-common" :class="item.status === 1 ? 'icon-status-green' : 'icon-status-red'"></i>
              <span class="icon-text" :class="language === 'cn' ? 'icon-text1' : 'icon-text2'">{{item.status === 1 ? $t('message.status1') : $t('message.status0')}}</span>
            </p>
          </ul>
          <div class="bottom-pagination flex" v-show="this.totalAll > 8 ? true : false">
            <div class="pagination-left">
              <span>{{$t('message.page1')}} {{(pageNumber-1)* pageSize === 0 ? 1 : (pageNumber-1)* pageSize+1}} - {{pageSize*pageNumber>totalAll ? totalAll : pageSize*pageNumber}} {{$t('message.page2')}}</span>
            </div>
            <div class="pagination-right flex">
              <!--<span class="first">首页</span>-->
              <el-pagination layout="prev, pager, next" :page-size="8" :total=this.totalAll class="cb" background
                             v-show="this.totalAll > 8 ? true : false"
                             @current-change="allConsensusSize">
              </el-pagination>
              <!-- <span class="last">末页</span>-->
              <span class="total">{{$t('message.page3')}}{{this.totalAll}}{{$t('message.page4')}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import nulsJs from 'nuls-jssdk'
  import ProgressBar from '@/components/ProgressBar.vue'
  import {LeftShiftEight} from '@/utils/util'

  export default {
    data() {
      return {
        myConsensusInfo: [],
        allConsensusInfo: [],
        nodeData: [],
        totalAll: 0,
        keyword: '',
        pageNumber: 1,
        pageSize: 8,
        loading:true,
      }
    },
    components: {
      ProgressBar,
    },
    watch:{
    },
    computed: {
      language () {
        return this.$store.getters.getLang ? this.$store.getters.getLang : 'en'
      },
      lengthFlg(){
        //0没有数据，1有数据，2查询无结果
        /**
        * 0没有数据，1有数据，2查询无结果
        * 0:no data, 1:data, 2:query no results.
        * */
        return this.$store.getters.getLengthFlg ? this.$store.getters.getLengthFlg : '0'
      }
    },
    created() {
      if(localStorage.hasOwnProperty('address')){
        this.getConsensusList();
      }
      if(localStorage.hasOwnProperty('address')){
        this.getMyConsensus();
      }else{
        this.myConsensusInfo.agentNum = '0';
        this.myConsensusInfo.totalDeposit = '0';
        this.myConsensusInfo.depositMoney = '0';
        this.myConsensusInfo.usable = '0';
      }
      this.getAllConsensus();
    },
    mounted(){

        if(localStorage.hasOwnProperty('address')){
          this.getConsensusList();
        }
        if(localStorage.hasOwnProperty('address')){
          this.getMyConsensus();
        }else{
          this.myConsensusInfo.agentNum = '0';
          this.myConsensusInfo.totalDeposit = '0';
          this.myConsensusInfo.depositMoney = '0';
          this.myConsensusInfo.usable = '0';
        }
        this.getAllConsensus();

    },
    methods: {
      /**
       * 加入委托跳转
       * To add consensus
       **/
      toAddConsensus() {
        console.log("add consensus")
      },

      /**
       * 获取我的共识信息
       * get my consensus info
       */
      getMyConsensus() {
        let _this = this;
        nulsJs.getMyConsensus({"address": localStorage.getItem("address")}, function (data) {
          //console.log(data);
          if (data.success) {
            _this.myConsensusInfo = data.data;
            _this.myConsensusInfo.totalDeposit = LeftShiftEight(data.data.totalDeposit).toString();
            _this.myConsensusInfo.depositMoney = LeftShiftEight(data.data.depositMoney).toString();
            _this.myConsensusInfo.usable = LeftShiftEight(data.data.usable).toString();
          } else {
            _this.myConsensusInfo.agentNum = '0';
            _this.myConsensusInfo.totalDeposit = '0';
            _this.myConsensusInfo.depositMoney = '0';
            _this.myConsensusInfo.usable = '0';
            _this.$message({
              message: _this.$t('message.failed') +':'+_this.$t('message.'+data.code), type: 'warning', duration: '1000'
            });
          }
        });

      },

      /**
       * 更多跳转
       * To more
       **/
      toMoreConsensus() {
        this.$router.push({
          name: '/allConsensus'
        });
      },
      /**
       * 全网共识 跳转
       * To Whole network consensus
       **/
      toAllConsensus() {
        if (localStorage.hasOwnProperty('address')) {
          this.$router.push({
            name: '/allConsensus'
          });
        } else {
          this.$message({
            message: this.$t('message.prompt'), type: 'warning', duration: '1000'
          });
        }
      },

      /**
       * 获取全网共识信息
       * get all consensus info
       */
      getAllConsensus() {
        let _this = this;
        nulsJs.getAllConsensus(function (data) {
          //console.log(data);
          if (data.success) {
            _this.allConsensusInfo = data.data;
            _this.allConsensusInfo.totalDeposit = LeftShiftEight(data.data.totalDeposit).toString();
            _this.allConsensusInfo.rewardOfDay = LeftShiftEight(data.data.rewardOfDay).toString();
            for (let i in data.data.list) {
              _this.nodeData[i].agentAddresss = (data.data.list[i].agentAddress).substr(0, 4) + '...' + (data.data.list[i].agentAddress).substr(-4);
            }
          }else{
            _this.$message({
              message: _this.$t('message.failed') +':'+_this.$t('message.'+data.code), type: 'warning', duration: '1000'
            });
          }
        });
      },

      /**
       * 获取我的共识列表
       * Get my consensus list
       */
      getConsensusList(noData) {
        let _this = this;
        let params = {
          "address": localStorage.getItem("address"),
          "pageNumber": this.pageNumber,
          "pageSize": this.pageSize,
          "agentName": this.keyword ? this.keyword : ''
        };
        //console.log(params);
        nulsJs.getMyConsensusList(params, function (data) {
          //console.log(data);
          if (data.success) {
            if(data.data.list.length>0){
              _this.$store.commit('setLengthFlg', '1');
            }else if(data.data.list.length===0 && noData==='noData'){
              _this.$store.commit('setLengthFlg', '2');
            }else{
              _this.$store.commit('setLengthFlg', '0');
            }
            _this.loading=false;
            _this.nodeData = data.data.list;
            _this.totalAll = data.data.total;
            for (let i in data.data.list) {
              _this.nodeData[i].deposit = LeftShiftEight(data.data.list[i].deposit).toString();
              _this.nodeData[i].totalDeposit = LeftShiftEight(data.data.list[i].totalDeposit).toString();
              _this.nodeData[i].agentAddresss = (data.data.list[i].agentAddress).substr(0, 4) + '...' + (data.data.list[i].agentAddress).substr(-4);
              if(_this.nodeData[i].agentName!=='null' && _this.nodeData[i].agentName.length>8){
                _this.nodeData[i].agentName = (data.data.list[i].agentName).substr(0, 4) + '...' + (data.data.list[i].agentName).substr(-4);
              }
            }
          }else{
            _this.loading=false;
            _this.$message({
              message: _this.$t('message.failed') +':'+_this.$t('message.'+data.code), type: 'warning', duration: '1000'
            });
          }
        });
      },

      /**
       * 根据关键字获取共识列表
       * consensus list by keyword
       */
      searchConsensusList(noData) {
        this.getConsensusList(noData);
      },

      /**
       * 共识列表分页
       * consensus pages
       * @param events
       */
      allConsensusSize(events) {
        this.pageNumber = events;
        this.getConsensusList()
      },

      /**
       * 跳转节点详情
       * To node detail
       * @param packingAddress
       */
      nodeDetail(packingAddress,agentHash) {
        this.$router.push({
          name: '/nodeDetail',
          query: {packingAddress: packingAddress,agentHash:agentHash},
        });
      }
    },
    beforeRouteEnter(to, from, next) {
      if(from.name ==='/nodeDetail'){
        to.meta.keepAlive = false;
      }else{
        to.meta.keepAlive = false;
      }
      next();
    },
    beforeRouteLeave(to, from, next) {
      if(to.name ==='/nodeDetail'){
        from.meta.keepAlive = true;
      }else {
        from.meta.keepAlive = false;
      }
      next();
    },
  }
</script>

<style lang="less" type="text/less">
  @import url("./../../assets/css/style.less");

  .my-consensus {
    text-align: center;
    margin-top: 22px;
    .consensus-describe {
      font-size: @font-size-16;
      .describe {
        width: 49%;
        margin-bottom: 17px;
        .describe-title {
          margin-bottom: 7px;
          .title-right {
            font-size: @font-size-14;
            color: @c-font-blue1-color;
          }
        }
        .describe-box {
          border: @border1;
          padding: 10px 50px;
          div.flex-common {
            margin-bottom: 10px;
            div:nth-child(1) {
              font-size: @font-size-16;
            }
            div:nth-child(2) {
              font-size: @font-size-18;
            }
          }
          div.last-box {
            margin-bottom: 0;
          }
          div.flex {
            &:last-child {
              margin-bottom: 0;
            }
          }
        }
      }
      @media screen and (max-width: 768px) {
        .describe {
          width: 100%;
        }
      }
      .describe-left {
        .icon-consensus1 {
          height: 9px;
          background-position: -99px -3px;
          cursor: initial;
        }
      }
      .describe-right {
        .icon-consensus2 {
          background-position: -346px -27px;
          cursor: initial;
        }
      }
      .describe.describe-right {
        .describe-box {
          /*padding: 27px 50px;*/
        }
      }
    }
    .consensus-my {
      /*margin-top: 44px;*/
      .title {
        margin-bottom: 17px;
        .title-left {
          font-size: @font-size-16;
          .icon-consensus3 {
            background-position: -172px -4px;
            cursor: initial;
          }
        }
        .title-right {
          position: relative;
          width: 49%;
          text-align: right;
          .icon-search {
            background-position: -381px -60px;
            position: absolute;
            top: 9px;
            left: 10px;
            cursor: initial;
          }
          span {
            font-size: @font-size;
            color: @c-font-blue1-color;
            position: absolute;
            top: 9px;
            right: 14px;
            cursor: pointer;
          }
        }
      }
      .no-node {
        .notInvolved {
          font-size: @font-size-14;
          margin-top: 140px;
          text-align: center;
        }
      }
      .no-data{
        .notInvolved {
          font-size: @font-size-14;
          margin-top: 140px;
          text-align: center;
        }
      }
      .node {
        text-align: left;
        ul.node-box {
          border: @border2;
          padding: 16px 0 16px 22px;
          width: 241px;
          display: inline-block;
          margin-right: 20px;
          margin-bottom: 20px;
          position: relative;
          cursor: pointer;
          &:hover {
            border: @border1
          }
          .node-id {
            font-size: @font-size-16;
            margin-bottom: 14px;
            padding-left: 57px;
          }
          li:not(.node-id) {
            font-size: @font-size;
            text-align: left;
            margin-bottom: 8px;
            span:nth-child(1) {
              display: inline-block;
              width: 82px;
              text-align: left;
            }
            span:nth-child(2) {
              display: inline-block;
              //width: 100px;
              text-align: left;
            }
          }
          /*li.li-totalDeposit{*/
          /*span:nth-child(2){*/
          /*padding-top:1px;*/
          /*}*/
          /*}*/
          li.progress-li {
            /*margin-bottom: -10px;*/
            /*.el-progress {*/
            /*top: -16px;*/
            /*left: 100px;*/
            /*.el-progress-bar {*/
            /*width: 55%;*/
            /*}*/
            /*}*/
            span {
              float: left;
              padding-left:3px;
            }
          }
          .icon-status {
            position: absolute;
            top: -6px;
            right: -6px;
            i {
              width: 56px;
              height: 54px;
              cursor: initial;
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
        .bottom-pagination {
          margin-top: -15px;
        }
      }
      ul.node-box:nth-child(4n) {
        margin-right: 0;
      }
    }
  }

  .el-tooltip__popper.is-light {
    color: #333;
  }
</style>
