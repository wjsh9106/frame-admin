<template>
  <!-- 为 ECharts 准备一个定义了宽高的 DOM -->
  <div ref="chart" style="width: 100%; height: 400px"></div>
</template>

<script setup>
import { ref, onMounted, defineProps } from 'vue'
import * as echarts from 'echarts'

const props = defineProps({
  chartType: {
    type: String,
    default: 'bar'
  },
  chartData: {
    type: Array
  }
})

const chart = ref()

onMounted(() => {
  init()
})

function init() {
  // 基于准备好的dom，初始化echarts实例
  const myChart = echarts.init(chart.value)

  // 指定图表的配置项和数据
  const option = {
    title: {
      text: 'ECharts 入门示例'
    },
    tooltip: {},
    legend: {
      data: ['销量']
    },
    xAxis: {
      data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
    },
    yAxis: {},
    series: [
      {
        name: '销量',
        type: props.chartType,
        data: props.chartData
      }
    ]
  }

  // 使用刚指定的配置项和数据显示图表。
  myChart.setOption(option)
}
</script>
<style lang="scss" scoped></style>
