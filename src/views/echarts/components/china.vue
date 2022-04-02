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
  console.log(res)

  // 基于准备好的dom，初始化echarts实例
  const myChart = echarts.init(chart.value)
  echarts.registerMap('china', mapData.value)

  // 指定图表的配置项和数据
  const option = {
    title: {
      text: '中国地图'
    },
    series: [
      {
        type: 'map',
        map: 'china',
        label: {
          show: true, // 是否显示标签
          fontSize: 10, // 字体大小
          color: '#fff' // 字体颜色
        },
        itemStyle: {
          // 图形样式
          borderColor: '#19bbee', // 边框颜色
          areaColor: '#219edb' // 填充颜色
        },
        zoom: 1.2, // 缩放：地图缩放1.2倍
        data: [
          { name: '北京市', value: 5000 },
          { name: '海南省', value: 2000 },
          { name: '甘肃省', value: 3000 },
          { name: '青海省', value: 500 },
          { name: '四川省', value: 900 }
        ]
      }
    ],
    visualMap: {
      // 数据分段视觉展示效果
      min: 1,
      max: 5000,
      text: ['High', 'Low'],
      realtime: false,
      calculable: true,
      inRange: {
        color: ['lightskyblue', 'yellow', 'orangered']
      }
    }
  }

  // 使用刚指定的配置项和数据显示图表。
  myChart.setOption(option)
}
</script>
<style lang="scss" scoped></style>
