<template>
  <div class="ChinaMap">
    <h1 style="font-size: 48px; font-weight: bold; color:#0091FF; height:60px; padding: 60px 0px 40px 0px; margin:0px">{{ msg }}</h1>
    <!-- <h2>作者：{{ author }}</h2>  -->
    <div style="margin:0 50 0 50; display: flex; flex-direction: row; justify-content: space-around;">
        <div id="main-left" style="width: 600px; height: 580px;"></div>
        <div id="center-link" style="width:200px; height:580px;"></div>
        <div id="main-right" style="width: 600px; height: 580px;"></div>
    </div>
  </div>
</template>

<script>
import * as d3 from 'd3'
import covconfirm from '../data/confirmData1.json'
import covrecovery from '../data/recoveryData1.json'
import covdead from '../data/deadData1.json'
import sarsconfirm from '../data/confirmData2.json'
import sarsrecovery from '../data/recoveryData2.json'
import sarsdead from '../data/deadData2.json'
export default {
  name: 'order',
  data () {
    return {
      msg: 'Regional Growth Ranking',
      covconfirmData:covconfirm,
      covrecoveryData:covrecovery,
      covdeadData:covdead,
      sarsconfirmData:sarsconfirm,
      sarsrecoveryData:sarsrecovery,
      sarsdeadData:sarsdead,
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
            text: 'SARS Data',
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
                text: 'Covid Data',
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
                data: ['北京', '香港', '上海', '四川', '河北', '甘肃', '陕西', '辽宁', '广东', '台湾', '福建', '重庆', '浙江', '江苏', '天津', '云南', '澳门', '湖北', '河南', '湖南', '安徽', '黑龙江', '江西','山东','广西','内蒙古','山西','海南','吉林','贵州','新疆','宁夏','青海','西藏']
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
                    color:"#BEA3E1",
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
                    color:'#DC96B5',
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
            let pc = this.covconfirmData[i].value // 该省所有天数的确诊数据
            let pr = this.covrecoveryData[i].value
            let pd = this.covdeadData[i].value
            let pcl = this.sarsconfirmData[i].value // 该省所有天数的确诊数据
            let prl = this.sarsrecoveryData[i].value
            let pdl = this.sarsdeadData[i].value
            dataconfirmRight[i] = pc[this.j] - pr[this.j] - pd[this.j]
            datarecoveryRight[i] = pr[this.j]
            datadeadRight[i] = pd[this.j]

            dataconfirmLeft[i] = pcl[this.j] - prl[this.j] - pdl[this.j]
            datarecoveryLeft[i] = prl[this.j]
            datadeadLeft[i] = pdl[this.j]
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

                    tmp = this.sarsconfirmData[i]
                    this.sarsconfirmData[i] = this.sarsconfirmData[k]
                    this.sarsconfirmData[k] = tmp

                    tmp = this.sarsrecoveryData[i]
                    this.sarsrecoveryData[i] = this.sarsrecoveryData[k]
                    this.sarsrecoveryData[k] = tmp

                    tmp = this.sarsdeadData[i]
                    this.sarsdeadData[i] = this.sarsdeadData[k]
                    this.sarsdeadData[k] = tmp
                }
            }
        }

        // 按dataconfirmLeft排序(右)
        for (let i = 0; i < dataconfirmRight.length; i++) {
            for (let k = i + 1; k < dataconfirmRight.length; k++) {
                if (dataconfirmRight[i] < dataconfirmRight[k]) {
                    tmp = dataconfirmRight[i]
                    dataconfirmRight[i] = dataconfirmRight[k]
                    dataconfirmRight[k] = tmp
                    tmp = datarecoveryRight[i]
                    datarecoveryRight[i] = datarecoveryRight[k]
                    datarecoveryRight[k] = tmp
                    tmp = datadeadRight[i]
                    datadeadRight[i] = datadeadRight[k]
                    datadeadRight[k] = tmp
                    tmp = this.optionRight.yAxis.data[i]
                    this.optionRight.yAxis.data[i] = this.optionRight.yAxis.data[k]
                    this.optionRight.yAxis.data[k] = tmp

                    tmp = this.covconfirmData[i]
                    this.covconfirmData[i] = this.covconfirmData[k]
                    this.covconfirmData[k] = tmp

                    tmp = this.covrecoveryData[i]
                    this.covrecoveryData[i] = this.covrecoveryData[k]
                    this.covrecoveryData[k] = tmp

                    tmp = this.covdeadData[i]
                    this.covdeadData[i] = this.covdeadData[k]
                    this.covdeadData[k] = tmp
                }
            }
        }
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
        const colorlist=['#7c1823','#c02c38','#c45a65','#f0a1a8','#fb8b05','#f9a633','#feba07','#f8df72','#c6dfc8','#9eccab','#66c18c','#6e8b74','#1a6840','#5698c3','#a7a8bd','#3b818c','#0f95b0','#63bbd0','#51c4d3','#b0d5df']
        // const colorlist=['#F1EBE8','#F2E9DF','#F2E8D8','#F4E7D2','#F5E5C3','#F5E4BD','#F6E2B6','#F7E2B0','#F7E0A8','#F8DFA2','#FADF9B','#FADE95','#FADC8E','#FBDB87','#FCDA7F','#FCD979','#FDD771','#FED76B','#FFD562','#FFD254','#FFD154']
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
                .attr('stroke-opacity', 0.6)
                .attr('stroke-width', 6)
        })
        this.chartLeft.setOption(this.optionLeft)
        this.chartRight.setOption(this.optionRight)
        this.j = this.j + 1
        if (this.j === 51) {
            this.j = 0
        }
      }
    }
}
</script>

<style scoped>
h1, h2 {
  color: black;
  font-size:48;
  font-weight:bolder;
}
</style>
