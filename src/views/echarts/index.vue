<template>
  <div>简单图表</div>
  <Chart :chartType="'line'" :chartData="[1, 10, 20, 30, 20, 10]" />
  <Chart :chartType="'bar'" :chartData="[5, 15, 36, 10, 22, 20]" />
</template>

<script setup>
import Chart from './components/chart.vue'
</script>
<style lang="scss" scoped></style>
