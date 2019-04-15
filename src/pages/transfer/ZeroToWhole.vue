<template>
  <div class="zero" v-loading="loading">
    <BackBar :backTitle="$t('message.zero0')"></BackBar>
    <div class="center zero-info">
      <div class="zero-tip">
        <p>{{$t('message.zero1')}}</p>
        <!--<p>{{$t('message.zero2')}}</p>-->
      </div>

      <div class="zero-bit">
        <div class="zero-line">
          <span>{{$t('message.zero3')}}</span> {{zeroInfo.count}} {{$t('message.zero4')}}<i class="el-tooltip"></i>
        </div>
        <div class="zero-line">
          <span>{{$t('message.zero5')}}</span> {{zeroInfo.fee}} NULS
        </div>
        <el-button type="success" :disabled="zeroInfo.count <= 2" @click="zeroTo">{{$t('message.zero6')}}</el-button>
      </div>

    </div>
    <Password ref="password" @toSubmit="toSubmit"></Password>
  </div>
</template>
<script>
  import nulsJs from 'nuls-jssdk'
  import {LeftShiftEight} from '@/utils/util'
  import Password from './../../components/PasswordBar.vue'
  import BackBar from './../../components/BackBar'

  export default {
    data() {
      return {
        //加载动画
        loading: true,
        //零钱信息
        zeroInfo: [],
        //签名数据
        signList: [],
      };
    },
    created() {},
    mounted() {
      this.getZeroInfo();
    },
    components: {
      Password,
      BackBar
    },
    methods: {

      //获取零钱信息
      getZeroInfo() {
        let _that = this;
        nulsJs.changeOfMoney({"address": localStorage.getItem("address")}, function (data) {
          //console.log(data);
          if (data.success) {
            data.data.fee = LeftShiftEight(data.data.fee).toString();
            _that.zeroInfo = data.data;
            _that.loading = false;
          } else {
            _that.zeroInfo = [{count: 0, fee: 0, hashList: []}];
            _that.loading = false;
          }
        });
      },

      /**
       * 确定提交
       **/
      zeroTo() {
        this.$refs.password.showPassword(true);
      },


      /**
       * 获取密码提交请求
       * get password submit
       **/
      toSubmit(password) {
        let _this = this;
        this.loading = true;
        nulsJs.decodePri({
          "pass": password,
          "pub": localStorage.getItem("pubKey"),
          "pri": localStorage.getItem("encryptedPrivateKey")
        }, function (data) {
          //console.log(data);
          if (data.success) {
            for (let itme of _this.zeroInfo.hashList) {
              let signparam = {"hash": itme, "pri": data.data.pri, "pub": localStorage.getItem("pubKey")};
              _this.signList.push(nulsJs.signTranss(signparam));
            }
            //延迟执行
            setTimeout(() => {
              //console.log(_this.signList)
              for (let itme in _this.signList) {
                nulsJs.broadcast({
                  "agentHash": _this.zeroInfo.hashList[itme],
                  "sign": _this.signList[itme],
                  "types": 2,
                  "address": localStorage.getItem("address")
                }, function (data) {
                  //console.log(data);
                  if(data.success){
                    setTimeout(() => {
                      _this.getZeroInfo();
                      _this.$router.push({
                        name: '/account'
                      });
                    },5000);
                  }else {
                    //_this.getZeroInfo();
                    _this.loading = false;
                    _this.$router.push({
                      name: '/account'
                    });
                  }
                });
              }
            }, 2000)
          } else {
            _this.getZeroInfo();
            _this.loading = false;
            _this.$message({
              message: _this.$t('message.50000'), type: 'error', duration: '2000'
            });
          }

        })
      }
    }
  }
</script>
<style lang="less" type="text/less">
  @import url("./../../assets/css/style.less");
  .zero {
    width: 1024px;
    @media screen and (max-width: 768px) {
      width: 100%;
    }
    margin: 0 auto;
    .zero-info {
      width: 680px;
      @media screen and (max-width: 768px) {
        width: 90%;
      }
      margin: 0 auto;
      .zero-tip {
        padding: 10px;
        background-color: #222d3f;
        p {
          font-size: 14px;
          padding: 5px 10px;
        }
      }
      .zero-bit {
        background-color: #17202E;
        width: 680px;
        @media screen and (max-width: 768px) {
          width: 80%;
        }
        margin: 40px auto 0;
        .zero-line {
          margin: 0 10px;
          border-bottom: 1px solid #2D3849;
          line-height: 2.5rem;
          text-align: right;
          font-size: 14px;
          span {
            text-align: left;
            display: block;
            float: left;
          }
        }
        .el-button {
          width: 230px;
          border-radius: 1px;
          height: 28px;
          line-height: 28px;
          padding: 0;
          background-color: #658ec7;
          border-color: #658ec7;
          margin: 20px 0 30px 33%;
          &:hover, &:focus {
            background: @bt-h-color;
            border: 1px solid @bt-bd-h-color;
            color: @c-color;
          }
          @media screen and (max-width: 768px) {
            width: 40%;
          }
        }
      }
    }
  }
</style>
