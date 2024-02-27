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
    </div>
  </div>
</template>

<script lang="ts" src="./demo.component.ts" />
<style src="./demo.scss" lang="scss" scoped />
