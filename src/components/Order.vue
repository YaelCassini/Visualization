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
      author: '张宇晴',
      originalData: [
        {name: '广东', value: [1213, 1317, 1330, 1344, 1359, 1374, 1379, 1382, 1395, 1399, 1405, 1412, 1421, 1432, 1441, 1453, 1465, 1478, 1485, 1502, 1504, 1506, 1509, 1509, 1510]},
        {name: '山西', value: [32, 120, 141, 157, 162, 173, 195, 214, 243, 266, 300, 308, 312, 330, 341, 362, 373, 382, 395, 406, 417, 423, 427, 440, 444]},
        {name: '北京', value: [22, 482, 558, 693, 774, 877, 990, 1116, 1212, 1363, 1464, 1586, 1682, 1796, 1829, 1927, 1997, 2094, 2188, 2236, 2290, 2332, 2380, 2428, 2467]},
        {name: '广西', value: [12, 14, 14, 15, 16, 16, 16, 16, 16, 17, 18, 18, 20, 20, 20, 20, 21, 21, 21, 21, 21, 21, 21, 21, 21]},
        {name: '湖南', value: [6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6]},
        {name: '四川', value: [4, 8, 8, 8, 8, 9, 10, 12, 12, 12, 12, 12, 12, 12, 13, 13, 13, 13, 13, 15, 15, 15, 15, 16, 17]},
        {name: '上海', value: [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 4, 4, 6, 6, 6, 6, 7, 7, 7, 7, 7]},
        {name: '内蒙', value: [0, 30, 33, 36, 47, 70, 74, 76, 114, 121, 128, 155, 181, 191, 226, 232, 253, 260, 269, 289, 295, 295, 296, 296, 296]},
        {name: '河南', value: [0, 3, 6, 6, 8, 9, 10, 10, 11, 12, 12, 13, 14, 14, 14, 14, 14, 15, 15, 15, 15, 15, 15, 15, 15]},
        {name: '宁夏', value: [0, 4, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6]},
        {name: '吉林', value: [0, 3, 7, 7, 7, 7, 7, 7, 7, 7, 7, 9, 14, 14, 18, 21, 23, 25, 26, 26, 26, 26, 27, 27, 30]},
        {name: '浙江', value: [0, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4]},
        {name: '辽宁', value: [0, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3]},
        {name: '甘肃', value: [0, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 5, 5, 6, 6, 6, 7, 7, 8, 8, 8, 8]},
        {name: '陕西', value: [0, 1, 2, 2, 2, 2, 5, 5, 5, 8, 8, 8, 9, 9, 9, 10, 10, 10, 11, 12, 12, 12, 12, 12, 12]},
        {name: '天津', value: [0, 0, 5, 7, 8, 21, 22, 22, 43, 44, 49, 61, 73, 91, 100, 109, 120, 127, 132, 141, 149, 157, 163, 167, 171]},
        {name: '山东', value: [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]},
        {name: '湖北', value: [0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 11, 11, 12, 12, 12, 12, 14, 14, 14, 23, 23, 23, 23, 23, 23]},
        {name: '福建', value: [0, 0, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3]},
        {name: '河北', value: [0, 0, 0, 6, 6, 18, 21, 27, 30, 39, 39, 47, 61, 70, 89, 98, 104, 125, 138, 138, 139, 148, 159, 173, 176]},
        {name: '安徽', value: [0, 0, 0, 0, 1, 1, 1, 4, 4, 5, 7, 7, 9, 9, 9, 10, 10, 10, 10, 10, 11, 11, 11, 11, 11]},
        {name: '江苏', value: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 4, 4, 4, 4, 4, 4, 5, 5, 6, 7, 7, 7, 7]},
        {name: '重庆', value: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 3, 3, 3, 3, 3, 3, 3, 3]}
      ]
    }
  },
  mounted () {
      let _this = this
      _this.init()
      _this.draw()
      setTimeout(function () { _this.run() }, 0)
      setInterval(function () { _this.run() }, 3000)
  },

  methods: {
      init () {
          this.j = 0
      },
      draw () {
        this.optionLeft = {
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
            inverse: true,
            realtimeSort: true
        },
        yAxis: {
            type: 'category',
            data: ['广东', '山西', '北京', '广西', '湖南', '四川', '上海', '内蒙古', '河南', '宁夏', '吉林', '浙江', '辽宁', '甘肃', '陕西', '天津', '山东', '湖北', '福建', '河北', '安徽', '江苏'],
            // data: ['广东', '山西', '北京'],
            position: 'right'
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
            data: [100, 120, 150]
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
            data: [200, 100, 140]
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
            data: [300, 150, 280]
            }
        ]
        }
        this.optionRight = {
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
            data: ['广东', '山西', '北京'],
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
            data: [100, 50, 10]
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
        this.chartLeft = this.$echarts.init(document.getElementById('main-left'))
        this.chartRight = this.$echarts.init(document.getElementById('main-right'))
        this.chartLeft.setOption(this.optionLeft)
        this.chartRight.setOption(this.optionRight)    
      },

      run () {
        var dataconfirm = this.optionLeft.series[0].data // 所有省当天的确诊人数
        // var data_recovery = this.optionLeft.series[1].data // 所有省当天的康复人数
        // var data_dead = this.optionLeft.series[2].data // 所有省当天的死亡人数
        for (var i = 0; i < dataconfirm.length; ++i) {
            let pd = this.originalData[i].value // 该省所有天数的确诊数据

            dataconfirm[i] = pd[this.j]
            if (this.j === 24) {
                this.j = 0
            }
        }
        this.chartLeft.setOption(this.optionLeft)
        this.j = this.j + 1
      }
    }
}
</script>

<style scoped>
h1, h2 {
  font-weight: normal;
}
</style>
