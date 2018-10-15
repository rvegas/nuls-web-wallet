<template>
  <div class="main-content">
    <div class="center privacy-clause">
      <BackBar :backTitle="$t('message.back')"></BackBar>
      <div class="infos" v-if="this.language==='cn'">
        <h1>NULS钱包隐私政策</h1>
        <h2>尊敬的用户：</h2>
        <p class="paragraph">NULS基金会（以下简称“NULS”或“我们”）尊重并保护用户（以下简称“您”或“用户”）的隐私，您使用NULS钱包时，NULS将按照本隐私政策（以下简称“本政策”）收集、使用您的个人信息。</p>
        <p class="paragraph">NULS建议您在使用本产品（以下简称“NULS钱包”）之前仔细阅读并理解本政策全部内容, 针对免责声明等条款在内的重要信息将以加粗的形式体现。本政策有关关键词定义与《NULS钱包服务协议》保持一致。</p>
        <p class="paragraph">本政策可由NULS在线随时更新，更新后的政策一旦公布即代替原来的政策，如果您不接受修改后的条款，请立即停止使用“NULS钱包”，您继续使用“NULS钱包”将被视为接受修改后的政策。经修改的政策一经在“NULS钱包”上公布，立即自动生效。</p>
        <h3>一、我们收集您的哪些信息</h3>
        <p>请您知悉，我们收集您的以下信息是出于满足您在“NULS钱包”服务需要的目的，且我们十分重视对您隐私的保护。在我们收集您的信息时，将严格遵守“合法、正当、必要”的原则。且您需要知悉，若您不提供我们服务所需的相关信息，您在“NULS钱包”的服务体验可能因此而受到影响。</p>
        <p>1、我们将收集您的操作记录、交易记录、钱包地址等个人信息。</p>
        <p>2、您知悉：您在“NULS钱包”上的钱包密码、私钥、Keystore并不存储或同步至NULS服务器或主网。NULS不提供找回您的钱包密码、私钥、Keystore的服务。</p>
        <p>3、在法律法规允许的范围内，NULS可能会在以下情形中收集并使用您的个人信息无需征得您的授权同意：</p>
        <p>(1)与国家安全、国防安全有关的；</p>
        <p>(2)与公共安全、公共卫生、重大公共利益有关的；</p>
        <p>(3)与犯罪侦查、起诉、审判和判决执行等有关的；</p>
        <p>(4)用于维护服务的安全和合规所必需的，例如发现、处理产品和服务的故障；</p>
        <p>(5)法律法规规定的其他情形。</p>
        <h3>二、法律适用与争议解决</h3>
        <p>1、本协议及其修订版之效力、解释、变更、执行与争议解决均适用各国法律，如无相关法律规定，则应当适用国际商业惯例和（或）行业惯例。</p>
        <p>2、若您和NULS之间发生任何纠纷或争议，首先应友好协商解决，协商不成的，任何一方可将纠纷或争议提交至NULS所在地有管辖权的人民法院解决。</p>
        <p>3、您需全面了解并遵守您所在司法辖区与使用NULS服务所有相关的法律、法规及规则。</p>
        <p>4、您在使用NULS服务过程中，如遇到任何问题，您可以通过NULS官方媒体、官网留言、发送邮件等方式联系我们。</p>
        <p class="paragraph">本政策未尽事宜，您需遵守NULS不定时更新的公告及相关规则。</p>
        <p class="text2-right">NULS基金会</p>
        <p class="text2-right">2018年7月31日</p>
      </div>

      <div class="infos infos-en" v-else-if="this.language==='en'">
        <h1>NULS Privacy Policy</h1>
        <h2>Dear Users,</h2>
        <p class="paragraph">NULS FOUNDATION, (“NULS” or “we”) respects and protects the privacy of Users (“you” or “Users”). NULS will collect and use your Personal Information, generated from your use of NULS, in accordance with this Privacy Policy (ThePolicy).</p>
        <p class="paragraph">NULS recommends that you carefully read and understand the entire contents of this Policy before using the product (NULS Wallet). Definitions of key words in this Policy are consistent with those in the NULS Terms of Service of NULS Wallet.</p>
        <p class="paragraph">NULS reserves the right to update this Policy online in the future, and the new policy will immediately replace the older one once posted. In particular, if you do not accept the revised policies, please immediately terminate your use of NULS Wallet. Your continuous use of NULS will be regarded as your acceptance of the revised policy. Furthermore, the revised policies will take into effect immediately upon being posted on NULS Wallet.</p>
        <h3>1. Information We Collect</h3>
        <p>We collect your information in order to provide the services you requested on NULS Wallet, and we highly value the protection for your privacy. We strictly abide by the principle of “lawful, justifiable and necessary” during our collection of your information. You acknowledge that, if you do not provide us with necessary information, your user experiences on NULS Wallet may be influenced.</p>
        <p>1.1 We may collect your Personal Information, including but not limited to your mobile device information, operation records, transaction records and wallet addresses.</p>
        <p>1.2 You confirm that your Wallet Password, Private Key, Keystore on NULS are not stored or synchronized on NULS’ servers. NULS does not offer the service to restore your Wallet Password, Private Key, Mnemonic Words or Keystore.</p>
        <p>1.3 To the extent permitted by local government’s laws and regulations, NULS may collect and use following Personal Information without your prior consent or authorization:</p>
        <p>a. Information related to national security and national defense;</p>
        <p>b. Information related to public security, public health, significant public interests;</p>
        <p>c. Information related to criminal investigation, prosecution, trial and enforcement;</p>
        <p>d. The Personal Information collected is publicized by yourself;</p>
        <p>e. The Personal Information is collected from legally publicly disclosed information, such as legal news reports, government information disclosure and other channels;</p>
        <p>f. The Personal Information is necessary to maintain the security and compliance of services, such as to detect or to solve the malfunction of products and services;</p>
        <p>g. Other circumstances prescribed by laws and regulations.</p>
        <h3>2. Governing Law and Dispute Resolution</h3>
        <p>2.1 The validity, interpretation, alternation, enforcement, dispute resolution of this Agreement and its revised versions shall be governed and construed in accordance with the laws of local government. Where there is no applicable law, this Agreement shall be interpreted by applicable commercial and/or industrial practices.</p>
        <p>2.2 If any dispute or claim in connection with this Agreement arises between you and NULS, the parties shall firstly attempt to resolve the dispute or claim through amicable negotiations in good faith. If the parties cannot reach an agreement, either party may sue the other party at the competent court where NULS is located.</p>
        <p>2.3 You shall fully understand and conform to the laws, regulations and rules in your jurisdictions which are relevant to your use of NULS services.</p>
        <p>2.4 During your use of NULS services, if you come across any problems, you can contact us through the official media of NULS, official website, email, etc.</p>
        <p class="paragraph">As for any issues not covered in this Agreement, you shall comply with the announcements and relevant rules as updated by NULS in the future.</p>
        <p class="text2-right">NULS FOUNDATION ,</p>
        <p class="text2-right">Jul 31st, 2018</p>
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
  .privacy-clause {
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
