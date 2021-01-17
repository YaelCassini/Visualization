
<template>
<header>
  <!--可以根据这个链接里的选项改样式 https://element.eleme.io/#/zh-CN/component/menu -->
  <el-menu theme="dark" :default-active="activeIndex"
  class="el-menu-demo" mode="horizontal" @select="handleSelect" background-color="#FCFAF7" font-size="16px" font-weight="bold" text-color="#0091FF" active-text-color="#D8D8D8">
    <el-menu-item >
<svg width="50" height="40" xmlns="http://www.w3.org/2000/svg">
 <!-- Created with Method Draw - http://github.com/duopixel/Method-Draw/ -->
 <g>
  <title>Layer 1</title>
  <text font-weight="bold" fill="#007fff" stroke="#000" stroke-width="0" x="7.76596" y="18.49069" id="svg_1" font-size="15" font-family="Helvetica, Arial, sans-serif" text-anchor="start" xml:space="preserve">Covid</text>
  <text font-weight="bold" fill="#007fff" stroke="#000" stroke-width="0" x="7.76596" y="32.95877" id="svg_2" font-size="15" font-family="Helvetica, Arial, sans-serif" text-anchor="start" xml:space="preserve">SARS</text>
  <text font-weight="bold" fill="#007fff" stroke="#000" stroke-width="0" x="0.95745" y="22.74601" id="svg_3" font-size="21" font-family="Helvetica, Arial, sans-serif" text-anchor="start" xml:space="preserve">*</text> </g>
</svg>
    </el-menu-item>
    <el-menu-item index="1" @click="turntohomepage">
      主界面
    </el-menu-item>
    <el-menu-item index="2" @click="turntomap">
      地图
    </el-menu-item>
    <el-menu-item index="3" @click="turntoorder">
      各省排序
    </el-menu-item>
    <el-menu-item index="4" @click="turntoweibo">
      微博话题
    </el-menu-item>
    <el-menu-item index="5" @click="turntosenses">
      情感分析
    </el-menu-item>
  </el-menu>
</header>
</template>

<script>
export default {
  data () {
    return {
      activeIndex: '1',
      activeIndex2: '1'
    }
  },
  methods: {
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
    },
    turntohomepage () {
      this.$router.push({ path: '/', name: 'Home'})
    },
    turntomap () {
      this.$router.push({ path: '/ChinaMap'})
    },
    turntoorder () {
      this.$router.push({ path: '/Order'})
    },
    turntoweibo () {
      this.$router.push({ path: '/Senses'})
    },
    turntosenses () {
      this.$router.push({ path: '/Weibo'})
    }   
    }
}
</script>

<style>
  @import url("//unpkg.com/element-ui@2.14.1/lib/theme-chalk/index.css");
</style>
