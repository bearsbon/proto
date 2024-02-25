<template>
  <div style="transform: scale(0.9)">
    <div class="user-guide-container">
      <h1 class="user-guide-container__header">Clustering</h1>
      <div class="user-guide-container__info">
        <p>Clustering is the process of pattern extraction from unlabelled data stream.</p>
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
      :type="'Clustering'"
      :embeddingFilesSize="embeddingFilesSize"
      :fromTable="true"
    />
    <p-simulation-table
      class="workspace_table"
      :fields="fields"
      :page="'workspace'"
      :pdfComponent="pdfComponent"
      @downloadReportClick="downloadReportClick"
    />
    <div class="actions">
      <!-- <p-button class="btn _primary" @click="newSimulation">Create new</p-button> -->
    </div>
  </div>
</template>

<script lang="ts" src="./workspace.component.ts" />
<style scoped lang="scss" src="./workspace.scss" />
