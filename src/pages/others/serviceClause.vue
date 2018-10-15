<template>
  <div class="main-content">
    <div class="center privacy-clause">
      <BackBar :backTitle="$t('message.back')"></BackBar>
      <div class="infos" v-if="this.language==='cn'">
        <h1>NULS钱包服务协议</h1>
        <h2>尊敬的用户：</h2>
        <h3 class="text1">欢迎您使用“NULS钱包”软件及相关服务！</h3>
        <p class="paragraph">《NULS钱包服务协议》（以下简称“本协议”）由NULS基金会（以下简称“NULS”或“我们”）和用户（以下简称“您”或“用户”）签订，本协议在您与NULS之间具有合同上的法律效力。</p>
        <p class="paragraph">NULS在此特别提醒您在使用“NULS钱包”之前，请认真阅读《NULS钱包服务协议》及后文提到的相关协议，尤其是本协议规定的“免责及责任限制”等条款将以加粗的形式体现，确保您充分理解本协议中各条款，并自主考虑风险。</p>
        <h3>关于本协议的确认及接纳</h3>
        <p>您已理解本协议及有关协议适用于“NULS钱包”及NULS所自主开发和拥有的去中心化应用（简称“DApp”）（排除第三方开发的DApp）。</p>
        <p>您下载“NULS钱包”软件并创建或导入钱包，即视为您已经充分阅读并接受本协议全部条款，本协议立即生效，对双方具有约束力。</p>
        <p class="paragraph">本协议可由NULS团队随时更新，经修改的协议一经在“NULS钱包”软件上公布，立即自动生效，恕不再另行通知。在NULS公布修改协议条款后，如果您不接受修改后的条款，请立即停止使用“NULS钱包”，您继续使用“NULS钱包”将被视为接受修改后的协议。</p>
        <h3>定义</h3>
        <p class="paragraph">NULS钱包：指由NULS基于NULS主网络系统开发的区块链钱包，包括其它为方便用户使用区块链系统而开发的工具。</p>
        <h3>用户</h3>
        <p>(1)用户必须是具备完全民事行为能力的自然人；</p>
        <p>(2)若您为18周岁以下的未成年人，使用“NULS钱包”服务，需要在您父母或监护人的指导下使用“NULS钱包”。无民事行为能力人使用“NULS钱包”或限制民事行为能力人超过其民事权利或行为能力范围从事交易的，造成的一切后果，“NULS钱包”有权要求您及您的父母或监护人负责。</p>
        <p>1、创建或导入钱包：指您使用“NULS钱包”，确认履行本协议并创建或导入钱包的过程。</p>
        <p>2、钱包密码：指您在创建“NULS钱包”过程中，软件操作界面提示您填写的密码，该密码用于加密保护私钥。作为去中心化的应用，钱包密码不存储在您的这台移动设备或NULS的服务器上，一旦丢失你需要借助明文私钥重置新密码。</p>
        <p>3、私钥：由256位随机字符构成，是用户拥有并使用数字代币的核心。</p>
        <p>4、钱包地址：由私钥借助密码学原理单向推导生成，数字钱包地址即为公开收款地址。</p>
        <p>5、Keystore: 是私钥或经过用户设置的钱包密码加密保存的文件形式，它只存储在您的这台设备中，不会同步至NULS服务器。</p>
        <p class="paragraph">6、个人信息：指以电子或者其他方式记录的能够单独或者与其他信息结合识别用户个人身份的各种信息，包括但不限于钱包地址、操作记录、交易记录等，但不包括用户的钱包密码、私钥、Keystore。</p>
        <h3>一、服务内容</h3>
        <p>1、<span>创建或导入钱包。</span>您可以使用“NULS钱包”生成新钱包或导入私钥生成钱包。</p>
        <p>2、转账、收款。您可以使用“NULS钱包”的转账、收款功能进行NULS代币的管理，即运用私钥进行电子签名，对相关区块链的账本进行修改。转账是指付款方利用收款方的钱包地址进行转账操作，实际的转账、收款行为均在NULS主网区块链系统发生。</p>
        <p>3、节点。您可以使用“NULS钱包”创建共识节点，或者撤销节点。</p>
        <p>4、共识。您可以使用“NULS钱包”进行共识/委托共识，或者退出共识/委托共识。</p>
        <p>5、不可撤销、篡改。使用“NULS钱包”进行交易、共识等操作时，您应理解区块链操作“数据一旦上链，不可篡改、不可撤销”属性，并自行承担因操作失误而导致结果不可逆的损失。</p>
        <p>6、红牌。节点尝试双花、尝试分叉等攻击行为计为红牌，代理人押金锁定60天，该节点代理的代币锁定3天，该账户不允许再次创建代理节点。</p>
        <p class="paragraph">7、黄牌。每次代理节点未在规定时间内出块则计一次黄牌，黄牌将影响节点信用值以及共识收益，如果节点连续获得100个黄牌，则该节点将受到红牌惩罚，节点将被注销。</p>
        <h3>二、用户接受NULS提供的上述服务时应了解以下常见问题：</h3>
        <p>1、秉承着区块链的去中心化特点，并为了保护用户的数字代币安全，NULS提供的是去中心化服务，大大区别于银行业金融机构。请用户了解，NULS不提供以下服务：</p>
        <p>(1)存储用户的钱包密码（即用户创建/导入钱包时设置的密码）、私钥、Keystore；</p>
        <p>(2)找回用户的钱包密码、私钥、Keystore；</p>
        <p>(3)冻结钱包；</p>
        <p>(4)挂失钱包；</p>
        <p>(5)恢复钱包；</p>
        <p>(6)交易回滚。</p>
        <p class="paragraph">2、由于NULS不提供上述服务，因此用户应当自行保管含有“NULS钱包”的设备、备份“NULS钱包”、备份钱包密码、私钥及Keystore。如用户遗失设备、删除且未备份“NULS钱包”、钱包被盗或遗忘钱包密码、私钥、Keystore，NULS均无法还原钱包或找回钱包密码、私钥、Keystore；如用户进行交易时误操作（例如输错转账地址），NULS亦无法取消交易。</p>
        <h3>三、风险提示</h3>
        <p>1、您理解当您在“NULS钱包”上创建或导入钱包之后，您的Keystore、私钥等信息仅存储在当前的这台设备中，不存储在“NULS钱包”或我们的服务器上。您可以按照“NULS钱包”提供的操作指南采取同步钱包等方式更换设备。但若您未保存或备份钱包密码、私钥、Keystore等信息，且在您设备丢失的情况下，您的数字代币将因此丢失，NULS无法为您找回，您需自行承担相应损失。若您在导出、保存或备份钱包密码、私钥、Keystore等信息时泄密，或者保存/备份上述信息的设备/服务器，被黑客攻击或控制等情况下，您的数字代币将因此丢失，NULS无法为您找回，您需自行承担相应损失。</p>
        <p>2、我们建议您在创建或导入钱包时对您钱包的密码、私钥及Keystore等信息做好安全备份。我们提醒您注意，请不要采用以下备份方式：截图、邮件、记事本、短信、微信、QQ等电子备份方式。我们建议您在纸质记事本上抄写密码和Keystore等信息，同时您亦可将电子数据保管至密码管理器中。</p>
        <p class="paragraph">3、我们建议您在安全的网络环境中使用“NULS钱包”，以避免可能存在的安全隐患。</p>
        <h3>四、服务的变更、中断、终止</h3>
        <p>1、您同意NULS为保证自主业务经营权可以暂时提供部分服务功能，或于将来暂停部分服务功能或开通新的服务功能。当任何功能减少或者增加、变化时，只要您仍然使用NULS提供的服务，表示您仍然同意本协议或者本协议修正后的条款。</p>
        <p>2、您理解存在如下情形时，NULS将暂停提供服务：</p>
        <p>(1)因设备维护、NULS主网系统维修、升级、故障和通信中断等技术原因而中断业务；</p>
        <p>(2)因台风、地震、海啸、洪水、停电、战争或恐怖袭击等不可抗力因素，病毒、黑客攻击、系统不稳定或政府行为等原因，造成NULS系统不能提供服务或NULS认为继续提供服务会有较大风险；</p>
        <p>(3)发生NULS无法控制或合理预见的其他情形。</p>
        <p>3、当您出现如下情况时，NULS可单方面中止或终止您使用“NULS钱包”的部分或全部功能:</p>
        <p>（1）用户死亡；</p>
        <p>（2）盗用他人的钱包信息或移动设备；</p>
        <p>（3）拒绝NULS为提升“NULS钱包”功能而发起的强制更新操作；</p>
        <p>（4）将“NULS钱包”用于违法或犯罪活动；</p>
        <p>（5）妨碍其他用户正常使用；</p>
        <p>（6）伪称NULS的工作人员或管理人员；</p>
        <p>（7）攻击、侵入、更改或以任何其他方式威胁NULS计算机系统的正常运作；</p>
        <p>（8）利用“NULS钱包”宣传垃圾广告、散布暴力、淫秽、恐怖信息；</p>
        <p>（9）散布谣言，损害NULS和“NULS钱包”商誉；</p>
        <p>（10）违法行为，其他违反本协议的行为，及NULS合理认为应当暂停功能的情形。</p>
        <p class="paragraph">4、当您与NULS之间的服务关系变更、中断、终止时，您仍有权在合理时间内导出您钱包的相关信息。</p>
        <h3>五、您合法使用NULS服务的承诺</h3>
        <p>1、您应遵守您所居住的国家或地区的法律法规，不得将“NULS钱包”用于任何非法目的，也不得以任何非法方式使用NULS服务。</p>
        <p>2、您不得利用“NULS钱包”从事违法或犯罪的行为，包括但不限于：</p>
        <p>(1)反对宪法所确定的基本原则，危害国家安全、泄漏国家秘密、颠覆国家政权、破坏国家统一；</p>
        <p>(2)从事任何违法犯罪行为，包括但不限于洗钱、非法集资等；</p>
        <p>(3)通过使用任何自动化程序、软件、引擎、网络爬虫、网页分析工具、数据挖掘工具或类似工具，接入NULS服务、收集或处理NULS所提供的内容，干预或试图干预任何用户或任何其他方式接入NULS服务的行为；</p>
        <p>(4)提供赌博资讯或以任何方式引诱他人参与赌博；</p>
        <p>(5)侵入他人“NULS钱包”盗取数字代币；</p>
        <p>(6)进行与交易对方宣称的交易内容不符的交易，或不真实的交易；</p>
        <p>(7)从事任何侵害或可能侵害“NULS钱包”服务系统、数据的行为；</p>
        <p>(8)其他违法以及NULS有正当理由认为不适当的行为。</p>
        <p>3、您理解并同意，如因您违反有关法律（包括但不限于海关及税务方面的监管规定）或者本协议之规定，使NULS遭受任何损失、受到任何第三方的索赔或任何行政管理部门的处罚，您应对NULS进行赔偿，包括合理的律师费用。</p>
        <p class="paragraph">4、您承诺按时缴纳NULS的服务费用（如有），否则NULS有权暂停或中止对您提供的服务。</p>
        <h3>六、免责及责任限制</h3>
        <p>1、NULS仅对本协议中所列明的义务承担责任。</p>
        <p>2、您理解和同意，在法律所允许的范围内，NULS只能按照现有的技术水平和条件提供服务。因下列原因导致“NULS钱包”无法正常提供服务，NULS不承担责任：</p>
        <p>(1)NULS系统停机维护或升级；</p>
        <p>(2)因台风、地震、洪水、雷电或恐怖袭击等不可抗力原因；</p>
        <p>(3)您的设备软硬件和通信线路、供电线路出现故障；</p>
        <p>(4)操作不当或未通过NULS授权或认可的方式使用NULS服务；</p>
        <p>(5)因病毒、恶意程序攻击、网络拥堵、系统不稳定、系统或设备故障、通讯故障、电力故障或政府行为等原因；</p>
        <p>3、NULS对以下情形不承担责任：</p>
        <p>(1)因用户遗失设备、删除且未备份钱包、钱包被盗或遗忘钱包密码、私钥、Keystore而导致的数字代币丢失；</p>
        <p>(2)因用户自行泄露钱包密码、私钥、Keystore，借用、转让或授权他人使用自己的设备或“NULS钱包”，或未通过NULS官方渠道下载“NULS钱包”应用程序或其他不安全的方式使用“NULS钱包”应用程序导致的数字代币丢失；</p>
        <p>(3)因用户误操作（包括但不限于您输错转账地址）导致的数字代币丢失；</p>
        <p>(4)因用户不理解区块链技术的性质而进行误操作导致的数字代币丢失；</p>
        <p>(5)用户在第三方DApp上操作产生的风险和后果。</p>
        <p>4、所有您在第三方DApp进行的交易行为系您的个人行为，有约束力的合同关系在您和您的相对方之间建立，与“NULS钱包”无关。NULS提醒您应该通过自己的谨慎判断确定登录DApp及相关信息的真实性、合法性和有效性。您与任何第三方交易所产生的风险亦应由您自行承担；</p>
        <p>5、NULS不提供以下形式的保证：</p>
        <p>(1)NULS服务将符合您的全部需求；</p>
        <p>(2)您经由NULS服务取得的任何技术、产品、服务、资讯将符合您的期望；</p>
        <p>(3)您在“NULS钱包”上的交易各方会及时履行其在与您达成的交易协议中的各项义务。</p>
        <p class="paragraph">6、您理解根据有关国家政策法规的要求，我们可能不时更改我们的用户准入标准，限定向某一特定群体提供服务的范围和方式等。</p>
        <h3>七、知识产权保护</h3>
        <p class="paragraph">“NULS钱包”系NULS开发并拥有知识产权的应用程序。“NULS钱包”中显示的任何内容（包括本协议、公告、文章、视频、音频、图片、档案、资讯、资料、商标或标识等）的知识产权归NULS或第三方权利人所有。未经NULS或第三方权利人的事先书面同意，任何人不得擅自使用、修改、反向编译、复制、公开传播、改变、散布、发行或公开发表上述应用程序及内容。</p>
        <h3>八、法律适用与争议解决</h3>
        <p>1、本协议及其修订版之效力、解释、变更、执行与争议解决均适用各国法律，如无相关法律规定，则应当适用国际商业惯例和（或）行业惯例。</p>
        <p>2、若您和NULS之间发生任何纠纷或争议，首先应友好协商解决，协商不成的，任何一方可将纠纷或争议提交至NULS所在地有管辖权的人民法院解决。</p>
        <p>3、您需全面了解并遵守您所在司法辖区与使用NULS服务所有相关的法律、法规及规则。</p>
        <p class="paragraph">4、您在使用NULS服务过程中，如遇到任何问题，您可以通过NULS官方媒体、官网留言、发送邮件等方式联系我们。</p>
        <p class="paragraph">本协议未尽事宜，您需遵守NULS不定时更新的公告及相关规则。</p>
        <p class="text2-right">NULS基金会</p>
        <p class="text2-right">2018年7月31日</p>
      </div>


       <div class="infos infos-en" v-else-if="this.language==='en'">
        <h1>NULS Terms of Service</h1>
        <h2>Dear User,</h2>
        <!--<h3 class="text1">欢迎您使用“NULS钱包”软件及相关服务！</h3>-->
        <p class="paragraph">This NULS Terms of Service (the Agreement) is made between you (the User) and NULS FOUNDATION, (NULS or we) and is legally binding between you and NULS FOUNDATION.</p>
        <p class="paragraph">NULS FOUNDATION hereby advises you to carefully read the full content of this Agreement and other documents mentioned in this Agreement. Particularly, pay attention to the section “Disclaimer and Limitation of Liability” and other sections which are displayed in bold. Please make sure that you fully understand the entire Agreement and have evaluated the risks of using NULS Wallet.</p>
        <h3>I. Confirmation and Acceptance of this Agreement</h3>
        <p>1. You understand that this Agreement and other relevant documents apply to the NULS Wallet and the Decentralized Applications (DAPPs) which are developed and owned independently by NULS (excluding DAPPs developed by third parties).</p>
        <p>2. After you download the NULS Wallet and create or import a wallet account, you are deemed to have read and accepted this Agreement. The Agreement shall come into effect immediately and is legally binding to both parties.</p>
        <p class="paragraph">3. NULS may, at its sole discretion, modify or replace this Agreement at any time. The modified Agreement will automatically take effect once it is posted on NULS and you will not be notified again. If you do not agree with the modifications, you should terminate to use the NULS Wallet immediately. Tracks of using the NULS Wallet by the user after any modification to this Agreement constitutes the user’s acceptance of the modified Agreement.</p>
        <h3>Definition</h3>
        <p class="paragraph">NULS Wallet: the blockchain wallet developed by the NULS team, which is based on NULS and other supporting blockchain system tools developed for the convenience of the User.</p>
        <h3>User:</h3>
        <p>a) A User must be a natural person who possesses full capacity for civil conduct;</p>
        <p>b) If you are under 18 years of age, please use the NULS Wallet only under the guidance of your parents or guardians. If a person who has no capacity for civil conduct does a transaction using the NULS Wallet, or any person of limited capacity for civil conduct does any transaction which is not commensurate to him/her, the parents or guardians of the User shall be considered liable for the consequences of such transactions.</p>
        <p>1. Create or import wallet: using the NULS Wallet to create or import a wallet after you accept this Agreement.</p>
        <p>2. Wallet Password: the password you set when you create the wallet. The Wallet Password will be used to encrypt and protect your Private Key. NULS Wallet, as a decentralized application, will not store your Wallet Password on our servers, nor will your Wallet Password be stored in your own mobile devices or NULS servers. If you lose or forget your Wallet Password, you will have to reset with your Private Key.</p>
        <p>3. Private Key: it consists of 256 random bits. Private key is the core element for the token holder to manage and use his/her own tokens.</p>
        <p>4. Wallet address: it is generated from the Private Key based on cryptography. A wallet address is a public address for the receipt of Tokens.</p>
        <p>5. Keystore: Private Key in the format of a file, which is encrypted and protected by the User’s Wallet Password. Keystore is stored only in your mobile device and will not be synchronized on NULS servers.</p>
        <p class="paragraph">6. Personal Information: information in e-record or any other format which may identify a natural person when used alone or in combination with other information, including but not limited to a person's name, date of birth, identification card number, personal biological identification information, address, telephone number, debit/credit card number, e-mail address, wallet address, mobile device information, operation record, transaction record,etc., excluding Wallet Password, Private Key and Keystore.</p>
        <h3>I. Services</h3>
        <p>1. Create or import wallet. You may use NULS Wallet to create a new wallet or import existed wallets.</p>
        <p>2. Transfer and receive Tokens. You may manage your NULS Tokens by using the transfer and reception functionalities of NULS Wallet, that is, you may revise the blockchain ledger by signing with your Private Key. Transfer of Tokens means the payer would transfer the Token to the blockchain address of the payee. The actual transfer of Tokens happens on the NULS Main-Net.</p>
        <p>3. Node. You can use NULS Wallet to create consensus nodes, or to revoke nodes.</p>
        <p>4. Consensus. You can use NULS Wallet to reach consensus, entrust consensus, or exit consensus/entrust consensus.</p>
        <p>5. Irrevocable or tamper-resistant. When using the "NULS Wallet" for trading, reaching consensus and other functions, you should understand the feature of blockchain. Once data is put into the blockchain, the data cannot be tampered with and is irreversible, and you must bear the irreversible loss caused by your own misoperation.</p>
        <p>6. Red card. The node attempts to double spend, fork, etc. The attack behavior counts as a red card, the agent deposit is locked for 60 days, the token of the node agent is locked for 3 days, and the account is not allowed to create the agent node again.</p>
        <p class="paragraph">7. Yellow card. Each time the agent node fails to generate block within a specified period, a yellow card is counted, and the yellow card will affect the credit value of the node and the consensus revenue. If a node receives 100 yellow cards continuously, the node will have the red card penalty and be written off.</p>
        <h3>II. Users who use NULS must understand that:</h3>
        <p>1. In order to keep the decentralized feature of blockchain and to protect the security of your digital Tokens, NULS offers decentralized service which is largely different from the banking and financial institutions. Users shall understand that NULS DOES NOT provide the following services:</p>
        <p>a) Store User’s Wallet Password (the password Users set when creating or importing wallets), Private Key and Keystore;</p>
        <p>b) Restore User’s Wallet Password, Private Key and Keystore;</p>
        <p>c) Freeze the wallet;</p>
        <p>d) Report the loss of wallet;</p>
        <p>e) Restore the wallet;</p>
        <p>f) Roll back transactions.</p>
        <p class="paragraph">2. Users are responsible for taking care of their mobile devices and backup their Wallet Passwords, Private Keys and Keystores. If your mobile device is lost or stolen, or if you forget your Wallet Password, Private Key, Mnemonic Words or Keystore, NULS is unable to recover the wallet or restore Wallet Password, Private Key, Mnemonic Words or Keystore. Furthermore, NULS cannot cancel transactions for the misoperation of Users (such as typing in wrong address for transactions).</p>
        <h3>III. Risks</h3>
        <p>1. You understand that after you create or import a NULS Wallet, your Keystore, Private Key and Mnemonic Words are only stored on your mobile device and will not be stored on NULS or on the servers of NULS FOUNDATION. You may switch mobile devices by following the instructions on NULS to backup your wallet. If you lose your mobile device before you are able to write down or backup your Wallet Password, Private Key, Mnemonic Words or Keystore, you may lose your Tokens and the NULS FOUNDATION is not able to restore them. If your Wallet Password, Private Key, Mnemonic Words or Keystore is disclosed or the device which stores or holds your Wallet Password, Private Key, Mnemonic Words or Keystore is hacked or attacked, you may lose your Tokens and the NULS FOUNDATION is unable to restore them. You shall bear the foregoing losses on your own.</p>
        <p>2. We suggest that you backup your Wallet Password, Private Key and Keystore when you create or import wallet by writing them down on papers or make backups in password management apps. Please do not use electronic copies such as screenshots, e-mails, note-taking apps in cellphones, text messages, whatsapp or skype to backup any of the information above.</p>
        <p class="paragraph">3. In order to avoid potential security risks, we suggest you use NULS in a secured network environment.</p>
        <h3>IV. Change, Suspension, Termination of NULS Service</h3>
        <p>1. You acknowledge and accept that NULS may, at its sole discretion, provide only a part of services for the time being, suspend certain services or provide new services in the future. When we change our services, your continuous use of NULS is deemed as your acceptance of this Agreement and its revisions.</p>
        <p>2. You understand that NULS may suspend services under the following circumstances:</p>
        <p>a) Due to the maintenance, upgrading, failing of equipment and blockchain system, the interruption of communications, etc., NULS suspends the operation of the Main-Net;</p>
        <p>b) Due to force majeure events including but not limited to typhoon, earthquake, tsunami, flood, power outage, war, or terrorist attacks, or computer viruses, hacker attacks, system instability or government behaviors and other reasons, NULS is unable to provide services or in NULS’ reasonable opinion, continuous provision of services would result in significant risks;</p>
        <p>c) Due to other events which NULS cannot control or reasonably predicate.</p>
        <p>3. NULS reserves the right to unilaterally suspend or terminate all or part of the function of NULS Wallet under the following circumstances:</p>
        <p>a) Death of User;</p>
        <p>b) If you steal others’ wallets information or mobile devices;</p>
        <p>c) If you refuse to allow mandatory updates of NULS;</p>
        <p>d) If you use the NULS Wallet to commit illegal or criminal activities;</p>
        <p>e) If you hinder the normal use of NULS by other Users;</p>
        <p>f) If you pretend to be a staff member of NULS FOUNDATION ;</p>
        <p>g) If you threaten the normal operation of NULS computer system by attacks, invasion, alternation or any other means;</p>
        <p>h) If you use the NULS Wallet to send spam;</p>
        <p>i) If you spread rumors which endanger the goodwill of NULS and NULS Wallet;</p>
        <p>j) If you conduct any illegal activities, breach this Agreement or other circumstances under which NULS reasonably considers necessary to suspend services.</p>
        <p class="paragraph">4. You are entitled to export your wallets within a reasonable amount of time if NULS changes, suspends or terminates its services.</p>
        <h3>V. Your Representations and Warranties</h3>
        <p>1. You shall comply with: 1) all applicable laws and regulations of local government and 2) all applicable laws and regulations of the country or region you reside in. You shall not use NULS for any unlawful purposes or by any unlawful means.</p>
        <p>2. You shall not use NULS to commit any illegal or unlawful activities, including but not limited to:</p>
        <p>a) Activities opposing the basic principles set forth in the local government’s constitution, endangering national security, disclosing state secrets, overturning the government or undermining national unity;</p>
        <p>b) Any illegal conducts, such as money laundering, illegal fund raising etc.;</p>
        <p>c) Accessing to NULS services, collecting or processing the content provided by NULS, intervening or attempting to intervene any Users, by the employment of any automated programs, software, network engines, web crawlers, web analytics tools, data mining tools or similar tools etc.;</p>
        <p>d) Providing gambling information or inducing others to engage in gambling;</p>
        <p>e) Invading others’ NULS Wallets to steal Tokens;</p>
        <p>f) Engaging in any inaccurate or false transactions;</p>
        <p>g) Committing any activities which harms or attempts to harm NULS service system and data;</p>
        <p>h) Other activities which NULS have reasons to consider inappropriate.</p>
        <p>3. You understand and accept that you shall be responsible for any violation of law (including but not limited to the regulations of the Customs and Tax) or for breach of this Agreement and shall indemnify NULS for the losses, including third-party claimed compensation, administrative penalties and reasonable legal costs.</p>
        <p class="paragraph">4. You confirm that you will pay the service fees charged by NULS in time (if applicable). NULS reserves the right to suspend the services when the User fails to pay service fees (if applicable).</p>
        <h3>VI. Disclaimer and Limitation of Liability</h3>
        <p>1. NULS only undertakes obligations expressly set forth in this Agreement.</p>
        <p>2. YOU ACKNOWLEDGE AND ACCEPT THAT, TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LOCAL GOVERNMNET LAW, NULS IS PROVIDED ON AN “AS IS”, “AS AVAILABLE” AND “WITH ALL FAULTS” BASIS. NULS Wallet shall not be held liable for malfunction of NULS which results from the following reasons:</p>
        <p>a) System maintenance or upgrading of NULS;</p>
        <p>b) Force majeure, such as typhoon, earthquake, flood, lightning or terrorist attack etc.</p>
        <p>c) Malfunction of your mobile device hardware and software, and failure of telecommunication lines and power supply lines;</p>
        <p>d) Your improper, unauthorized or unrecognized use of NULS services;</p>
        <p>e) Computer viruses, malicious program attacks, network congestion, system instability, system or equipment failure, telecommunication failure, power failure, banking issues, government acts and any other reasons not imputed to NULS.</p>
        <p>3. NULS shall not be held liable under the following circumstances:</p>
        <p>a) Users lose their mobile devices, delete NULS applications and wallets without back-up, forget Wallet Passwords, Private Keys, Mnemonic Words, Keystores without back-up, which result in the loss of their Tokens;</p>
        <p>b) Users disclose their Wallet Passwords, Private Keys, Keystores, or lend or transfer their NULS Wallets to others, or authorize others to use their mobile devices or NULS Wallets, or download NULS applications through unofficial channels, or use NULS applications by other insecure means, which result in the loss of their Tokens;</p>
        <p>c) Users mishandle NULS (including but not limited to wrong address, failure of the node servers selected by you), which result in the loss of Tokens;</p>
        <p>d) NULS is unable to copy accurate transaction records due to system delay or blockchain instability.</p>
        <p>e) Users shall undertake the risks and consequences of their transactions on the third-party-developed DApps.</p>
        <p>4. You understand that NULS is only a management tool for Tokens which is incapable to control the quality, security and legitimacy of products and services provided by the third-party-developed DApps, or the authenticity and accuracy of their information and their capabilities to fulfill the obligations under the agreements with you. You, at your sole discretion, decide whether to transact on the third-party-developed DApps. It is the third-party-developed DApps, instead of NULS, that transact with you. We kindly remind you to carefully review the authenticity, legitimacy, and effectiveness of related information provided by the third-party-developed DApps before you decide to use the DApps. In addition, you shall also assume all the risks arising from the transactions between you and any third-party exchanges.</p>
        <p>5. NULS does not warrant that:</p>
        <p>a) Services provided by NULS would satisfy all your needs;</p>
        <p>b) All techniques, products, services, information or other materials from NULS would meet your expectations;</p>
        <p>c) Your counterparts on NULS Wallet will perform their obligations in the transaction agreements with you timely.</p>
        <p class="paragraph">6. You understand that we may change our entry standards, limit the range and ways to provide services for specific Users at any time in accordance with local government’s laws and regulations.</p>
        <h3>VII. Intellectual Property Rights Protection</h3>
        <p class="paragraph">NULS Wallet is an application developed and owned by NULS. The intellectual property rights of any contents displayed in NULS Wallet (including this Agreement, announcements, articles, videos, audios, images, archives, information, materials, trademarks and logos) are owned by NULS or the third-party licensors. Users can only use the NULS applications and its contents for the purpose of holding and managing their Tokens. In particular, without prior written consent from NULS or the third-party licensors, no one shall use, modify, decompile, reproduce, publicly disseminate, alter, distribute, issue or publicly publish the mentioned applications and contents.</p>
        <h3>VIII. Governing Law and Dispute Resolution</h3>
        <p>1. The validity, interpretation, alternation, enforcement, dispute resolution of this Agreement and its revised versions shall be governed and construed in accordance with the laws of local government. Where there is no applicable law, this Agreement shall be interpreted by applicable commercial and/or industrial practices.</p>
        <p>2. If any dispute or claim in connection with this Agreement arises between you and NULS, the parties shall first attempt to resolve the dispute or claim through amicable negotiations in good faith. If the parties cannot reach an agreement, either party may sue the other party at the competent court where NULS is located.</p>
        <p>3. You shall fully understand and conform to the laws, regulations and rules in your jurisdictions which are relevant to use of NULS services.</p>
        <p class="paragraph">4. During your use of NULS services, if you come across any problems, you can contact us through the official media of NULS, official website, email, etc.</p>
        <p class="paragraph">As for any issues not covered in this Agreement, you shall comply with the announcements and relevant rules as updated by NULS in the future.</p>
        <p class="text2-right">NULS FOUNDATION,</p>
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
        data1: ''
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
        font-size: 18px;
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
