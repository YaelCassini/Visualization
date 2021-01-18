<template>
  <div class="ChinaMap">
<h1 style="font-size: 48px; font-weight: bold; color:#0091FF; height:60px; padding: 60px 0px 0px 0px; margin:0px">  
    Geographical Information
</h1>
<h2 style="font-size: 26px; font-weight: bold; color:rgb(97,113,114);margin:0">
Covid-19(from 2020-01-20) x SARS(from 2003-04-20)
</h2>

    <div style="margin:0 50 0 50">
        <div id="main" style="width:100%;height:580px;margin:0 auto; padding:0px 0px 0px 0px"></div>
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


import confirmdatajson1 from '../data/confirmData1.json'
import recoverydatajson1 from '../data/recoveryData1.json'
import deaddatajson1 from '../data/deadData1.json'
import confirmdatajson2 from '../data/confirmData2.json'
import recoverydatajson2 from '../data/recoveryData2.json'
import deaddatajson2 from '../data/deadData2.json'


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
            confirmData1: confirmdatajson1,
            recoveryData1: recoverydatajson1,
            deadData1: deaddatajson1,

            confirmData2: confirmdatajson2,
            recoveryData2: recoverydatajson2,
            deadData2: deaddatajson2,

            // originToday: [
            //     {name: '广东', value: 0},
            //     {name: '山西', value: 0},
            //     {name: '北京', value: 0},
            //     {name: '广西', value: 0},
            //     {name: '湖南', value: 0},
            //     {name: '四川', value: 0},
            //     {name: '上海', value: 0},
            //     {name: '内蒙古', value: 0},
            //     {name: '河南', value: 0},
            //     {name: '宁夏', value: 0},
            //     {name: '吉林', value: 0},
            //     {name: '浙江', value: 0},
            //     {name: '辽宁', value: 0},
            //     {name: '甘肃', value: 0},
            //     {name: '陕西', value: 0},
            //     {name: '天津', value: 0},
            //     {name: '山东', value: 0},
            //     {name: '湖北', value: 0},
            //     {name: '福建', value: 0},
            //     {name: '河北', value: 0},
            //     {name: '安徽', value: 0},
            //     {name: '江苏', value: 0},
            //     {name: '重庆', value: 0}
            // ],  
            confirmToday1: [
                {name: '北京', value: 0},
                {name: '香港', value: 0},
                {name: '上海', value: 0},
                {name: '四川', value: 0},
                {name: '河北', value: 0},
                {name: '甘肃', value: 0},
                {name: '陕西', value: 0},
                {name: '辽宁', value: 0},
                {name: '广东', value: 0},
                {name: '台湾', value: 0},
                {name: '福建', value: 0},
                {name: '重庆', value: 0},
                {name: '浙江', value: 0},
                {name: '江苏', value: 0},
                {name: '天津', value: 0},
                {name: '云南', value: 0},
                {name: '澳门', value: 0},
                {name: '湖北', value: 0},
                {name: '河南', value: 0},
                {name: '湖南', value: 0},
                {name: '安徽', value: 0},
                {name: '黑龙江', value: 0},
                {name: '江西', value: 0},
                {name: '山东', value: 0},
                {name: '广西', value: 0},
                {name: '内蒙古', value: 0},
                {name: '山西', value: 0},
                {name: '海南', value: 0},
                {name: '吉林', value: 0},
                {name: '贵州', value: 0},
                {name: '新疆维吾尔', value: 0},
                {name: '宁夏回族', value: 0},
                {name: '青海', value: 0},
                {name: '西藏', value: 0}
            ],    
            confirmToday2: [
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
                {name: '重庆', value: 0},
                {name: '江西', value: 0},
                {name: "黑龙江", value: 0},
                {name: "新疆", value: 0},
                {name: "西藏", value: 0},
                {name: "青海", value: 0},
                {name: "云南", value: 0},
                {name: "贵州", value: 0},
                {name: "台湾", value: 0},
                {name: "海南", value: 0},
                {name: "香港", value: 0},
                {name: "澳门", value: 0}
            ],
            // recoveryToday: [
            //     {name: '广东', value: 0},
            //     {name: '山西', value: 0},
            //     {name: '北京', value: 0},
            //     {name: '广西', value: 0},
            //     {name: '湖南', value: 0},
            //     {name: '四川', value: 0},
            //     {name: '上海', value: 0},
            //     {name: '内蒙古', value: 0},
            //     {name: '河南', value: 0},
            //     {name: '宁夏', value: 0},
            //     {name: '吉林', value: 0},
            //     {name: '浙江', value: 0},
            //     {name: '辽宁', value: 0},
            //     {name: '甘肃', value: 0},
            //     {name: '陕西', value: 0},
            //     {name: '天津', value: 0},
            //     {name: '山东', value: 0},
            //     {name: '湖北', value: 0},
            //     {name: '福建', value: 0},
            //     {name: '河北', value: 0},
            //     {name: '安徽', value: 0},
            //     {name: '江苏', value: 0},
            //     {name: '重庆', value: 0},
            //     {name: '江西', value: 0},
            //     {name: "黑龙江", value: 0},
            //     {name: "新疆", value: 0},
            //     {name: "西藏", value: 0},
            //     {name: "青海", value: 0},
            //     {name: "云南", value: 0},
            //     {name: "贵州", value: 0},
            //     {name: "台湾", value: 0},
            //     {name: "海南", value: 0},
            //     {name: "香港", value: 0},
            //     {name: "澳门", value: 0}
            // ],
            // deadToday: [
            //     {name: '广东', value: 0},
            //     {name: '山西', value: 0},
            //     {name: '北京', value: 0},
            //     {name: '广西', value: 0},
            //     {name: '湖南', value: 0},
            //     {name: '四川', value: 0},
            //     {name: '上海', value: 0},
            //     {name: '内蒙古', value: 0},
            //     {name: '河南', value: 0},
            //     {name: '宁夏', value: 0},
            //     {name: '吉林', value: 0},
            //     {name: '浙江', value: 0},
            //     {name: '辽宁', value: 0},
            //     {name: '甘肃', value: 0},
            //     {name: '陕西', value: 0},
            //     {name: '天津', value: 0},
            //     {name: '山东', value: 0},
            //     {name: '湖北', value: 0},
            //     {name: '福建', value: 0},
            //     {name: '河北', value: 0},
            //     {name: '安徽', value: 0},
            //     {name: '江苏', value: 0},
            //     {name: '重庆', value: 0},
            //     {name: '江西', value: 0},
            //     {name: "黑龙江", value: 0},
            //     {name: "新疆", value: 0},
            //     {name: "西藏", value: 0},
            //     {name: "青海", value: 0},
            //     {name: "云南", value: 0},
            //     {name: "贵州", value: 0},
            //     {name: "台湾", value: 0},
            //     {name: "海南", value: 0},
            //     {name: "香港", value: 0},
            //     {name: "澳门", value: 0}
            // ],
            dataToday1: [
                {name: '北京', confirm: 0, recovery: 0, dead: 0},
                {name: '香港', confirm: 0, recovery: 0, dead: 0},
                {name: '上海', confirm: 0, recovery: 0, dead: 0},
                {name: '四川', confirm: 0, recovery: 0, dead: 0},
                {name: '河北', confirm: 0, recovery: 0, dead: 0},
                {name: '甘肃', confirm: 0, recovery: 0, dead: 0},
                {name: '陕西', confirm: 0, recovery: 0, dead: 0},
                {name: '辽宁', confirm: 0, recovery: 0, dead: 0},
                {name: '广东', confirm: 0, recovery: 0, dead: 0},
                {name: '台湾', confirm: 0, recovery: 0, dead: 0},
                {name: '福建', confirm: 0, recovery: 0, dead: 0},
                {name: '重庆', confirm: 0, recovery: 0, dead: 0},
                {name: '浙江', confirm: 0, recovery: 0, dead: 0},
                {name: '江苏', confirm: 0, recovery: 0, dead: 0},
                {name: '天津', confirm: 0, recovery: 0, dead: 0},
                {name: '云南', confirm: 0, recovery: 0, dead: 0},
                {name: '澳门', confirm: 0, recovery: 0, dead: 0},
                {name: '湖北', confirm: 0, recovery: 0, dead: 0},
                {name: '河南', confirm: 0, recovery: 0, dead: 0},
                {name: '湖南', confirm: 0, recovery: 0, dead: 0},
                {name: '安徽', confirm: 0, recovery: 0, dead: 0},
                {name: '黑龙江', confirm: 0, recovery: 0, dead: 0},
                {name: '江西', confirm: 0, recovery: 0, dead: 0},
                {name: '山东', confirm: 0, recovery: 0, dead: 0},
                {name: '广西', confirm: 0, recovery: 0, dead: 0},
                {name: '内蒙古', confirm: 0, recovery: 0, dead: 0},
                {name: '山西', confirm: 0, recovery: 0, dead: 0},
                {name: '海南', confirm: 0, recovery: 0, dead: 0},
                {name: '吉林', confirm: 0, recovery: 0, dead: 0},
                {name: '贵州', confirm: 0, recovery: 0, dead: 0},
                {name: '新疆维吾尔', confirm: 0, recovery: 0, dead: 0},
                {name: '宁夏回族', confirm: 0, recovery: 0, dead: 0},
                {name: '青海', confirm: 0, recovery: 0, dead: 0},
                {name: '西藏', confirm: 0, recovery: 0, dead: 0}
            ],
            dataToday2: [
                {name: '广东', confirm: 0, recovery: 0, dead: 0},
                {name: '山西', confirm: 0, recovery: 0, dead: 0},
                {name: '北京', confirm: 0, recovery: 0, dead: 0},
                {name: '广西', confirm: 0, recovery: 0, dead: 0},
                {name: '湖南', confirm: 0, recovery: 0, dead: 0},
                {name: '四川', confirm: 0, recovery: 0, dead: 0},
                {name: '上海', confirm: 0, recovery: 0, dead: 0},
                {name: '内蒙古', confirm: 0, recovery: 0, dead: 0},
                {name: '河南', confirm: 0, recovery: 0, dead: 0},
                {name: '宁夏', confirm: 0, recovery: 0, dead: 0},
                {name: '吉林', confirm: 0, recovery: 0, dead: 0},
                {name: '浙江', confirm: 0, recovery: 0, dead: 0},
                {name: '辽宁', confirm: 0, recovery: 0, dead: 0},
                {name: '甘肃', confirm: 0, recovery: 0, dead: 0},
                {name: '陕西', confirm: 0, recovery: 0, dead: 0},
                {name: '天津', confirm: 0, recovery: 0, dead: 0},
                {name: '山东', confirm: 0, recovery: 0, dead: 0},
                {name: '湖北', confirm: 0, recovery: 0, dead: 0},
                {name: '福建', confirm: 0, recovery: 0, dead: 0},
                {name: '河北', confirm: 0, recovery: 0, dead: 0},
                {name: '安徽', confirm: 0, recovery: 0, dead: 0},
                {name: '江苏', confirm: 0, recovery: 0, dead: 0},
                {name: '重庆', confirm: 0, recovery: 0, dead: 0},
                {name: '江西', confirm: 0, recovery: 0, dead: 0},
                {name: "黑龙江", confirm: 0, recovery: 0, dead: 0},
                {name: "新疆", confirm: 0, recovery: 0, dead: 0},
                {name: "西藏", confirm: 0, recovery: 0, dead: 0},
                {name: "青海", confirm: 0, recovery: 0, dead: 0},
                {name: "云南", confirm: 0, recovery: 0, dead: 0},
                {name: "贵州", confirm: 0, recovery: 0, dead: 0},
                {name: "台湾", confirm: 0, recovery: 0, dead: 0},
                {name: "海南", confirm: 0, recovery: 0, dead: 0},
                {name: "香港", confirm: 0, recovery: 0, dead: 0},
                {name: "澳门", confirm: 0, recovery: 0, dead: 0}
            ]
            
            }        
    },
    mounted() {
        let _this = this
        _this.init()
        _this.drawMap()
        setTimeout(function () { _this.run() }, 0)
        setInterval(function () { _this.run() }, 5000)
    },
    methods:{
        init () {
            this.date = 0;
        },

        drawMap() {
            // console.log(echarts.version);
            // 根据data获取不同省份对应的地理信息
            const geoCoordMap = this.geoCoordMap;
            var convertData = function (data) {
                var res = [];
                for (var i = 0; i < data.length; i++) {
                    var geoCoord = geoCoordMap[data[i].name];
                    if (geoCoord) {
                        var temp = geoCoord.concat(data[i].confirm);
                        var temp1 = temp.concat(data[i].recovery);
                        var temp2 = temp1.concat(data[i].dead);
                        res.push({
                            name: data[i].name,
                            value: temp2
                        });
                    }
                }
                return res;
            };

        
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
                            areaColor: '#D4D2CF',
                            borderColor: '#D9D3CD',
                            opacity:0,
                        },
                        // 悬浮时
                        emphasis: {
                            opacity:1,
                            areaColor: '#000000'
                        }
                    },
                },
                backgroundColor: '#FCFAF7',
                title: {
                    padding:30,
                    //text: 'Covid-19 x SARS \n GEOGRAPHICAL INFOMATION',
                    subtext: 'in China',
                    left: 'center',
                    textStyle: {
                        color: '#0091FF',
                        fontSize:48,
                        fontWeight:'bolder',
                    },
                    padding:[0,0,40,0]
                },
                
                tooltip: {
                    trigger: 'item',
                    formatter(params){
                        // console.log(params);
                        var res = ''
                        // console.log(params.value);
                        res +='城市：';
                        res +=params.name;
                        res +='<br>';
                        res +='新增确诊人数：';
                        res +=params.value[2];
                        res +='<br>';
                        res +='新增治愈人数：';
                        res +=params.value[3];
                        res +='<br>';
                        res +='新增人数：';
                        res +=params.value[4];
                        res +='<br>';
                        
                        return res;
                    },
                    zlevel:0
                },
                grid:{
                    top:200,
                    height:400,
                },
                legend: {
                    orient: 'vertical',
                    left: 'left',
                    top: 'top',
                    data: ['新冠','非典'],
                    textStyle: {
                        color: '#000'
                    }
                },
                visualMap: [
                    {
                    max: 50,
                    min: 0,
                    text: ['高', '低'],
                    realtime: false,
                    calculable: false,
                    itemHeight: '200',
                    inverse: false, // 翻转
                    orient: 'horizontal',
                    inRange: {
                        // 改颜色
                        // 地图颜色深度
                        color: ['#F1EBE9', '#FFD562', '#FD8986']
                    },
                    // 透明度
                    opacity:0.3,
                    seriesIndex: 2,
                }],
                series: [
                    {
                        name: '新冠',
                        // 表的类型 这里是散点
                        type: 'effectScatter',
                        // 使用地理坐标系，通过 geoIndex 指定相应的地理坐标系组件
                        coordinateSystem: 'geo',
                        // data: [],
                        data: convertData(this.dataToday1),
                        symbolSize: function (val) {
                            return 10*Math.log(val[2]+1)/Math.log(2) + 10;
                        },
                        opacity:0.3,
                        showEffectOn: 'emphasis',
                        hoverAnimation: true,
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
                                // 改颜色
                                // 新冠散点颜色及透明度
                                color: '#FD8A87',
                                opacity: 0.4,
                                shadowColor: 'rgba(181, 166, 235, 0.5)',
                                shadowBlur: 10
                            },
                            // 鼠标悬浮的时候圆点样式变化
                            emphasis: {
                                // 改颜色
                                // 新冠散点外边界颜色及透明度
                                borderColor: '#FD8A87',
                                opacity: 1,
                                borderWidth: 1
                            }
                        },
                        zlevel:1
                    },
                    {
                        name: '非典',
                        // 表的类型 这里是散点
                        type: 'effectScatter',
                        // 使用地理坐标系，通过 geoIndex 指定相应的地理坐标系组件
                        coordinateSystem: 'geo',
                        // data: [],
                        data: convertData(this.dataToday2),
                        symbolSize: function (val) {
                            return 10*Math.log(val[2]+1)/Math.log(2) + 10;
                        },
                        opacity:0.3,
                        showEffectOn: 'emphasis',
                        hoverAnimation: true,
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
                                // 改颜色
                                // 非典散点颜色及透明度
                                // color: '#FFD154',
                                color: '#57B5FB',
                                shadowColor: 'rgba(255, 209, 84, 0.5)',
                                shadowBlur: 10,
                                opacity: 0.4
                            },
                            // 鼠标悬浮的时候圆点样式变化
                            emphasis: {
                                // 改颜色
                                // 非典散点边界颜色及透明度
                                borderColor: '#FFD154',
                                opacity: 1,
                                borderWidth: 1
                            }
                        },
                        zlevel:1
                    },
                    // {
                    //     name: '治愈',
                    //     // 表的类型 这里是散点
                    //     type: 'scatter',
                    //     // 使用地理坐标系，通过 geoIndex 指定相应的地理坐标系组件
                    //     coordinateSystem: 'geo',
                    //     // data: [],
                    //     data: convertData(this.recoveryToday),
                    //     symbolSize: function (val) {
                    //         return 10*Math.log(val[2]+1)/Math.log(2) + 10;
                    //     },
                    //     tooltip: {
                    //         // trigger: 'item',
                    //         // // formatter: '{c}',
                    //         // formatter: function (params) {
                    //         //     return params.name + ' : ' + params.value[2]
                    //         // }
                    //     },
                    //     visualMap:false,
                    //     label: {
                    //         formatter: '{b}',
                    //         position: 'right',
                    //         show: false
                    //     },
                    //     emphasis: {
                    //         label: {
                    //             show: true
                    //         }
                    //     },
                    //     itemStyle: {
                    //         normal: {
                    //             color: '#FF0000',
                    //             opacity: 1
                    //         },
                    //         // 鼠标悬浮的时候圆点样式变化
                    //         emphasis: {
                    //             borderColor: '#000000',
                    //             borderWidth: 1,
                    //             opacity:1
                    //         }
                    //     },
                    //     zlevel:2
                    // },
                    // {
                    //     name: '死亡',
                    //     // 表的类型 这里是散点
                    //     type: 'scatter',
                    //     // 使用地理坐标系，通过 geoIndex 指定相应的地理坐标系组件
                    //     coordinateSystem: 'geo',
                    //     // data: [],
                    //     data: convertData(this.deadToday),
                    //     symbolSize: function (val) {
                    //         return 10*Math.log(val[2]+1)/Math.log(2) + 10;
                    //     },
                    //     tooltip: {
                    //         // trigger: 'item',
                    //         // formatter: function (params) {
                    //         //     return params.name + ' : ' + params.value[2]
                    //         // }
                    //     },
                    //     label: {
                    //         formatter: '{b}',
                    //         position: 'right',
                    //         show: false
                    //     },
                    //     emphasis: {
                    //         label: {
                    //             show: true
                    //         }
                    //     },
                    //     itemStyle: {
                    //         normal: {
                    //             color: '#00FF00',
                    //             opacity: 1
                    //         },
                    //         // 鼠标悬浮的时候圆点样式变化
                    //         emphasis: {
                    //             borderColor: '#FF0000',
                    //             borderWidth: 1
                    //         }
                    //     },
                    //     zlevel:3
                    // },
                    {
                        name: '省份',
                        type: 'map',
                        map: 'china',
                        //  itemStyle: {
                        //      normal: { label: { show: true ,opacity:0.5} },
                        //      emphasis: { label: { 
                        //          show: true, opacity:1} }
                        //  },
                        tooltip: {
                            trigger: 'item',
                            formatter(params){
                                var res = params.name;
                                return res;
                            },
                            zlevel:0
                        },
                            
                        data: this.confirmToday1,
                        color: 'rgba(238,225,221,0.4)',
                        zlevel:0
                    },

                ]
            };
            // 基于准备好的dom，初始化echarts实例
            this.myChart = this.$echarts.init(document.getElementById('main'));
            this.myChart.setOption(this.option);

        },
        run(){
            console.log(this.date);
            // 根据data获取不同省份对应的地理信息
            const geoCoordMap = this.geoCoordMap;
            var convertData = function (data) {
                var res = [];
                for (var i = 0; i < data.length; i++) {
                    var geoCoord = geoCoordMap[data[i].name];
                    if (geoCoord) {
                        var temp = geoCoord.concat(data[i].confirm);
                        var temp1 = temp.concat(data[i].recovery);
                        var temp2 = temp1.concat(data[i].dead);
                        res.push({
                            name: data[i].name,
                            value: temp2
                        });
                    }
                }
                return res;
            };

            var dataConfirm1 = this.confirmData1;
            var dataRecovery1 = this.recoveryData1;
            var dataDead1 = this.deadData1;

            var dataConfirm2 = this.confirmData2;
            var dataRecovery2 = this.recoveryData2;
            var dataDead2 = this.deadData2;

            var todayConfirm1 = this.confirmToday1;
            var todayData1 = this.dataToday1;

            var todayConfirm2 = this.confirmToday2;
            // var todayRecovery = this.recoveryToday;
            // var todayDead = this.deadToday;
            var todayData2 = this.dataToday2;


            for(var i = 0; i <todayData2.length ; i++) {
                
                let dc1 = this.confirmData1[i].value;
                let dr1 = this.recoveryData1[i].value;
                let dd1 = this.deadData1[i].value;

                let dc2 = this.confirmData2[i].value;
                let dr2 = this.recoveryData2[i].value;
                let dd2 = this.deadData2[i].value;

                let idx = this.date;


                todayConfirm1[i].value = dc1[idx+1] - dc1[idx];
                // todayRecovery[i].value = dr[idx+1] - dr[idx];
                // todayDead[i].value = dd[idx+1] - dd[idx];
                todayData1[i].confirm = dc1[idx+1] - dc1[idx];
                todayData1[i].recovery = dr1[idx+1] - dr1[idx];
                todayData1[i].dead = dd1[idx+1] - dd1[idx];


                // todayOrigin[i].value = dc[idx] - dr[idx] - dd[idx];
                todayConfirm2[i].value = dc2[idx+1] - dc2[idx];
                // todayRecovery[i].value = dr[idx+1] - dr[idx];
                // todayDead[i].value = dd[idx+1] - dd[idx];
                todayData2[i].confirm = dc2[idx+1] - dc2[idx];
                todayData2[i].recovery = dr2[idx+1] - dr2[idx];
                todayData2[i].dead = dd2[idx+1] - dd2[idx];

            }

            this.option.series[0].data = convertData(todayData1);
            this.option.series[1].data = convertData(todayData2);
            // this.option.series[1].data = convertData(todayRecovery);
            // this.option.series[2].data = convertData(todayDead);

            this.myChart.setOption(this.option);
            this.date = this.date + 1;
            if(this.date === 50)
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
