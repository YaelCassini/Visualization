import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import ChinaMap from '@/components/ChinaMap'
import Order from '@/components/Order'
import Weibo from '@/components/Weibo'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/ChinaMap',
      name: 'ChinaMap',
      component: ChinaMap
    },
    {
      path: '/Order',
      name: 'Order',
      component: Order
    },
    {
      path: '/Weibo',
      name: 'Weibo',
      component: Weibo
    }
  ]
})
