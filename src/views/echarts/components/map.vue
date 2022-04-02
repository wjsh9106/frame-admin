<template>
  <el-button @click="back">返回</el-button>
  <!-- 为 ECharts 准备一个定义了宽高的 DOM -->
  <div ref="chart" style="width: 100%; height: 600px"></div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'
import {
  getChinaJson,
  getProvinceJson,
  getCityJson,
  getDistrictJson
} from '@/api/map'

const chart = ref()
const mapData = ref()
// 点击地图时push，点返回时pop
const deepTree = []
let myChart = null
// 当前地图上的区域信息
let mapDataList = []
// 当前地图基本信息
const currentInfo = ref({
  areaName: 'china',
  areaCode: '',
  areaLevel: ''
})

onMounted(() => {
  // 基于准备好的dom，初始化echarts实例
  myChart = echarts.init(chart.value)
  init()
})

const init = async () => {
  const res = await getChinaJson()
  mapData.value = res

  // 监听点击事件，递归实现下钻功能
  myChart.on('click', async (params) => {
    currentInfo.value.areaName = params.name
    currentInfo.value.areaCode = params.data.adcode
    currentInfo.value.areaLevel = params.data.level

    if (params.data.level === 'country') {
      mapData.value = await getChinaJson()
    } else if (params.data.level === 'province') {
      mapData.value = await getProvinceJson(params.data.adcode)
    } else if (params.data.level === 'city') {
      mapData.value = await getCityJson(params.data.adcode)
    } else if (params.data.level === 'district' && mapDataList.length > 1) {
      mapData.value = await getDistrictJson(params.data.adcode)
    } else {
      return false
    }
    setJsonData(mapData.value, params)
  })

  setJsonData(res)
}

// 设置数据
const setJsonData = (res, params) => {
  const dataList = []
  for (let i = 0; i < res.features.length; i++) {
    const obj = {
      ...res.features[i].properties,
      value: Math.round(Math.random() * 5000)
    }
    dataList.unshift(obj)
  }
  mapDataList = dataList
  setMapData(res, params)
}

// 设置地图信息
const setMapData = (res, params) => {
  if (currentInfo.value.areaName === 'china') {
    deepTree.push({
      mapDataList: mapDataList,
      params: { name: 'china', level: 'country', adcode: '100000' }
    })
    // 注册地图
    echarts.registerMap('china', res)
    // 绘制地图
    renderMap('china', mapDataList)
  } else {
    deepTree.push({ mapDataList: mapDataList, params: params })
    echarts.registerMap(params.name, res)
    renderMap(params.name, mapDataList)
  }
}

// 渲染地图
const renderMap = (map, data) => {
  let dataList = data.map((item) => {
    return {
      name: item.name,
      value: item.value
    }
  })
  dataList = dataList.sort(function (a, b) {
    return b.value - a.value
  })
  const pointData = []
  for (let i = 0; i < data.length; i++) {
    if (data[i].value !== 0) {
      pointData.push({
        ...data[i],
        value: [data[i].center[0], data[i].center[1], data[i].value]
      })
    }
  }
  // 指定图表的配置项和数据
  const option = {
    backgroundColor: '#272D3A',
    // 标题
    title: {
      text:
        currentInfo.value.areaName === 'china'
          ? '中国'
          : currentInfo.value.areaName,
      left: 'center',
      padding: [0, 10],
      textStyle: {
        color: '#fff'
      }
    },
    // 地图上圆点的提示
    tooltip: {
      trigger: 'item',
      formatter: function (params) {
        // let tipHtml = ''
        // tipHtml =
        //   '<div style="width:200px;height:200px;background:rgba(22,80,158,0.8);border:1px solid rgba(7,166,255,0.7)">' +
        //   '<div style="width:100%;height:40px;line-height:40px;border-bottom:2px solid rgba(7,166,255,0.7);margin-bottom:10px;">' +
        //   '<span style="margin-left:10px;color:#fff;font-size:16px;">' +
        //   params.name +
        //   '</span>' +
        //   '</div>' +
        //   '<div>' +
        //   '<p style="color:#fff;font-size:12px;">' +
        //   '<i style="display:inline-block;width:8px;height:8px;background:#16d6ff;margin:0 8px">' +
        //   '</i>' +
        //   '公司数量：' +
        //   '<span style="color:#f48225;margin:0 6px;">' +
        //   3 +
        //   '</span>' +
        //   '个' +
        //   '</p>' +
        //   '<p style="color:#fff;font-size:12px;">' +
        //   '<i style="display:inline-block;width:8px;height:8px;background:#16d6ff;margin:0 8px">' +
        //   '</i>' +
        //   '被考核主体数量' +
        //   '<span style="color:#f4e925;margin:0 6px;">' +
        //   4 +
        //   '</span>' +
        //   '个' +
        //   '</p>' +
        //   '</div>' +
        //   '</div>'
        // return tipHtml
        return params.name + ' : ' + params.value[2]
      }
    },
    // 图例按钮 点击可选择哪些不显示
    legend: {
      orient: 'vertical',
      left: 'right',
      top: 'bottom',
      data: ['人口密度'],
      textStyle: {
        color: '#fff'
      }
    },
    // 地理坐标系组件
    geo: {
      map: currentInfo.value.areaName,
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
        name: '人口密度',
        // 表的类型 这里是散点
        type: 'effectScatter',
        // 使用地理坐标系，通过 geoIndex 指定相应的地理坐标系组件
        coordinateSystem: 'geo',
        data: pointData,
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
            shadowColor: '#333',
            borderWidth: 2 // 边际线大小
          }
        },
        zlevel: 1
      }
    ],
    visualMap: {
      // 数据分段视觉展示效果
      min: 1,
      max: 5000,
      text: ['高', '低'],
      realtime: false,
      calculable: true,
      inRange: {
        color: ['lightskyblue', 'yellow', 'orangered']
      }
    }
  }
  // 设置数据分段视觉展示数量范围值
  option.visualMap.min =
    dataList.length > 1 ? dataList[dataList.length - 2].value : 0
  option.visualMap.max = dataList.length > 0 ? dataList[0].value : 0
  // 使用刚指定的配置项和数据显示图表。
  myChart.setOption(option, true) // 设置true，上一次渲染的数据不会影响下二次
}

// 返回
const back = () => {
  if (deepTree.length > 1) {
    deepTree.pop()
    mapDataList = deepTree[deepTree.length - 1].mapDataList
    currentInfo.value.areaName = deepTree[deepTree.length - 1].params.name
    currentInfo.value.areaCode = deepTree[deepTree.length - 1].params.adcode
    currentInfo.value.areaLevel = deepTree[deepTree.length - 1].params.level
    renderMap(currentInfo.value.areaName, mapDataList)
  }
}
</script>
<style lang="scss" scoped></style>
