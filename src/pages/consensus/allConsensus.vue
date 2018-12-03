<template>
  <div class="main-content">
    <div class="center all-consensus">
      <div class="consensus-describe">
        <div class="title">
          <i class="iconfont iconfont-common-green">&#xe618;</i>
          <span>{{$t('message.allConsensusInfo1')}}</span>
        </div>
        <div class="detail flex">
          <div class="detail-box1 detail-box">
            <div>{{$t('message.allConsensusInfo2')}}</div>
            <div>{{this.allConsensusInfo.totalDeposit}} NULS</div>
          </div>
          <div class="detail-box2 detail-box">
            <div>{{$t('message.allConsensusInfo3')}}</div>
            <div>{{this.allConsensusInfo.consensusAccountNumber}}</div>
          </div>
          <div class="detail-box3 detail-box">
            <div>{{$t('message.allConsensusInfo4')}}</div>
            <div>{{this.allConsensusInfo.rewardOfDay}} NULS</div>
          </div>
        </div>
      </div>
      <div class="consensus-list">
        <div class="title">
          <div class="title-top">
            <i class="iconfont iconfont-common-green">&#xe610;</i>
            <span>{{$t('message.allConsensusInfo5')}}</span>
          </div>
          <div class="title-search flex">
            <div class="search-left">
              <el-select v-model=statusValue :placeholder="$t('message.statusPlaceholder')" @change="selectStart">
                <el-option v-for="item in statusOptions" :label="$t('message.status'+item.value)" :key="item.value"
                           :value="item.value">
                </el-option>
              </el-select>

              <el-select v-model=sortValue :placeholder="$t('message.sortPlaceholder')" @change="selectSort">
                <el-option v-for="item in sortOptions" :label="$t('message.sort'+item.value)" :key="item.value"
                           :value="item.value">
                </el-option>
              </el-select>
            </div>
            <div class="search-right">
              <i class="icon-search iconfont iconfont-common-gray">&#xe614;</i>
              <input v-model="keyword" class="search-ipt" type="text" :placeholder="$t('message.allConsensusInfo6')">
              <span @click="searchConsensusList" class="search-text">{{$t('message.allConsensusInfo7')}}</span>
              <i class="icon-search iconfont iconfont-common-blue" @click="searchConsensusList">&#xe614;</i>
            </div>
          </div>
        </div>
        <div class="node" v-loading="loading">
          <ul class="node-box" v-for="item in nodeData" v-show="nodeData" @click="nodeDetail(item.packingAddress,item.agentHash)">
            <li class="node-id">{{item.agentId}}</li>
            <li class="">
              <span>{{$t('message.allConsensusInfo8')}}</span>
              <span>{{ item.agentName!=='null' ? item.agentName:item.agentAddresss}}</span>
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
              <span>{{item.memberCount}} </span>
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
          <div class="bottom-pagination flex" v-show="this.totalAll>8 ?true:false">
            <div class="pagination-left">
              <span>{{$t('message.page1')}} {{(pageNumber-1)* pageSize === 0 ? 1 : (pageNumber-1)* pageSize+1}} - {{pageSize*pageNumber>totalAll ? totalAll : pageSize*pageNumber}} {{$t('message.page2')}}</span>
              <!--<span>总共 88 条</span>-->
            </div>
            <div class="pagination-right flex">
              <!--<span class="first">首页</span>-->
              <el-pagination layout="prev, pager, next" :page-size="8" :total=this.totalAll class="cb" background
                             v-show="totalAllOk = this.totalAll>8 ?true:false"
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
        /**
        * 全网信息
        * Whole network information
        * */
        allConsensusInfo: [],
        /**
         * 共识信息列表
         * Consensus information list
         * */
        nodeData: [],
        totalAll: 0,
        keyword: '',
        pageNumber: 1,
        pageSize: 8,
        /**
         * 状态select
         * state list
         * */
        statusValue: '',
        statusOptions: [{value: ''},{value: 0}, {value: 1}],
        /**
         * 排序方式select
         * Sorting method select
         * */
        sortValue:4,
        sortOptions: [{value: 4}, {value: 1}, {value: 0}, {value: 2}],
        allSetInterval: null,
        /**
         * 加载中
         * Loading
         * */
        loading:true,
      }
    },
    components: {
      ProgressBar,
    },
    computed: {
      language () {
        return this.$store.getters.getLang ? this.$store.getters.getLang : 'en'
      }
    },
    created() {
      // this.getAllConsensus();
      // this.getConsensusList();
    },
    mounted() {
      this.getAllConsensus();
      this.getConsensusList();
      this.$store.commit('setActiveNav', '3');
      sessionStorage.setItem("activeNav", '3');
    },
    methods: {

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
            _this.allConsensusInfo.rewardOfDay = LeftShiftEight(data.data.rewardOfDay).toString()
          }else{
            _this.$message({
              message: _this.$t('message.failed') +':'+_this.$t('message.'+data.code), type: 'warning', duration: '1000'
            });
          }
        });
      },

      /**
       * 获取共识列表
       * Get consensus list
       */
      getConsensusList() {
        let _this = this;
        let params = {
          "pageNumber": this.pageNumber,
          "pageSize": this.pageSize,
          "agentName": this.keyword !==''? this.keyword : '',
          "sort": this.sortValue !==''? this.sortValue : '',
          "status": this.statusValue !=='' ? this.statusValue : ''
        };
        //console.log(params);
        nulsJs.getAgentNodeList(params, function (data) {
          //console.log(data);
          if (data.success) {
            _this.loading = false;
            _this.nodeData = data.data.list;
            _this.totalAll = data.data.total;
            for (let i=0;i<data.data.list.length;i++) {
              _this.nodeData[i].deposit = LeftShiftEight(data.data.list[i].deposit).toString();
              _this.nodeData[i].totalDeposit = LeftShiftEight(data.data.list[i].totalDeposit).toString();
              _this.nodeData[i].agentAddresss = (data.data.list[i].agentAddress).substr(0, 4) + '...' + (data.data.list[i].agentAddress).substr(-4);
              if(_this.nodeData[i].agentName!=='null' && _this.nodeData[i].agentName.length>8){
                _this.nodeData[i].agentName = (data.data.list[i].agentName).substr(0, 4) + '...' + (data.data.list[i].agentName).substr(-4);
              }
            }
          }else{
            _this.loading = false;
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
      searchConsensusList() {
        this.getConsensusList()
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
       * 根据节点状态筛选
       * get consensun list by start
       */
      selectStart() {
        this.getConsensusList()
      },

      /**
       * 对节点进行排序
       * Sorting nodes
       */
      selectSort() {
        this.getConsensusList()
      },

      /**
       * 节点详情
       * Node details
       */
      nodeDetail(packingAddress,agentHash) {
        this.$router.push({
          name: '/nodeDetail',
          query: {packingAddress: packingAddress,agentHash:agentHash,routerName:'allConsensus'},
        });
      }
    },
    beforeRouteLeave(to, from, next) {
      if(to.name ==='/nodeDetail'){
        from.meta.keepAlive = true;
        //console.log('22')
      }else {
        from.meta.keepAlive = false;
        //console.log('23')
      }
      next();
    },
  }
</script>

<style lang="less" type="text/less">
  @import url("./../../assets/css/style.less");

  .all-consensus {
    text-align: center;
    margin-top: 30px;
    .consensus-describe {
      font-size: @font-size-16;
      .title {
        margin-bottom: 10px;
        text-align: left;
        .icon-all-consensus1 {
          background-position: -346px -27px;
          cursor: initial;
        }
      }
      .detail {
        border: @border2;
        padding: 28px 0;
        .detail-box {
          width: 33.3%;
          margin: auto;
          border-right: @border2;
          div:first-child {
            margin-bottom: 13px;
          }
        }
        .detail-box3 {
          border-right: none;
        }
      }
    }
    .consensus-list {
      margin-top: 10px;
      .title {
        margin-bottom: 12px;
        .title-top {
          font-size: @font-size-16;
          text-align: left;
          margin-bottom: 10px;
          .icon-all-consensus2 {
            background-position: -274px -62px;
            cursor: initial;
            height: 11px;
          }
        }
        .title-search {
          .search-left {
            .el-select {
              margin-right: 10px;
              .el-input {
                width: 198px;
                .el-select__caret {
                  color: @c-font-blue1-color;
                  line-height: 0;
                }
              }
            }
          }
          .search-right {
            position: relative;
            width: 49%;
            text-align: right;
            .iconfont-common-blue{
              display:none;
            }
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
        @media screen and (max-width: 830px){
          .title-search{
            display:block;
            .search-left{
              text-align: left;
              margin-bottom:10px;
            }
          }
        }
      }
      .node {
        text-align: left;
        .node-box {
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
            label {
              float: left;
            }
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
          li.progress-li {
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
              top: 13px;
              right: 8px;
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
        .node-box:nth-child(4n) {
          margin-right: 0;
        }
      }
    }
    @media screen and (max-width: 768px) {
      .consensus-describe {
        .detail {
          padding:0;
          .detail-box {
            width:100%;
            border-right: none;
            display:flex;
            justify-content: space-between;
            align-items: center;
            padding:8px 10px;
            border-bottom: 1px solid @table-td-bd;
            div:first-child{
              margin-bottom: 0;
              text-align: left;
            }
            div:last-child{
              text-align: right;
            }
          }
          .detail-box3 {
            border-right: none;
          }
        }
      }
      .consensus-list {
        .title{
          .title-search{
            .search-left{
              display:flex;
              justify-content: space-between;
              .el-select{
                .el-input{
                  width:auto;
                }
              }
              .el-select:nth-child(2){
                margin-right:0;
              }
            }
            .search-right{
              width:100%;
              .iconfont-common-gray,.search-text{
                display:none;
              }
              .iconfont-common-blue{
                display:inline-block;
                right:6px;
              }
              .search-ipt{
                padding-left:7px;
              }
            }
          }
        }
        .node{
          text-align: center;
          ul.node-box{
            width:100%;
            margin:0 0 10px 0;
            padding-left:0;
            padding-bottom:0;
            .node-id{
              padding-left:0;
            }
            li:not(.node-id){
              padding:5px 0 5px 40px;
              margin-bottom:0;
              border-bottom: 1px solid @table-td-bd;
            }
            li.progress-li{
              height:30px;
              border-bottom: 0;
              span{
                padding-left:0;
              }
              .bar-bg{
                margin-right:5px;
              }
            }
          }
          .bottom-pagination{
            margin-top:0;
            /*position: relative;*/
            /*.pagination-left{*/
              /*position: absolute;*/
              /*top:32px;*/
              /*left:49px;*/
            /*}*/
            /*.pagination-right{*/
              /*.total{*/
                /*position: absolute;*/
                /*top:32px;*/
                /*right:49px;*/
              /*}*/
            /*}*/
          }
        }
      }
    }
  }

  .el-tooltip__popper.is-light {
    color: #333;
  }
</style>
