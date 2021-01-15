<template>
  <div class="Weibo">
    <h1>{{ msg }}</h1>
    <h2>作者：{{ author }}</h2>
    <div style="margin:0 50 0 50">
        <div id="main" style="width:100%;height:600px"></div>
    </div>
  </div>
</template>


<script>
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
import dataw from './datawomen.json';
import datam from './dataman.json';
import data0 from './疫情.json';

export default {
      data() {
        return {
            mydata: [],
            msg: '微博情感分析',
            author: '李沛瑶',
            datawomen: dataw,
            dataman: datam,    
        }    
    },
    mounted() {
        let _this = this
        _this.init()
        _this.drawScatter()
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
                        if (params.value.length > 1) {
                            return '用户:'+params.value[3] + ' <br/>'
                            + '评论:'+params.value[2] 
                        }
                        // else {
                        //     return params.seriesName + ' :<br/>'
                        //     + params.name + ' : '
                        //     + params.value + 'kg ';
                        // }
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
                    data: ['女性', '男性','疫情'],
                    left: 'center'
                },
                xAxis: [
                    {
                        name: "时间",
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
                        name: '女性',
                        type: 'scatter',
                        markArea: {
                            silent: true,
                            itemStyle: {
                                color: 'transparent',
                                borderWidth: 1,
                                borderType: 'dashed'
                            },
                            data: [[{
                                name: '女性分布区间',
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
                                { xAxis: 160 }
                            ]
                        },
                        data: this.datawomen
                    },
                    {
                        name: '男性',
                        type: 'scatter',
                        markArea: {
                            silent: true,
                            itemStyle: {
                                color: 'transparent',
                                borderWidth: 1,
                                borderType: 'dashed'
                            },
                            data: [[{
                                name: '男性分布区间',
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
                        data: this.dataman
                    },
                    {
                        name: '疫情',
                        type: 'scatter',
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
                        data: this.data0
                    }              

                ]
            };
                        // 基于准备好的dom，初始化echarts实例
            this.myChart = this.$echarts.init(document.getElementById('main'),'customed');

            this.myChart.setOption(this.option);

        },
        
    },
}
</script>

<style scoped>
h1, h2 {
  font-weight: normal;
}
</style>
