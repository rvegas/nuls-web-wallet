<template>
  <div class="top">
    <el-row class="top-info">
      <el-col :span="3" class="logo cursor-p">
        <!--<img @click="toHome" src="../assets/images/logo.svg"/>-->
        <img @click="toHome" src="../assets/images/testnet-logo.svg"/>
      </el-col>
      <el-col :span="14" class="menu">
         <el-menu :default-active="activeNav" class="top-menu top-menu-left" mode="horizontal" @select="handleSelect">
           <el-menu-item index="1" :class="[activeNav==='1'? 'is-active':'no-active',this.language==='en' ? 'li-en':'']">
             <i class="iconfont iconfont-common-white">&#xe613;</i>
             <span>{{ $t('message.account') }}</span>
           </el-menu-item>
           <el-menu-item index="2" :class="[activeNav==='2'? 'is-active':'no-active',this.language==='en' ? 'li-en':'']">
             <i class="iconfont iconfont-common-white">&#xe615;</i>
             <span>{{ $t('message.transfer') }}</span>
           </el-menu-item>
           <el-menu-item index="3" :class="[activeNav==='3'? 'is-active':'no-active',this.language==='en' ? 'li-en':'']">
             <i class="iconfont iconfont-common-white iconfont-consensus">&#xe618;</i>
             <span>{{ $t('message.consensus') }}</span>
           </el-menu-item>
           <el-menu-item index="4" :class="[activeNav==='4'? 'is-active':'no-active',this.language==='en' ? 'li-en':'']">
             <i class="iconfont iconfont-common-white">&#xe68f;</i>
             <span>{{ $t('message.browser') }}</span>
           </el-menu-item>
           <el-menu-item index="5" :class="[activeNav==='5'? 'is-active':'no-active',this.language==='en' ? 'li-en':'']">
             <i class="iconfont iconfont-common-white iconfont-20">&#xe62e;</i>
             <span>{{ $t('message.testNuls') }}</span>
           </el-menu-item>
         </el-menu>
      </el-col>
      <el-col :span="7" class="top-icon">
        <el-menu :default-active="activeNav" class="top-menu flex-common" mode="horizontal" >
          <div class="flex-common">
            <!--<el-submenu index="5" class="set">-->
              <!--<template slot="title">{{ $t('message.set') }}</template>-->
              <!--<el-menu-item index="5-1">{{ $t('message.accountBackups') }}</el-menu-item>-->
              <!--<el-menu-item index="5-2">{{ $t('message.editPassword') }}</el-menu-item>-->
              <!--<el-menu-item index="5-3" v-show="aliasFlag==='null'">{{ $t('message.setAlias') }}</el-menu-item>-->
            <!--</el-submenu>-->
            <el-dropdown class="set" trigger="click" placement="bottom-start" @command="setTo" @visible-change="set($event)" :class="openFlg ? 'is-focus':''">
              <span class="el-dropdown-link">{{ $t('message.set') }}</span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="backups">{{ $t('message.accountBackups') }}</el-dropdown-item>
                <el-dropdown-item command="setPassword">{{ $t('message.editPassword') }}</el-dropdown-item>
                <el-dropdown-item command="setAlias" v-show="aliasFlag==='null'">{{ $t('message.setAlias') }}</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <el-select v-model="languageValue" class="language" :popper-append-to-body="false" @change="selectLanguage">
              <el-option v-for="item in languageList" :key="item.key" :value="item.value">
              </el-option>
            </el-select>
          </div>
          <div class="top-icon-right flex-common">
            <div class="out cursor-p" @click="safeExit" v-show="userAddress!==''">{{ $t('message.exit') }}</div>
            <div class="help cursor-p" @click="help">
              <i class="iconfont iconfont-common-white">&#xe602;</i>
              <span></span></div>
          </div>
        </el-menu>
      </el-col>
      <el-col :span="4" class="top-icon-1">
        <i class="el-icon-menu" @click="showMenu"></i>
      </el-col>
    </el-row>
    <el-collapse-transition>
      <div class="menu-ml" v-show="showMenus">

        <el-menu default-active="1" @select="handleSelect">
          <el-menu-item index="1" :class="activeNav==='1'? 'is-active':'no-active'">
            <!--<i class="icon-i1 icon-common"></i>-->
            <i class="iconfont iconfont-common-white">&#xe613;</i>
            <span slot="title">{{ $t('message.account') }}</span>
          </el-menu-item>
          <el-menu-item index="2" :class="activeNav==='2'? 'is-active':'no-active'">
            <!--<i class="icon-i2 icon-common"></i>-->
            <i class="iconfont iconfont-common-white">&#xe615;</i>
            <span slot="title">{{ $t('message.transfer') }}</span>
          </el-menu-item>
          <el-menu-item index="3" :class="activeNav==='3'? 'is-active':'no-active'">
            <!--<i class="icon-i3 icon-common"></i>-->
            <i class="iconfont iconfont-common-white">&#xe618;</i>
            <span slot="title">{{ $t('message.consensus') }}</span>
          </el-menu-item>
          <el-menu-item index="4" :class="activeNav==='4'? 'is-active':'no-active'">
            <!--<i class="icon-i4 icon-common"></i>-->
            <i class="iconfont iconfont-common-white">&#xe68f;</i>
            <span slot="title">{{ $t('message.browser') }}</span>
          </el-menu-item>
          <el-menu-item index="5" :class="activeNav==='5'? 'is-active':'no-active'">
            <i class="iconfont iconfont-common-white iconfont-20">&#xe62e;</i>
            <span slot="title">{{ $t('message.testNuls') }}</span>
          </el-menu-item>
           <el-menu @select="handleSelect2">
             <el-submenu index="5">
               <template slot="title">
                 <span>{{ $t('message.set') }}</span>
               </template>
               <el-menu-item-group>
                 <el-menu-item index="5-1">{{ $t('message.accountBackups') }}</el-menu-item>
                 <el-menu-item index="5-2">{{ $t('message.editPassword') }}</el-menu-item>
                 <el-menu-item index="5-3">{{ $t('message.setAlias') }}</el-menu-item>
               </el-menu-item-group>
             </el-submenu>
           </el-menu>
          <el-menu-item index="5">
            <el-select v-model="languageValue" class="language" :popper-append-to-body="false" @change="selectLanguage">
              <el-option v-for="item in languageList" :key="item.key" :value="item.value">
              </el-option>
            </el-select>
          </el-menu-item>
          <el-menu-item index="6" v-show="userAddress!==''">
            <div @click="safeExit">
              <span slot="title">{{ $t('message.exit') }}</span>
            </div>
          </el-menu-item>
          <el-menu-item index="7">
            <span slot="title">{{ $t('message.help') }}</span>
          </el-menu-item>
        </el-menu>
      </div>
    </el-collapse-transition>
  </div>
</template>

<script>
  import {contentMinHeight} from '@/utils/util'
  import nulsJs from 'nuls-jssdk'

  export default {
    name: "hearder-bar",
    data() {
      return {
        //显示隐藏menu-ml
        showMenus: false,
        //语言切换
        languageValue: 'English',
        languageList: [
          {key: 'en', value: 'English'},
          {key: 'cn', value: '中文'}
        ],
        //设置下拉框的下拉，隐藏状态
        openFlg:false,
      };
    },
    computed: {
      activeNav () {
        return this.$store.getters.getActiveNav? this.$store.getters.getActiveNav : '1'
      },
      aliasFlag () {
        return this.$store.getters.getAddressAlias ? this.$store.getters.getAddressAlias : 'null';
      },
      userAddress () {
        return this.$store.getters.getAddress ? this.$store.getters.getAddress : '';
      },
      language () {
        return this.$store.getters.getLang ? this.$store.getters.getLang : 'en'
      }
    },
    created() {
      if (sessionStorage.getItem('activeNav')) {
        this.$store.commit('refreshActiveNav', sessionStorage.getItem('activeNav'))
      }
      if (localStorage.getItem('addressAlias')) {
        this.$store.commit('refreshAddressAlias', localStorage.getItem('addressAlias'));
      }
      //是否导入账户标志
      if (localStorage.getItem('address')) {
        this.$store.commit('refreshAddress', localStorage.getItem('address'));
      }
    },
    mounted() {
      if(localStorage.getItem('lang')){
        if(localStorage.getItem('lang')==='en'){
          this.languageValue='English'
        }else{
          this.languageValue='中文'
        }
      }else{
        this.languageValue='English'
      }
      this.selectLanguage();
      console.log("v0.0.37");
      this.$nextTick(() => {
        setTimeout(() => {
          contentMinHeight();
        }, 500)
      })
    },
    methods: {
      /**
       *显示隐藏menu-ml
       **/
      showMenu() {
        this.showMenus = !this.showMenus
      },

      /**
       * 首页跳转 To home
       * */
      toHome() {
        this.$store.commit('setActiveNav', '1');
        sessionStorage.setItem("activeNav", '1');
        if (localStorage.hasOwnProperty('address')) {
          this.$router.push({
            name: '/account',
          })
        } else {
          this.$router.push({
            name: '/home',
          })
        }
      },

      /**
       * 菜单选择
       * @param key
       * @param keyPath
       */
      handleSelect(key, keyPath) {
        if (key === '1') {
          this.$store.commit('setActiveNav', key);
          sessionStorage.setItem("activeNav", key);
          //console.log(this.$store.getters.getActiveNav);
          if (localStorage.hasOwnProperty('address')) {
            this.$router.push({
              name: '/account',
            })
          } else {
            this.$router.push({
              name: '/home',
            })
          }
        } else if (key === '2') {
          if (localStorage.hasOwnProperty('address')) {
            this.$store.commit('setActiveNav', key);
            sessionStorage.setItem("activeNav", key);
            this.$router.push({
              name: '/transAccount',
            })
          } else {
            this.$message({
              message: this.$t('message.prompt'), type: 'warning', duration: '1000'
            });
          }
        } else if (key === '3') {
          // if (localStorage.hasOwnProperty('address')) {
            this.$store.commit('setActiveNav', key);
            sessionStorage.setItem("activeNav", key);
            this.$router.push({
              name: '/myConsensus',
            })
          // } else {
          //   this.$message({
          //     message: this.$t('message.prompt'), type: 'warning', duration: '1000'
          //   });
          // }
        } else if (key === '4') {
          //window.open('https://nulscan.io/', '_blank')
          window.open(this.$store.getters.getBrowserAddress, '_blank');
        } else if (key === '5') {
          this.$store.commit('setActiveNav', key);
          sessionStorage.setItem("activeNav", key);
          this.$router.push({
            name: '/testNetNULS',
          })
        }
      },

      /**
       * 设置跳转
       * Set to
       **/
      setTo(command) {
        if(localStorage.hasOwnProperty('address')){
          this.$store.commit('setActiveNav', '1');
          sessionStorage.setItem("activeNav", '1');
          if (command === 'backups') {
            this.$router.push({
              name: '/createWallet',
              query: {isNew: false},
            })
          } else if (command === 'setPassword') {
            this.$router.push({
              name: '/setPassword',
            })
          } else if (command === 'setAlias') {
            if (localStorage.getItem('addressAlias') === 'null') {
              this.$router.push({
                name: '/setAlias',
              })
            }else {
              this.$message({
                message: this.$t('message.setAliasTip'), type: 'warning', duration: '1000'
              });
            }
          }
        }else {
          this.$message({
            message: this.$t('message.prompt'), type: 'warning',duration:'1000'
          });
        }
      },
      // 点击设置 触发
      set(e){
        this.openFlg=e;
      },
      handleSelect2(key) {
        if (localStorage.hasOwnProperty('address')) {
          this.$store.commit('setActiveNav', '1');
          sessionStorage.setItem("activeNav", '1');
          if (key === '5-1') {
            this.$router.push({
              name: '/createWallet',
              query: {isNew: false},
            })
          } else if (key === '5-2') {
            this.$router.push({
              name: '/setPassword',
            })
          } else if (key === '5-3') {
            if (localStorage.getItem('addressAlias') === 'null') {
              this.$router.push({
                name: '/setAlias',
              })
            } else {
              this.$message({
                message: this.$t('message.setAliasTip'), type: 'warning', duration: '1000'
              });
            }
          }
        } else {
          this.$message({
            message: this.$t('message.prompt'), type: 'warning', duration: '1000'
          });
        }
      },
      //语言切换
      selectLanguage() {
        this.$i18n.locale = this.languageValue === "中文" ? "cn" : "en";
        localStorage.setItem("lang", this.languageValue === "中文" ? "cn" : "en");
        this.$store.commit('setLang', this.languageValue === "中文" ? "cn" : "en");
      },

      /**
       * 安全退出
       * Safe exit
       **/
      safeExit() {
        if (localStorage.hasOwnProperty('address')) {
          localStorage.removeItem('address');
          this.$store.commit('setAddress', '');
          localStorage.removeItem('encryptedPrivateKey');
          localStorage.removeItem('addressAlias');
          this.$store.commit('setAddressAlias', "null");
          localStorage.removeItem('pubKey');
          this.$store.commit('setActiveNav', "1");
          sessionStorage.setItem("activeNav", "1");
          this.$router.push({
            name: '/home',
          })
        } else {
          this.$message({
            message: this.$t('message.prompt'), type: 'warning', duration: '1000'
          });
        }
      },
      /**
       * 帮助
       * help
       **/
      help() {
        this.$store.commit('setActiveNav', "");
        sessionStorage.setItem("activeNav", "");
        this.$router.push({
          name: '/help',
        })
      },
    },
  }
</script>

<style lang="less" type="text/less">
  @import url("./../assets/css/style.less");

  .top {
    /*min-width: 360px;*/
    width: 100%;
    height: 64px;
    background-color: @h-bg-color;
    .top-info {
      max-width: @width;
      margin: auto;
      .logo {
        padding-top: 10px;
        img {
          width: 105px;
          //height: 51px;
        }
      }
      .menu {
        .el-menu {
          border-color: transparent;
        }
        .top-menu {
          background-color: @bg-1-color;
          li {
            height: 63px;
            line-height: 63px;
            padding: 0;
            margin: 0 20px;
            font-size: @font-size-16;
            background-color: @bg-1-color;
            color: @c-color;
            i.iconfont-consensus{
              margin-right: -4px;
            }
            &:hover {
              i.iconfont-common-white{
                color:@c-h-color;
              }
              color: @c-h-color;
            }
          }
          li.is-active {
             color: @c-h-color;
             border-bottom-color: @h-bd-color!important;
           }
          li.no-active {
            color: @c-color;
            border-bottom: none;
            &:hover {
              color: @c-h-color;
              i.iconfont-common-white{
                color:@c-h-color;
              }
            }
          }
          li.li-en{
            margin: 0 13px;
          }
        }
      }
      .top-icon {
        font-size: @font-size-16;
        height: 64px;
        line-height: 64px;
        text-align: center;
        .top-menu {
          background-color: @bg-1-color;
          height: 64px;
          border-bottom: none;
          justify-content: flex-end;
          .set.el-dropdown {
            float: left;
            width: 90px;
            font-size: @font-size-16;
            color: @c-color;
            cursor: pointer;
            position: relative;
            .el-dropdown-link{
              display:inline-block;
              width:100%;
            }
            &:after{
              display: inline-block;
              content: "";
              position: absolute;
              left: 40px;
              top: 46px;
              vertical-align: middle;
              width: 0;
              height: 0;
              border-top: 4px solid #fff;
              border-right: 4px solid transparent;
              border-left: 4px solid transparent;
            }
            &:hover{
              background-color: @bg-h-color;
              .el-dropdown-link {
                color: @c-select-font-hover;
                background-color: @bg-h-color;
              }
            }
          }
          .set.is-focus{
            background-color: @bg-h-color;
            .el-dropdown-link {
              color: @c-select-font-hover;
              background-color: @bg-h-color;
            }
            &:after{
              transform: rotate(180deg);
            }
          }
          .language {
            float: left;
            width: 70px;
            text-align: center;
            color: @c-select-font-hover;
            .el-input{
              &:after {
                position: absolute;
                display: inline-block;
                content: "";
                top: 46px;
                left: 31px;
                vertical-align: middle;
                width: 0;
                height: 0;
                border-top: 4px solid #fff;
                border-right: 4px solid transparent;
                border-left: 4px solid transparent;
              }
            }
            .el-input.is-focus{
              &:after{
                transform: rotate(180deg);
              }
            }
            &:hover {
              background-color: @bg-h-color;
              .el-input__inner {
                color: @c-select-font-hover;
                background-color: @bg-h-color;
              }
            }
            .el-input {
              border-left: @border4;
              border-right: @border4;
              font-size: @font-size-16;
              .el-input__inner {
                text-align: center;
                padding: 0;
              }
            }
          }
          .top-icon-right {
            float: right;
            /*width: 150px;*/
            .out, .help {
              float: left;
              width: 90px;
              padding:0 10px;
              &:hover{
                background-color: @bg-h-color;
                color: @c-select-font-hover;
              }
            }
            .help {
              width: 50px;
              text-align: center;
              padding:0 5px;
              border-left: @border4;
              .icon-i5 {
                background-position: -176px -26px;
                padding-right: 2px;
              }
              &:hover{
                i.iconfont{
                  color:@c-font-blue1-color;
                }
              }
            }
          }
        }
        .el-menu--horizontal > .el-submenu .el-submenu__icon-arrow {
          display: none;
        }
      }
      .top-icon-1 {
        display: none;
      }
    }
    .el-select {
      .el-input {
        .el-input__inner {
          border: 0;
        }
        .el-input__suffix {
          .el-input__suffix-inner {
            i {
              font-size: 0;
            }
          }
        }
      }
    }
  }

  @media screen and (max-width: 1000px) {
    .top {
      .top-info {
        .menu {
          display: none;
        }
        .top-icon {
          display: none;
        }
        .top-icon-1 {
          display: block;
          float: right;
          text-align: center;
          i {
            font-size: 1.5rem;
            line-height: 4rem;
          }
        }
      }
      .menu-ml {
        z-index: 99;
        position: fixed;
        width: 50%;
        background-color: #1c2738;
        right: 0;
        .el-menu {
          background: @h-bg-color;
          li {
            font-size: @font-size-16;
            background-color: @bg-1-color;
            color: @c-color;
            .el-submenu__title {
              font-size: @font-size-16;
              color: @c-color;
              &:hover {
                background: @bg-1-color;
                color: @c-h-color;
              }
            }
            .language {
              .el-input {
                .el-input__inner {
                  padding-left: 0;
                  font-size: @font-size-16;
                }
              }
              &:hover {
                .el-input {
                  .el-input__inner {
                    color: @c-h-color;
                  }
                }
              }
            }
            &:hover {
              color: @c-h-color;
              i.iconfont {
                color: @c-h-color;
              }
            }
          }
          li.is-active {
            color: @c-h-color;
            border-bottom-color: @h-bd-color;
          }
          li.no-active {
            &:hover{
              color: @c-h-color;
            }
            color: @c-color;
          }
          .el-menu{
            li.is-active{
              color:@c-color;
              &:hover{
                color:@c-h-color;
              }
            }
          }
        }
        .top-menu {
          background-color: transparent;
          li {
            float: none;
          }
        }
      }
    }
  }

  /*@media screen and (min-width: 800px) {*/
  /*.menu-ml{*/
  /*display:none;*/
  /*}*/
  /*}*/
  .el-dropdown-menu {
    margin-top: 3px;
    .el-dropdown-menu__item {
      color: @c-color;
      padding: 0 29px;
    }
  }

  .el-popper .popper__arrow {
    display: none;
  }
</style>
