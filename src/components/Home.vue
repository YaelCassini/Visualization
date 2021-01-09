<template>
  <div class="Home">
    <h1>{{ msg }}</h1>
    <h2>作者：{{ author }}</h2>
    <ul>
      <li><a href="http://localhost:8080/#/" target="_blank">Home</a></li>
      <li><a href="http://localhost:8080/#/ChinaMap" target="_blank">ChinaMap</a></li>
      <li><a href="http://localhost:8080/#/Order" target="_blank">Order</a></li>
      <li><a href="http://localhost:8080/#/Weibo" target="_blank">Weibo</a></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      msg: '这个界面是上下镜像对称的柱状图，展示每日新增和累计新增',
      author: '李奕扬'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
