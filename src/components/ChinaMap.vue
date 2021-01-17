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
import '../../echarts/china.js';
// 散点图
import 'echarts/lib/chart/scatter';
import 'echarts/lib/chart/effectScatter';
// 地图
import 'echarts/lib/chart/map';
// 图例
import 'echarts/lib/component/legend';
// 提示框
import 'echarts/lib/component/tooltip';
// 地图geo
import 'echarts/lib/component/geo';

import confirmdatajson from '../data/confirmData.json'
import recoverydatajson from '../data/recoveryData.json'
import deaddatajson from '../data/deadData.json'


export default {
      data() {
        return {
            mydata: [],
            msg: '地图每省每日新增',
            author: '李沛瑶',
            geoCoordMap: {
                '北京': [116.46,39.92],
                '上海': [121.48,31.22],
                '天津':[117.2,39.13],
                '重庆':[106.54,29.59],
                '河北':[114.48,38.03],
                '山西':[112.53,37.87],
                '辽宁':[123.38,41.8],
                '吉林':[125.35,43.88],
                '黑龙江':[126.63,45.75],
                '浙江':[120.19,30.26],
                '福建':[119.3,26.08],
                '山东':[106.54,29.59],
                '河南':[113.65,34.76],
                '湖北':[114.31,30.52],
                '湖南':[113,28.21],
                '广东':[113.23,23.16],
                '海南':[110.35,20.02],
                '四川':[104.06,30.67],
                '贵州':[106.71,26.57],
                '云南':[102.73,25.04],
                '江西':[115.89,28.68],
                '陕西':[108.95,34.27],
                '青海':[101.74,36.56],
                '甘肃':[103.73,36.03],
                '广西':[106.54,29.59],
                '新疆':[87.68,43.77],
                '内蒙古':[111.65,40.82],
                '西藏':[91.11,29.97],
                '宁夏':[106.27,38.47],
                '台湾':[121.5,25.14],
                '香港':[114.1,22.2],
                '澳门':[113.33,22.13],
                '安徽':[117.27,31.86],
                '江苏':[118.78,32.04]
            },
            // confirmData: [
            //     {name: '广东', value: [0,1213, 1317, 1330, 1344, 1359, 1374, 1379, 1382, 1395, 1399, 1405, 1412, 1421, 1432, 1441, 1453, 1465, 1478, 1485, 1502, 1504, 1506, 1509, 1509, 1510]},
            //     {name: '山西', value: [0,32, 120, 141, 157, 162, 173, 195, 214, 243, 266, 300, 308, 312, 330, 341, 362, 373, 382, 395, 406, 417, 423, 427, 440, 444]},
            //     {name: '北京', value: [0,22, 482, 558, 693, 774, 877, 990, 1116, 1212, 1363, 1464, 1586, 1682, 1796, 1829, 1927, 1997, 2094, 2188, 2236, 2290, 2332, 2380, 2428, 2467]},
            //     {name: '广西', value: [0,12, 14, 14, 15, 16, 16, 16, 16, 16, 17, 18, 18, 20, 20, 20, 20, 21, 21, 21, 21, 21, 21, 21, 21, 21]},
            //     {name: '湖南', value: [0,6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6]},
            //     {name: '四川', value: [0,4, 8, 8, 8, 8, 9, 10, 12, 12, 12, 12, 12, 12, 12, 13, 13, 13, 13, 13, 15, 15, 15, 15, 16, 17]},
            //     {name: '上海', value: [0,1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 4, 4, 6, 6, 6, 6, 7, 7, 7, 7, 7]},
            //     {name: '内蒙', value: [0,0, 30, 33, 36, 47, 70, 74, 76, 114, 121, 128, 155, 181, 191, 226, 232, 253, 260, 269, 289, 295, 295, 296, 296, 296]},
            //     {name: '河南', value: [0,0, 3, 6, 6, 8, 9, 10, 10, 11, 12, 12, 13, 14, 14, 14, 14, 14, 15, 15, 15, 15, 15, 15, 15, 15]},
            //     {name: '宁夏', value: [0,0, 4, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6]},
            //     {name: '吉林', value: [0,0, 3, 7, 7, 7, 7, 7, 7, 7, 7, 7, 9, 14, 14, 18, 21, 23, 25, 26, 26, 26, 26, 27, 27, 30]},
            //     {name: '浙江', value: [0,0, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4]},
            //     {name: '辽宁', value: [0,0, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3]},
            //     {name: '甘肃', value: [0,0, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 5, 5, 6, 6, 6, 7, 7, 8, 8, 8, 8]},
            //     {name: '陕西', value: [0,0, 1, 2, 2, 2, 2, 5, 5, 5, 8, 8, 8, 9, 9, 9, 10, 10, 10, 11, 12, 12, 12, 12, 12, 12]},
            //     {name: '天津', value: [0,0, 0, 5, 7, 8, 21, 22, 22, 43, 44, 49, 61, 73, 91, 100, 109, 120, 127, 132, 141, 149, 157, 163, 167, 171]},
            //     {name: '山东', value: [0,0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]},
            //     {name: '湖北', value: [0,0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 11, 11, 12, 12, 12, 12, 14, 14, 14, 23, 23, 23, 23, 23, 23]},
            //     {name: '福建', value: [0,0, 0, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3]},
            //     {name: '河北', value: [0,0, 0, 0, 6, 6, 18, 21, 27, 30, 39, 39, 47, 61, 70, 89, 98, 104, 125, 138, 138, 139, 148, 159, 173, 176]},
            //     {name: '安徽', value: [0,0, 0, 0, 0, 1, 1, 1, 4, 4, 5, 7, 7, 9, 9, 9, 10, 10, 10, 10, 10, 11, 11, 11, 11, 11]},
            //     {name: '江苏', value: [0,0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 4, 4, 4, 4, 4, 4, 5, 5, 6, 7, 7, 7, 7]},
            //     {name: '重庆', value: [0,0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 3, 3, 3, 3, 3, 3, 3, 3]}
            // ],
            // recoveryData: [
            //     {name: '广东', value: [0,1004, 1136, 1137, 1146, 1159, 1173, 1178, 1185, 1191, 1201, 1201, 1206, 1208, 1233, 1237, 1245, 1251, 1256, 1273, 1288, 1305, 1314, 1319, 1322, 1327]},
            //     {name: '山西', value: [0,4, 6, 13, 13, 14, 14, 14, 19, 20, 21, 22, 25, 32, 33, 36, 36, 41, 51, 54, 69, 81, 87, 95, 119, 142]},
            //     {name: '北京', value: [0,1, 43, 46, 55, 64, 73, 76, 78, 78, 83, 90, 100, 109, 115, 118, 121, 134, 141, 152, 168, 175, 186, 203, 244, 252]},
            //     {name: '广西', value: [0,8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8]},
            //     {name: '湖南', value: [0,5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5]},
            //     {name: '四川', value: [0,3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 6]},
            //     {name: '上海', value: [0,0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]},
            //     {name: '内蒙', value: [0,0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 4, 4, 8, 8, 11, 11, 14, 16, 18, 19, 21, 21]},
            //     {name: '河南', value: [0,0,0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 2, 3, 3, 4, 5, 5, 5]},
            //     {name: '宁夏', value: [0,0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 4]},
            //     {name: '吉林', value: [0,0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1]},
            //     {name: '浙江', value: [0,0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]},
            //     {name: '辽宁', value: [0,0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]},
            //     {name: '甘肃', value: [0,0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]},
            //     {name: '陕西', value: [0,0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 3, 3, 4, 4]},
            //     {name: '天津', value: [0,0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2]},
            //     {name: '山东', value: [0,0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]},
            //     {name: '湖北', value: [0,0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2]},
            //     {name: '福建', value: [0,0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3]},
            //     {name: '河北', value: [0,0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 3, 5, 10, 10, 10, 12, 20, 21, 26]},
            //     {name: '安徽', value: [0,0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1]},
            //     {name: '江苏', value: [0,0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]},
            //     {name: '重庆', value: [0,0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]}
            // ],
            // deadData: [
            //     {name: '广东', value: [0,44, 48, 48, 49, 49, 50, 51, 51, 51, 51, 51, 51, 51, 51, 51, 54, 55, 55, 56, 56, 56, 56, 56, 56, 56]},
            //     {name: '山西', value: [0,2, 7, 7, 7, 7, 8, 8, 9, 9, 9, 9, 10, 10, 12, 12, 14, 17, 17, 17, 17, 18, 18, 18, 19, 19]},
            //     {name: '北京', value: [0,4, 25, 28, 35, 39, 42, 48, 56, 59, 66, 75, 82, 91, 96, 100, 103, 107, 110, 112, 114, 116, 120, 129, 134, 139]},
            //     {name: '广西', value: [0,3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3]},
            //     {name: '湖南', value: [0,1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]},
            //     {name: '四川', value: [0,1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2]},
            //     {name: '上海', value: [0,0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1]},
            //     {name: '内蒙古', value: [0,0, 6, 6, 6, 6, 6, 6, 6, 7, 8, 9, 11, 13, 14, 14, 14, 14, 16, 16, 17, 17, 18, 20, 23, 23]},
            //     {name: '河南', value: [0,0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]},
            //     {name: '宁夏', value: [0,0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]},
            //     {name: '吉林', value: [0,0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 2, 2, 2, 2, 3, 3, 4, 4, 4, 4, 4]},
            //     {name: '浙江', value: [0,0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]},
            //     {name: '辽宁', value: [0,0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]},
            //     {name: '甘肃', value: [0,0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]},
            //     {name: '陕西', value: [0,0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]},
            //     {name: '天津', value: [0,0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 4, 4, 5, 5, 5, 5, 6, 7, 7, 8, 9, 9]},
            //     {name: '山东', value: [0,0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]},
            //     {name: '湖北', value: [0,0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2]},
            //     {name: '福建', value: [0,0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]},
            //     {name: '河北', value: [0,0, 0, 0, 0, 0, 0, 0, 0, 3, 4, 4, 4, 4, 4, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6]},
            //     {name: '安徽', value: [0,0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]},
            //     {name: '江苏', value: [0,0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]},
            //     {name: '重庆', value: [0,0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]}
            // ],
            confirmData: confirmdatajson,
            recoveryData: recoverydatajson,
            deadData: deaddatajson,

            originToday: [
                {name: '广东', value: 0},
                {name: '山西', value: 0},
                {name: '北京', value: 0},
                {name: '广西', value: 0},
                {name: '湖南', value: 0},
                {name: '四川', value: 0},
                {name: '上海', value: 0},
                {name: '内蒙古', value: 0},
                {name: '河南', value: 0},
                {name: '宁夏', value: 0},
                {name: '吉林', value: 0},
                {name: '浙江', value: 0},
                {name: '辽宁', value: 0},
                {name: '甘肃', value: 0},
                {name: '陕西', value: 0},
                {name: '天津', value: 0},
                {name: '山东', value: 0},
                {name: '湖北', value: 0},
                {name: '福建', value: 0},
                {name: '河北', value: 0},
                {name: '安徽', value: 0},
                {name: '江苏', value: 0},
                {name: '重庆', value: 0}
            ],
            
            confirmToday: [
                {name: '广东', value: 0},
                {name: '山西', value: 0},
                {name: '北京', value: 0},
                {name: '广西', value: 0},
                {name: '湖南', value: 0},
                {name: '四川', value: 0},
                {name: '上海', value: 0},
                {name: '内蒙古', value: 0},
                {name: '河南', value: 0},
                {name: '宁夏', value: 0},
                {name: '吉林', value: 0},
                {name: '浙江', value: 0},
                {name: '辽宁', value: 0},
                {name: '甘肃', value: 0},
                {name: '陕西', value: 0},
                {name: '天津', value: 0},
                {name: '山东', value: 0},
                {name: '湖北', value: 0},
                {name: '福建', value: 0},
                {name: '河北', value: 0},
                {name: '安徽', value: 0},
                {name: '江苏', value: 0},
                {name: '重庆', value: 0}
            ],
            recoveryToday: [
                {name: '广东', value: 0},
                {name: '山西', value: 0},
                {name: '北京', value: 0},
                {name: '广西', value: 0},
                {name: '湖南', value: 0},
                {name: '四川', value: 0},
                {name: '上海', value: 0},
                {name: '内蒙古', value: 0},
                {name: '河南', value: 0},
                {name: '宁夏', value: 0},
                {name: '吉林', value: 0},
                {name: '浙江', value: 0},
                {name: '辽宁', value: 0},
                {name: '甘肃', value: 0},
                {name: '陕西', value: 0},
                {name: '天津', value: 0},
                {name: '山东', value: 0},
                {name: '湖北', value: 0},
                {name: '福建', value: 0},
                {name: '河北', value: 0},
                {name: '安徽', value: 0},
                {name: '江苏', value: 0},
                {name: '重庆', value: 0}
            ],
            deadToday: [
                {name: '广东', value: 0},
                {name: '山西', value: 0},
                {name: '北京', value: 0},
                {name: '广西', value: 0},
                {name: '湖南', value: 0},
                {name: '四川', value: 0},
                {name: '上海', value: 0},
                {name: '内蒙古', value: 0},
                {name: '河南', value: 0},
                {name: '宁夏', value: 0},
                {name: '吉林', value: 0},
                {name: '浙江', value: 0},
                {name: '辽宁', value: 0},
                {name: '甘肃', value: 0},
                {name: '陕西', value: 0},
                {name: '天津', value: 0},
                {name: '山东', value: 0},
                {name: '湖北', value: 0},
                {name: '福建', value: 0},
                {name: '河北', value: 0},
                {name: '安徽', value: 0},
                {name: '江苏', value: 0},
                {name: '重庆', value: 0}
            ]
            }        
    },
    mounted() {
        let _this = this
        _this.init()
        _this.drawMap()
        setTimeout(function () { _this.run() }, 0)
        setInterval(function () { _this.run() }, 3000)
    },
    methods:{
        init () {
            this.date = 0;
        },

        drawMap() {
            console.log(echarts.version);
            // 根据data获取不同省份对应的地理信息
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
                // console.log(res);
                return res;
            };

            // const state = {
            //     geoCoordMap: {'香港特别行政区': [114.08, 22.2], '澳门特别行政区': [113.33, 22.13], '台北': [121.5, 25.03]/*等等*/},
            //     // 发光的城市
            //     showCityNumber: 5,
            //     showCount: 0,
            //     // 是否需要loading
            //     isLoading: true
            // }
        
            this.option = {
                // 地理坐标系组件
                // 在这里改变整个地图的颜色和悬浮时字体的颜色
                geo: {
                    map: 'china',
                    label: {
                    // true会显示城市名
                        emphasis: {
                            color: '#000000',
                            show: true
                        }
                    },
                    itemStyle: {
                        // 地图背景色
                        normal: {
                            areaColor: '#465471',
                            borderColor: '#282F3C'
                        },
                        // 悬浮时
                        emphasis: {
                            areaColor: '#465471'
                            //areaColor: '#8796B4'
                        }
                    },
                },
                backgroundColor: '#FFFFFF',
                title: {
                    text: '疫情地理信息',
                    subtext: '中国地图',
                    left: 'center',
                    textStyle: {
                        color: '#000'
                    }
                },
                tooltip: {
                    trigger: 'item',
                    formatter: '{b}'+' : '+'{c} ',
                    // formatter: function (params) {
                    //     return params.name + ' : ' + params.value[2]
                    // }
                },
                legend: {
                    orient: 'vertical',
                    left: 'left',
                    top: 'top',
                    data: ['确诊', '治愈','死亡', 'top5'],
                    textStyle: {
                        color: '#000'
                    }
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
                visualMap: [
                    {
                    max: 1000,
                    min: 0,
                    text: ['高', '低'],
                    realtime: false,
                    calculable: false,
                    itemHeight: '200',
                    inverse: false, // 翻转
                    orient: 'horizontal',
                    // inRange: {
                    //     color: ['#DDDDDD', '#026FDD']
                    // },
                    opacity:0.3,
                }],
                series: [
                    {
                        name: '确诊',
                        // 表的类型 这里是散点
                        type: 'effectScatter',
                        // 使用地理坐标系，通过 geoIndex 指定相应的地理坐标系组件
                        coordinateSystem: 'geo',
                        // data: [],
                        data: convertData(this.confirmToday),
                        symbolSize: function (val) {
                            console.log(Math.log(val[2])/Math.log(2) + 1);
                            // return 10*Math.log(val[2])/Math.log(2) + 1;
                            return val[2]/10;
                        },
                        opacity:0.3,
                        tooltip: {
                            trigger: 'item',
                            // formatter: '{c}',
                            formatter: function (params) {
                                return params.name + ' : ' + params.value[2]
                            }
                        },
                        visualMap:false,
                        // showEffectOn: 'render',
                        showEffectOn: 'emphasis',
                        hoverAnimation: true,
                        // 鼠标悬浮的时候在圆点上显示数值
                        label: {
                            normal: {
                                show: false
                            },
                            emphasis: {
                                show: false
                            }
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
                        },
                        itemStyle: {
                            normal: {
                                color: '#DDDDDD'
                            },
                            // 鼠标悬浮的时候圆点样式变化
                            emphasis: {
                                borderColor: '#fff',
                                borderWidth: 1
                            }
                        },
                        animationDuration: 300,
                        animationDurationUpdate: 300,
                        zlevel:1
                    },
                    {
                        name: '治愈',
                        // 表的类型 这里是散点
                        type: 'scatter',
                        // 使用地理坐标系，通过 geoIndex 指定相应的地理坐标系组件
                        coordinateSystem: 'geo',
                        // data: [],
                        data: convertData(this.recoveryToday),
                        symbolSize: function (val) {
                            return Math.log(val[2])/Math.log(2) + 1;
                        },
                        tooltip: {
                            trigger: 'item',
                            // formatter: '{c}',
                            formatter: function (params) {
                                return params.name + ' : ' + params.value[2]
                            }
                        },
                        visualMap:false,
                        label: {
                            formatter: '{b}',
                            position: 'right',
                            show: false
                        },
                        emphasis: {
                            label: {
                                show: true
                            }
                        },
                        itemStyle: {
                            normal: {
                                color: '#026FDD'
                            },
                            // 鼠标悬浮的时候圆点样式变化
                            emphasis: {
                                borderColor: '#fff',
                                borderWidth: 1
                            }
                        },
                        animationDuration: 300,
                        animationDurationUpdate: 300,
                        zlevel:2
                    },
                    {
                        name: '死亡',
                        // 表的类型 这里是散点
                        type: 'scatter',
                        // 使用地理坐标系，通过 geoIndex 指定相应的地理坐标系组件
                        coordinateSystem: 'geo',
                        // data: [],
                        data: convertData(this.deadToday),
                        symbolSize: function (val) {
                            return Math.log(val[2])/Math.log(2) + 1;
                        },
                        tooltip: {
                            trigger: 'item',
                            // formatter: '{c}',
                            formatter: function (params) {
                                return params.name + ' : ' + params.value[2]
                            }
                        },
                        visualMap:false,
                        label: {
                            formatter: '{b}',
                            position: 'right',
                            show: false
                        },
                        emphasis: {
                            label: {
                                show: true
                            }
                        },
                        itemStyle: {
                            normal: {
                                color: '#FF0000'
                            },
                            // 鼠标悬浮的时候圆点样式变化
                            emphasis: {
                                borderColor: '#fff',
                                borderWidth: 1
                            }
                        },
                        animationDuration: 300,
                        animationDurationUpdate: 300,
                        zlevel:3

                        
                    },
                    // {
                    //     name: 'top5',
                    //     // 表的类型 这里是散点
                    //     type: 'effectScatter',
                    //     // 使用地理坐标系，通过 geoIndex 指定相应的地理坐标系组件
                    //     coordinateSystem: 'geo',
                    //     // data: [],
                    //     data: convertData(this.confirmToday.sort(function (a, b) {
                    //         return b.value - a.value;
                    //     }).slice(0, 6)),
                    //     symbolSize: function (val) {
                    //         return val[2] / 10;
                    //     },
                    //     encode: {
                    //         value: 2
                    //     },
                    //     // 标记的大小
                    //     showEffectOn: 'render',
                    //     rippleEffect: {
                    //         brushType: 'stroke'
                    //     },
                    //     hoverAnimation: true,
                    //     label: {
                    //         normal: {
                    //             show: false
                    //         },
                    //         emphasis: {
                    //             formatter: '{@[3]}',
                    //         }
                    //     },
                    //     itemStyle: {
                    //         normal: {
                    //             color: '#ff0000',
                    //             shadowBlur: 10,
                    //             shadowColor: '#333'
                    //         }
                    //     },
                    //     zlevel: 4
                    // },
                    // {
                    //     name: '地图',
                    //     type: 'map',
                    //     map: 'china',
                    //     // itemStyle: {
                    //     //     normal: { label: { show: true } },
                    //     //     emphasis: { label: { show: true } }
                    //     // },
                    //     // label: {
                    //     //     formatter: function (params) {
                    //     //         return params.name + ' : ' + params.value[3]
                    //     //     },
                    //     //     position: 'right',
                    //     //     show: false
                    //     // },
                    //     // label:{
                    //     //     show: true
                    //     // },
                    //     // emphasis: { 
                    //     //     label: { 
                    //     //         show: true 
                    //     //     } 
                    //     // },
                    //     data: this.confirmToday,
                    //     zlevel:0
                    // },

                ]
            };
                        // 基于准备好的dom，初始化echarts实例
            this.myChart = this.$echarts.init(document.getElementById('main'));
            this.myChart.setOption(this.option);

        },
        // randomData() {  
        //     return Math.round(Math.random() * 500);  
        // },
        run(){
            // 根据data获取不同省份对应的地理信息
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
                // console.log(res);
                return res;
            };

            // const state = {
            //     geoCoordMap: {'香港特别行政区': [114.08, 22.2], '澳门特别行政区': [113.33, 22.13], '台北': [121.5, 25.03]/*等等*/},
            //     // 发光的城市
            //     showCityNumber: 5,
            //     showCount: 0,
            //     // 是否需要loading
            //     isLoading: true
            // }

            var dataConfirm = this.confirmData;
            var dataRecovery = this.recoveryData;
            var dataDead = this.deadData;

            var todayConfirm = this.confirmToday;
            var todayRecovery = this.recoveryToday;
            var todayDead = this.deadToday;


            for(var i = 0; i <todayConfirm.length ; i++) {
                // console.log('runfun');
                // console.log(i);comfirmData
                // console.log(this.confirmData);                
                let dc = this.confirmData[i].value;
                let dr = this.recoveryData[i].value;
                let dd = this.deadData[i].value;

                let idx = this.date;
                // todayOrigin[i].value = dc[idx] - dr[idx] - dd[idx];
                todayConfirm[i].value = dc[idx];
                todayRecovery[i].value = dr[idx];
                todayDead[i].value = dd[idx];
            }

            this.option.series[0].data = convertData(todayConfirm);
            this.option.series[1].data = convertData(todayRecovery);
            this.option.series[2].data = convertData(todayDead);

            // console.log('&&&&&&');
            // console.log(this.date);
            // console.log(todayConfirm);
            // console.log(this.option.series[0].data);
            // console.log(this.option.series[0].data);
            // console.log('$$$$$$');   

            this.myChart.setOption(this.option);
            this.date = this.date + 1;
            if(this.date === 24)
            {
                this.date = 0;
            }


        }          
    },
}
</script>

<style scoped>
h1, h2 {
  font-weight: normal;
}
</style>
