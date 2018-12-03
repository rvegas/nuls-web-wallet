<template>
  <div class="main-content">
    <div class="center vote-list">
      <h3 class="h3">
        <span>{{$t('message.voteList14')}}</span>
      </h3>
      <div class="vote-list-content">
        <div class="search flex">
          <div class="search-left flex">
            <div class="create-vote-btn">
              <el-button type="primary" @click="createVote">{{$t('message.voteList6')}}</el-button>
            </div>
            <el-select v-model=typeValue :placeholder="$t('message.voteList5')" @change="selectStatus">
              <el-option v-for="item in typeOptions" :label="$t('message.voteList'+item.key)" :value="item.key"
                         :key="item.value" >
              </el-option>
            </el-select>
            <div class="search-box">
              <i class="icon-search iconfont iconfont-common-gray">&#xe614;</i>
              <input v-model="keyword" class="search-ipt" type="text" :placeholder="$t('message.voteList7')" @change="search">
              <span class="search-text cursor-p" @click="search">{{$t('message.allConsensusInfo7')}}</span>
            </div>
          </div>
          <div class="search-right cursor-p" @click="voteHistory">
            <span><i class="icon-history iconfont iconfont-common-blue">&#xe62b;</i><span>{{$t('message.voteList8')}}</span></span>
          </div>
        </div>
        <table class="table">
          <thead>
          <tr>
            <th>{{$t('message.voteList9')}}</th>
            <th>{{$t('message.voteList10')}}</th>
            <th>{{$t('message.voteList11')}}</th>
            <th>{{$t('message.voteList12')}}</th>
            <th>{{$t('message.voteList13')}}</th>
          </tr>
          </thead>
          <tbody v-if="txList.length!==0">
          <tr v-for="item in txList" :class="item.status===4 ? 'gray':''">
            <td :data-label="$t('message.voteList9')" class="overflow cursor-p" @click="voteDetail(item.id)">
              <el-tooltip class="item" effect="dark" :content="item.voteCanModify ? $t('message.createVote25'):''" placement="bottom-start">
                <i class="modify iconfont" :class="item.status===4 ? 'iconfont-common-gray' : 'iconfont-common-green'" v-show="item.voteCanModify">&#xe627;</i>
              </el-tooltip>
              <span :class="item.voteCanModify ? '': 'title-text'">{{item.title}}</span>
            </td>
            <!--<td :data-label="$t('message.voteList10')" :class="item.creatorAddress===address ? 'yellow' : ''">{{item.userAlias ? item.userAlias : item.creator}}</td>-->
            <td :data-label="$t('message.voteList10')" :class="item.creatorAddress===address ? 'yellow' : ''" :title="item.creatorTitle">{{item.creator}}</td>
            <td :data-label="$t('message.voteList11')">{{$t('message.voteList'+item.status)}}</td>
            <td :data-label="$t('message.voteList12')">
              <!--status:0待确认  1未开始，2进行中，3暂停挂起 4已结束-->
              <div v-show="item.status===0">
                <span>{{item.time}}</span>
              </div>
              <!--<div v-show="item.status===1">-->
                <!--<span v-if="item.time[0]===0 && item.time[1]!==0">{{$t('message.timeAlso')+&nbsp;+item.time[1] +$t('message.timeHours')+ item.time[2] +$t('message.timeMinutes')+$t('message.timeStart')}}</span>-->
                <!--<span v-else-if="item.time[0]===0 && item.time[1]===0 && item.time[2]!==0">{{$t('message.timeAlso')+ item.time[2] +$t('message.timeMinutes')+$t('message.timeStart')}}</span>-->
                <!--<span v-else-if="item.time[0]===0 && item.time[1]===0 && item.time[2]===0">{{$t('message.timeAlso')+ 1+$t('message.timeMinutes')+$t('message.timeStart')}}</span>-->
                <!--<span v-else>{{$t('message.timeAlso') + item.time[0] +$t('message.timeDays')+ item.time[1] +$t('message.timeHours')+ item.time[2] +$t('message.timeMinutes')+$t('message.timeStart')}}</span>-->
              <!--</div>-->
              <!--<div v-show="item.status===2">-->
                <!--<span v-if="item.time[0]===0 && item.time[1]!==0">{{$t('message.timeAlso')+item.time[1]+$t('message.timeHours')+item.time[2]+$t('message.timeMinutes')+$t('message.timeEnd')}}</span>-->
                <!--<span v-else-if="item.time[0]===0 && item.time[1]===0 && item.time[2]!==0">{{$t('message.timeAlso')+item.time[2]+$t('message.timeMinutes')+$t('message.timeEnd')}}</span>-->
                <!--<span v-else-if="item.time[0]===0 && item.time[1]===0 && item.time[2]===0">{{$t('message.timeAlso')+1+$t('message.timeMinutes')+$t('message.timeEnd')}}</span>-->
                <!--<span v-else>{{$t('message.timeAlso')+item.time[0]+$t('message.timeDays')+item.time[1]+$t('message.timeHours')+item.time[2]+$t('message.timeMinutes')+$t('message.timeEnd')}}</span>-->
              <!--</div>-->
              <div v-show="item.status===1 || item.status===2">
                <span>
                  <span>{{$t('message.timeAlso')}}</span>
                  <span v-if="item.time[0]===0 && item.time[1]!==0">{{item.time[1]}}{{item.time[1]===1 ? $t('message.timeHour') : $t('message.timeHours')}}{{item.time[2]}}{{item.time[2]===1 ? $t('message.timeMinute'):$t('message.timeMinutes')}}</span>
                  <span v-else-if="item.time[0]===0 && item.time[1]===0 && item.time[2]!==0">{{item.time[2]}}{{item.time[2]===1 ? $t('message.timeMinute'):$t('message.timeMinutes')}}</span>
                  <span v-else-if="item.time[0]===0 && item.time[1]===0 && item.time[2]===0">{{1+$t('message.timeMinute')}}</span>
                  <span v-else>{{item.time[0]}}{{item.time[0]===1 ? $t('message.timeDay'):$t('message.timeDays')}}{{item.time[1]}}{{item.time[1]===1 ? $t('message.timeHour') : $t('message.timeHours')}}{{item.time[2]}}{{item.time[2]===1 ? $t('message.timeMinute'):$t('message.timeMinutes')}}</span>
                  <span v-show="item.status===1">{{$t('message.timeStart')}}</span>
                  <span v-show="item.status===2">{{$t('message.timeEnd')}}</span>
                </span>
              </div>
              <!--<div v-show="item.status===2">-->
                <!--<span>{{$t('message.timeAlso')}}</span>-->
                <!--<span v-if="item.time[0]===0 && item.time[1]!==0">{{item.time[1]}}{{item.time[1]===1 ? $t('message.timeHour') : $t('message.timeHours')}}{{item.time[2]}}{{item.time[2]===1 ? $t('message.timeMinute'):$t('message.timeMinutes')}}</span>-->
                <!--<span v-else-if="item.time[0]===0 && item.time[1]===0 && item.time[2]!==0">{{item.time[2]}}{{item.time[2]===1 ? $t('message.timeMinute'):$t('message.timeMinutes')}}</span>-->
                <!--<span v-else-if="item.time[0]===0 && item.time[1]===0 && item.time[2]===0">{{1+$t('message.timeMinute')}}</span>-->
                <!--<span v-else>{{item.time[0]}}{{item.time[0]===1 ? $t('message.timeDay'):$t('message.timeDays')}}{{item.time[1]}}{{item.time[1]===1 ? $t('message.timeHour') : $t('message.timeHours')}}{{item.time[2]}}{{item.time[2]===1 ? $t('message.timeMinute'):$t('message.timeMinutes')}}</span>-->
                <!--<span>{{$t('message.timeEnd')}}</span>-->
              <!--</div>-->
              <div v-show="item.status===4">
                <span>{{item.time}}</span>
              </div>
            </td>
            <td :data-label="$t('message.voteList13')">{{item.amount}}</td>
          </tr>
          </tbody>
          <tbody v-else v-loading="loading">
          <tr class="big-show">
            <td colspan="5" class="no-data">{{ $t('message.noData') }}</td>
          </tr>
          <tr class="small-show">
            <td :data-label="$t('message.voteList9')">{{ $t('message.noData') }}</td>
            <td :data-label="$t('message.voteList10')">{{ $t('message.noData') }}</td>
            <td :data-label="$t('message.voteList11')">{{ $t('message.noData') }}</td>
            <td :data-label="$t('message.voteList12')">{{ $t('message.noData') }}</td>
            <td :data-label="$t('message.voteList13')">{{ $t('message.noData') }}</td>
          </tr>
          </tbody>
        </table>
        <div class="bottom-pagination flex" v-show="this.totalAll>10 ?true:false">
          <div class="pagination-left">
            <span>{{$t('message.page1')}} {{(pageNumber-1)* pageSize === 0 ? 1 : (pageNumber-1)* pageSize+1}} - {{pageSize*pageNumber>totalAll ? totalAll : pageSize*pageNumber}} {{$t('message.page2')}}</span>
            <!-- <span>总共 {{this.totalAll}} 条</span>-->
          </div>
          <div class="pagination-right flex">
            <!--<span class="first">首页</span>-->
            <el-pagination layout="prev, pager, next" :page-size="10" :total=this.totalAll class="cb" background :current-page.sync="pageNumber"
                           v-show="totalAllOk = this.totalAll > 10 ? true : false"
                           @current-change="txListPages">
            </el-pagination>
            <!--<span class="last">末页</span>-->
            <span class="total">{{$t('message.page3')}} {{this.totalAll}} {{$t('message.page4')}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import moment from 'moment'
  import {LeftShiftEight, RightShiftEight, copys, getLocalTime,timeSlot} from '@/utils/util'
  import {getVotesList} from '@/api/httpData.js'

  export default {
    data() {
      return {
        //地址 address
        address: localStorage.getItem('address'),
        typeOptions: [{key: '',},{key: 0,}, {key: 1,}, {key: 2,}, {key: 4,}],
        typeValue: '',
        txList:[],
        totalAll: 0,
        pageNumber: 1,
        pageSize: 10,
        totalAllOk:false,
        keyword: '',
        //timer
        voteListSetInterval:null,
        voteListSetInterval2:null,
        /**
         * 加载中
         * Loading
         * */
        loading:true,
      }
    },
    computed: {

    },
    created() {

    },
    mounted() {
      this.getVoteList();
      this.voteListSetInterval = setInterval(() => {
        this.getVoteList();
      }, 10000);
    },
    activated(){
      this.getVoteList();
      this.voteListSetInterval2 = setInterval(() => {
        this.getVoteList();
      }, 10000);
    },
    deactivated: function () {
      clearInterval(this.voteListSetInterval);
      clearInterval(this.voteListSetInterval2);
    },
    methods: {
      selectStatus() {
        this.getVoteList();
      },
      search(){
        this.getVoteList();
      },
      txListPages(events) {
        this.pageNumber = events;
        this.getVoteList();
      },
      //vote list
      getVoteList() {
        let _this=this;
        let params={
          "keyword": this.keyword,
          "page": this.pageNumber,
          "pageSize": 10,
          "status": this.typeValue
        };
        //console.log(params)
        getVotesList(params)
          .then((response) => {
            if (response.code==='2000000') {
              this.loading = false;
              //console.log(response.data)
              this.totalAll=response.data.total;
              this.txList=response.data.list;
              for(let i in response.data.list){
                let timeStartSlot=response.data.list[i].startTime-Date.parse(new Date());
                let timeEndSlot=response.data.list[i].endTime-Date.parse(new Date());
                // response.data.list[i].amount = Math.floor(LeftShiftEight(response.data.list[i].amount)).toString();
                response.data.list[i].creatorAddress = response.data.list[i].creator;
                if(response.data.list[i].creator){
                  response.data.list[i].creatorTitle=response.data.list[i].creator;
                  response.data.list[i].creator= response.data.list[i].creator.substr(0, 5) + '...' +  response.data.list[i].creator.substr( response.data.list[i].creator.length - 5, 5);
                }
                if(response.data.list[i].userAlias && response.data.list[i].userAlias.length>10){
                  response.data.list[i].userAlias= response.data.list[i].userAlias.substr(0, 10) + '...';
                }
                //status:0待确认  1未开始，2进行中，3暂停挂起 4已结束
                if(response.data.list[i].status===0){
                  response.data.list[i].time = response.data.list[i].blocks+'/6'
                }else if(response.data.list[i].status===1){
                  // if(Date.parse(new Date())>response.data.list[i].startTime){
                  //   response.data.list[i].status===2
                  // }
                  response.data.list[i].time = timeSlot(timeStartSlot);
                }else if(response.data.list[i].status===2){
                  response.data.list[i].time = timeSlot(timeEndSlot);
                }else if(response.data.list[i].status===4){
                  response.data.list[i].time = moment(getLocalTime(response.data.list[i].endTime)).format('YYYY-MM-DD HH:mm:ss');
                }
              }
            }else{
              this.loading = false;
              this.$message({
                message: this.$t('message.failed')+response.code, type: 'warning', duration: '1000'
              });
            }
          }).catch(err => {
          this.loading = false;
          console.log(err);
          this.$message({
            //message: this.$t('message.failed') +':'+this.$t('message.'+err.code), type: 'warning', duration: '1000'
            message: this.$t('message.failed'), type: 'warning', duration: '1000'
          });
        })
      },
      /**
      * 跳转至历史记录
      * Jump to history
      * */
      voteHistory(){
        this.$router.push({
          name: '/voteHistory',
        })
      },
      //create vote
      createVote(){
        this.$router.push({
          name: '/createVote',
        })
      },
      //vote detail
      voteDetail(id){
        this.$router.push({
          name: '/voteDetail',
          query: {voteId: id,routerName:'voteList'}
        })
      },
    },
    beforeRouteEnter(to, from, next) {
      if(from.name ==='/voteDetail'){
        to.meta.keepAlive = true;
      }else{
        to.meta.keepAlive = false;
      }
      next();
    },
    beforeRouteLeave(to, from, next) {
      clearInterval(this.voteListSetInterval);
      clearInterval(this.voteListSetInterval2);
      if(to.name ==='/voteDetail'){
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

  .vote-list {
    text-align: center;
    margin-top: 55px;
    h3 {
      font-size: @font-size-20;
      margin-bottom: 55px;
    }
    .vote-list-content {
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
        margin-bottom: 20px;
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
          .create-vote-btn {
            margin-right:10px;
            .el-button {
              height: 32px;
              padding: 8px 0;
            }
          }
          .search-box{
            position: relative;
            .icon-search {
              position: absolute;
              top: 9px;
              left: 10px;
              cursor: initial;
            }
            .search-ipt{
              width:400px;
            }
            .search-text{
              position: absolute;
              top: 9px;
              right:20px;
              cursor: pointer;
              color:@c-font-blue1-color;
            }
          }
        }
        .search-right{
          margin-right:30px;
          font-size: @font-size-16;
          color:@c-font-blue1-color;
          .icon-history{
            padding-right:10px;
          }
        }
      }
      @media screen and (max-width: 768px) {
        .search{
          text-align: left;
          .search-left{
            text-align: left;
            .create-vote-btn,.el-select,.search-box{
              margin-bottom:10px;
            }
            .search-box{
              .search-ipt{
                width:100%;
              }
            }
          }
        }
      }
      table {
        td.no-data {
          height: 100px;
          line-height: 100px;
        }
        th{
          text-align: left;
        }
        td{
          text-align: left;
          height:48px;
          line-height: 48px;
          .modify{
            padding-right:25px;
          }
          .title-text{
            margin-left:45px;
          }
        }
        td:first-child{
          &:hover{
            color:@c-font-blue1-color;
          }
        }
        td:nth-child(2){
          width:170px;
        }
        td:nth-child(3){
         width:100px;
        }
        td:last-child{
          width:120px;
        }
        th:first-child,td:first-child{
          padding-left:20px;
          text-align: left;
          max-width:380px;
          width: 380px;
          padding-right:30px;
        }
        th:first-child{
          padding-left:66px;
        }
        th:last-child,td:last-child{
          padding-right:40px;
        }
        td.no-data{
          text-align: center;
        }
        td.yellow{
          color:@c-font-yellow1-color;
        }
        tr.gray{
          td{
            color:#969eaa;
          }
          td.yellow{
            color:@c-font-yellow1-color;
          }
        }
        tbody{
          tr:hover{
            background:@bg-h-color;
            td:first-child{
              span{
                text-decoration: underline;
              }
            }
          }
        }
        @media screen and (max-width: 768px) {
          th:first-child,td:first-child{
            padding-left:0;
          }
          th:last-child,td:last-child{
            padding-right:0;
          }
          td:first-child{
            max-width:100%;
          }
          td{
            text-align: right!important;
            width:auto!important;
            padding:0 5px!important;
          }
          td.no-data {
            text-align: center;
          }
          td.yellow{
            color:@c-font-yellow1-color;
          }
        }
        .add{
          color: #82bd39;
        }
        .minus{
          color: #f64b3e;
        }
      }
      .bottom-pagination {
        margin-top: 10px;
      }
    }
  }
</style>
