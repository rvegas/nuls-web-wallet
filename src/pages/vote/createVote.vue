<template>
  <div class="main-content">
    <div class="center create-vote">
      <BackBar :backTitle="$t('message.voteBackName')" backUrl="/voteList"></BackBar>
      <h3 class="h3">
        <span>{{$t('message.createVote1')}}</span>
      </h3>
      <div class="create-vote-content" v-loading="loading">
        <div class="vote-tips">{{$t('message.createVote2')}}</div>
        <el-form ref="createVoteForm" :model="createVoteForm"  :rules="createVoteRules">
          <el-form-item :label="$t('message.createVote3')"  prop="title" class="el-form-item1">
            <el-input v-model.trim="createVoteForm.title" :placeholder="$t('message.createVote5')"
                      :maxlength="language === 'en' ? 90 : 30"
                      @change="getFee">
            </el-input>
            <!--onkeyup="this.value=this.value.replace(/[^\u4e00-\u9fa5a-zA-Z0-9\u0020]/g,'')"-->
          </el-form-item>
          <el-form-item :label="$t('message.createVote4')" class="el-form-item2" prop="description">
            <el-input type="textarea" :placeholder="$t('message.createVote6')" v-model.trim="createVoteForm.description"
                      :maxlength="language === 'en' ? 450 : 150"
                      @change="getFee">
            </el-input>
            <div class="textarea-number">{{createVoteForm.description.length}}/<span>{{language === 'en' ? 450 : 150}}</span></div>
          </el-form-item>
          <el-form-item class="el-form-item3"
            v-for="(domain, index) in createVoteForm.domains"
            :label="$t('message.createVote7')+ (index+1)+$t('message.createVote8')"
            :key="(index+1)"
            :prop="'domains.' + index + '.content'"
            :rules="{required: true, message: $t('message.createVote26'), trigger: 'blur'}">
            <el-input v-model.trim="domain.content" @change="getFee" :maxlength="language === 'en' ? 60 : 30"
                      :placeholder="$t('message.createVote42')"></el-input>
            <div class="icon-box">
              <i class="vote-iconfont icon1 iconfont iconfont-common-white cursor-p" @click="addDomain(domain)" :title="$t('message.createVote27')">&#xe628;</i>
              <i class="vote-iconfont icon2 iconfont iconfont-common-white cursor-p" @click.prevent="removeDomain(domain)" :title="$t('message.createVote28')" v-show="createVoteForm.domains.length>1">&#xe629;</i>
              <i class="vote-iconfont icon3 iconfont iconfont-common-white cursor-p" @click.prevent="upDomain(domain)" :title="$t('message.createVote29')" v-show="createVoteForm.domains.length>1">&#xe621;</i>
              <i class="vote-iconfont icon4 iconfont iconfont-common-white cursor-p" @click.prevent="downDomain(domain)" :title="$t('message.createVote30')" v-show="createVoteForm.domains.length>1">&#xe62a;</i>
            </div>
          </el-form-item>
          <el-form-item :label="$t('message.createVote9')"  class="el-form-item4" prop="radio">
            <el-radio-group v-model="createVoteForm.radio" class="el-radio" @change="hasRadio()">
              <el-radio :label="$t('message.createVote10')" class="el-radio1" ></el-radio>
              <el-radio :label="$t('message.createVote11')" class="el-radio2"></el-radio>
            </el-radio-group>
            <el-form-item label="" class="el-form-item5" prop="optionMin" v-show="hasMultipleSelect">
              <el-select v-model="createVoteForm.optionMin" :placeholder="$t('message.createVote12')" class="el-select1" @change="hasMinSelect" prop="optionMin">
                <el-option :label="$t('message.createVote31')+(index+1)" v-for="(item,index) in createVoteForm.domains" :value="index+1" :key="index+1"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="" class="el-form-item6" prop="optionMax" v-show="hasMultipleSelect">
              <el-select v-model="createVoteForm.optionMax" :placeholder="$t('message.createVote13')" class="el-select2" @change="hasMaxSelect" prop="optionMax">
                <el-option :label="$t('message.createVote32')+(index+1)" v-for="(item,index) in createVoteForm.domains" :value="index+1" :key="index+1"></el-option>
              </el-select>
            </el-form-item>
          </el-form-item>
          <el-form-item :label="$t('message.createVote14')" class="el-form-item7" prop="radioCanModify">
            <el-radio-group v-model="createVoteForm.radioCanModify" @change="toVoteCanModify()">
              <el-radio :label="$t('message.createVote15')"></el-radio>
              <el-radio :label="$t('message.createVote16')"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item :label="$t('message.createVote17')" class="el-form-item8">
            <el-form-item class="el-form-item12" prop="startTime" >
              <el-date-picker
                v-model="createVoteForm.startTime"
                type="datetime"
                :placeholder="$t('message.createVote18')"
                :picker-options="startDatePicker"
                @change="getFee">
              </el-date-picker>
            </el-form-item>
            <span class="date-line">—</span>
            <el-form-item class="el-form-item12" prop="endTime" >
              <el-date-picker
                v-model="createVoteForm.endTime"
                type="datetime"
                :placeholder="$t('message.createVote19')"
                :picker-options="endDatePicker"
                @change="getFee">
              </el-date-picker>
            </el-form-item>
          </el-form-item>
          <el-form-item :label="$t('message.createVote20')" class="el-form-item9" prop="deposit">
            <el-tooltip class="item" effect="dark" :content="$t('message.createVote21')" placement="bottom-start">
              <div class="icon-tips"><i class="el-icon-info"></i></div>
            </el-tooltip>
            <div class="useable">{{$t('message.createVote22')}}{{addressUsable}} NULS</div>
            <!--<el-input v-model="createVoteForm.deposit"></el-input>-->
            <div class="ipt-div">{{createVoteForm.deposit}}</div>
          </el-form-item>
          <el-form-item :label="$t('message.fees')" class="el-form-item10" prop="fee">
            <div>{{createVoteForm.fee}} NULS</div>
          </el-form-item>
          <el-form-item class="el-form-item11">
            <el-button @click="resetForm('createVoteForm')">{{$t('message.createVote23')}}</el-button>
            <el-button @click="onSubmit('createVoteForm')" type="primary">{{$t('message.createVote24')}}</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <Password ref="password" @toSubmit="toSubmit"></Password>
  </div>
</template>

<script>
  import BackBar from './../../components/BackBar'
  import Password from '@/components/PasswordBar.vue'
  import nulsJs from 'nuls-jssdk'
  import {LeftShiftEight, RightShiftEight,getLocalTime,timeSlot} from '@/utils/util'
  import {chinese} from '@/utils/validate'
  import {getCreateVote,getCreateVoteFee} from '@/api/httpData.js'
  export default {
    data() {
      let toStartTime = (rule, value, callback) => {
        if (!value) {
          callback(new Error(this.$t('message.createVote40')))
        }else if (Date.parse(value) < Date.parse(new Date())) {
          callback(new Error(this.$t('message.createVoteError1')))
        }else{
          this.$refs.createVoteForm.validateField('endTime');
          callback()
        }
      };
      let toEndTime = (rule, value, callback) => {
        if (!value) {
          callback(new Error(this.$t('message.createVote41')))
        }else if (this.createVoteForm.startTime==='' && Date.parse(value) < Date.parse(new Date())) {
          callback(new Error(this.$t('message.createVoteError2')))
        }else if(this.createVoteForm.startTime!=='' && Date.parse(value) <= Date.parse(this.createVoteForm.startTime)){
          callback(new Error(this.$t('message.createVoteError3')))
        }else{
          callback()
        }
      };
      let toOptionMin = (rule, value, callback) => {
        if (!value) {
          callback(new Error(this.$t('message.createVote38')))
        }else if (this.createVoteForm.optionMin>this.createVoteForm.optionMax) {
          callback(new Error(this.$t('message.createVoteError4')))
        }else if(this.createVoteForm.hasMultipleSelect&&this.createVoteForm.optionMin===1&&this.createVoteForm.optionMax===1){
          callback(new Error(this.$t('message.createVoteError5')))
        }else{
          //this.$refs.createVoteForm.validateField('optionMax');
          callback()
        }
      };
      let toOptionMax = (rule, value, callback) => {
        if (!value) {
          callback(new Error(this.$t('message.createVote39')))
        }else if (this.createVoteForm.optionMin>this.createVoteForm.optionMax) {
          callback(new Error(this.$t('message.createVoteError4')))
        }else if(this.createVoteForm.hasMultipleSelect&&this.createVoteForm.optionMin===1&&this.createVoteForm.optionMax===1){
          callback(new Error(this.$t('message.createVoteError5')))
        }else{
          this.$refs.createVoteForm.validateField('optionMin');
          callback()
        }
      };
      let toTitle = (rule, value, callback) => {
        if (!value) {
          callback(new Error(this.$t('message.createVote34')))
        }else{
          callback()
        }
      };
      let toDescription = (rule, value, callback) => {
        if (!value) {
          callback(new Error(this.$t('message.createVote35')))
        }else{
          callback()
        }
      };
      let toRadio = (rule, value, callback) => {
        if (!value) {
          callback(new Error(this.$t('message.createVote36')))
        }else{
          callback()
        }
      };
      let toRadioCanModify = (rule, value, callback) => {
        if (!value) {
          callback(new Error(this.$t('message.createVote37')))
        }else{
          callback()
        }
      };
      return {
        //address
        address: localStorage.getItem('address'),
        addressUsable:'',
        hash:'',
        loading:false,
        createVoteForm: {
          title: '',
          description: '',
          radio: '',
          domains: [{
            content: '',
            sort:1
          },{
            content: '',
            sort:2
          },{
            content: '',
            sort:3
          }],
          optionMin: 1,
          optionMax: 2,
          radioCanModify: '',
          startTime: '',
          endTime: '',
          deposit: 100,
          fee: 0,
        },
        /**
        * 没换算之前的手续费
        * No conversion before the conversion fee
        * */
        fee:'',
        startDatePicker:this.beginDate(),
        endDatePicker:this.processDate(),
        /**
        * 多选true，单选false
        * Multiple selection:true，Single selection:false
        * */
        hasMultipleSelect:false,
        /**
        * 结果设置，可更改true,不可更改false,
        * Can be changed:true,Cannot be changed:false
        * */
        voteCanModify:false,
        /**
        * 表单验证信息
        * Form verification information
        * */
        createVoteRules: {
          title: [
            {validator: toTitle, trigger: 'blur'},
          ],
          description: [
            {validator: toDescription, trigger: 'blur'},
          ],
          radio: [
            {validator: toRadio, trigger: 'blur'},
          ],
          radioCanModify: [
            {validator: toRadioCanModify, trigger: 'blur'},
          ],
          optionMin: [
            {validator: toOptionMin, trigger: 'change'}
          ],
          optionMax: [
            {validator: toOptionMax, trigger: 'change'}
          ],
          startTime:[
            {validator: toStartTime, trigger: 'blur'}
          ],
          endTime:[
            {validator: toEndTime, trigger: 'blur'}
          ],
        },
      }
    },
    computed: {
      addressAlias () {
        return this.$store.getters.getAddressAlias ? this.$store.getters.getAddressAlias : 'null';
      },
      language () {
        return this.$store.getters.getLang ? this.$store.getters.getLang : 'en'
      }
    },
    components: {
      BackBar,
      Password
    },
    created() {

    },
    mounted() {
      this.getAccountBalance(this.address);
    },
    destroyed() {
    },
    methods: {
      /**
      * 单选，多选
      * selection event
      * */
      hasRadio(){
        if(this.createVoteForm.radio === this.$t('message.createVote11')){
          this.hasMultipleSelect=true;
          this.createVoteForm.optionMax=2;
        }else{
          this.hasMultipleSelect=false;
          this.createVoteForm.optionMax=1;
        }
        this.getFee();
      },
      /**
      * 至少选几项
      * Choose a few at least
      * */
      hasMinSelect(){
        this.getFee()
      },
      /**
      * 至多选几项
      * Pick up at most
      * */
      hasMaxSelect(){
        this.getFee()
      },
      /**
      * 结果设置
      * Result setting
      * */
      toVoteCanModify(){
        if(this.createVoteForm.radioCanModify === this.$t('message.createVote15')){
          this.voteCanModify=false;
        }else{
          this.voteCanModify=true;
        }
        this.getFee();
      },
      //Add option box
      addDomain(item) {
        let index = this.createVoteForm.domains.indexOf(item);
        this.createVoteForm.domains.splice(index+1,0,{
          content: '',
          sort:item.sort+1
        });
        for(let i in this.createVoteForm.domains){
          if(i>index+1){
            this.createVoteForm.domains[i].sort=this.createVoteForm.domains[i].sort+1;
          }
        }
      },
      //Delete option box
      removeDomain(item) {
        let index = this.createVoteForm.domains.indexOf(item);
        if (index !== -1) {
          this.createVoteForm.domains.splice(index, 1)
        }
        for(let i in this.createVoteForm.domains){
          if(i>index-1){
            this.createVoteForm.domains[i].sort=this.createVoteForm.domains[i].sort-1;
          }
        }
      },
      //Move up option box
      upDomain(item) {
        let index = this.createVoteForm.domains.indexOf(item);
        if (index !== 0) {
          this.createVoteForm.domains.splice(index, 1);
          this.createVoteForm.domains.splice(index-1, 0,item)
        }
      },
      //Move down option box
      downDomain(item) {
        let index = this.createVoteForm.domains.indexOf(item);
        if (index !== -1) {
          this.createVoteForm.domains.splice(index, 1);
          this.createVoteForm.domains.splice(index+1, 0,item)
        }
      },
      beginDate(){
        return {
          disabledDate(time){
            return time.getTime() < Date.now()-24 * 3600 * 1000
          }
        }
      },
      /**
      * 结束时间必须大于开始时间
      * End time must be greater than start time
      * */
      processDate(){
        let _this = this;
        return {
          disabledDate(time){
            if(_this.createVoteForm.startTime){
              // return new Date(_this.createVoteForm.startTime).getTime() > time.getTime() || time.getTime() > Date.now()
              return new Date(_this.createVoteForm.startTime).getTime()-23 * 3600 * 1000 > time.getTime()
            }else{
              return time.getTime() < Date.now()-24 * 3600 * 1000
            }
          }
        }
      },
      //reset form
      resetForm(formName) {
        this.$refs[formName].resetFields();
        this.hasMultipleSelect=false;
      },
      /**
       * 确认提交
       * @param formName
       */
      onSubmit(formName) {
        this.formNameReset=this.$refs[formName];
        let _this = this;
        try{
          this.$refs[formName].validate((valid) => {
            if (valid) {
              if(Number(_this.addressUsable)>_this.createVoteForm.fee){
                _this.$refs.password.showPassword(true);
              }else{
                //余额不足
                _this.$message({
                  message:this.$t('message.noMoney'), type: 'warning', duration: '1000'
                });
              }
            } else {
              console.log('error submit!!');
              return false;
            }
          });
        }catch(e){
          console.log(e);
        }
      },
      /**
       * 获取密码提交请求
       * get password submit
       **/
      toSubmit(password) {
        this.loading=true;
        let params={
          "userAlias":this.addressAlias==='null' ?  '' : this.addressAlias,
          "creator": this.address,
          "deposit": RightShiftEight(this.createVoteForm.deposit),
          "description": this.createVoteForm.description,
          "endTime":Date.parse(this.createVoteForm.endTime),
          "fee": this.fee,
          "hasMultipleSelect": this.hasMultipleSelect,
          "items": this.createVoteForm.domains,
          "maxSelectCount": this.createVoteForm.optionMax,
          "minSelectCount": this.createVoteForm.optionMin,
          "startTime": Date.parse(this.createVoteForm.startTime),
          "title": this.createVoteForm.title,
          //"password": password,
          // "status": 0,
          "voteCanModify": this.voteCanModify,
        };
        //console.log(params);
        getCreateVote(params)
          .then((response) => {
            if (response.code==='2000000') {
              //console.log(response.data);
              this.loading=false;
              this.hash=response.data.hash;
              let paramsSign={
                "address": this.address,
                "hash": this.hash,
                "pri": localStorage.getItem("encryptedPrivateKey"),
                "pub": localStorage.getItem('pubKey'),
                "pass": password,
                "types":"101"
              };
              let _this=this;
              console.log(paramsSign)
              nulsJs.signWithHash(paramsSign, function (data) {
                //console.log(data);
                if (data.success) {
                  _this.$message({
                    message: _this.$t('message.createVoteSuccess'), type: 'success', duration: '3000'
                  });
                  _this.$router.push({
                    name: '/voteList',
                  })
                }else{
                  _this.$message({
                    message: _this.$t('message.failed') +':'+_this.$t('message.'+data.code), type: 'warning', duration: '1000'
                  });
                }
              });
            }else{
              this.loading=false;
              this.$message({
                message: this.$t('message.failed')+':'+this.$t('message.'+response.code), type: 'warning', duration: '1000'
              });
            }
          }).catch(err => {
          this.loading=false;
          this.$message({
            // message: this.$t('message.failed') +':'+this.$t('message.'+err.code), type: 'warning', duration: '1000'
            message: this.$t('message.failed'), type: 'warning', duration: '1000'
          });
        })
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
      //get fee
      getFee(){
        let domainsContent=false;
        for(let i in this.createVoteForm.domains){
          if(this.createVoteForm.domains[i].content!==''){
            domainsContent=true;
          }else{
            domainsContent=false;
          }
        }
        let formData=this.createVoteForm.title&&this.createVoteForm.description&&this.createVoteForm.description&&domainsContent&&this.createVoteForm.hasMultipleSelect!==''&&this.createVoteForm.voteCanModify!==''&&this.createVoteForm.startTime&&this.createVoteForm.endTime
          if (formData) {
            let params={
              "userAlias":this.addressAlias==='null' ?  '' : this.addressAlias,
              "creator": this.address,
              "deposit": RightShiftEight(this.createVoteForm.deposit),
              "description": this.createVoteForm.description,
              "endTime":Date.parse(this.createVoteForm.endTime),
              "hasMultipleSelect": this.hasMultipleSelect,
              "items": this.createVoteForm.domains,
              "maxSelectCount": this.createVoteForm.optionMax,
              "minSelectCount": this.createVoteForm.optionMin,
              "startTime": Date.parse(this.createVoteForm.startTime),
              "title": this.createVoteForm.title,
              "password": "",
              // "status": 0,
              "voteCanModify": this.voteCanModify
            };
            //console.log(params);
            getCreateVoteFee(params)
              .then((response) => {
                if (response.code==='2000000') {
                  //console.log(response);
                  this.createVoteForm.fee = (Number(LeftShiftEight(response.data.gasLimit*27))+0.001).toFixed(8);
                  this.fee = response.data.gasLimit;
                }else{
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
          } else {
            return false;
          }
      }
    },
  }
</script>

<style lang="less" type="text/less">
  @import url("./../../assets/css/style.less");

  .create-vote {
    text-align: center;
    margin-top: 0;
    .back{
      margin: 10px 0;
    }
    h3 {
      font-size: @font-size-20;
      margin-bottom: 14px;
    }
    .create-vote-content{
      width: 650px;
      margin: 0 10% 0 13%;
      .vote-tips{
        color:@c-font-yellow1-color;
        margin-left: 117px;
        text-align: left;
      }
      .el-form{
        .el-form-item{
          margin-bottom:12px;
          display:flex;
          .el-form-item__label{
            line-height:40px;
            min-width:115px;
          }
          .el-form-item__content{
           text-align: left;
            width:100%;
          }
        }
      }
      .el-form-item1{
        .el-form-item__content{
          text-align: left;
          .el-form-item__error{
            padding-top:0;
            top:90%;
          }
        }
      }
      .el-form-item2{
        position: relative;
        .el-form-item__content{
          .el-textarea{
            .el-textarea__inner{
              height:120px;
            }
          }
        }
        .textarea-number{
          position: absolute;
          top: 86px;
          right: 9px;
          color: @c-font-gray-color;
          font-size: @font-size;
        }
      }
      .el-form-item3{
        position: relative;
        .icon-box{
          position: absolute;
          top:0;
          right:-84px;
        }
        .el-form-item__error{
          top:81%;
        }
        .el-form-item__content{
          .el-input.no-error{

          }
        }
      }
      .el-form-item4{
        display:inline-block;
        .el-form-item__content{
          text-align: left;
         .el-select{
           .el-input{
             width:140px;
           }
         }
          .el-radio2,.el-select1{
            margin-right:5px;
            margin-left:5px;
          }
          .el-radio2{
            margin-left:15px;
          }
          .el-form-item5{
            display:inline-block;
            .el-form-item__content{
              text-align: left;
              margin-left:0!important;
              .el-select{
                .el-input{
                  width:140px;
                  .el-input__inner{
                    padding:0 6px;
                  }
                }
              }
              .el-radio2,.el-select1{
                margin-right:5px;
              }
            }
          }
          .el-form-item6{
            display:inline-block;
            .el-form-item__content{
              margin-left:0!important;
              text-align: left;
              .el-select{
                .el-input{
                  width:150px;
                  .el-input__inner{
                    padding:0 6px;
                  }
                }
              }
              .el-radio2,.el-select1{
                margin-right:10px;
              }
            }
          }
        }
      }
      .el-form-item4>.el-form-item__content{
        width:595px;
      }
      .el-form-item8{
        .el-form-item__content{
          display:flex;
          justify-content: start;
          .date-line{
            margin:0 5px;
          }
          .el-date-editor{
            width:186px;
            .el-input__prefix{
              display:none;
            }
          }
        }
        .el-form-item12{
          .el-form-item__error{
            top:82%;
          }
        }
      }
      .el-form-item9{
        position: relative;
        .useable{
          position: absolute;
          top:-22px;
          right:0;
        }
        .icon-tips{
          position: absolute;
          top:0;
          left:-81px;
        }
        .ipt-div{
          border: 1px solid #24426c;
          height: 28px;
          line-height: 28px;
          background: #17202e;
          padding-left: 7px;
          word-wrap: break-word;
          margin-top:8px;
          cursor: not-allowed;
        }
      }
      .el-form-item10{
        .el-form-item__content{
          .el-input{
            .el-input__inner{
              border:none;
              background:transparent;
            }
          }
        }
      }
      .el-form-item11{
        .el-form-item__content{
          text-align: center!important;
          .el-button{
            width:150px;
          }
        }
      }
    }
    @media screen and (max-width: 768px){
      .create-vote-content{
        width: auto;
        margin: 0;
        .vote-tips{
          color:@c-font-yellow1-color;
          margin-left: 0;
          text-align: left;
        }
        .el-form{
          .el-form-item{
            margin-bottom:12px;
            display:block;
            .el-form-item__label{
              line-height:25px;
              min-width:0;
            }
            .el-form-item__content{

            }
          }
          .el-form-item2{
            .textarea-number{
              top:114px;
            }
          }
          .el-form-item3{
            .icon-box{
              right:0;
            }
          }
          .el-form-item4{
            .el-form-item__content{
              .el-radio{
               margin-top:-8px;
              }
              .el-form-item5,.el-form-item6{
                display:block;
                .el-form-item__content{
                  .el-select1{
                    margin:0;
                    .el-input{
                      width:150px;
                    }
                  }
                }
              }
            }
          }
          .el-form-item7{
            .el-form-item__content{
             .el-radio-group{
               .el-radio{
                 display:block;
                 margin-left:0;
               }
               .el-radio:nth-child(1){
                 margin-bottom:5px;
               }
             }
            }
          }
          .el-form-item8{
            .el-form-item__content{
              .el-date-editor{
                width:auto;
              }
            }
          }
          .el-form-item9{
            .el-form-item__label{
              line-height:0;
            }
          }
          .el-form-item10{
            .el-form-item__label{
              margin-top:7px;
            }
          }
          .el-form-item11{
            text-align: center;
            .el-form-item__content{
              .el-button{
                display:block;
                margin:0 auto 10px;
              }
            }
          }
        }
      }
    }
  }
  .none{
    display:none;
  }
  .el-select-dropdown .el-scrollbar .el-select-dropdown__wrap .el-select-dropdown__list .el-select-dropdown__item{
    text-align: left;
    padding-left:12px;
  }
</style>
