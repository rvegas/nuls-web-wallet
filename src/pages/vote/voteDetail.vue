<template>
  <div class="main-content" v-loading="loadingContent">
    <div class="center vote-detail">
      <div class="myInfo">
        <span>{{$t('message.voteDetail1')}}{{address}}</span>
        <span class="vote-total">
          <span>{{$t('message.voteDetail2')}}<span class="vote-number">{{Math.floor(Number(addressUsable))}}</span></span>
          <el-tooltip class="item" effect="dark" :content="$t('message.voteDetail13')" placement="bottom-end">
            <i class="el-icon-info"></i>
          </el-tooltip>
        </span>
      </div>
      <BackBar :backTitle="this.$route.query.routerName==='voteList' ? $t('message.voteBackName') : $t('message.voteList8')" :backUrl="this.$route.query.routerName==='voteList' ? '/voteList' : '/voteHistory'"></BackBar>
      <div class="vote-detail-content">
        <div class="vote-progress">
          <!--status:0待确认  1未开始，2进行中，3暂停挂起 4已结束-->
          <!--status:0,confirming  1,Not started  2,voting  3,Suspend hang 4,end-->
          <div class="vote-progress-text1 yellow" v-show="voteInfo.status === 0">
            <span>{{voteInfo.time}}</span>
          </div>
          <!--<div class="vote-progress-text1 yellow" v-show="voteInfo.status === 1">-->
            <!--<span v-if="voteInfo.timeDays===0 && voteInfo.timeHours!==0">{{$t('message.voteDetail17')+voteInfo.timeHours+$t('message.timeHours')+voteInfo.timeMinutes+$t('message.timeMinutes')+$t('message.voteDetail26')}}</span>-->
            <!--<span v-else-if="voteInfo.timeDays===0 && voteInfo.timeHours===0 && voteInfo.timeMinutes!==0">{{$t('message.voteDetail17')+voteInfo.timeMinutes+$t('message.timeMinutes')+$t('message.voteDetail26')}}</span>-->
            <!--<span v-else-if="voteInfo.timeDays===0 && voteInfo.timeHours===0 && voteInfo.timeMinutes===0">{{$t('message.voteDetail17')+1+$t('message.timeMinutes')+$t('message.voteDetail26')}}</span>-->
            <!--<span v-else>{{$t('message.voteDetail17')+voteInfo.timeDays+$t('message.timeDays')+voteInfo.timeHours+$t('message.timeHours')+voteInfo.timeMinutes+$t('message.timeMinutes')+$t('message.voteDetail26')}}</span>-->
          <!--</div>-->
          <!--<div class="vote-progress-text1 green" v-show="voteInfo.status === 2">-->
            <!--<span v-if="voteInfo.timeDays===0 && voteInfo.timeHours!==0">{{$t('message.voteDetail18')+voteInfo.timeHours+$t('message.timeHours')+voteInfo.timeMinutes+$t('message.timeMinutes')}}</span>-->
            <!--<span v-else-if="voteInfo.timeDays===0 && voteInfo.timeHours===0 && voteInfo.timeMinutes!==0">{{$t('message.voteDetail18')+voteInfo.timeMinutes+$t('message.timeMinutes')}}</span>-->
            <!--<span v-else-if="voteInfo.timeDays===0 && voteInfo.timeHours===0 && voteInfo.timeMinutes===0">{{$t('message.voteDetail18')+1+$t('message.timeMinutes')}}</span>-->
            <!--<span v-else>{{$t('message.voteDetail18')+voteInfo.timeDays+$t('message.timeDays')+voteInfo.timeHours+$t('message.timeHours')+voteInfo.timeMinutes+$t('message.timeMinutes')}}</span>-->
          <!--</div>-->
          <div class="vote-progress-text1" v-show="voteInfo.status === 1 || voteInfo.status === 2" :class="voteInfo.status === 1 ? 'yellow' : 'green'">
            <span v-show="voteInfo.status === 1">{{$t('message.voteDetail17')}}</span>
            <span v-show="voteInfo.status === 2">{{$t('message.voteDetail18')}}</span>
            <span v-if="voteInfo.timeDays===0 && voteInfo.timeHours!==0">{{voteInfo.timeHours}}{{voteInfo.timeHours===1 ? $t('message.timeHour') : $t('message.timeHours')}}{{voteInfo.timeMinutes}}{{voteInfo.timeMinutes===1 ? $t('message.timeMinute'):$t('message.timeMinutes')}}</span>
            <span v-else-if="voteInfo.timeDays===0 && voteInfo.timeHours===0 && voteInfo.timeMinutes!==0">{{voteInfo.timeMinutes}}{{voteInfo.timeMinutes===1 ? $t('message.timeMinute'):$t('message.timeMinutes')}}</span>
            <span v-else-if="voteInfo.timeDays===0 && voteInfo.timeHours===0 && voteInfo.timeMinutes===0">{{1+$t('message.timeMinute')}}</span>
            <span v-else>{{voteInfo.timeDays}}{{voteInfo.timeDays===1 ? $t('message.timeDay'):$t('message.timeDays')}}{{voteInfo.timeHours}}{{voteInfo.timeHours===1 ? $t('message.timeHour') : $t('message.timeHours')}}{{voteInfo.timeMinutes}}{{voteInfo.timeMinutes===1 ? $t('message.timeMinute'):$t('message.timeMinutes')}}</span>
            <span v-show="voteInfo.status === 1">{{$t('message.voteDetail26')}}</span>
            <span v-show="voteInfo.status === 2"></span>
          </div>
          <div class="vote-progress-text1 gray" v-show="voteInfo.status === 4">
            <span>{{$t('message.voteDetail19')+voteInfo.time}}</span>
          </div>
          <div class="vote-progress-text2">
            <span>{{voteInfo.amount}}{{$t('message.voteDetail4')}}</span>
          </div>
          <div class="flex-common pro-box">
            <div class="pro-start">{{voteInfo.startTime}}</div>
            <ProgressBar v-if="voteInfo.status === 0 || voteInfo.status === 1" :colorData="creditVal <=0 ? '#f64b3e':'#82bd39'"
                         :widthData="0+'%'"></ProgressBar>
            <ProgressBar v-else :colorData="creditVal <=0 ? '#f64b3e':'#82bd39'"
                         :widthData="voteInfo.status === 4 ? '100%' : (voteInfo.timePer)*100+'%'"></ProgressBar>
            <div class="pro-end">{{voteInfo.endTime}}</div>
          </div>
          <div class="date-mobile">
            <div class="pro-start">{{voteInfo.startTime}}</div>
            <div class="pro-end">{{voteInfo.endTime}}</div>
          </div>
          <p class="icon-status">
            <i class="icon-common icon-status-green" v-if="voteInfo.status === 2"></i>
            <i class="icon-common icon-status-gray" v-if="voteInfo.status === 4"></i>
            <i class="icon-common icon-status-yellow" v-if="voteInfo.status === 1 || voteInfo.status === 0"></i>
            <span class="icon-text" :class="language === 'cn' ? 'icon-text1' : 'icon-text2'"
                  v-if="voteInfo.status === 2">{{$t('message.voteList2')}}</span>
            <span class="icon-text" :class="language === 'cn' ? 'icon-text1' : 'icon-text2'"
                  v-if="voteInfo.status === 4">{{$t('message.voteList4')}}</span>
            <span class="icon-text" :class="language === 'cn' ? 'icon-text1' : 'icon-text2'"
                  v-if="voteInfo.status === 1">{{$t('message.voteList1')}}</span>
            <span class="icon-text" :class="language === 'cn' ? 'icon-text1' : 'icon-text0'"
                  v-if="voteInfo.status === 0">{{$t('message.voteList0')}}</span>
          </p>
        </div>
        <div class="vote-desc">
          <div class="vote-desc1">{{voteInfo.title}}</div>
          <div class="vote-desc2">{{voteInfo.creator}}</div>
          <div class="vote-desc3">{{voteInfo.description}}</div>
        </div>
        <div class="vote-detail-list">
          <div class="list-desc" v-show="voteInfo.hasMultipleSelect">
            {{$t('message.voteDetail6')}}{{voteInfo.minSelectCount}}{{$t('message.voteDetail23')}}{{voteInfo.maxSelectCount}}{{voteInfo.voteCanModify ? $t('message.voteDetail14') : $t('message.voteDetail7')}}
          </div>
          <div class="list-desc" v-show="!voteInfo.hasMultipleSelect">
            {{voteInfo.voteCanModify ? $t('message.voteDetail15') : $t('message.voteDetail25')}}
          </div>
          <el-table
            v-loading="loading"
            :data="voteList"
            style="width: 100%"
            ref="table"
            row-key="id"
            :expand-row-keys="expands"
            @cell-click="rowClick">
            <el-table-column type="expand" width="0">
              <template slot-scope="props">
                 <el-table
                   v-loading="loadingExpand"
                   :data="voteDetailList"
                   style="width: 100%"
                   max-height="400">
                   <el-table-column
                     type="index"
                     prop=""
                     label="id">
                   </el-table-column>
                   <el-table-column
                     prop="creator"
                     label=""
                     align="left"
                     :width="widthCreator">
                   </el-table-column>
                   <el-table-column
                     prop="weight"
                     label=""
                     align=""
                     :width="widthWeight">
                   </el-table-column>
                   <el-table-column align="">
                     <template slot-scope="scope" :prop="weight">
                       <div class="flex-common progress-box">
                       <ProgressBar :colorData="(scope.row.weight/voteInfo.amount) <=0 ? '#f64b3e':'#88b5d8'"
                       :widthData="scope.row.weight===0 ? 0+'%' : (scope.row.weight/voteInfo.amount)*100+'%'"></ProgressBar>
                       <div>{{scope.row.weight===0 ? 0:((scope.row.weight/voteInfo.amount)*100).toFixed(2)}}%</div>
                       </div>
                     </template>
                   </el-table-column>
                   <el-table-column
                     prop=""
                     label="">
                   </el-table-column>
                 </el-table>
              </template>
            </el-table-column>
            <el-table-column width="48">
              <template slot-scope="scope">
                <div v-if="voteInfo.hasMultipleSelect===false">
                  <!--<span>{{scope.row.sort}}</span>-->
                  <el-checkbox class="el-radio"  v-model="scope.row.sort" @change="radioSelect(scope.row,$event)" :disabled="disabled ? true : false"></el-checkbox>
                  <!--<el-checkbox class="el-radio" v-else v-model="scope.row.checkedFlg2" @change="radioSelect(scope.row,$event)" :disabled="disabled ? true : false"></el-checkbox>-->
                </div>
                <div v-if="voteInfo.hasMultipleSelect===true">
                  <!--<span>{{scope.row.sort}}</span>-->
                  <el-checkbox v-if="scope.row.sort===true" v-model="scope.row.sort" @change="checkboxSelect(scope.row,$event)" :disabled="disabled ? true : false"></el-checkbox>
                  <el-checkbox v-else v-model="scope.row.checkedFlg1" @change="checkboxSelect(scope.row,$event)" :disabled="disabled ? true : false"></el-checkbox>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              :label="$t('message.voteDetail8')"
              prop="content"
              align="left"
              >
            </el-table-column>
            <el-table-column
              :label="$t('message.voteDetail9')"
              prop="amount">
            </el-table-column>
            <el-table-column :label="$t('message.voteDetail10')" align="">
              <template slot-scope="scope" :prop="amount">
                <div class="flex-common progress-box">
                  <ProgressBar :colorData="(scope.row.amount/voteInfo.amount) <= 0 ? '#f64b3e':'#77a9ef'"
                               :widthData="scope.row.amount===0 ? 0+'%' : (scope.row.amount/voteInfo.amount)*100+'%'"></ProgressBar>
                  <div>{{scope.row.amount===0 ? 0:((scope.row.amount/voteInfo.amount)*100).toFixed(2)}}%</div>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="openDetail" class="cursor-p" :width="widthOpen">
              <template slot-scope="scope">
                <div>
                  <!--<span>{{scope.row.openFlg ? $t('message.voteDetail16') : $t('message.voteDetail11')}}</span>-->
                  <span class="detail">{{$t('message.voteDetail11')}}</span>
                  <span class="hide">{{$t('message.voteDetail16')}}</span>
                  <i class="el-icon-arrow-down"></i></div>
              </template>
            </el-table-column>
          </el-table>
          <div class="vote-bottom">
            <div class="fee">{{$t('message.fees')}}{{fee}} NULS</div>
            <el-button v-show="!disabled" @click="onSubmit" type="primary" :class="disabled ? 'disabled' : ''">
              {{voteBtnText}}
            </el-button>
            <el-button v-show="disabled" type="primary" :class="disabled ? 'disabled' : ''">{{voteBtnText}}</el-button>
          </div>
        </div>
      </div>
      <Password ref="password" @toSubmit="toSubmit"></Password>
    </div>
  </div>
</template>

<script>
  import moment from 'moment'
  import nulsJs from 'nuls-jssdk'
  import {LeftShiftEight, RightShiftEight, getLocalTime, timeSlot} from '@/utils/util'
  import BackBar from './../../components/BackBar'
  import Password from '@/components/PasswordBar.vue'
  import ProgressBar from '@/components/ProgressBar.vue'
  import {getVoteDetail,getUserHasVoted,getVoteDetailOpenList,getVote,getVoteFee} from '@/api/httpData.js'

  export default {
    data() {
      return {
        //address
        address: localStorage.getItem('address'),
        hash: '',
        voteInfo: [],
        hasMultipleSelect: false,
        //可用余额 Available Balance
        addressUsable: '',
        creditVal: 0.5,
        status: 1,
        //详情列表 detail list
        voteList: [],
        //列表中的百分比 Percentage in the list
        percentage: '',
        //展开的列表 Expanded list
        voteDetailList: [],
        expands: [],
        expandsPhone: [],
        //投票提交的itemIds, Vote submission options
        itemIds: [],
        //已投过的选项, Voted options
        itemIdsVoted: [],
        //index
        index: '',
        //投票按钮是否可点
        //Vote button can be clicked:false,cannot be clicked:true
        disabled: false,
        //投票按钮显示的文字
        //The text displayed by the voting button
        voteBtnText: '投票',
        //是否已投票
        //voted:true,note vote:false
        hasVoted: true,
        //fee
        fee:0,
        //没换算之前的手续费
        //No conversion before the conversion fee
        feeOriginal:'',
        loadingContent:false,
        loading:true,
        loadingExpand:true,
        password:'',
        screenWidth:window.innerWidth,
        widthCreator:310,
        widthWeight:150,
        widthOpen:0,
        updateFlg:false,
      }
    },
    computed: {
      language() {
        return this.$store.getters.getLang ? this.$store.getters.getLang : 'en'
      },
      addressAlias() {
        return this.$store.getters.getAddressAlias ? this.$store.getters.getAddressAlias : 'null';
      },
    },
    watch: {
      language: function(curVal,oldVal){
        if(curVal!==oldVal){
          this.voteBtn()
        }
      },
      screenWidth(val){
        this.screenWidth = val;
      }
    },
    components: {
      BackBar,
      ProgressBar,
      Password
    },
    created() {
    },
    mounted() {
      /**
      * 适配手机时，获取屏幕宽度
      * Get the screen width when adapting the phone
      * */
      window.screenWidth = window.innerWidth;
      this.screenWidth = window.screenWidth;
      if(this.screenWidth>=768){
        this.widthCreator=310;
        this.widthWeight=150;
        this.widthOpen=200;
      }else{
        this.widthCreator=100;
        this.widthWeight=80;
        this.widthOpen=40;
      }
      window.onresize =()  =>{
        return (()=>{
           window.screenWidth = window.innerWidth;
           this.screenWidth = window.screenWidth;
           if(this.screenWidth>=768){
             this.widthCreator=310;
             this.widthWeight=150;
             this.widthOpen=200;
           }else{
             this.widthCreator=100;
             this.widthWeight=80;
             this.widthOpen=40;
           }
         })()
      };
      this.getAccountBalance(localStorage.getItem('address'));
      // setTimeout(() => {
        this.userVoteInfo();
      // }, 1200);
      setTimeout(() => {
        this.getVoteDetials(this.$route.query.voteId);
      }, 1400);
    },
    destroyed() {
    },
    methods: {
      /**
       * 已投票账户的投票选项
       * Voting options for voting accounts
       **/
      userVoteInfo() {
        let params = {
          "voteId": this.$route.query.voteId,
          "creator": this.address
        };
        getUserHasVoted(params)
          .then((response) => {
            if (response.code === '2000000') {
              //console.log(response.data);
              this.hasVoted = response.data.hasVoted;
              this.itemIds = response.data.items;
              this.itemIdsVoted = response.data.items;
              // this.$nextTick(function () {
              //   // DOM 已更新
              //   //this.voteBtn();
              // });
            }else{
              this.$message({
                message: this.$t('message.failed')+':'+this.$t('message.'+response.code), type: 'warning', duration: '1000'
              });
            }
          }).catch(err => {
          this.$message({
            message: this.$t('message.failed'), type: 'warning', duration: '1000'
          });
        })
      },
      /**
       * 获取投票详情
       * vote detail
       **/
      getVoteDetials(voteId,thisQuery) {
        this.loading=true;
        let _this;
        if(thisQuery){
          _this=thisQuery;
        }else{
          _this=this;
        }
          getVoteDetail(voteId)
            .then((response) => {
              if (response.code === '2000000') {
                //console.log(response.data);
                _this.voteList=response.data.items;
                _this.voteInfo=response.data;
                _this.$nextTick(function () {
                  _this.loading=false;
                  // DOM 已更新
                  _this.voteBtn();
                  //判断该账户是否投过票
                  if(_this.hasVoted){
                    for(let i in _this.voteList){
                      for(let j in _this.itemIds){
                        if(_this.voteInfo.hasMultipleSelect){
                          if(_this.voteList[i].id===_this.itemIds[j]){
                            _this.voteList[i].sort=true;
                          }
                        }else{
                          if(_this.voteList[i].id===_this.itemIds[j]){
                            _this.voteList[i].sort=true;
                          }else{
                            _this.voteList[i].sort=false;
                          }
                        }
                      }
                    }
                  }else{
                    for(let i in _this.voteList){
                      _this.voteList[i].sort=false;
                    }
                  }
                });
                for(let i in response.data.items){
                  // response.data.items[i].amount=Math.floor(LeftShiftEight(response.data.items[i].amount)).toString();
                  response.data.items[i].openFlg=false;
                }
                //this.voteInfo.amount = Math.floor(LeftShiftEight(this.voteInfo.amount)).toString();
                _this.voteInfo.timePer = (Date.parse(new Date()) - _this.voteInfo.startTime) / (_this.voteInfo.endTime - _this.voteInfo.startTime);
                let timeStartSlot = response.data.startTime - Date.parse(new Date());
                let timeEndSlot = response.data.endTime - Date.parse(new Date());
                _this.voteInfo.startTime = moment(getLocalTime(response.data.startTime)).format('YYYY-MM-DD HH:mm:ss');
                _this.voteInfo.endTime = moment(getLocalTime(response.data.endTime)).format('YYYY-MM-DD HH:mm:ss');
                //status:0待确认  1未开始，2进行中，3暂停挂起 4已结束
                if (response.data.status === 0) {
                  _this.voteInfo.time = response.data.blocks + '/6'
                } else if (response.data.status === 1) {
                  _this.voteInfo.time = timeSlot(timeStartSlot);
                  _this.voteInfo.timeDays=_this.voteInfo.time[0];
                  _this.voteInfo.timeHours=_this.voteInfo.time[1];
                  _this.voteInfo.timeMinutes=_this.voteInfo.time[2]
                } else if (response.data.status === 2) {
                  _this.voteInfo.time = timeSlot(timeEndSlot);
                  _this.voteInfo.timeDays=_this.voteInfo.time[0];
                  _this.voteInfo.timeHours=_this.voteInfo.time[1];
                  _this.voteInfo.timeMinutes=_this.voteInfo.time[2]
                } else if (response.data.status === 4) {
                  _this.voteInfo.time = _this.voteInfo.endTime;
                }
              }else{
                _this.loading=false;
                _this.$message({
                  message: _this.$t('message.failed')+':'+_this.$t('message.'+response.code), type: 'warning', duration: '1000'
                });
              }
            }).catch(err => {
            _this.loading=false;
            console.log(err);
            _this.$message({
              //message: this.$t('message.failed') +':'+this.$t('message.'+err.code), type: 'warning', duration: '1000'
              message: _this.$t('message.failed'), type: 'warning', duration: '1000'
            });
          })
        // }
      },
      /**
       * 获取账户余额
       * Get balance by address
       **/
      getAccountBalance(address) {
        let _this = this;
        nulsJs.getAccountByAddress({"address": address}, function (data) {
          //console.log(data);
          if (data.success) {
            _this.addressUsable = LeftShiftEight(data.data.usable+data.data.locked).toString()
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
      * 投票按钮的状态
      * Status of the voting button
      * */
      voteBtn() {
        if (this.voteInfo.status !== 4) {
          if(this.voteInfo.status === 0 || this.voteInfo.status === 1){
            //待确认 待开始
            this.disabled = true;
            this.voteBtnText = this.$t('message.voteDetail12')
          }else{
            if (!this.hasVoted) {
              //投票
              this.voteBtnText = this.$t('message.voteDetail12')
            } else {
              if (this.voteInfo.voteCanModify) {
                //更新投票
                this.disabled = false;
                this.voteBtnText = this.$t('message.voteDetail20')
              } else {
                //已投票
                this.disabled = true;
                this.voteBtnText = this.$t('message.voteDetail21')
              }
            }
          }
        } else {
          //投票结束
          this.disabled = true;
          this.voteBtnText = this.$t('message.voteDetail22')
        }
      },
      /**
      * 多选
      * Multiple selection
      * */
      checkboxSelect(row,event){
        //console.log(row);
        if(row.checkedFlg1===true){
          if(this.itemIds.length < this.voteInfo.maxSelectCount){
            this.itemIds.push(row.id)
            this.getFee();
          }else{
            this.$message({
              message: this.$t('message.createVote32')+this.voteInfo.maxSelectCount, type: 'warning', duration: '1000'
            });
            row.checkedFlg1=false;
          }
          //console.log(this.itemIds)
        }else{
          for(let i in this.itemIds){
            if(this.itemIds[i]===row.id){
              this.itemIds.splice(i,1)
            }
          }
          this.getFee();
        //console.log('else'+this.itemIds)
        }
      },
      /**
      * 单选
      * Single selection
      * */
      radioSelect(row, event) {
        //console.log(row);
        this.itemIds = [];
        for (let i in this.voteList) {
          if(this.voteList[i].id!==row.id){
            this.voteList[i].sort = false;
          }
        }
        if (row.sort === true) {
          this.itemIds.push(row.id)
          //console.log(this.itemIds)
        } else{
          //console.log('else'+this.itemIds)
        }
       this.getFee();
      },
      /**
      * 展开详情
      * Expand details
      * */
      rowClick(row, column, cell, event) {
        //console.log(row)
        //console.log(column)
        this.loadingExpand=true;
        this.voteDetailList=[];
        if (column.label === 'openDetail') {
          Array.prototype.remove = function (val) {
            let index = this.indexOf(val);
            if (index > -1) {
              this.splice(index, 1);
            }
          };
          if (this.expands.indexOf(row.id) < 0) {
            row.openFlg = true;
            this.expands = [];
            this.expands.push(row.id);
          } else {
            row.openFlg = false;
            this.expands.remove(row.id);
          }
          //展开详情的列表请求
          let $table = this.$refs.table;
          $table.toggleRowExpansion(row);
          let params = {
            "voteId": this.$route.query.voteId,
            "itemId": row.id,
            "page": 1,
            "pageSize": 1000,
          };
          getVoteDetailOpenList(params)
            .then((response) => {
              if (response.code === '2000000') {
                this.loadingExpand=false;
                //console.log(response.data)
                this.voteDetailList = response.data.list
                // for (let i in this.voteDetailList) {
                //   this.voteDetailList[i].weight = Math.floor(LeftShiftEight(this.voteDetailList[i].weight)).toString();
                // }
              }else{
                this.loadingExpand=false;
                this.$message({
                  message: this.$t('message.failed')+':'+this.$t('message.'+response.code), type: 'warning', duration: '1000'
                });
              }
            }).catch(err => {
            this.loadingExpand=false;
            this.$message({
              //message: this.$t('message.failed') +':'+this.$t('message.'+err.code), type: 'warning', duration: '1000'
              message: this.$t('message.failed')+err.code, type: 'warning', duration: '1000'
            });
          })
        }
      },
      /**
      * 更新投票时，判断是否重新更新过选项
      * Re-updated options
      * */
      updateVote(){
        let c=0;
        if(this.hasVoted && this.itemIdsVoted.length>0){
          for(let i=0;i<this.itemIdsVoted.length;i++){
            for(let j=0;j<this.itemIds.length;j++){
              if(this.itemIdsVoted[i]===this.itemIds[j]){
                c++;
              }
            }
          }
          if(c===this.itemIdsVoted.length && c===this.itemIds.length){
            this.updateFlg=false;
          }else{
            this.updateFlg=true;
          }
        }
      },
      //form submit
      onSubmit() {
        if (this.voteInfo.status !== 4) {
          if(this.itemIds.length>0){
            if(this.fee!==0){
              if (Number(this.addressUsable) > this.fee) {
                if (this.itemIds.length <= this.voteInfo.maxSelectCount && this.itemIds.length >= this.voteInfo.minSelectCount) {
                  this.$refs.password.showPassword(true);
                } else {
                  this.$message({
                    message: this.$t('message.createVote31') + this.voteInfo.minSelectCount + ","+this.$t('message.createVote32') + this.voteInfo.maxSelectCount,
                    type: 'warning',
                    duration: '1000'
                  });
                }
              } else {
                this.$message({
                  message: this.$t('message.noMoney'), type: 'warning', duration: '1000'
                });
              }
            }else{
              this.updateVote();
              if(!this.updateFlg){
                this.$message({
                  message: this.$t('message.voteDetail28'), type: 'warning', duration: '1000'
                });
              }else{
                this.$message({
                  message: this.$t('message.voteDetail24'), type: 'warning', duration: '1000'
                });
              }
            }
          }else{
            this.$message({
              message: this.$t('message.voteDetail27'), type: 'warning', duration: '1000'
            });
          }
        }
      },
      /**
      * 密码提交
      * password submit
      * */
      toSubmit(password) {
        let _this = this;
        _this.loadingContent=true;
        _this.password=password;
        let params = {
          "pri": localStorage.getItem('encryptedPrivateKey'),
          "pass": password,
          "pub":localStorage.getItem('pubKey')
        };
        //console.log(params);
        nulsJs.valiPass(params, function (data) {
          //console.log(data);
          if(data.success){
            _this.getVote();
          }else {
            _this.loadingContent=false;
            _this.$message({
              message: _this.$t('message.failed')+':'+_this.$t('message.'+data.code), type: 'danger', duration: '1000'
            })
          }
        })
      },
      //vote submit
      getVote(){
        let _this=this;
        let params = {
          "creator": _this.address,
          "itemIds": _this.itemIds,
          "userAlias": _this.addressAlias === 'null' ? '' : _this.addressAlias,
          "voteId": _this.$route.query.voteId,
          "gasLimit": _this.feeOriginal,
          "password": _this.password,
        };
        getVote(params).then((response) => {
            if (response.code === '2000000') {
              _this.hash=response.data.hash;
              let paramsSign={
                "address": _this.address,
                "hash": _this.hash,
                "pri": localStorage.getItem("encryptedPrivateKey"),
                "pub": localStorage.getItem('pubKey'),
                "pass": _this.password,
                "types":"101"
              };
              nulsJs.signWithHash(paramsSign, function (data) {
                //console.log(data);
                if (data.success) {
                  _this.loadingContent=false;
                  _this.$message({
                    message: _this.$t('message.success'), type: 'success', duration: '1000'
                  });
                  _this.userVoteInfo();
                  setTimeout(() => {
                    _this.getVoteDetials(_this.$route.query.voteId,_this);
                  }, 1400);
                  _this.fee=0;
                }else{
                  _this.loadingContent=false;
                  _this.$message({
                    message: _this.$t('message.failed') +':'+_this.$t('message.'+data.code), type: 'warning', duration: '1000'
                  });
                }
              });
            } else {
              _this.loadingContent=false;
              _this.$message({
                message: _this.$t('message.failed')+':'+_this.$t('message.'+response.code), type: 'warning', duration: '1000'
              });
            }
          }).catch(err => {
          _this.loadingContent=false;
          _this.$message({
            // message: this.$t('message.failed') +':'+this.$t('message.'+err.code), type: 'warning', duration: '1000'
            message: _this.$t('message.failed')+err.code, type: 'warning', duration: '1000'
          });
        })
      },
      //get fee
      getFee(){
        if(!this.disabled){
          let params = {
            "address": this.address,
            "itemIds": this.itemIds,
            "voteId": this.$route.query.voteId
          };
          getVoteFee(params)
            .then((response) => {
              if (response.code === '2000000') {
                // console.log(response)
                this.fee=(Number(LeftShiftEight(response.data.gasLimit*27))+0.001).toFixed(8);
                this.feeOriginal=response.data.gasLimit
              } else {
                this.$message({
                  message: this.$t('message.failed')+':'+this.$t('message.'+response.code), type: 'warning', duration: '1000'
                });
              }
            }).catch(err => {
            this.$message({
              // message: this.$t('message.failed') +':'+this.$t('message.'+err.code), type: 'warning', duration: '1000'
              message: this.$t('message.failed')+err.code, type: 'warning', duration: '1000'
            });
          })
        }
      },
    },
    beforeRouteLeave(to, from, next) {
      to.meta.keepAlive = true;
      next();
    },
  }
</script>

<style lang="less" type="text/less">
  @import url("./../../assets/css/style.less");

  .vote-detail {
    text-align: center;
    margin-top: 20px;
    margin-bottom: 150px;
    .myInfo {
      font-size: @font-size-14;
      text-align: right;
      .vote-total {
        padding-left: 10px;
        .vote-number {
          color: @c-font-yellow1-color;
          padding-right: 10px;
        }
      }
      .vote-number {
        color: @c-font-yellow1-color;
      }
    }
    .back {
      margin: 10px 0 20px;
    }
    h3 {
      font-size: @font-size-20;
      margin-bottom: 30px;
    }
    .vote-detail-content {
      .vote-progress {
        border: @border1;
        padding: 20px 0;
        background: @bg-1-color;
        position: relative;
        .vote-progress-text1 {
          font-size: @font-size-18;
        }
        .vote-progress-text2 {
          font-size: @font-size-14;
          margin: 15px 0;
        }
        .bar-bg {
          float: none;
          width: 500px;
          margin: 0 10px;
          display: inline-block;
          height:4px;
          .bar {
            height:4px;
            label {
              margin-top: -4px;
              height: 12px;
              margin-left: 50%;
              border-right-width:2px;
            }
          }
        }
        .pro-box.flex-common{
          justify-content: center;
          .pro-start{
            display:inline-block;
          }
          .pro-end{
            display:inline-block;
          }
        }
        .date-mobile{
          display:none;
        }
        .date {
          width: 600px;
          margin: 10px auto 0;
        }
        .icon-status {
          position: absolute;
          top: -7px;
          right: -8px;
          i {
            width: 69px;
            height: 71px;
            cursor: initial;
          }
          .icon-text {
            position: absolute;
            transform: rotate(45deg);
          }
          .icon-text1 {
            top: 20px;
            right: 10px;
          }
          .icon-text2 {
            top: 20px;
            right: 11px;
          }
          .icon-text0 {
            top: 20px;
            right: -3px;
          }
          .icon-status-green {
            background-position: -87px -174px;
          }
          .icon-status-gray {
            background-position: -156px -174px;
          }
          .icon-status-yellow {
            background-position: -233px -174px;
          }
        }
      }
      .vote-desc {
        position: relative;
        margin: 30px 0 20px;
        .vote-desc1 {
          font-size: @font-size-20;
        }
        .vote-desc2 {
          font-size: @font-size;
          color: @c-font-gray-color;
          text-align: right;
          margin:10px 0 5px;
        }
        .vote-desc3 {
          background: @bg-1-color;
          padding: 20px;
          font-size: @font-size-16;
          text-align: left;
          /*text-indent: 36px;*/
          line-height: 24px;
        }
      }
      .list-desc {
        font-size: @font-size-14;
        margin: 10px 0;
        text-align: left;
      }
      .el-table {
        .cell{
          line-height: 18px;
        }
        .el-checkbox-group {
          display: inline-block;
        }
        .el-table__expand-column .cell {
          display: none;
        }
        .el-table__header-wrapper {
          .el-table__header{
            .has-gutter{
              tr{
                th:last-child{
                  display:table-cell!important;
                }
              }
            }
          }
          tr {
            background: #17202e;
            /*th:nth-child(1) {*/
              /*display:none;*/
            /*}*/
          }
          th {
            border-bottom: @border2;
          }
          th:nth-child(2) {
            text-align: right;
          }
          /*th:nth-child(3){*/
          /*text-align: left;*/
          /*}*/
          th:nth-child(6) > .cell {
            z-index: -1;
          }
        }
        .el-table__body-wrapper {
          .el-table__body{
            width:100%!important;
            tbody{
              tr.el-table__row{
                td:nth-child(5){
                  .cell{
                    display:flex;
                    justify-content: center;
                    .progress-box {
                      justify-content: start;
                      padding-left:10px;
                      .bar-bg {
                        float: none;
                        width: 70px;
                        margin-top: 0;
                        margin-right: 5px;
                        .bar {
                          label {
                            margin-top: -2px;
                            height: 6px;
                            margin-left: 50%;
                          }
                        }
                      }
                      div{
                        width:57px;
                        text-align: left;
                      }
                    }
                  }
                }
              }
              tr.el-table__row.current-row+tr{
                td.el-table__expanded-cell{
                  padding:0;
                  .el-table{
                    .el-table__body-wrapper {
                      .el-table__body{
                        tbody{
                          tr.el-table__row{
                            td:nth-child(4){
                              .cell{
                                display:flex;
                                justify-content: flex-end;
                                .progress-box {
                                  justify-content: start;
                                  padding-left:10px;
                                  .bar-bg {
                                    float: none;
                                    width: 70px;
                                    margin-top: 0;
                                    margin-right: 5px;
                                    .bar {
                                      label {
                                        margin-top: -2px;
                                        height: 6px;
                                        margin-left: 50%;
                                      }
                                    }
                                  }
                                  div{
                                    width:57px;
                                    text-align: left;
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
          tr {
            /*td:nth-child(1) {*/
              /*display:none;*/
            /*}*/
            td{
              height:48px;
              line-height:48px;
            }
            td:last-child {
              cursor: pointer;
              .detail{
                display:inline-block;
              }
              .hide{
                display:none;
              }
            }
          }
          tr.expanded {
            td:last-child {
              .detail{
                display:none;
              }
              .hide{
                display:inline-block;
              }
              i.el-icon-arrow-down {
                transform: rotate(180deg);
              }
            }
          }
        }
      }
      @media screen and (max-width: 767px) {
        .el-table {
          .cell{
            line-height: 18px;
            padding:0;
          }
          .el-table__header-wrapper {
            .el-table__header{
              width:100%!important;
              .has-gutter{
                tr{
                  th:first-child{
                    /*display:none;*/
                  }
                  th:last-child{
                    display:table-cell!important;
                  }
                }
              }
            }
          }
          .el-table__body-wrapper {
            overflow-x:hidden;
           .el-table__body{
             width:100%!important;
             tbody{
               tr.el-table__row{
                  td:first-child{
                    /*display:none;*/
                  }
                 td:last-child {
                   span{
                     display:none;
                   }
                 }
               }
               tr.el-table__row.current-row+tr{
                  td.el-table__expanded-cell{
                    padding:0;
                    .el-table{
                      .el-table__body-wrapper {
                        .el-table__body{
                          width:100%!important;
                          tbody{
                            tr.el-table__row{
                              td:first-child{
                                display:table-cell;
                              }
                              td:nth-child(2){
                                div{
                                  white-space: nowrap;
                                  overflow: hidden;
                                  text-overflow: ellipsis;
                                }
                              }
                              /*td:last-child{*/
                                /*display:none;*/
                              /*}*/
                            }
                          }
                        }
                      }
                    }
                  }
               }
             }
           }

            .progress-box {
              .bar-bg{
                display:none;
              }
            }
            tr {
              td{
                height:48px;
                line-height:48px;
              }
            }
            tr.expanded {
              td:last-child {
                i.el-icon-arrow-down {
                  transform: rotate(180deg);
                }
              }
            }
            tr {
              .el-table__expanded-cell {
                .el-table {
                  .el-table__body-wrapper {
                    .el-table__body {
                      tbody {
                        tr {
                          td:first-child {
                            .cell {
                              /*width:30px;*/
                              /*max-width:30px;*/
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
        .td-detail-open{
          height:100%;
          border-bottom: 2px solid #24426c!important;
          .el-collapse{
            border:0;
            .el-collapse-item{
              .el-collapse-item__header{
                background:@bg-1-color;
                color:@c-color;
                border:0;
              }
              .el-collapse-item__wrap{
                color:@c-color;
                border:0;
                .el-collapse-item__content{
                  color:@c-color;
                  padding-bottom:0;
                  table.table{
                    tr{
                      td:last-child{
                        border-bottom:0;
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
      .vote-bottom {
        background: @bg-1-color;
        padding-bottom: 20px;
        .fee {
          padding: 20px 0;
          font-size: @font-size-14;
        }
        .el-button {
          width: 200px;
        }
        .el-button.disabled {
          cursor: not-allowed;
          background: @c-font-gray2-color;
          border:1px solid @c-font-gray2-color;
        }
      }
    }
    @media screen and (max-width: 767px) {
      .myInfo {
        .vote-total {
          display:block;
        }
      }
      .vote-detail-content {
        .vote-progress {
          padding-top:25px;
          .pro-box{
            .bar-bg{
              width:280px;
              margin-bottom:8px;
            }
            .pro-start,.pro-end{
              display:none!important;
            }
          }
          .date-mobile{
            display:flex;
            justify-content: space-between;
            padding:0 8px;
          }
        }
      }
    }
  }
</style>
