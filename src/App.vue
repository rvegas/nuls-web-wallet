<template>
  <div id="app">
    <TopBar></TopBar>
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
    <BottomBar></BottomBar>
  </div>
</template>

<script>
  import TopBar from './components/TopBar'
  import BottomBar from './components/BottomBar'

  export default {
    components: {TopBar, BottomBar},
    created() {
      /**
      * 获取语言
      * Get the language
      * */
      if (!sessionStorage.hasOwnProperty('lang')) {
        sessionStorage.setItem('lang', 'en')
      }
    },
    methods: {}
  }
</script>

<style>
  /* CSS */
</style>
