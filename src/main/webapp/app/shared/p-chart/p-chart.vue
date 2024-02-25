<template>
  <div class="chart">
    <div class="chart__label">
      {{ isPdf && !isInf ? null : label }}
      <b-button v-if="!isPdf" variant="link" class="chart__label__toggle" v-b-modal="modalId">Expand chart</b-button>
    </div>
    <div style="position: relative; width: 500px; height: 350px" :class="{ pdfChart: isPdf }">
      <Bubble v-if="chartData.datasets.length" :data="chartData" :options="chartOptions" :style="chartStyle" />
    </div>
    <div class="chart__zoom" v-if="collapse">
      <b-modal :id="modalId" size="lg" :title="algorithmTitle" centered ok-only>
        <div :class="{ pdfChart: isPdf }" v-b-modal="modalId">
          <Bubble v-if="chartData.datasets.length" :data="chartData" :options="modalChartOptions" :style="chartStyle" />
        </div>
        <div v-if="type === 'class' && isClustering === false && isPredictedLabel === true" style="margin: 30px 30px">
          <p>Prediction error description</p>
          <img src="../../../content/image/predictedLabel.svg" alt="prompt" style="width: 130px" />
        </div>
      </b-modal>
    </div>
  </div>
</template>

<script lang="ts" src="./p-chart.component.ts" />
<style scoped lang="scss" src="./p-chart.scss" />
