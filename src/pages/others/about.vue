<template>
  <div class="main-content">
    <div class="center about">
      <BackBar :backTitle="$t('message.back')"></BackBar>
      <div class="infos" v-if="this.language==='cn'">
        <h1>关于</h1>
        <h2>当前版本：0.9.2</h2>
        <p class="paragraph">NULS网页版轻钱包无需同步所有区块数据，且私钥加密存储在本地设备上，具有极高的安全性。除不能创建共识节点外，NULS网页版轻钱包具备全节点钱包的创建/导入账户、转账、委托/退出委托等主要功能，轻便、易用。</p>
      </div>

      <div class="infos infos-en" v-else-if="this.language==='en'">
        <h1>About</h1>
        <h2>Version:0.9.2</h2>
        <p class="paragraph">It’s not necessary to synchronize all block data in NULS website wallet and the private key will be encrypted and stored on local devices, which makes it very safe. Except creating consensus nodes, NULS website wallet has major functions including creating/importing accounts, transferring, delegation/ canceling delegation among others of a full-node wallet. It is portable and easy to use.
        </p>
      </div>
      <div v-else></div>
    </div>
  </div>
</template>

<script>
  import BackBar from '@/components/BackBar.vue'

  export default {
    data() {
      return {
        dataList:'',
      }
    },
    components: {
      BackBar,
    },
    computed: {
      language () {
        return this.$store.getters.getLang ? this.$store.getters.getLang : 'en'
      }
    },
    created() {
      if (localStorage.getItem('lang')) {
        this.$store.commit('refreshLanguage', localStorage.getItem('lang'));
      }
    }
  }
</script>

<style lang="less" type="text/less">
  @import url("../../assets/css/style.less");
  .about {
    margin-top: 20px;
    .infos {
      font-size: @font-size-14;
      h1 {
        text-align: center;
        font-size: 20px;
      }
      h2 {
        font-size: 16px;
        margin-bottom:20px;
        margin-top:20px;
        text-align: center;
      }
      h3 {
        font-size: 16px;
      }
      p {
        line-height: 24px;
        text-indent: 26px;
      }
      .text1{
        margin:20px 0;
      }
      .text2-right{
        text-align: right;
      }
      .paragraph{
        margin-bottom:20px;
      }
    }
    .infos.infos-en{
      p {
        text-indent: 0;
      }
    }
  }
</style>
