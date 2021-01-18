<template>
  <div class="Weibo">
      <h1 style="font-size: 48px; font-weight: bold; color:#0091FF; height:60px; padding: 60px 0px 40px 0px; margin:0px"> Daily Topic Hotness Distribution</h1>
    <div style="margin:0 50 0 50">
        <div id="main" style="width:85%;height:580px;margin:0 auto;"></div>
    </div>
  </div>
</template>

 
<script>
/* eslint-disable */
import * as d3 from 'd3'
import echarts from 'echarts/lib/echarts';
import 'echarts/map/js/china.js';
// 图例
import 'echarts/lib/component/legend';
// 提示框
import 'echarts/lib/component/tooltip';
// 地图geo
import 'echarts/lib/component/geo';
import 'echarts/theme/macarons.js'

import topic from '../data/topicdata.json'
export default {
      data() {
        return {
            mydata: [],
            topicdata: topic,
        }    
    },
    mounted() {
        let _this = this
        _this.init()
        _this.drawTopic()
    },
    methods:{
        init () {
            this.date = 0;
        },
        drawTopic() {
            var tmp = JSON.parse(JSON.stringify(this.topicdata.data1));
            for (var i = 0; i < this.topicdata.data1.length; i++) {
                tmp[i] /= 30000;
            }
            // 指定图表的配置项和数据
            this.option = {
                // 这个color改的是图例的颜色（要跟后面series的颜色相同），阿凉麻烦帮忙改下！
                color:['#57B5FB','#57B5FB','#57B5FB','#9AA7EF','#BEA3E1','#DC96B5','#FD8A89','#57B5FB'],
                tooltip: {
                    trigger: 'axis',
                    formatter(params){
                        var res='<div><p>时间：'+params[0].name+'</p></div>' 
                        
                        for(var i=0;i<params.length;i++){
                            // if (i === 1){
                            //     if (params[i].data != 0){
                            //         res+='<p>'+params[i].marker+'微博事件热度：'+params[i].data+'</p>'
                            //     }
                            // }
                            if (i!=1){
                                res+='<p>'+params[i].marker+params[i].seriesName+'：'+params[i].data+'</p>'
                            }
                        }
                        return res;
                    }
                },
                legend: {
                    data: ['话题比例','政治话题', '疫情话题','文化娱乐话题','社会新闻话题','其他话题','全国累计确诊人数'],
                    right: 0
                },
                grid: {
                    left: '3%',
                    right: '3%',
                    bottom: '3%',
                    containLabel: true
                },
                dataZoom:[
                    {
                    type:"inside",         //缩放
                    minValueSpan: 30,
                    }
                ],

                xAxis: [
                    {
                        type: 'category',
                        data: function () {
                                var list = [];
                                for (var i = 1; i <= 31; i++) {
                                    list.push('12月' + i + '日');
                                }
                                for (var i = 1; i <= 31; i++) {
                                    list.push('1月' + i + '日');
                                }
                                console.log(list);
                                    for (var i = 1; i <= 29; i++) {
                                        list.push('2月' + i + '日');
                                    }
                                    for (var i = 1; i <= 31; i++) {
                                        list.push('3月' + i + '日');
                                    }
                                    for (var i = 1; i <= 10; i++) {
                                        list.push('4月' + i + '日');
                                    }
                                    return list;
                                }()
                    }
                ],
                yAxis: [
                    {
                        type: 'value',
                        name: '全国累计确诊人数',
                        max: 120000
                    },
                    {
                        type: 'value',
                        min: 0,
                        max: 4,
                        show: false,
                    }
                ],
                series: [
                    {
                        name: '全国累计确诊人数',
                        type: 'line',
                        yAxisIndex: 0,
                        stack: '人数',
                        data: this.topicdata.data1,
                        markLine : {
							symbol:"none",               //去掉警戒线最后面的箭头
                            lineStyle:{               //警戒线的样式  ，虚实  颜色
                                    type:"solid",
									color:"#F1EBE9", //阿凉改下警戒线颜色，蟹蟹！
                            },
                            silent:false, //鼠标悬停事件  true没有，false有
                            data:[
                                {
                                    name:'事件1',
                                    label:{
                                        show:true,
                                        position:"end",
                                        formatter:"火神山医院"
                                    },
                                    xAxis:58
                                },
                                {
                                    name:'事件2',
                                    label:{
                                        show:true,
                                        position:"end",
                                        formatter:"钟南山赴武汉"
                                    },
                                    xAxis:49
                                },
                                {
                                    name:'事件3',
                                    label:{
                                        show:true,
                                        position:"end",
                                        formatter:"李文亮去世"
                                    },
                                    xAxis:68
                                },
                                {
                                    name:'事件4',
                                    label:{
                                        show:true,
                                        position:"end",
                                        formatter:"美国 新冠"
                                    },
                                    xAxis:87
                                },
                                {
                                    name:'事件5',
                                    label:{
                                        show:true,
                                        position:"end",
                                        formatter:"中国0新增"
                                    },
                                    xAxis:106
                                },
                                {
                                    name:'事件5',
                                    label:{
                                        show:true,
                                        position:"end",
                                        formatter:"无症状感染者"
                                    },
                                    xAxis:119
                                },
                            ]
                        }
                    },
                    
                    {
                        name: 'helper',
                        type: 'line',
                        yAxisIndex: 1,
                        stack: '话题',
                        data: tmp,
                    },
                    {
                        name: '政治话题',
                        type: 'line',
                        smooth: true,
                        lineStyle: {
                            width: 0
                        },
                        showSymbol: false,
                        areaStyle: {
                            opacity: 0.8,
                            color: '#57B5FB' //阿凉帮忙改下颜色，蟹蟹！
                        },
                        emphasis: {
                            focus: 'series'
                        },
                        stack: '话题',
                        yAxisIndex: 1,
                        data: this.topicdata.data2,
                    },
                    {
                        name: '疫情话题',
                        type: 'line',
                        stack: '话题',
                        smooth: true,
                        lineStyle: {
                            width: 0
                        },
                        showSymbol: false,
                        areaStyle: {
                            opacity: 0.8,
                            color: '#9AA7EF' //阿凉帮忙改下颜色，蟹蟹！
                        },
                        emphasis: {
                            focus: 'series'
                        },
                        yAxisIndex: 1,
                        data: this.topicdata.data3,
                    },
                    {
                        name: '文化娱乐话题',
                        type: 'line',
                        stack: '话题',
                        smooth: true,
                        lineStyle: {
                            width: 0
                        },
                        showSymbol: false,
                        areaStyle: {
                            opacity: 0.8,
                            color: '#BEA3E1' //阿凉帮忙改下颜色，蟹蟹！
                        },
                        emphasis: {
                            focus: 'series'
                        },
                        yAxisIndex: 1,
                        data: this.topicdata.data4,
                    },
                    {
                        name: '社会新闻话题',
                        type: 'line',
                        stack: '话题',
                        smooth: true,
                        lineStyle: {
                            width: 0
                        },
                        showSymbol: false,
                        areaStyle: {
                            opacity: 0.8,
                            color: '#DC96B5'  //阿凉帮忙改下颜色，蟹蟹！
                        },
                        emphasis: {
                            focus: 'series'
                        },
                        yAxisIndex: 1,
                        data: this.topicdata.data5,
                    },
                    {
                        name: '其他话题',
                        type: 'line',
                        smooth: true,
                        lineStyle: {
                            width: 0
                        },
                        showSymbol: false,
                        areaStyle: {
                            opacity: 0.8,
                            color: '#FD8A89' //阿凉帮忙改下颜色，蟹蟹！
                        },
                        emphasis: {
                            focus: 'series'
                        },
                        stack: '话题',
                        yAxisIndex: 1,
                        data: this.topicdata.data6,
                    }
                ]
            };
            this.myChart = this.$echarts.init(document.getElementById('main'),'customed');
            this.myChart.setOption(this.option);
        },
        
    },
}
</script>

<style scoped>
h1, h2 {
  /* font-weight: normal;
  color:black; */
  color: #0091FF;
  font-size:48;
  font-weight:bolder;
}
</style>
