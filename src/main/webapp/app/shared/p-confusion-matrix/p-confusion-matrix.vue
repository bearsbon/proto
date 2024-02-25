<template>
  <div class="confusion-matrix">
    <div class="confusion-matrix__label">Confusion matrix:</div>
    <div class="confusion-matrix__content">
      <div class="y-axis">True Label</div>
      <div class="y-axis-marks">
        <div v-for="(value, name) in oy" :key="value" :title="value" style="cursor: pointer">
          <span>{{ name }}</span>
        </div>
      </div>
      <div class="matrix">
        <div class="x-axis">Accuracy: {{ accuracy }}</div>
        <tr
          v-for="(array, index) in matrix"
          :key="array"
          class="matrix-row"
          :class="{
            '_first-row': index === 0,
            '_last-row': index === matrix.length - 1,
          }"
        >
          <td
            v-for="(value, index) in array"
            :key="value"
            class="matrix-cell"
            :class="{
              '_first-cell': index === 0,
              '_last-cell': index === array.length - 1,
            }"
            :style="{
              backgroundColor: pickColor(value),
              color: 'black',
            }"
          >
            {{ value }}
          </td>
        </tr>
        <div class="x-axis ox">
          <div
            v-for="(value, name) in ox"
            :key="value"
            :title="value"
            class="x-axis_tag"
            :style="{
              height: `${name.length * 8}px`,
            }"
          >
            <span
              :style="{
                top: `${name.length * 7.5}px`,
              }"
              >{{ name }}</span
            >
          </div>
        </div>
        <div class="x-axis">Predicted label</div>
      </div>
      <div class="scale">
        <div class="scale__column"></div>
        <div class="scale__points">
          <div v-for="item in scalePoints" :key="item">
            {{ item }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="./p-confusion-matrix.component.ts" />
<style src="./p-confusion-matrix.scss" lang="scss" scoped />
