<template>
  <vue3-html2pdf
    v-if="report"
    ref="html2Pdf"
    :float-layout="true"
    :enable-download="false"
    :preview-modal="false"
    :filename="report.title"
    :pdf-quality="2"
    :manual-pagination="true"
    pdf-format="a4"
    pdf-orientation="portrait"
    pdf-content-width="800px"
    @beforeDownload="beforeDownload($event)"
  >
    <template v-slot:pdf-content>
      <section style="position: relative; left: 150px">
        <section class="report-page__header">
          <h1 class="report-page__title">
            {{ report.title }}
          </h1>
          <div class="logo" />
          <p class="report-page__title_info">Summary information:</p>
          <div class="wrapper">
            <!-- <div>
              <span class="report-page__information__bold">Data files: </span>
              <span class="report-page__file">{{ report[0].inputname }}</span>
            </div> -->
            <div>
              <span class="report-page__information__bold">{{ type + ' ' + subTitle.toLowerCase() }}: </span>{{ method }}
            </div>
            <div>
              <span class="report-page__information__bold">Embeddings files: </span>
              {{ report.embeddingArchiveFileName }}
            </div>
            <div v-if="type === 'Classification'">
              <span class="report-page__information__bold">Train/test proportion: </span
              >{{ report.exchanges[0].result.queryParams.trainSize }}
            </div>
            <div v-if="type === 'Classification'">
              <span class="report-page__information__bold">Splitter type: </span> {{ report.exchanges[0].result.queryParams.splitter }}
            </div>
            <!-- <div v-if="inputFilesize"><span class="report-page__information__bold">Uploaded data size: </span> {{ inputFilesize }}</div> -->
            <div v-if="embeddingFilesSize">
              <span class="report-page__information__bold">Output embeddings size: </span>{{ embeddingFilesSize }}
            </div>
            <div v-if="type === 'Classification'" style="display: flex">
              <div class="report-page__information__bold">Uploaded files:</div>
              <div>
                <div v-for="item in report.exchanges[0].result.modelResult.labels" :key="item">{{ item }}</div>
              </div>
            </div>
          </div>
        </section>
      </section>
      <div v-for="item in report.exchanges" :key="item.id">
        <br v-if="report.modelType !== 'cluster'" class="html2pdf__page-break" />
        <section class="pdf-item" :class="{ margin: item.isPredictedLabel }">
          <div class="chart-container">
            <h5 class="report-page__chart__title">{{ subTitle + ' ' + item.model.name }}</h5>
            <div :class="{ fromTable: fromTable }">
              <p-chart
                :data="item.result.modelResult.graph"
                :palette="palette.classPalette"
                type="class"
                :label="type === 'Clustering' ? `Algorithm ${item.model.name}` : item.model.name"
                :labels-arr="item.lables_class"
                :chart-style="chartStyle"
                :isPdf="true"
                :modalId="item.result.modelResult.graph[0].label + '_' + index"
                :isClustering="type === 'Clustering' ? true : false"
              />
            </div>
          </div>
          <div v-if="item.isPredictedLabel" style="margin: 0 30px; position: absolute">
            <p>Prediction error description</p>
            <img src="../../../content/image/predictedLabel.svg" alt="prompt" class="predicted_svg" />
          </div>
        </section>
        <section v-if="item.inference" class="pdf-item">
          <div style="height: 50px" />
          <div class="report-page__row">
            <p-chart
              :data="item.inference"
              :palette="palette.inferencePalette"
              type="inference"
              label="Validation"
              :labels-arr="item.lables_inference"
              :chart-style="chartStyle"
              :isPdf="true"
              :isInf="true"
            />
          </div>
        </section>
        <section v-if="type === 'Classification'" class="pdf-item">
          <div class="report-page__row">
            <p-confusion-matrix
              v-if="item.result.confusionMatrix"
              :matrix-data="item.result.confusionMatrix.values"
              :ox-tags="item.result.confusionMatrix.givenLabels"
              :oy-tags="item.result.confusionMatrix.predictedLabels"
              :top-value="123"
              :accuracy="item.result.metrics.accuracy.toFixed(4)"
              style="transform: scale(0.8); top: -10px"
            />
            <!-- <div>
              <div>
                <div
                  v-for="(item, index) in report[0].lables_class"
                  :key="item"
                  style="transform: scale(0.75); margin-left: 80px; position: relative; top: -60px"
                >
                  {{ index + ': ' + item }}
                </div>
              </div>
            </div> -->
          </div>
        </section>
        <br v-if="report.modelType !== 'cluster'" class="html2pdf__page-break" />
        <section class="pdf-item" v-if="type === 'Classification'" style="transform: scale(0.8)">
          <div class="report-page__row">
            <p-metrix-table
              :items="metricsData.data"
              :fields="metricsData.fields"
              :accuracy="metricsData.accuracy"
              label="Summary information:"
              style="width: 600px"
            />
          </div>
        </section>
      </div>
    </template>
  </vue3-html2pdf>
</template>

<script lang="ts" src="./p-pdf.component.ts" />
<style scoped lang="scss" src="./p-pdf.scss" />
