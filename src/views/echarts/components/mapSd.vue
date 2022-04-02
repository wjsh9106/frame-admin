<template>
  <!-- 为 ECharts 准备一个定义了宽高的 DOM -->
  <div ref="chart" style="width: 100%; height: 600px"></div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'
import { getChinaJson } from '@/api/map'

const chart = ref()
const mapData = ref()

onMounted(() => {
  init()
})

const init = async () => {
  const res = await getChinaJson()
  mapData.value = res
  // console.log(res)

  // 基于准备好的dom，初始化echarts实例
  const myChart = echarts.init(chart.value)
  echarts.registerMap('china', mapData.value)

  // 指定图表的配置项和数据
  const option = {
    backgroundColor: '#272D3A',
    // 标题
    title: {
      text: '中国地图',
      left: 'center',
      textStyle: {
        color: '#fff'
      }
    },
    // 地图上圆点的提示
    tooltip: {
      trigger: 'item',
      formatter: function (params) {
        return params.name + ' : ' + params.value[2]
      }
    },
    // 图例按钮 点击可选择哪些不显示
    legend: {
      orient: 'vertical',
      left: 'left',
      top: 'bottom',
      data: ['地区热度', '人口密度'],
      textStyle: {
        color: '#fff'
      }
    },
    // 地理坐标系组件
    geo: {
      map: 'china',
      label: {
        // true会显示城市名
        emphasis: {
          show: false
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
          areaColor: '#8796B4'
        }
      },
      zoom: 1.2 // 缩放：地图缩放1.2倍
    },
    // 系列列表
    series: [
      {
        name: '地区热度',
        // 表的类型 这里是散点
        type: 'scatter',
        // 使用地理坐标系，通过 geoIndex 指定相应的地理坐标系组件
        coordinateSystem: 'geo',
        data: [
          { name: '黑龙江省', value: [126.642464, 45.756967, 5000] },
          { name: '上海市', value: [121.472644, 31.231706, 2000] },
          { name: '江苏省', value: [118.767413, 32.041544, 3000] }
        ],
        // 标记的大小
        symbolSize: 12,
        // 鼠标悬浮的时候在圆点上显示数值
        label: {
          normal: {
            show: false
          },
          emphasis: {
            show: false
          }
        },
        itemStyle: {
          normal: {
            color: '#ddb926'
          },
          // 鼠标悬浮的时候圆点样式变化
          emphasis: {
            borderColor: '#fff',
            borderWidth: 5
          }
        }
      },
      {
        name: '人口密度',
        // 表的类型 这里是散点
        type: 'effectScatter',
        // 使用地理坐标系，通过 geoIndex 指定相应的地理坐标系组件
        coordinateSystem: 'geo',
        data: [
          { name: '北京市', value: [116.405285, 39.904989, 5000] },
          { name: '天津市', value: [117.190182, 39.125596, 2000] },
          { name: '山西省', value: [112.549248, 37.857014, 3000] },
          { name: '内蒙古自治区', value: [111.670801, 40.818311, 500] },
          { name: '吉林省', value: [125.3245, 43.886841, 900] }
        ],
        // 标记的大小
        symbolSize: 12,
        showEffectOn: 'render',
        rippleEffect: {
          brushType: 'stroke'
        },
        hoverAnimation: true,
        label: {
          formatter: function (params) {
            return params.name + ' : ' + params.value[2]
          },
          show: true, // 是否显示标签
          position: 'right',
          fontSize: 10, // 字体大小
          color: '#fff' // 字体颜色
        },
        itemStyle: {
          normal: {
            color: '#f4e925',
            shadowBlur: 10,
            shadowColor: '#333'
          }
        },
        zlevel: 1
      }
    ]
  }

  // 使用刚指定的配置项和数据显示图表。
  myChart.setOption(option)
}
</script>
<style lang="scss" scoped></style>
