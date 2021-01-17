<template>
  <div class="ChinaMap">
    <h1>{{ msg }}</h1>
    <!-- <h2>作者：{{ author }}</h2>  -->
    <div style="margin:0 50 0 50; display: flex; flex-direction: row; justify-content: space-around;">
        <div id="main-left" style="width: 600px; height: 600px;"></div>
        <div id="center-link" style="width:200px; height:600px;"></div>
        <div id="main-right" style="width: 600px; height: 600px;"></div>
    </div>
  </div>
</template>

<script>
import * as d3 from 'd3'
export default {
  name: 'order',
  data () {
    return {
      msg: '各省每日增长排名',
      author: '张宇晴',
      comfirmData: [
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
      ],
      recoveryData: [
        {name: '广东', value: [1004, 1136, 1137, 1146, 1159, 1173, 1178, 1185, 1191, 1201, 1201, 1206, 1208, 1233, 1237, 1245, 1251, 1256, 1273, 1288, 1305, 1314, 1319, 1322, 1327]},
        {name: '山西', value: [4, 6, 13, 13, 14, 14, 14, 19, 20, 21, 22, 25, 32, 33, 36, 36, 41, 51, 54, 69, 81, 87, 95, 119, 142]},
        {name: '北京', value: [1, 43, 46, 55, 64, 73, 76, 78, 78, 83, 90, 100, 109, 115, 118, 121, 134, 141, 152, 168, 175, 186, 203, 244, 252]},
        {name: '广西', value: [8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8]},
        {name: '湖南', value: [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5]},
        {name: '四川', value: [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 6]},
        {name: '上海', value: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]},
        {name: '内蒙', value: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 4, 4, 8, 8, 11, 11, 14, 16, 18, 19, 21, 21]},
        {name: '河南', value: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 2, 3, 3, 4, 5, 5, 5]},
        {name: '宁夏', value: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 4]},
        {name: '吉林', value: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1]},
        {name: '浙江', value: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]},
        {name: '辽宁', value: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]},
        {name: '甘肃', value: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]},
        {name: '陕西', value: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 3, 3, 4, 4]},
        {name: '天津', value: [0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2]},
        {name: '山东', value: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]},
        {name: '湖北', value: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2]},
        {name: '福建', value: [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3]},
        {name: '河北', value: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 3, 5, 10, 10, 10, 12, 20, 21, 26]},
        {name: '安徽', value: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1]},
        {name: '江苏', value: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]},
        {name: '重庆', value: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]}
      ],
      deadData: [
      {name: '广东', value: [44, 48, 48, 49, 49, 50, 51, 51, 51, 51, 51, 51, 51, 51, 51, 54, 55, 55, 56, 56, 56, 56, 56, 56, 56]},
      {name: '山西', value: [2, 7, 7, 7, 7, 8, 8, 9, 9, 9, 9, 10, 10, 12, 12, 14, 17, 17, 17, 17, 18, 18, 18, 19, 19]},
      {name: '北京', value: [4, 25, 28, 35, 39, 42, 48, 56, 59, 66, 75, 82, 91, 96, 100, 103, 107, 110, 112, 114, 116, 120, 129, 134, 139]},
      {name: '广西', value: [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3]},
      {name: '湖南', value: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]},
      {name: '四川', value: [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2]},
      {name: '上海', value: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1]},
      {name: '内蒙古', value: [0, 6, 6, 6, 6, 6, 6, 6, 7, 8, 9, 11, 13, 14, 14, 14, 14, 16, 16, 17, 17, 18, 20, 23, 23]},
      {name: '河南', value: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]},
      {name: '宁夏', value: [0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]},
      {name: '吉林', value: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 2, 2, 2, 2, 3, 3, 4, 4, 4, 4, 4]},
      {name: '浙江', value: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]},
      {name: '辽宁', value: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]},
      {name: '甘肃', value: [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]},
      {name: '陕西', value: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]},
      {name: '天津', value: [0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 4, 4, 5, 5, 5, 5, 6, 7, 7, 8, 9, 9]},
      {name: '山东', value: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]},
      {name: '湖北', value: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2]},
      {name: '福建', value: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]},
      {name: '河北', value: [0, 0, 0, 0, 0, 0, 0, 0, 3, 4, 4, 4, 4, 4, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6]},
      {name: '安徽', value: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]},
      {name: '江苏', value: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]},
      {name: '重庆', value: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]}
      ],
      data1: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      data2: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      data3: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]  
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
          this.num = 20
          this.leftname = ['a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a']
          this.rightname = ['a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a']
      },
      draw () {
        this.optionLeft = {
        title: {
            text: '非典数据',
            textStyle: {
                color: '#44D7B6',
                fontWeight: 'bolder',
                fontSize:20,
            },
            subtext: '数据来自卫健委',
            subtextStyle: {
                color: '#BCBBB9',
                fontSize:10,
            },
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        legend: {
            data: ['治疗人数', '治愈人数', '死亡人数']
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
            data: ['广东', '山西', '北京', '广西', '湖南', '四川', '上海', '内蒙古', '河南', '宁夏', '吉林', '浙江', '辽宁', '甘肃', '陕西', '天津', '山东', '湖北', '福建', '河北', '安徽', '江苏', '重庆'],
            position: 'right',
            offset: 15,
            animationDuration: 300,
            animationDurationUpdate: 300,
            max: 19,
            inverse: true
        },
        animationDuration: 0,
        animationDurationUpdate: 3000,
        animationEasing: 'linear',
        animationEasingUpdate: 'linear',
        series: [
                {
                    name: '治疗人数',
                    type: 'bar',
                    stack: 'total',
                    color:"#72DFC6",
                    emphasis: {
                        focus: 'series'
                    },
                    label: {
                        show: false,
                        position: 'insideLeft',
                        valueAnimation: true
                    },
                    data: this.data1
                },
                {
                    name: '治愈人数',
                    type: 'bar',
                    stack: 'total',
                    color:"#BDE1AB",
                    emphasis: {
                        focus: 'series'
                    },
                    label: {
                        show: false,
                        position: 'insideLeft',
                        valueAnimation: true
                    },
                    data: this.data2
                },
                {
                    name: '死亡人数',
                    type: 'bar',
                    stack: 'total',
                    color:"#FFE394",
                    emphasis: {
                        focus: 'series'
                    },
                    label: {
                        show: false,
                        position: 'insideLeft',
                        valueAnimation: true
                    },
                    data: this.data3
                }
        ]
        }
        this.optionRight = {
            title: {
                text: '新冠数据',
                textStyle: {
                color: '#0091FF',
                fontWeight: 'bolder',
                fontSize:20,
            },
                subtext: '数据来自卫健委',
                subtextStyle: {
                color: '#BCBBB9',
                fontSize:10,
            },
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
            legend: {
                data: ['治疗人数', '治愈人数', '死亡人数']
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
                max: 19,
                inverse: true,
                offset: 15,
                animationDuration: 300,
                animationDurationUpdate: 300,
                data: ['广东', '山西', '北京', '广西', '湖南', '四川', '上海', '内蒙古', '河南', '宁夏', '吉林', '浙江', '辽宁', '甘肃', '陕西', '天津', '山东', '湖北', '福建', '河北', '安徽', '江苏', '重庆']
            },
            animationDuration: 0,
            animationDurationUpdate: 3000,
            animationEasing: 'linear',
            animationEasingUpdate: 'linear',
            series: [
                {
                    name: '治疗人数',
                    type: 'bar',
                    stack: 'total',
                    color:'#3FABFC',
                    emphasis: {
                        focus: 'series'
                    },
                    label: {
                        show: false,
                        position: 'insideRight',
                        valueAnimation: true
                    },
                    data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                },
                {
                    name: '治愈人数',
                    type: 'bar',
                    stack: 'total',
                    color:"#7FA9F3",
                    emphasis: {
                        focus: 'series'
                    },
                    label: {
                        show: false,
                        position: 'insideRight',
                        valueAnimation: true
                    },
                    data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                },
                {
                    name: '死亡人数',
                    type: 'bar',
                    stack: 'total',
                    color:'#B6A7EB',
                    emphasis: {
                        focus: 'series'
                    },
                    label: {
                        show: false,
                        position: 'insideRight',
                        valueAnimation: true
                    },
                    data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                }
            ]
        }
        this.pos = 100
        this.chartLeft = this.$echarts.init(document.getElementById('main-left'))
        this.chartRight = this.$echarts.init(document.getElementById('main-right'))
        this.svg = d3.select('#center-link').append('svg')
            .attr('width', 200)
            .attr('height', 600)
        this.gLink = this.svg.append('g')
              .attr('fill', 'none')
              .attr('stroke', '#999')
              .attr('stroke-opacity', 0.4)
              .attr('stroke-width', 3)
        this.gleftnode = this.svg.append('g')
            .attr('cursor', 'pointer')
            .attr('pointer-events', 'all')
        this.grightnode = this.svg.append('g')
            .attr('cursor', 'pointer')
            .attr('pointer-events', 'all')
        // 绘制节点
        const dataset = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 76, 77, 78, 79, 80]
        var leftenter = this.gleftnode.selectAll('g')
                .data(dataset)        
                .enter()
        leftenter.append('circle')
                .attr('cx', 20)
                .attr('cy', function (d, i) {
                    return (i * 25) + 70
                })
                .attr('r', 5)
                .attr('fill', '#F1EBE8')
        var rightenter = this.grightnode.selectAll('g')
                .data(dataset)        
                .enter()
        rightenter.append('circle')
                .attr('cx', 180)
                .attr('cy', function (d, i) {
                    return (i * 25) + 70
                })
                .attr('r', 5)
                .attr('fill', '#F1EBE8')
        // 绘制连线
        function handle (data) {
            let result = {
                source: [],
                target: []
            }
            result.source[0] = data.source.x
                result.source[1] = data.source.y
                result.target[0] = data.target.x
                result.target[1] = data.target.y
                return result
        }
        this.linkdata = [
            {source: {x: 20, y: 70}, target: {x: 20, y: 75}},
            {source: {x: 20, y: 95}, target: {x: 20, y: 95}},
            {source: {x: 20, y: 120}, target: {x: 20, y: 120}},
            {source: {x: 20, y: 145}, target: {x: 20, y: 145}},
            {source: {x: 20, y: 170}, target: {x: 20, y: 170}},
            {source: {x: 20, y: 195}, target: {x: 20, y: 195}},
            {source: {x: 20, y: 220}, target: {x: 20, y: 220}},
            {source: {x: 20, y: 245}, target: {x: 20, y: 245}},
            {source: {x: 20, y: 270}, target: {x: 20, y: 270}},
            {source: {x: 20, y: 295}, target: {x: 20, y: 295}},
            {source: {x: 20, y: 320}, target: {x: 20, y: 320}},
            {source: {x: 20, y: 345}, target: {x: 20, y: 345}},
            {source: {x: 20, y: 370}, target: {x: 20, y: 370}},
            {source: {x: 20, y: 395}, target: {x: 20, y: 395}},
            {source: {x: 20, y: 420}, target: {x: 20, y: 420}},
            {source: {x: 20, y: 425}, target: {x: 20, y: 425}},
            {source: {x: 20, y: 450}, target: {x: 20, y: 450}},
            {source: {x: 20, y: 475}, target: {x: 20, y: 475}},
            {source: {x: 20, y: 500}, target: {x: 20, y: 500}},
            {source: {x: 20, y: 525}, target: {x: 20, y: 525}}
        ]
        let link = d3.linkHorizontal()
        this.svg.selectAll('.gLink').data(this.linkdata).join(enter => {
            enter.append('path')
                .attr('d', d => link(handle(d)))
                .attr('fill', 'none')
                .attr('stroke', '#999')
                .attr('stroke-opacity', 0.4)
                .attr('stroke-width', 6)
        })

        this.chartLeft.setOption(this.optionLeft)
        this.chartRight.setOption(this.optionRight)
    },

      run () {
        // 非典
        var dataconfirmLeft = this.optionLeft.series[0].data // 所有省当天的治疗人数
        var datarecoveryLeft = this.optionLeft.series[1].data // 所有省当天的康复人数
        var datadeadLeft = this.optionLeft.series[2].data // 所有省当天的死亡人数
        // 新冠
        var dataconfirmRight = this.optionRight.series[0].data // 所有省当天的治疗人数
        var datarecoveryRight = this.optionRight.series[1].data // 所有省当天的康复人数
        var datadeadRight = this.optionRight.series[2].data // 所有省当天的死亡人数

        for (var i = 0; i < dataconfirmLeft.length; ++i) {
            let pc = this.comfirmData[i].value // 该省所有天数的确诊数据
            let pr = this.recoveryData[i].value
            let pd = this.deadData[i].value
            dataconfirmRight[i] = pc[this.j] - pr[this.j] - pd[this.j]
            datarecoveryRight[i] = pr[this.j]
            datadeadRight[i] = pd[this.j]

            dataconfirmLeft[i] = pc[this.j] - pr[this.j] - pd[this.j]
            datarecoveryLeft[i] = pr[this.j]
            datadeadLeft[i] = pd[this.j]
        }

        // 按dataconfirmLeft排序(左)
        for (let i = 0; i < dataconfirmLeft.length; i++) {
            for (let k = i + 1; k < dataconfirmLeft.length; k++) {
                if (dataconfirmLeft[i] + datarecoveryLeft[i] + datadeadLeft[i] < dataconfirmLeft[k] + datarecoveryLeft[k] + datadeadLeft[k]) {
                    var tmp = dataconfirmLeft[i]
                    dataconfirmLeft[i] = dataconfirmLeft[k]
                    dataconfirmLeft[k] = tmp
                    tmp = datarecoveryLeft[i]
                    datarecoveryLeft[i] = datarecoveryLeft[k]
                    datarecoveryLeft[k] = tmp
                    tmp = datadeadLeft[i]
                    datadeadLeft[i] = datadeadLeft[k]
                    datadeadLeft[k] = tmp
                    tmp = this.optionLeft.yAxis.data[i]
                    this.optionLeft.yAxis.data[i] = this.optionLeft.yAxis.data[k]
                    this.optionLeft.yAxis.data[k] = tmp

                    tmp = this.comfirmData[i]
                    this.comfirmData[i] = this.comfirmData[k]
                    this.comfirmData[k] = tmp

                    tmp = this.recoveryData[i]
                    this.recoveryData[i] = this.recoveryData[k]
                    this.recoveryData[k] = tmp

                    tmp = this.deadData[i]
                    this.deadData[i] = this.deadData[k]
                    this.deadData[k] = tmp
                }
            }
        }

        // 按dataconfirmLeft排序(右)
        // for (let i = 0; i < dataconfirmRight.length; i++) {
        //     for (let k = i + 1; k < dataconfirmRight.length; k++) {
        //         if (dataconfirmRight[i] < dataconfirmRight[k]) {
        //             tmp = dataconfirmRight[i]
        //             dataconfirmRight[i] = dataconfirmRight[k]
        //             dataconfirmRight[k] = tmp
        //             tmp = datarecoveryRight[i]
        //             datarecoveryRight[i] = datarecoveryRight[k]
        //             datarecoveryRight[k] = tmp
        //             tmp = datadeadRight[i]
        //             datadeadRight[i] = datadeadRight[k]
        //             datadeadRight[k] = tmp
        //             tmp = this.optionRight.yAxis.data[i]
        //             this.optionRight.yAxis.data[i] = this.optionRight.yAxis.data[k]
        //             this.optionRight.yAxis.data[k] = tmp

        //             tmp = this.comfirmData[i]
        //             this.comfirmData[i] = this.comfirmData[k]
        //             this.comfirmData[k] = tmp

        //             tmp = this.recoveryData[i]
        //             this.recoveryData[i] = this.recoveryData[k]
        //             this.recoveryData[k] = tmp

        //             tmp = this.deadData[i]
        //             this.deadData[i] = this.deadData[k]
        //             this.deadData[k] = tmp
        //         }
        //     }
        // }
        // 更新连线数据
        for (let i = 0; i < 20; i++) {
            this.leftname[i] = this.optionLeft.yAxis.data[i]
            this.rightname[i] = this.optionRight.yAxis.data[i]
        }
        
        for (let i = 0; i < 20; i++) {
            var flag = 0
            for (let k = 0; k < 20; k++) {
                if (this.leftname[i] === this.rightname[k]) {
                    this.linkdata[i] = {source: {x: 20, y: 70 + 25 * i}, target: {x: 180, y: 70 + 25 * k}}
                    flag = 1
                    break
                }
            }
            if (flag === 0) {
                this.linkdata[i] = {source: {x: 20, y: 70 + 25 * i}, target: {x: 20, y: 70 + 25 * i}}
            }
        }
        this.svg.selectAll('path').remove()
        function handle (data) {
            let result = {
                source: [],
                target: []
            }
            result.source[0] = data.source.x
                result.source[1] = data.source.y
                result.target[0] = data.target.x
                result.target[1] = data.target.y
                return result
        }
        let iii=0
        const colorlist=['#F1EBE8','#F2E9DF','#F2E8D8','#F4E7D2','#F5E5C3','#F5E4BD','#F6E2B6','#F7E2B0','#F7E0A8','#F8DFA2','#FADF9B','#FADE95','#FADC8E','#FBDB87','#FCDA7F','#FCD979','#FDD771','#FED76B','#FFD562','#FFD254','#FFD154']
        // const colorlist=['#100','#200','#300','#400','#500','#600','#700','#800','#900','#a00','#b00','#c00','#d00','#e00','#f00','#f10','#f20','#f30','#f40','#f50','#f60']
        let link = d3.linkHorizontal()
        this.svg.selectAll('.gLink').data(this.linkdata).join(enter => {
            enter.append('path')
                .attr('d', d => link(handle(d)))
                .attr('fill', 'none')
                // .attr('stroke', '#999')
                .attr('stroke', function(){
                    var color=colorlist[iii]
                    iii=iii+1
                    if(iii===20) iii=0
                    return color
                })
                .attr('stroke-opacity', 0.4)
                .attr('stroke-width', 6)
        })
        this.chartLeft.setOption(this.optionLeft)
        this.chartRight.setOption(this.optionRight)
        this.j = this.j + 1
        if (this.j === 24) {
            this.j = 0
        }
      }
    }
}
</script>

<style scoped>
h1, h2 {
  font-weight: normal;
}
</style>
