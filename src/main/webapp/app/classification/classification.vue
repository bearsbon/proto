<template>
  <div style="transform: scale(0.9)">
    <div class="user-guide-container">
      <h1 class="user-guide-container__header">Classification</h1>
      <div class="user-guide-container__info">
        <p>Classification is the task of determing the belonging of objects to predetermined classes.</p>
      </div>
    </div>
    <div style="display: flex; justify-content: space-between">
      <h1 class="page-title">History</h1>
      <div class="actions">
        <b-button class="btn_primary" @click="newSimulation">Create new</b-button>
      </div>
    </div>

    <p-pdf
      v-if="report"
      style="visibility: hidden"
      :report="report"
      :metricsData="metricsData"
      ref="pdfComponent"
      :palette="palette"
      :summary-information="tableData"
      :type="'Classification'"
      :embeddingFilesSize="embeddingFilesSize"
    />
    <p-simulation-table :fields="fields" :page="'classification'" @downloadReportClick="downloadReportClick" />
  </div>
</template>

<script lang="ts" src="./classification.ts" />
<style scoped lang="scss" src="./classification.scss" />
