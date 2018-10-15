<template>
  <div class="main-content">
    <div class="center help">
      <div class="help-content">
        <div class="help-title">{{ $t('message.help1') }}</div>
        <el-collapse accordion>
          <a class="first-title" href="https://wallet.nuls.io/static/pdf/webwallet.pdf" target="_blank">
            <el-collapse-item name="0">
              <template slot="title" class="flex">
                <div class="header-text text-d">{{ $t('message.help21') }}</div>
              </template>
            </el-collapse-item>
          </a>
          <el-collapse-item name="1">
            <template slot="title" class="flex">
              <div class="header-text">{{ $t('message.help2') }}</div>
            </template>
            <div>{{ $t('message.help3') }}</div>
            <div>{{ $t('message.help20') }}</div>
            <div>{{ $t('message.help4') }}</div>
            <div>{{ $t('message.help5') }}</div>
            <div>{{ $t('message.help6') }}</div>
          </el-collapse-item>
          <el-collapse-item name="2">
            <template slot="title" class="flex">
              <div class="header-text">{{ $t('message.help7') }}</div>
            </template>
            <div>{{ $t('message.help8') }}</div>
            <div>{{ $t('message.help23') }}</div>
            <div>{{ $t('message.help9') }}</div>
          </el-collapse-item>
          <el-collapse-item name="3">
            <template slot="title" class="flex">
              <div class="header-text">{{ $t('message.help10') }}</div>
            </template>
            <div>{{ $t('message.help11') }}</div>
          </el-collapse-item>
          <el-collapse-item name="4">
            <template slot="title" class="flex">
              <div class="header-text">{{ $t('message.help12') }}</div>
            </template>
            <div>{{ $t('message.help13') }}</div>
            <div>{{ $t('message.help22') }}</div>
            <div>{{ $t('message.help14') }}</div>
            <div>{{ $t('message.help15') }}</div>
          </el-collapse-item>
          <el-collapse-item name="5">
            <template slot="title" class="flex">
              <div class="header-text">{{ $t('message.help16') }}</div>
            </template>
            <div>{{ $t('message.help17') }}</div>
          </el-collapse-item>
          <el-collapse-item name="6">
            <template slot="title" class="flex">
              <div class="header-text">{{ $t('message.help18') }}</div>
            </template>
            <div>{{ $t('message.help19') }}</div>
          </el-collapse-item>
        </el-collapse>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {}
    },
    created() {
    },
    methods: {
    },
    components: {
    }
  }
</script>

<style lang="less" type="text/less">
  @import url("./../../assets/css/style.less");

  .help-content {
    margin-top: 90px;
    .help-title{
      font-size: @font-size-20;
      text-align: center;
      margin-bottom:50px;
    }
    .el-collapse{
      border:none;
      .first-title{
        display:inline-block;
        width:100%;
        .el-collapse-item:first-child{
          &:hover{
            .header-text{
              color:@c-font-blue1-color;
            }
          }
          .el-collapse-item__header.is-active{
            border-bottom-color: @table-td-bd;
            color:@c-color;
          }
          .el-collapse-item__wrap{
            display:none;
          }
        }
      }
      .el-collapse-item{
        padding:0 50px;
        .el-collapse-item__header,.el-collapse-item__wrap{
          background:@bg-color;
          border-bottom:1px solid @table-td-bd;
          padding:0 27px;
        }
        .el-collapse-item__header{
          color:@c-color;
          font-size: @font-size-18;
          height: 55px;
          line-height: 55px;
          .el-icon-arrow-right{
            color:@c-font-blue1-color;
            /*&:before{*/
              /*content:'\E62B'*/
            /*}*/
          }
          .el-icon-arrow-right.is-active{
            /*transform: rotate(0deg);*/
            /*&:before{*/
              /*content:'\E60F'*/
            /*}*/
          }
        }
        .el-collapse-item__header.is-active{
          border-bottom-color: transparent;
          color:@c-font-blue1-color;
        }
        .el-collapse-item__wrap{
          .el-collapse-item__content{
            color:@c-font-gray-color;
          }
        }
      }
    }
  }
</style>
