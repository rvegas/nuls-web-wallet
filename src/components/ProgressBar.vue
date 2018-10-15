<template>
  <label class="bar-bg fl">
		<label class="bar" v-bind:style="{background:colorData,width: widthData}">
			<label v-bind:style="{borderColor:colorData}"></label>
		</label>
	</label>
</template>
<script>
  export default {
    props: {
      colorData: {
        type: String,
        default: "#4a5065"
      },
      widthData: {
        type: String,
        default: "0"
      }
    },
    mounted() {
      let _this = this;
    }
  }
</script>

<style lang="less" type="text/less">
  .bar-bg {
    width: 60px;
    height: 2px;
    display: block;
    position: relative;
    background-color: #4a5065;
    margin-top: 7px;
    .bar {
      display: block;
      position: relative;
      height: 2px;
      label {
        position: absolute;
        text-align: center;
        font-weight: bold;
        margin-top: -1px;
        height: 4px;
        margin-left: 100%;
        border-right: 1px solid #4a5065;
      }
    }
  }
</style>
