<template>
  <div class="main-content">
    <div class="center testnet-nuls">
      <h3 class="h3">{{ $t('message.testnetNuls1') }}</h3>
      <el-form :model="testNulsForm" :rules="testNulsRules" ref="testNulsForm">
        <div class="get-nuls">
          <div>{{ $t('message.testnetNuls2') }}</div>
          <div>• {{ $t('message.testnetNuls3') }}</div>
          <div>
            <span>• {{ $t('message.testnetNuls4') }}</span>
            <el-tooltip class="item" effect="dark" content="https://nuls.community/d/131-get-the-testing-coins-of-the-testnet" placement="bottom-start"><span @click="toCommunity" class="cursor-p">{{ $t('message.testnetNuls10') }}</span></el-tooltip>
            <span>{{ $t('message.testnetNuls11') }}</span>
          </div>
        </div>
        <el-form-item :label="$t('message.testnetNuls5')" prop="address">
          <el-input type="text" v-model.trim="testNulsForm.address"></el-input>
        </el-form-item>
        <el-form-item :label="$t('message.testnetNuls12')" prop="code">
          <el-input type="text" v-model.trim="testNulsForm.code"></el-input>
          <div class="img-code-box" @click="reloadQrcode"><img class="img-code" src="" alt=""></div>
        </el-form-item>
        <el-form-item label="" prop="type">
          <el-checkbox-group v-model="testNulsForm.type">
            <el-checkbox :label="$t('message.testnetNuls6')" name="type"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item class="form-bt">
          <el-button type="primary" @click="submit('testNulsForm')">{{ $t('message.testnetNuls7') }}</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
  export default {
    data(){
      return{
        /*
        * 表单信息
        * form fields
        * */
        testNulsForm: {
          address: '',
          code: '',
          type: [],
        },
        //表单验证信息
        testNulsRules: {
          address: [
            {required: true, message: this.$t('message.testnetNuls9'), trigger: 'blur'}
          ],
          code: [
            {required: true, message: this.$t('message.testnetNuls12'), trigger: 'blur'}
          ],
          type: [
            { required: true,type: 'array', message: this.$t('message.testnetNuls8'), trigger: 'change'}
          ]
        },
      }
    },
    methods: {
      submit(formName){
        this.$refs[formName].validate((valid) => {
            if (valid) {
              let _this=this;
              let data=this.$qs.stringify({
                address: this.testNulsForm.address,
                code:this.testNulsForm.code
              });
              /*
              * 提交申请
              * submit applications
              * */
              this.$http.post("http://120.77.241.8:8016/coinAddress/address?address="+this.testNulsForm.address+"&code="+this.testNulsForm.code)
                .then(function (data){
                  if(data.data.code==="SYS100"){
                    _this.$message({
                      message:  _this.$t('message.testnetNuls13') +data.data.data[1]+_this.$t('message.testnetNuls14')+data.data.data[0]+" NULS！", type: 'success', duration: '3000'
                    });
                  }else if(data.data.code==="SYS101"){
                    _this.$message({
                      message: _this.$t('message.failed') +':'+_this.$t('message.'+data.data.code), type: 'warning', duration: '1000'
                    });
                  }else if(data.data.code==="SYS102"){
                    _this.$message({
                      message: _this.$t('message.failed') +':'+_this.$t('message.'+data.data.code), type: 'warning', duration: '1000'
                    });
                  }else if(data.data.code==="SYS103"){
                    _this.$message({
                      message: _this.$t('message.failed') +':'+_this.$t('message.'+data.data.code), type: 'warning', duration: '1000'
                    });
                  }else if(data.data.code==="SYS104"){
                    _this.$message({
                      message: _this.$t('message.failed') +':'+_this.$t('message.'+data.data.code), type: 'warning', duration: '1000'
                    });
                  }else if(data.data.code==="SYS105"){
                    _this.$message({
                      message: _this.$t('message.failed') +':'+_this.$t('message.'+data.data.code), type: 'warning', duration: '1000'
                    });
                  }else if(data.data.code==="SYS106"){
                    _this.$message({
                      message: _this.$t('message.failed') +':'+_this.$t('message.'+data.data.code), type: 'warning', duration: '1000'
                    });
                  }else{
                    _this.$message({
                      message: _this.$t('message.failed') +':'+_this.$t('message.nullerror'), type: 'warning', duration: '1000'
                    });
                  }
              }).catch(function (error) {
                console.log(error);
                _this.$message({
                  message: _this.$t('message.failed') +':'+_this.$t('message.nullerror'), type: 'warning', duration: '1000'
                });
              });
            }
        });
      },
      reloadQrcode(){
        document.getElementsByClassName('img-code')[0].setAttribute("src","http://120.77.241.8:8016/verify/code?t="+new Date().getTime());
      },
      /*
      * 跳转社区
      * Jump community
      * */
      toCommunity(){
        window.open('https://nuls.community/d/131-get-the-testing-coins-of-the-testnet', '_blank');
      }
    },
    created(){
      this.$nextTick(function () {
        this.reloadQrcode();
      })
    },
  }
</script>
<style lang="less" type="text/less">
  @import url("./../../assets/css/style.less");
  .testnet-nuls{
    text-align: center;
    margin-top:100px;
    h3{
      font-size: @font-size-18;
      margin-bottom:50px;
    }
    .ipt-adress{
      text-align: left;
    }
    .el-form{
      max-width: 500px;
      margin: auto;
      .get-nuls{
        div{
          text-align: left;
          margin-bottom:10px;
          font-size: @font-size-14;
          span.cursor-p{
            color:@c-font-blue1-color;
          }
        }
      }
      .el-form-item:nth-child(2) {
        margin-top:20px;
      }
      .el-form-item:nth-child(3) {
        position:relative;
        .el-form-item__content{
          .img-code-box{
            position:absolute;
            right: -110px;
            top: 17px;
            img{
              width: 100px;
              height: 35px;
            }
          }
        }
      }
      .el-form-item:nth-child(4) {
        margin-top:-5px;
        text-align: left;
        .el-form-item__content {
          line-height: 22px;
          .el-checkbox-group{
            .el-checkbox{
              display:flex;
              align-items: start;
              .el-checkbox__label{
                white-space: initial;
              }
              .el-checkbox__input {
                padding-top: 3px;
              }
            }
          }
        }
      }
    }
    @media screen and (max-width: 768px) {
      .el-form{
        .el-form-item:nth-child(3) {
          .el-form-item__content{
            .img-code-box{
              right: 0;
              top: -15px;
              img{
                width: 100px;
                height: 32px;
              }
            }
          }
        }
        .el-form-item:nth-child(4) {
          margin-top:-5px;
          text-align: left;
          .el-form-item__content {
            line-height: 22px;
            .el-checkbox-group{
              .el-checkbox{
                display:flex;
                align-items: start;
                .el-checkbox__label{
                  white-space: initial;
                }
                .el-checkbox__input {
                  padding-top: 3px;
                }
              }
            }
          }
        }
      }
    }
  }
</style>
