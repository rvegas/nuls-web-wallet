<template>
  <div class="main-content">
    <div class="center home">
      <el-row>
        <el-col :span=24>
          <div class="welcome">
            <div class="welcome-logo flex-common">
              <div class="h1">{{ $t('message.home1') }} NULS</div>
            </div>
            <div class="welcome-line"></div>
            <h5 class="h5">{{ $t('message.home2') }}</h5>
          </div>
        </el-col>
        <el-col :span=24>
          <div class="account flex">
            <!--<el-row>-->
            <el-col :xs="{span: 24}" :sm="{span: 3}"></el-col>
            <el-col :xs="{span: 24}" :sm="{span: 9}">
              <div class="create-account cursor-p" @click="createAccount">
                <div>{{ $t('message.home3') }}</div>
                <div>{{ $t('message.home4') }}</div>
              </div>
            </el-col>
            <el-col :xs="{span: 24}" :sm="{span: 9}">
              <div class="import-account cursor-p" @click="importAccount">
                <div>{{ $t('message.home5') }}</div>
                <div>{{ $t('message.home6') }}</div>
              </div>
            </el-col>
            <el-col :xs="{span: 24}" :sm="{span: 3}"></el-col>
            <!--</el-row>-->
          </div>
        </el-col>
        <el-col :span=24>
          <div class="describe-text">
            <p>{{ $t('message.home7') }}</p>
            <p>{{ $t('message.home8') }}</p>
            <p>{{ $t('message.home9') }}</p>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  import {versions} from '@/utils/util'

  export default {
    methods: {

      /**
       * 创建账户
       * To create an account
       */
      createAccount() {
        if (sessionStorage.getItem('nodeError') === '0') {
          this.$message({
            message: this.$t('message.nodeError'), type: 'warning', duration: '1000'
          });
        } else {
          this.$router.push({
            name: '/newWallet'
          });
        }
      },

      /**
       * 导入钱包跳转
       * To import account
       */
      importAccount() {
        if (sessionStorage.getItem('nodeError') === '0') {
          this.$message({
            message: this.$t('message.nodeError'), type: 'warning', duration: '1000'
          });
        } else {
          if (versions().mobileVersions) {
            this.$router.push({
              name: '/importKeyCode'
            });
          } else {
            this.$router.push({
              name: '/importKeyFile'
            });
          }
        }
      }
    }
  }
</script>

<style lang="less" type="text/less">
  @import url("./../assets/css/style.less");

  .home {
    margin: 100px auto 0;
    .welcome {
      text-align: center;
      .welcome-logo {
        align-items: center;
        justify-content: center;
        .icon-home-logo {
          width: 156px;
          height: 62px;
          background-position: -3px -89px;
          cursor: initial;
        }
        .h1 {
          display: inline-block;
          font-size: @font-size-24;
          padding-left: 15px;
          padding-top: 7px;
        }
      }

      .welcome-line {
        width: 20px;
        border-top: 1px solid @c-h-color;
        margin: 10px auto 0;
      }

      .h5 {
        font-size: @font-size-16;
        margin: 20px 0 60px 0;
        @media (max-width: 768px) {
          margin: 1rem 0 1.5rem 0;
        }
      }

    }
    .account {
      justify-content: center;
      .create-account, .import-account {
        width: 267px;
        background-color: @bg-1-color;
        border: @border2;
        text-align: center;
        padding: 88px 30px 118px;
        margin: auto;
        min-height: 285px;
        &:hover {
          cursor: pointer;
          border: @border1;
        }

        div:nth-child(1) {
          font-size: @font-size-16;
          margin-bottom: 20px;
        }

        div:nth-child(2) {
          font-size: @font-size;
          color: @c-2-color;
        }

        @media (max-width: 768px) {
          width: 18rem;
          padding: 3rem 30px 2rem;
          min-height: 12rem;
        }

      }
      .create-account {
        /*margin-right: 50px;*/
        /*margin-top:0;*/
      }
    }
    @media screen and (max-width: 768px) {
      .account {
        display: block;
        text-align: center;
        .create-account {
          margin: 0 auto 10px;
          text-align: center;
        }
      }
    }
    .describe-text {
      margin: 100px 0 0;
      font-size: @font-size-14;
      text-align: center;
      color: @c-2-color;
      @media (max-width: 768px) {
        margin: 2rem 0 0;
      }
      p {
        margin-top: 10px;
      }

    }
  }


</style>
