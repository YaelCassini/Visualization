<template>
  <div class="Weibo">
    <h1> 微博话题情感分析</h1>
    <div style="margin:0 20 0 20">
        <div id="main" style="width:85%;height:600px;margin:0 auto;"></div>
    </div>
  </div>
</template>

 
<script>
/* eslint-disable */
import * as d3 from 'd3'
import echarts from 'echarts/lib/echarts';
import 'echarts/map/js/china.js';
// 散点图
import 'echarts/lib/chart/scatter';
import 'echarts/lib/chart/effectScatter';
// 图例
import 'echarts/lib/component/legend';
// 提示框
import 'echarts/lib/component/tooltip';
// 地图geo
import 'echarts/lib/component/geo';
import 'echarts/theme/macarons.js'


import wordjson from '../data/word.json'
import xinguanjson from '../data/xinguanweibo.json'
import feidianjson from '../data/feidianweibo.json'
import bothjson from '../data/bothweibo.json'



export default {
      data() {
        return {
            mydata: [],
            worddata:wordjson,
            dataxinguan: xinguanjson,
            datafeidian: feidianjson,
            databoth: bothjson,      
        }    
    },
    mounted() {
        let _this = this
        _this.init()
        _this.drawScatter()
        _this.drawTopic()
        console.log('testfirst');
        _this.drawWords(51)
        console.log('test2');
        _this.drawWordcloud();
    },
    methods:{
        init () {
            this.date = 0;
        },

        drawScatter() {
            this.option = {
                grid: {
                    left: '3%',
                    right: '7%',
                    bottom: '3%',
                    containLabel: true
                },
                tooltip: {
                    showDelay: 0,
                    formatter: function (params) {
                        var resultstr = '';
                        var newParamsName ='';
                        var title = '';
                        var titleLength = params.value[2].length;
                        var rowCount = 20;
                        var rowNumber = Math.ceil(titleLength / rowCount);
                        if(titleLength>rowCount){
                        　　for (var i = 0; i < rowNumber; i++) {
                            var tempStr = "";
                            var start = i * rowCount;
                            var end = start + rowCount;
                            if (i == rowNumber - 1) {
                                tempStr = params.value[2].substring(start, titleLength);
                            } else {
                                tempStr = params.value[2].substring(start, end) + "</br>";
                            }
                            resultstr += tempStr;
                            }
                　　    }
                        else {
                　　        resultstr = params.value[2];
                　　    }
                        return  resultstr + ' <br/>' + '点赞:'+params.value[3]
                                + ' <br/>' + '评论:'+params.value[4];
                    },
                    axisPointer: {
                        show: true,
                        type: 'cross',
                        lineStyle: {
                            type: 'dashed',
                            width: 1
                        }
                    }
                },
                toolbox: {
                    feature: {
                        // dataZoom: {},
                        brush: {
                            type: ['rect', 'polygon', 'clear']
                        }
                    }
                },
                brush: {
                },
                legend: {
                    data: ['两者兼有','新冠','非典'],
                    left: 'left'
                },
                xAxis: [
                    {
                        data: this.dataxinguan.map(function(item){
                            return item[0];
                        }),
                        name: "随机正态分布",
                        type: 'value',
                        scale: true,
                        axisLabel: {
                            formatter: '{value} '
                        },
                        splitLine: {
                            // show: false
                        },
                        show: false
                    },
                    {
                        data: ["不限定话题","春运", "高考", "工作", "放假"],
                        name: '话题',
                        // show: false
                    }
                ],
                yAxis: [
                    {
                        name: "正向情绪程度",
                        type: 'value',
                        scale: true,
                        axisLabel: {
                            formatter: '{value} '
                        },
                        splitLine: {
                            show: false
                        }
                    }
                ],

                series: [
                    {
                        name: '两者兼有',
                        type: 'scatter',
                        symbolSize: function (val) {
                            // console.log(val[3]);
                            return Math.log(parseInt(val[3]))/Math.log(1.5) + 5;
                        },
                        markArea: {
                            silent: true,
                            itemStyle: {
                                color: 'transparent',
                                borderWidth: 1,
                                borderType: 'dashed'
                            },
                            data: [[{
                                name: '疫情讨论',
                                xAxis: 'min',
                                yAxis: 'min'
                            }, {
                                xAxis: 'max',
                                yAxis: 'max'
                            }]]
                        },
                        markPoint: {
                            data: [
                                {type: 'max', name: '最大值'},
                                {type: 'min', name: '最小值'}
                            ]
                        },
                        markLine: {
                            symbol:"none", 
                            lineStyle: {
                                type: 'solid'
                            },
                            data: [
                                { type: 'average', name: '平均值'},
                                { xAxis: 10 },
                                { xAxis: 20 },
                                { xAxis: 30 },
                                { xAxis: 40 },
                            ]
                        },
                        color: this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: 'rgba(128, 255, 165)'
                        }, {
                            offset: 1,
                            color: 'rgba(1, 191, 236)'
                        }]),
                        data: this.databoth
                    },
                    {
                        name: '新冠',
                        type: 'scatter',
                        symbolSize: function (val) {
                            return Math.log(parseInt(val[3]))/Math.log(1.5) + 5;
                        },
                        markArea: {
                            silent: true,
                            itemStyle: {
                                color: 'transparent',
                                borderWidth: 1,
                                borderType: 'dashed'
                            },
                            data: [[{
                                name: '疫情讨论',
                                xAxis: 'min',
                                yAxis: 'min'
                            }, {
                                xAxis: 'max',
                                yAxis: 'max'
                            }]]
                        },
                        markPoint: {
                            data: [
                                {type: 'max', name: '最大值'},
                                {type: 'min', name: '最小值'}
                            ]
                        },
                        markLine: {
                            lineStyle: {
                                type: 'solid'
                            },
                            data: [
                                {type: 'average', name: '平均值'},
                            ]
                        },
                        data: this.dataxinguan
                    },
                    {
                        name: '非典',
                        type: 'scatter',
                        symbolSize: function (val) {
                            // console.log(val[3]);
                            return Math.log(parseInt(val[3]))/Math.log(1.5) + 5;
                        },
                        markArea: {
                            silent: true,
                            itemStyle: {
                                color: 'transparent',
                                borderWidth: 1,
                                borderType: 'dashed'
                            },
                            data: [[{
                                name: '疫情讨论',
                                xAxis: 'min',
                                yAxis: 'min'
                            }, {
                                xAxis: 'max',
                                yAxis: 'max'
                            }]]
                        },
                        markPoint: {
                            data: [
                                {type: 'max', name: '最大值'},
                                {type: 'min', name: '最小值'}
                            ]
                        },
                        markLine: {
                            lineStyle: {
                                type: 'solid'
                            },
                            data: [
                                {type: 'average', name: '平均值'},
                            ]
                        },
                        data: this.datafeidian
                    }                     

                ]
            };
                        // 基于准备好的dom，初始化echarts实例
            this.myChart = this.$echarts.init(document.getElementById('main'),'customed');

            this.myChart.setOption(this.option);

        }
        
    },
}
</script>

<style scoped>
h1, h2 {
  color: #0091FF;
  font-size:48;
  font-weight:bolder;
}
</style>
