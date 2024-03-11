<template>
  <div v-if="isLoading === false">
    <div class="demo__collapse">
      <b-button variant="link" class="report-page__information_toggle" @click="collapse = !collapse">{{ toggleText }}</b-button>
    </div>
    <div class="demo" style="transform: scale(0.9)">
      <b-collapse v-model="collapse">
        <div class="demo__container">
          <div class="scheme" />
        </div>
      </b-collapse>
    </div>
    <div class="report-page">
      <section class="report-page__header" style="margin-top: 50px">
        <h1 class="report-page__title" v-if="report">
          Measure result

          <div class="report-page__title__buttons">
            <p-button class="report-page__title_button" color="primary" @click="startSimulation()">Start</p-button>
            <p-button class="btn btn-secondary _secondary" color="secondary" @click="stopSimulation()">Stop</p-button>
          </div>
        </h1>
      </section>
      <div class="report-page__information">
        <div class="report-page__information_header">Summary information:</div>
        <div id="information" class="report-page__information_data">
          <ul v-if="report">
            <li><span class="report-page__information__bold">Methods: </span>{{ methods }}</li>
            <li><span class="report-page__information__bold">Uploaded raw data volume: </span> {{ embeddingFilesSize }}</li>
            <li><span class="report-page__information__bold">Output embeddings volume: </span> {{ embeddingFilesSize }}</li>
          </ul>
        </div>
      </div>
      <p-chart
        :data="testData?.graph ?? []"
        :palette="palette.classPalette"
        type="class"
        :label="`Algorithm ...`"
        :labels-arr="testData?.labels"
        :chart-style="chartStyle"
        :modalId="'test123'"
        :isClustering="true"
      />

      <div v-if="type === 'Clustering'" class="report-page__grid">
        <div v-for="(item, index) in socketData ? socketData : []" :key="item.id">
          <p-chart
            :data="[]"
            :palette="palette.classPalette"
            type="class"
            :label="`Algorithm 123`"
            :chart-style="chartStyle"
            :modalId="'123123123'"
            :isClustering="true"
          />
        </div>
      </div>
    </div>
  </div>
  <div style="text-align: center" v-else>
    <div style="margin: 200px 0">
      <b-spinner type="grow" label="Spinning" style="margin: 0 10px" />
      <b-spinner type="grow" label="Spinning" style="margin: 0 10px" />
      <b-spinner type="grow" label="Spinning" style="margin: 0 10px" />
    </div>
  </div>
</template>

<script lang="ts" src="./demo.component.ts" />
<style src="./demo.scss" lang="scss" scoped />
