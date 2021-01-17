<template>
  <div class="Weibo">
    <h1>{{ msg }}</h1>
    <h2>作者：{{ author }}</h2>
    <div style="margin:0 50 0 50">
        <div id="main" style="width:100%;height:600px"></div>
        <div id="main2" style="width:100%;height:600px"></div>
        <div id="main3" style="width:100%;height:600px"></div>
        <div id="main4" style="width:100%;height:600px"></div>
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
// import 'echarts-wordcloud';
import 'echarts/theme/macarons.js'
// import "echarts-wordcloud/dist/echarts-wordcloud";
// import "echarts-wordcloud/dist/echarts-wordcloud.min";


import topic from '../data/topicdata.json'
import wordjson from '../data/word.json'
import xinguanjson from '../data/xinguanweibo.json'
import feidianjson from '../data/feidianweibo.json'
import bothjson from '../data/bothweibo.json'



export default {
      data() {
        return {
            mydata: [],
            msg: '微博情感分析',
            author: '李沛瑶',
            topicdata: topic,
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
                title: {
                    text: '每日用户情感倾向分布'
                },
                grid: {
                    left: '3%',
                    right: '7%',
                    bottom: '3%',
                    containLabel: true
                },
                tooltip: {
                    // trigger: 'axis',
                    showDelay: 0,
                    formatter: function (params) {
                        // if (params.value.length > 1) {
                        //     return  '评论:'+params.value[2] + ' <br/>' + '点赞:'+params.value[3]
                        //         + ' <br/>' + '评论:'+params.value[4];
                        // }
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
                    left: 'center'
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

        },
        drawTopic() {
            // 指定图表的配置项和数据
            this.option2 = {
                title: {
                    text: '每日话题热度分配',
                },
                tooltip: {
                    trigger: 'axis',
                    formatter(params){
                        var res='<div><p>时间：'+params[0].name+'</p></div>' 
                        for(var i=0;i<params.length;i++){
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
                        max: 3.5,
                        show: false,
                    }
                ],
                // series: [
                //     {
                //         name: '全国累计确诊人数',
                //         type: 'line',
                //         data: this.topicdata.data1,
                //     },
                //     {
                //         name: '话题比例',
                //         type: 'bar',
                //         stack: '话题',
                //         itemStyle: {
                //             barBorderColor: 'rgba(0,0,0,0)',
                //             color: 'rgba(0,0,0,0)'
                //         },
                //         emphasis: {
                //             itemStyle: {
                //                 barBorderColor: 'rgba(0,0,0,0)',
                //                 color: 'rgba(0,0,0,0)'
                //             }
                //         },
                //         data: this.topicdata.data1,
                //     },
                //     {
                //         name: '政治话题',
                //         type: 'bar',
                //         stack: '话题',
                //         yAxisIndex: 1,
                //         data: this.topicdata.data2,
                //     },
                //     {
                //         name: '疫情话题',
                //         type: 'bar',
                //         stack: '话题',
                //         yAxisIndex: 1,
                //         data: this.topicdata.data3,
                //     },
                //     {
                //         name: '文化娱乐话题',
                //         type: 'bar',
                //         stack: '话题',
                //         yAxisIndex: 1,
                //         data: this.topicdata.data4,
                //     },
                //     {
                //         name: '社会新闻话题',
                //         type: 'bar',
                //         stack: '话题',
                //         yAxisIndex: 1,
                //         data: this.topicdata.data5,
                //     },
                //     {
                //         name: '其他话题',
                //         type: 'bar',
                //         stack: '话题',
                //         yAxisIndex: 1,
                //         data: this.topicdata.data6,
                //     }
                // ]
                series: [
                    {
                        name: '全国累计确诊人数',
                        type: 'line',
                        data: this.topicdata.data1,
                    },
                    {
                        name: '话题比例',
                        type: 'line',
                        stack: '话题',
                        smooth: true,
                        areaStyle: {
                            opacity: 0.8,
                            color:'black'
                        },
                        itemStyle: {
                            barBorderColor: 'rgba(0,0,0,0)',
                            color: 'rgba(0,0,0,0)'
                        },
                        emphasis: {
                            itemStyle: {
                                barBorderColor: 'rgba(0,0,0,0)',
                                color: 'rgba(0,0,0,0)'
                            }
                        },
                        data: this.topicdata.data1,
                    },
                    {
                        name: '政治话题',
                        type: 'line',
                        smooth: true,
                        areaStyle: {
                            opacity: 0.3,
                            color:'blue'
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
                        areaStyle: {
                            opacity: 0.3,
                            color:'gray'
                        },
                        yAxisIndex: 1,
                        data: this.topicdata.data3,
                    },
                    {
                        name: '文化娱乐话题',
                        type: 'line',
                        stack: '话题',
                        smooth: true,
                        areaStyle: {
                            opacity: 0.3,
                            color:'green'
                        },
                        yAxisIndex: 1,
                        data: this.topicdata.data4,
                    },
                    {
                        name: '社会新闻话题',
                        type: 'line',
                        stack: '话题',
                        smooth: true,
                        areaStyle: {
                            opacity: 0.3,
                            color:'yellow'
                        },
                        yAxisIndex: 1,
                        data: this.topicdata.data5,
                    },
                    {
                        name: '其他话题',
                        type: 'line',
                        smooth: true,
                        areaStyle: {
                            opacity: 0.3,
                            color:'red'
                        },
                        stack: '话题',
                        yAxisIndex: 1,
                        data: this.topicdata.data6,
                    }
                ]
            };

            this.myChart2 = this.$echarts.init(document.getElementById('main2'),'customed');
            this.myChart2.setOption(this.option2);

            this.myChart2.on('click', function (params) {
                this.drawWords(params.dataIndex); 
            });

        },
        drawWords(i) {
            // console.log('test3');
            // this.option3={
            //     tooltip: {
            //         show: true
            //     },
            //     series: [{
            //         type: 'wordCloud',
            //         gridSize: 1,
            //         sizeRange: [10,90],
            //         rotationRange: [-45, 0, 45, 90],
            //         shape: 'circle',

            //         textStyle: {
            //             normal: {
            //                 //随机生成颜色
            //                 color: function () {
            //                     return 'rgb(' +
            //                         Math.round(Math.random() * 255) +
            //                         ', ' + Math.round(Math.random() * 255) +
            //                         ', ' + Math.round(Math.random() * 255) + ')'
            //                 }
            //             }
            //         },
            //         left: 'center',
            //         top: 'center',
            //         // width: '96%',
            //         // height: '100%',
            //         right: null,
            //         bottom: null,
            //         // width: 300,
            //         // height: 200,
            //         // top: 20,
            //         data:  this.worddata.date[i]  
            //     }]
            // };

            // var image = "data:image/png;base64,iVBORw0KGgoAAAANSU
            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"

            // var maskImage = new Image();
            // maskImage.src = image

            // console.log('test4');
            // console.log(this.worddata.date[i]);
            // this.myChart3 = this.$echarts.init(document.getElementById('main3'),'customed');
            // this.myChart3.setOption(this.option3);
            // console.log('testwordcloud');
            // console.log(this.worddata.date[i]);

        },
        drawWordcloud() {
            var list = [['foo', 12], ['bar', 6]];

            WordCloud(document.getElementById('main4'), { list: list } );
            // this.option4 = {
            //     tooltip: {},
            //     series: [ {
            //         type: 'wordCloud',
            //         gridSize: 2,
            //         sizeRange: [12, 50],
            //         rotationRange: [-90, 90],
            //         shape: 'pentagon',
            //         width: 600,
            //         height: 400,
            //         drawOutOfBound: true,
            //         textStyle: {
            //             color: function () {
            //                 return 'rgb(' + [
            //                     Math.round(Math.random() * 160),
            //                     Math.round(Math.random() * 160),
            //                     Math.round(Math.random() * 160)
            //                 ].join(',') + ')';
            //             }
            //         },
            //         emphasis: {
            //             textStyle: {
            //                 shadowBlur: 10,
            //                 shadowColor: '#333'
            //             }
            //         },
            //         data: [
            //             {
            //                 name: 'Sam S Club',
            //                 value: 10000,
            //                 textStyle: {
            //                     color: 'black'
            //                 },
            //                 emphasis: {
            //                     textStyle: {
            //                         color: 'red'
            //                     }
            //                 }
            //             },
            //             {
            //                 name: 'Macys',
            //                 value: 6181
            //             },
            //             {
            //                 name: 'Amy Schumer',
            //                 value: 4386
            //             },
            //             {
            //                 name: 'Jurassic World',
            //                 value: 4055
            //             },
            //             {
            //                 name: 'Charter Communications',
            //                 value: 2467
            //             },
            //             {
            //                 name: 'Chick Fil A',
            //                 value: 2244
            //             },
            //             {
            //                 name: 'Planet Fitness',
            //                 value: 1898
            //             },
            //             {
            //                 name: 'Pitch Perfect',
            //                 value: 1484
            //             },
            //             {
            //                 name: 'Express',
            //                 value: 1112
            //             },
            //             {
            //                 name: 'Home',
            //                 value: 965
            //             },
            //             {
            //                 name: 'Johnny Depp',
            //                 value: 847
            //             },
            //             {
            //                 name: 'Lena Dunham',
            //                 value: 582
            //             },
            //             {
            //                 name: 'Lewis Hamilton',
            //                 value: 555
            //             },
            //             {
            //                 name: 'KXAN',
            //                 value: 550
            //             },
            //             {
            //                 name: 'Mary Ellen Mark',
            //                 value: 462
            //             },
            //             {
            //                 name: 'Farrah Abraham',
            //                 value: 366
            //             },
            //             {
            //                 name: 'Rita Ora',
            //                 value: 360
            //             },
            //             {
            //                 name: 'Serena Williams',
            //                 value: 282
            //             },
            //             {
            //                 name: 'NCAA baseball tournament',
            //                 value: 273
            //             },
            //             {
            //                 name: 'Point Break',
            //                 value: 265
            //             }
            //         ]
            //     } ]
            // };
            // // this.myChart3 = this.$echarts.init(document.getElementById('main3'),'customed');
            // // this.myChart3.setOption(this.option3);
            // this.myChart4 = this.$echarts.init(document.getElementById('main4'));
            // this.myChart4.setOption(this.option4);

        }
        
    },
}
</script>

<style scoped>
h1, h2 {
  font-weight: normal;
}
</style>
