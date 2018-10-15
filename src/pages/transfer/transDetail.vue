<template>
  <div class="main-content">
    <div class="center trans-detail">
      <BackBar :backTitle="$t('message.transDetailBackName')"></BackBar>
      <div class="list">
        <div class="title">{{ $t('message.transDetailTitle') }}</div>
        <div class="input-output flex">
          <div class="input input-output-div">
            <div class="title flex-common">
              <div>{{ $t('message.transDetailInput') }}</div>
              <div>{{allInputs}} NULS</div>
            </div>
            <div class="detail">
              <ul>
                <li v-for="inItem in inputs" class="flex-common">
                  <label>{{ inItem.address }}</label>
                  <span>{{inItem.value.toString()}}</span>
                </li>
              </ul>
            </div>
          </div>
          <div class="output input-output-div">
            <div class="title flex-common">
              <div>{{ $t('message.transDetailOutput') }}</div>
              <div>{{allOutputs}} NULS</div>
            </div>
            <div class="detail">
              <ul>
                <li v-for="outItem in outputs" class="flex-common">
                  <label>{{ outItem.address }}</label>
                  <span>{{outItem.value.toString()}}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="overview">
          <div class="title">{{ $t('message.transDetailOverview') }}</div>
          <ul>
            <li>
              <span>{{ $t('message.transDetailBlockHigh') }}</span>
              <span>{{this.txInfo.blockHeight}}</span>
            </li>
            <li>
              <span>{{ $t('message.transDetailDate') }}</span>
              <span>{{this.txInfo.createTime}}</span>
            </li>
            <li>
              <span>{{ $t('message.fees2') }}</span>
              <span>{{this.txInfo.fee}} NULS</span>
            </li>
            <li>
              <span>TxID</span>
              <span class="text-href" @click="txid(txInfo.hash)">{{this.txInfo.hash}}</span>
            </li>
            <li>
              <span>{{ $t('message.transDetailType') }}</span>
              <span>{{$t('message.type'+this.txInfo.type)}}</span>
            </li>
            <li>
              <span>{{ $t('message.transDetailStatus') }}</span>
              <span>{{$t('message.statusS'+this.$route.query.state)}}</span>
            </li>
            <li>
              <span>{{ $t('message.remarks') }}</span>
              <span>{{this.txInfo.remark}}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import nulsJs from 'nuls-jssdk'
  import {BigNumber} from 'bignumber.js'
  import {LeftShiftEight, copys, getLocalTime} from '@/utils/util'
  import moment from 'moment'
  import BackBar from './../../components/BackBar'

  export default {
    data() {
      return {
        txInfo: [],
        inputs: [],
        allInputs: 0,
        outputs: [],
        allOutputs: 0,
      }
    },
    created() {
      this.getTXInfo(this.$route.query.hash);
    },
    methods: {

      /**
       * 获取交易详情根据txHash
       * Obtain transaction details
       * @param txHash
       */
      getTXInfo(txHash) {
        let _this = this;
        nulsJs.getTxByHash({"hash": txHash}, function (data) {
          //console.log(data);
          if (data.success) {
            _this.txInfo = data.data;
            _this.txInfo.createTime = moment(getLocalTime(data.data.createTime)).format('YYYY-MM-DD HH:mm:ss');
            _this.txInfo.fee = LeftShiftEight(data.data.fee).toString();
            _this.txInfo.state = 1;
            if (data.data.inputs.length > 0) {
              for (let i in data.data.inputs) {
                _this.allInputs = _this.allInputs + data.data.inputs[i].value;
                data.data.inputs[i].value = LeftShiftEight(data.data.inputs[i].value);
              }
            }
            _this.allInputs = LeftShiftEight(_this.allInputs).toString();
            _this.inputs = data.data.inputs;

            if (data.data.outputs.length > 0) {
              for (let i = 0; i < data.data.outputs.length; i++) {
                data.data.outputs[i].value = LeftShiftEight(data.data.outputs[i].amount);
                _this.allOutputs = _this.allOutputs + data.data.outputs[i].amount;
              }
            }
            _this.allOutputs = LeftShiftEight(_this.allOutputs).toString();
            _this.outputs = data.data.outputs
          }else{
            _this.$message({
              message: _this.$t('message.failed') +':'+_this.$t('message.'+data.code), type: 'warning', duration: '1000'
            });
          }
        });
      },

      /**
       * Txid跳转区块链浏览器的交易详情
       * Transaction details of Txid jump block chain browser
       **/
      txid(hash){
       // window.open('https://nulscan.io/transactionHash?hash='+hash, '_blank');
        window.open(this.$store.getters.getBrowserAddress+'transactionHash?hash='+hash, '_blank');
      }
    },
    // beforeRouteEnter(to, from, next) {
    //   if(from.name ==='/account'){
    //     from.meta.keepAlive = true;
    //   }else {
    //     from.meta.keepAlive = false;
    //   }
    //   next();
    // },
    beforeRouteLeave(to, from, next) {
      if(to.name ==='/account'){
        to.meta.keepAlive = true;
      }else {
        to.meta.keepAlive = false;
      }
      next();
    },
    components: {
      BackBar
    }
  }
</script>

<style lang="less" type="text/less">
  @import url("./../../assets/css/style.less");

  .trans-detail {
    text-align: center;
    margin-top: 20px;
    .list {
      .title {
        text-align: center;
        font-size: @font-size-20;
        margin-bottom: 38px;
      }
      .input-output {
        align-items: start;
        .input-output-div {
          width: 48%;
          .title, .detail {
            padding: 7px 35px;
            font-size: @font-size-14;
            color: @c-color;
          }
          .title {
            background: @bg-blue2-color;
            margin: 0;
          }
          .detail > ul {
            padding: 7px 0;
            overflow-x: hidden;
            max-height: 186px;
            li {
              padding-bottom: 7px;
              padding-right: 10px;
            }
          }
        }
        @media screen and (max-width: 768px) {
          .input-output-div {
            width: 100%;
          }
        }
      }
      .overview {
        .title {
          background: @bg-blue2-color;
          padding: 7px 0;
          margin: 0 auto;
          font-size: @font-size-14;
        }
        ul {
          li {
            padding: 7px 35px;
            border-bottom: 1px solid #1c2738;
            text-align: left;
            span:nth-child(1) {
              display: inline-block;
              width: 85px;
            }
          }
        }
      }
    }
  }

  .el-tooltip__popper.is-light {
    color: #333;
  }
</style>
