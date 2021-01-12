<template>
  <div class="ChinaMap">
    <h1>{{ msg }}</h1>
    <h2>作者：{{ author }}</h2>
    <div style="margin:0 50 0 50">
        <div id="main" style="width:100%;height:1000px"></div>
    </div>
  </div>
</template>


<script>
import * as d3 from 'd3'
// import * as echarts from 'echarts';

import echarts from 'echarts/lib/echarts';
import 'echarts/map/js/china.js';
// import echarts from 'echarts'
// Vue.prototype.$echarts = echarts
// import 'echarts/map/js/china' // 引入中国地图
// require('echarts/map/js/china.js');
// require('echarts/map/js/world.js');
// import * as echarts from 'echarts/index.blank';
// import 'echarts/lib/component/title';
// import 'echarts/lib/component/tooltip';
// import 'echarts/lib/chart/scatter';
// import 'echarts/lib/chart/effectScatter';
// import 'zrender/lib/canvas/canvas';
// import 'echarts/map/js/world.js'
export default {
      data() {
        return {
            mydata: [],
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
    mounted() {
        let _this = this
        _this.init()
        _this.drawLine()
        // this.drawLine()
    
    },
    methods:{
        init () {
        //   this.j = 0
        //   this.num = 20
        //   this.leftname = ['a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a']
        //   this.rightname = ['a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a']
            this.drawLine();
        },

        drawLine() {
        this.mydata = [  
                { name: '北京', value: 100 }, { name: '天津', value: this.randomData() },  
                { name: '上海', value: this.randomData() }, { name: '重庆', value: this.randomData() },  
                { name: '河北', value: this.randomData() }, { name: '河南', value: this.randomData() },  
                { name: '云南', value: this.randomData() }, { name: '辽宁', value: this.randomData() }  
                // {name: '黑龙江',value: this.randomData() },{name: '湖南',value: this.randomData() },  
                // {name: '安徽',value: this.randomData() },{name: '山东',value: this.randomData() },  
                // {name: '新疆',value: this.randomData() },{name: '江苏',value: this.randomData() },  
                // {name: '浙江',value: this.randomData() },{name: '江西',value: this.randomData() },  
                // {name: '湖北',value: this.randomData() },{name: '广西',value: this.randomData() },  
                // {name: '甘肃',value: this.randomData() },{name: '山西',value: this.randomData() },  
                // {name: '内蒙古',value: this.randomData() },{name: '陕西',value: this.randomData() },  
                // {name: '吉林',value: this.randomData() },{name: '福建',value: this.randomData() },  
                // {name: '贵州',value: this.randomData() },{name: '广东',value: this.randomData() },  
                // {name: '青海',value: this.randomData() },{name: '西藏',value: this.randomData() },  
                // {name: '四川',value: this.randomData() },{name: '宁夏',value: this.randomData() },  
                // {name: '海南',value: this.randomData() },{name: '台湾',value: this.randomData() },  
                // {name: '香港',value: this.randomData() },{name: '澳门',value: this.randomData() }  
            ];
        this.geoCoordMap = {
            '北京':[121.15,31.89],
            '天津':[109.781327,39.608266],
            '上海':[120.38,37.35],
            '重庆':[122.207216,29.985295],
            '河北':[123.97,47.33],
            '河南':[120.13,33.38],
            '云南':[118.87,42.28],
            '辽宁':[120.33,36.07]
        };
        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById('main'))
        // 绘制图表


        const geoCoordMap = this.geoCoordMap;
        var convertData = function (data) {
        var res = [];
        for (var i = 0; i < data.length; i++) {
            var geoCoord = geoCoordMap[data[i].name];
            if (geoCoord) {
                res.push({
                    name: data[i].name,
                    value: geoCoord.concat(data[i].value)
                });
            }
        }
        console.log(res);
        return res;
        };
        
        myChart.setOption({
            backgroundColor: '#F7F7F7',
            title: {
                text: '疫情地理信息',
                subtext: '中国地图'
                // sublink: 'http://zh.wikipedia.org/wiki/%E9%A6%99%E6%B8%AF%E8%A1%8C%E6%94%BF%E5%8D%80%E5%8A%83#cite_note-12'
            },
            tooltip: {
                trigger: 'item',
                formatter: '{b}<br/>{c} '
            },
            toolbox: {
                show: true,
                orient: 'vertical',
                left: 'right',
                top: 'center'
                // feature: {
                //     dataView: {readOnly: false},
                //     restore: {},
                //     saveAsImage: {}
                // }
            },
            visualMap: {
                max: 500,
                min: 0,
                text: ['高', '低'],
                realtime: false,
                calculable: false,
                itemHeight: '200',
                inverse: true, // 翻转
                orient: 'horizontal',
                inRange: {
                    color: ['#DDDDDD', '#026FDD']
                }
            },
            series: [
                {
                    name: '损失统计',
                    type: 'map',
                    map: 'china', // 自定义扩展图表类型
                    itemStyle: {
                        // normal: { label: { show: true } },
                        // emphasis: { label: { show: true } }
                    },
                    label:{
                        show: true
                    },
                    emphasis: { 
                        label: { 
                            show: true 
                        } 
                    },
                    data: this.mydata
                },
                {
                    name: 'pm2.5',
                    type: 'scatter',
                    coordinateSystem: 'bmap',
                    data: convertData(this.mydata),
                    symbolSize: function (val) {
                        return val[2] / 10;
                    },
                    encode: {
                        value: 2
                    },
                    label: {
                        formatter: '{b}',
                        position: 'right',
                        show: false
                    },
                    emphasis: {
                        label: {
                            show: true
                        }
                    }
                }
            ]
        })
    },
    randomData() {  
     return Math.round(Math.random() * 500);  
    } 
             
    },
}
</script>

<style scoped>
h1, h2 {
  font-weight: normal;
}
</style>
