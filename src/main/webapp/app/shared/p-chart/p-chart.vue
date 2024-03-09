<template>
  <div class="chart">
    <div class="chart__label">
      {{ isPdf && !isInf ? null : label }}
      <!-- <b-button v-if="!isPdf" variant="link" class="chart__label__toggle" v-b-modal="modalId">Expand chart</b-button> -->
    </div>
    <div style="height: 350px; width: 500px" :class="{ pdfChart: isPdf }">
      <Bubble ref="chart" :data="chartData" :options="chartOptions" :style="chartStyle" />
    </div>
  </div>
</template>
<script lang="ts" src="./p-chart.component.ts" />
<style scoped lang="scss" src="./p-chart.scss" />
