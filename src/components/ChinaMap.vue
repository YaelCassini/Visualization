<template>
  <div class="ChinaMap">
    <h1>{{ msg }}</h1>
    <h2>作者：{{ author }}</h2>
  </div>
</template>

<script>
export default {
  name: 'ChinaMap',
  data () {
    return {
      msg: '这个界面是中国地图，显示各省每日增长',
      author: '李沛瑶'
    }
  }
}
</script>

<style scoped>
h1, h2 {
  font-weight: normal;
}
</style>
