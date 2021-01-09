
<template>
  <!--可以根据这个链接里的选项改样式 https://element.eleme.io/#/zh-CN/component/menu -->
  <el-menu theme="dark" :default-active="activeIndex"
  class="el-menu-demo" mode="horizontal" @select="handleSelect" background-color="#000">
    <el-menu-item index="Home">主界面</el-menu-item>
    <el-menu-item index="2">地图</el-menu-item>
    <el-menu-item index="3">各省排序</el-menu-item>
    <el-menu-item index="4">微博话题</el-menu-item>
    <el-submenu index="5">
      <template slot="title">北京市疫情数学建模</template>
      <el-menu-item index="5-1">新冠</el-menu-item>
      <el-menu-item index="5-2">非典</el-menu-item>
      <el-menu-item index="5-3">对比</el-menu-item>
    </el-submenu>
  </el-menu>
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
    }
  }
}
</script>

<style>
  @import url("//unpkg.com/element-ui@2.14.1/lib/theme-chalk/index.css");
</style>
