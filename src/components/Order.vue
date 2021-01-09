<template>
  <div class="ChinaMap">
    <h1>{{ msg }}</h1>
    <h2>作者：{{ author }}</h2>
    <div style="margin: 0 auto; display: flex; flex-direction: row; justify-content: space-around;">
    <div id="main-left" style="width: 600px; height: 400px;"></div>
    <div id="main-right" style="width: 600px; height: 400px;"></div>
    </div>
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
  },
  mounted () {
      this.draw()
  },
  methods: {
      draw () {
        var optionLeft = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
            type: 'shadow'
            }
        },
        legend: {
            data: ['累计确诊', '治愈出院', '死亡']
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'value',
            inverse: true
        },
        yAxis: {
            type: 'category',
            // data: ['广东', '山西', '北京', '广西', '湖南', '四川', '上海'，'内蒙古','河南','宁夏','吉林','浙江','辽宁','甘肃','陕西','天津','山东','湖北','福建','河北','安徽','江苏'],
            data: ['广东', '山西', '北京', '广西', '湖南', '四川', '上海', '内蒙古'],
            position: 'right'
            // realtimeSort: true
        },
        series: [
            {
            name: '累计确诊',
            type: 'bar',
            stack: '总量',
            label: {
                show: true,
                position: 'insideRight',
                valueAnimation: true
            },
            emphasis: {
                focus: 'series'
            },
            data: [320, 302, 301, 334, 390, 330, 320]
            },
            {
            name: '治愈出院',
            type: 'bar',
            stack: '总量',
            label: {
                show: true,
                position: 'insideRight',
                valueAnimation: true
            },
            emphasis: {
                focus: 'series'
            },
            data: [120, 132, 101, 134, 90, 230, 210]
            },
            {
            name: '死亡',
            type: 'bar',
            stack: '总量',
            label: {
                show: true,
                position: 'insideRight',
                valueAnimation: true
            },
            emphasis: {
                focus: 'series'
            },
            data: [220, 182, 191, 234, 290, 330, 310]
            }
        ]
        }
        var optionRight = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
            type: 'shadow'
            }
        },
        legend: {
            data: ['累计确诊', '治愈出院', '死亡']
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'value'
        },
        yAxis: {
            type: 'category',
            // data: ['广东', '山西', '北京', '广西', '湖南', '四川', '上海'，'内蒙古','河南','宁夏','吉林','浙江','辽宁','甘肃','陕西','天津','山东','湖北','福建','河北','安徽','江苏'],
            data: ['广东', '山西', '北京', '广西', '湖南', '四川', '上海', '内蒙古'],
            realtimeSort: true
        },
        series: [
            {
            name: '累计确诊',
            type: 'bar',
            stack: '总量',
            label: {
                show: true,
                position: 'insideRight',
                valueAnimation: true
            },
            emphasis: {
                focus: 'series'
            },
            data: [320, 302, 301, 334, 390, 330, 320]
            },
            {
            name: '治愈出院',
            type: 'bar',
            stack: '总量',
            label: {
                show: true,
                position: 'insideRight',
                valueAnimation: true
            },
            emphasis: {
                focus: 'series'
            },
            data: [120, 132, 101, 134, 90, 230, 210]
            },
            {
            name: '死亡',
            type: 'bar',
            stack: '总量',
            label: {
                show: true,
                position: 'insideRight',
                valueAnimation: true
            },
            emphasis: {
                focus: 'series'
            }, 
            data: [220, 182, 191, 234, 290, 330, 310]
            }
        ]
        }
        var chartLeft = this.$echarts.init(document.getElementById('main-left'))
        var chartRight = this.$echarts.init(document.getElementById('main-right'))
        chartLeft.setOption(optionLeft)
        chartRight.setOption(optionRight)
      }
  }
  
}
</script>

<style scoped>
h1, h2 {
  font-weight: normal;
}
</style>
