<template>
  <Chart :chartType="'line'" :chartData="[1, 10, 20, 30, 20, 10]" />
  <Chart :chartType="'bar'" :chartData="[5, 15, 36, 10, 22, 20]" />
  <Map />
  <MapSd />
</template>

<script setup>
import Chart from './components/chart.vue'
import Map from './components/map.vue'
import MapSd from './components/mapSd.vue'
</script>
<style lang="scss" scoped></style>
