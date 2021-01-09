<template>
  <div class="ChinaMap">
    <h1>{{ msg }}</h1>
    <h2>作者：{{ author }}</h2>
  </div>
</template>

<script>
export default {
  name: 'order',
  data () {
    return {
      msg: '这个界面是各省每日增长排名',
      author: '张宇晴'
    }
  }
}
</script>

<style scoped>
h1, h2 {
  font-weight: normal;
}
</style>
