<template>
  <div class="Weibo">
    <h1>{{ msg }}</h1>
    <h2>作者：{{ author }}</h2>
    <div style="margin:0 50 0 50">
        <div id="main" style="width:100%;height:600px"></div>
        <div id="main2" style="width:100%;height:600px"></div>
        <div id="main3" style="width:100%;height:600px"></div>
    </div>
  </div>
</template>


<script>
import * as d3 from 'd3'
import * as echarts from 'echarts'
// import echarts from 'echarts/lib/echarts';
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
import 'echarts-wordcloud';
import 'echarts/theme/macarons.js'


import dataw from './datawomen.json';
import datam from './dataman.json';
import data0 from './疫情3.json';
import data1 from './新冠2.json';
import topic from './topicdata.json'
import wordjson from './word.json'


export default {
      data() {
        return {
            mydata: [],
            msg: '微博情感分析',
            author: '李沛瑶',
            datawomen: dataw,
            dataman: datam,   
            datayiqing: data0, 
            dataxinguan: data1,
            topicdata: topic,
            worddata:wordjson
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
                        dataZoom: {},
                        brush: {
                            type: ['rect', 'polygon', 'clear']
                        }
                    }
                },
                brush: {
                },
                legend: {
                    data: ['疫情', '新冠'],
                    left: 'center'
                },
                xAxis: [
                    {
                        data: this.datayiqing.map(function(item){
                            return item[0];
                        })
                        // name: "时间",
                        // type: 'value',
                        // scale: true,
                        // axisLabel: {
                        //     formatter: '{value} '
                        // },
                        // splitLine: {
                        //     show: false
                        // }
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
                dataZoom:[{
                    startValue:'2020-01-09'
                },{
                    type:'inside'
                }
                ],

                series: [
                    // {
                    //     name: '女性',
                    //     type: 'scatter',
                    //     markArea: {
                    //         silent: true,
                    //         itemStyle: {
                    //             color: 'transparent',
                    //             borderWidth: 1,
                    //             borderType: 'dashed'
                    //         },
                    //         data: [[{
                    //             name: '女性分布区间',
                    //             xAxis: 'min',
                    //             yAxis: 'min'
                    //         }, {
                    //             xAxis: 'max',
                    //             yAxis: 'max'
                    //         }]]
                    //     },
                    //     markPoint: {
                    //         data: [
                    //             {type: 'max', name: '最大值'},
                    //             {type: 'min', name: '最小值'}
                    //         ]
                    //     },
                    //     markLine: {
                    //         lineStyle: {
                    //             type: 'solid'
                    //         },
                    //         data: [
                    //             {type: 'average', name: '平均值'},
                    //             { xAxis: 160 }
                    //         ]
                    //     },
                    //     data: this.datawomen
                    // },
                    // {
                    //     name: '男性',
                    //     type: 'scatter',
                    //     markArea: {
                    //         silent: true,
                    //         itemStyle: {
                    //             color: 'transparent',
                    //             borderWidth: 1,
                    //             borderType: 'dashed'
                    //         },
                    //         data: [[{
                    //             name: '男性分布区间',
                    //             xAxis: 'min',
                    //             yAxis: 'min'
                    //         }, {
                    //             xAxis: 'max',
                    //             yAxis: 'max'
                    //         }]]
                    //     },
                    //     markPoint: {
                    //         data: [
                    //             {type: 'max', name: '最大值'},
                    //             {type: 'min', name: '最小值'}
                    //         ]
                    //     },
                    //     markLine: {
                    //         lineStyle: {
                    //             type: 'solid'
                    //         },
                    //         data: [
                    //             {type: 'average', name: '平均值'},
                    //             { xAxis: 170 }
                    //         ]
                    //     },
                    //     data: this.dataman
                    // },
                    {
                        name: '疫情',
                        type: 'scatter',
                        symbolSize: function (val) {
                            // console.log(val[3]);
                            return Math.log(parseInt(val[3])) + 5;
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
                                { xAxis: 170 }
                            ]
                        },
                        data: this.datayiqing
                    },
                    {
                        name: '新冠',
                        type: 'scatter',
                        symbolSize: function (val) {
                            // console.log(val[3]);
                            return Math.log(parseInt(val[3]))/Math.log(2) + 5;
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
                                { xAxis: 170 }
                            ]
                        },
                        data: this.dataxinguan
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
                                console.log('testlist');
                                console.log(list);
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
                series: [
                    {
                        name: '全国累计确诊人数',
                        type: 'line',
                        data: this.topicdata.data1,
                    },
                    {
                        name: '话题比例',
                        type: 'bar',
                        stack: '话题',
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
                        type: 'bar',
                        stack: '话题',
                        yAxisIndex: 1,
                        data: this.topicdata.data2,
                    },
                    {
                        name: '疫情话题',
                        type: 'bar',
                        stack: '话题',
                        yAxisIndex: 1,
                        data: this.topicdata.data3,
                    },
                    {
                        name: '文化娱乐话题',
                        type: 'bar',
                        stack: '话题',
                        yAxisIndex: 1,
                        data: this.topicdata.data4,
                    },
                    {
                        name: '社会新闻话题',
                        type: 'bar',
                        stack: '话题',
                        yAxisIndex: 1,
                        data: this.topicdata.data5,
                    },
                    {
                        name: '其他话题',
                        type: 'bar',
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
            console.log('test3');
            this.option3={
                tooltip: {
                    show: true
                },
                series: [{
                    type: 'wordCloud',
                    gridSize: 1,
                    sizeRange: [10,90],
                    rotationRange: [-45, 0, 45, 90],
                    shape: 'circle',

                    textStyle: {
                        normal: {
                            //随机生成颜色
                            color: function () {
                                return 'rgb(' +
                                    Math.round(Math.random() * 255) +
                                    ', ' + Math.round(Math.random() * 255) +
                                    ', ' + Math.round(Math.random() * 255) + ')'
                            }
                        }
                    },
                    left: 'center',
                    top: 'center',
                    // width: '96%',
                    // height: '100%',
                    right: null,
                    bottom: null,
                    // width: 300,
                    // height: 200,
                    // top: 20,
                    data:  this.worddata.date[i]  
                }]
            };
            console.log('test4');
            this.myChart3 = this.$echarts.init(document.getElementById('main3'),'customed');
            this.myChart3.setOption(this.option3);
            console.log('testwordcloud');
            console.log(this.worddata.date[i]);

        }
        
    },
}
</script>

<style scoped>
h1, h2 {
  font-weight: normal;
}
</style>
