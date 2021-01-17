<template>
  <div id="app" style="background-color:#FCFAF7">
    <mynavbar></mynavbar>
    <router-view></router-view>
  </div>
</template>

<script>
import mynavbar from './components/AppComponents/Navbar.vue'

export default {
  name: 'App',
  components: {
    mynavbar
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #FCFAF7;
  margin-top: 0px;
}

</style>
