<template>
  <div class="demo" style="transform: scale(0.9)">
    <div class="demo__container">
      <div class="scheme" />

      <div class="user-guide-container">
        <div class="user-guide-container__header_step">Set the experiment method</div>
        <!-- <div v-if="selected" class="user-guide-container__header_step">Set the experiment method</div> -->
      </div>
      <div class="main-page__buttons">
        <p-button
          class="btn btn-secondary _secondary"
          :class="{ active: selected === 'Clustering' }"
          color="secondary"
          @click="() => handleSelect('Clustering')"
          >Clustering</p-button
        >
        <p-button
          class="btn btn-secondary _secondary"
          :class="{ active: selected === 'Classification' }"
          color="secondary"
          @click="() => handleSelect('Classification')"
          >Classification</p-button
        >
      </div>
      <!-- <div v-if="selected === 'Classification'" class="demo__settings">
        <div class="options-block__proportion">
          <div class="proportion-label">
            Choose train/test proportion:
            
          </div>
          <div class="proportion-inputs">
            <b-form-input v-model="proportion" type="range" min="0" max="1" step="0.01" class="proportion-inputs__range" />
            <b-form-input v-model="proportion" class="proportion-inputs__number" />
          </div>
        </div>
      </div> -->

      <!-- <div v-if="selected" class="demo__info">All available {{ selected?.toLowerCase() }} methods will be selected.</div> -->

      <!-- <div v-if="selected">
        <div>
          <div class="user-guide-container__header_step">Step 2 <span>Set demo options</span></div>
          <div v-if="selected === 'Classification'" class="demo__settings__checkbox">
            <div>Simulate a fault</div>
            <b-form-checkbox />
          </div>
          <div v-for="item in signals" :key="item" class="settings-block">
            <div>
              <div class="settings-block__title">Signal type:</div>
              <p-select :options="typeOptions" />
            </div>
            <div>
              <div class="settings-block__title">Signal duration:</div>
              <b-form-input type="text" c />
            </div>
            <div>
              <div class="settings-block__title">Frequency:</div>
              <b-form-input type="text" />
            </div>
          </div>
        </div>
        <div style="display: flex; justify-content: center; margin-top: 30px">
          <b-plus @click="() => signals.push({})" class="plus-icon" />
        </div>
        <div class="submit-wrapper">
          <p-button class="btn btn-primary _primary" color="primary" @click="startSimulation()">Start</p-button>
        </div>
      </div> -->
      <div class="report-page">
        <div v-if="isLoading === false">
          <p-pdf
            v-if="reportData"
            style="visibility: hidden"
            :report="report"
            :metricsData="metricsData"
            ref="pdfComponent"
            :palette="palette"
            :summary-information="tableData"
            :type="type"
            :embeddingFilesSize="embeddingFilesSize"
          />
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
            <div class="report-page__information_header">
              Summary information:
              <b-button variant="link" class="report-page__information_toggle" @click="collapse = !collapse">{{ toggleText }}</b-button>
            </div>
            <b-collapse id="information" class="report-page__information_data" v-model="collapse">
              <ul v-if="report">
                <li>
                  <span class="report-page__information__bold">{{ type + ' ' + subTitle.toLowerCase() }}: </span>{{ report.modelMethod }}
                </li>
                <li><span class="report-page__information__bold">Uploaded raw data volume: </span> {{ embeddingFilesSize }}</li>
                <li><span class="report-page__information__bold">Output embeddings volume: </span> {{ embeddingFilesSize }}</li>
              </ul>
            </b-collapse>
          </div>
          <p-chart
            :data="testData?.graph ?? []"
            :palette="palette.classPalette"
            type="class"
            :label="`test`"
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
              <!-- <p-chart
            :data="item.data "
            :palette="palette.classPalette"
            type="class"
            :label="`Algorithm ${item.model.name}`"
            :labels-arr="item.given_labels"
            :chart-style="chartStyle"
            :modalId="item[0].label + '_' + index"
            :isClustering="true"
          /> -->
            </div>
          </div>

          <!-- <div v-for="(item, index) in reportData" :key="item.id">
        <h5 v-if="type === 'Classification'" class="algorithm__title">
          {{ subTitle + ' ' + item.model.name }}
        </h5>
        <div v-if="type === 'Classification'" class="report-page__grid">
          <div >
            <p-chart
              :data="item.model_result.graph.data"
              :palette="palette.classPalette"
              type="class"
              :label="'Classification projection'"
              :labels-arr="item.model_result.labels"
              :chart-style="chartStyle"
              :modalId="item.model_result.graph[0].label + '_' + index"
              :alorithmTitle="`Algorithm ${item.modelMethod}`"
              :isClustering="false"
              :isPredictedLabel="item.model_result.graph.some(el => el.predictedLabel !== el.label)"
            />
          </div>

          <div v-if="item.inference">
            <p-chart
              :data="item.inference"
              :palette="palette.inferencePalette"
              type="inference"
              label="Validation projection"
              :labels-arr="item.lables_inference"
              :chart-style="chartStyle"
              :modalId="item.resclass[0].label + '_' + index + '_inference'"
            />
          </div>
          <div :class="{ confMatrix: true, confMatrixWithInference: item.inference }">
            <p-confusion-matrix
              v-if="item.confusion_matrix"
              :matrix-data="item.confusion_matrix.values"
              :ox-tags="item.confusion_matrix.given_labels"
              :oy-tags="item.confusion_matrix.predicted_labels"
              :top-value="123"
              :accuracy="item.metrics.accuracy.toFixed(4)"
            />
          </div>
          <p-metrix-table
            v-if="metricsData"
            :items="metricsData.data"
            :fields="metricsData.fields"
            :accuracy="metricsData.accuracy"
            label="Summary information:"
          />
        </div>
      </div> -->
          <!-- <div class="report-page__grid">
        <div v-if="tableData && type === 'Classification'" style="transform: scale(0.9); margin-left: 5px">
          <b-table
            sticky-header
            responsive
            head-variant="light"
            show-empty
            :items="tableData"
            label="Summary information:"
            style="width: 100%"
          />
        </div>
      </div> -->
        </div>
        <div style="text-align: center" v-else>
          <div style="margin: 200px 0">
            <b-spinner type="grow" label="Spinning" style="margin: 0 10px" />
            <b-spinner type="grow" label="Spinning" style="margin: 0 10px" />
            <b-spinner type="grow" label="Spinning" style="margin: 0 10px" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./demo.component.ts" />
<style src="./demo.scss" lang="scss" scoped />
