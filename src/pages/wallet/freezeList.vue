<template>
  <div class="main-content">
    <div class="center freeze-list">
      <BackBar :backTitle="$t('message.freezeListBackName')"></BackBar>
      <div class="list">
        <div class="title">{{ $t('message.freezeListTitle') }}</div>
        <table boeder="1">
          <thead>
          <tr>
            <th>{{$t('message.transType')}}</th>
            <th>TxID</th>
            <th>{{$t('message.freezeListDate')}}</th>
            <th>{{$t('message.freezeListAccount')}}</th>
            <th>{{$t('message.freezeListHigh')}}</th>
          </tr>
          </thead>
          <tbody v-if="LockedList.length!==0">
          <tr v-for="item in LockedList">
            <td :data-label="$t('message.transType')"> {{ $t('message.type'+item.txType) }}</td>
            <td data-label="TxID" class="text-href" @click="txid(item.txHash)"><span :title="item.txHash">{{item.txHash}}</span></td>
            <td :data-label="$t('message.freezeListDate')">{{item.createTime}}</td>
            <td :data-label="$t('message.freezeListAccount')">{{item.value}}</td>
            <td :data-label="$t('message.freezeListHigh')">
              {{(parseInt(item.lockTime) === -1 ? $t('message.consensusLocking'):item.lockTime)}}
            </td>
          </tr>
          </tbody>
          <tbody v-else>
          <tr class="big-show">
            <td colspan="5" class="no-data">{{ $t('message.noData') }}</td>
          </tr>
          <tr class="small-show">
            <td :data-label="$t('message.transType')">{{ $t('message.noData') }}</td>
            <td data-label="TxID">{{ $t('message.noData') }}</td>
            <td :data-label="$t('message.freezeListDate')">{{ $t('message.noData') }}</td>
            <td :data-label="$t('message.freezeListAccount')">{{ $t('message.noData') }}</td>
            <td :data-label="$t('message.freezeListHigh')">{{ $t('message.noData') }}</td>
          </tr>
          </tbody>
        </table>
        <div class="bottom-pagination flex" v-show="this.totalAll>12 ?true:false">
          <div class="pagination-left">
            <span>{{$t('message.page1')}} {{(pageNumber-1)* pageSize === 0 ? 1 : (pageNumber-1)* pageSize+1}} - {{pageSize*pageNumber>totalAll ? totalAll : pageSize*pageNumber}} {{$t('message.page2')}}</span>
          </div>
          <div class="pagination-right flex">
            <el-pagination layout="prev, pager, next" :page-size="12" :total=this.totalAll class="cb" background
                           v-show="this.totalAll>12 ?true:false"
                           @current-change="lockedListSize">
            </el-pagination>
            <span class="total">{{$t('message.page3')}}{{this.totalAll}}{{$t('message.page4')}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import BackBar from '@/components/BackBar.vue'
  import moment from 'moment'
  import nulsJs from 'nuls-jssdk'
  import {LeftShiftEight, RightShiftEight, getLocalTime} from '@/utils/util'

  export default {
    data() {
      return {
        LockedList: [],
        totalAll: 0,
        pageNumber: 1,
        pageSize: 12,
      }
    },
    created() {
      this.getLockedList();
    },
    methods: {

      /**
       * 获取冻结列表
       * Get locked list
       * @param address
       */
      getLockedList(address = localStorage.getItem("address"), pageNumber = this.pageNumber, pageSize = this.pageSize) {
        let _this = this;
        nulsJs.getFrozenList({address, pageNumber, pageSize}, function (data) {
          //console.log(data);
          if (data.success) {
            _this.LockedList = data.data.list;
            _this.totalAll = data.data.total;
            for (let i in data.data.list) {
              data.data.list[i].value = LeftShiftEight(data.data.list[i].value).toString();
              data.data.list[i].createTime = moment(getLocalTime(data.data.list[i].createTime)).format('YYYY-MM-DD HH:mm:ss');
              if(data.data.list[i].lockTime > 1000000000000){
                data.data.list[i].lockTime = moment(getLocalTime(data.data.list[i].lockTime)).format('YYYY-MM-DD HH:mm:ss');
              }
            }
          }else{
            _this.$message({
              message: _this.$t('message.failed') +':'+_this.$t('message.'+data.code), type: 'warning', duration: '1000'
            });
          }
        });
      },

      /**
       * 根据地址获取冻结列表分页
       * Locked list pages by address
       * @param events
       **/
      lockedListSize(events) {
        this.pageNumber = events;
        this.getLockedList();
      },
      /**
       * Txid跳转区块链浏览器的交易详情
       * Transaction details of Txid jump block chain browser
       **/
      txid(hash){
        //window.open('https://nulscan.io/transactionHash?hash='+hash, '_blank');
        window.open(this.$store.getters.getBrowserAddress+'transactionHash?hash='+hash, '_blank');
      }
    },
    components: {
      BackBar,
    }
  }
</script>

<style lang="less" type="text/less">
  @import url("./../../assets/css/style.less");

  .freeze-list {
    text-align: center;
    margin-top: 20px;
    .list {
      .title {
        text-align: center;
        font-size: @font-size-20;
        margin-bottom: 38px;
      }
      table{
        td:nth-child(2) {
          width:550px;
        }
        th:first-child,td:first-child{
          padding-left:25px;
        }
        th:last-child,td:last-child{
          padding-right:25px;
        }
      }
      @media screen and (max-width: 865px) {

        table {
          td:nth-child(2) {
            width:auto;
            span {
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              float: right;
              max-width: 100px;
            }
          }
          th:first-child,td:first-child{
            padding-left:0;
          }
          th:last-child,td:last-child{
            padding-right:0;
          }
        }
      }
      .bottom-pagination {
        margin-top: 7px;
      }
    }
  }
</style>
