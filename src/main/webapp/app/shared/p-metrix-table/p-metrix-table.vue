<template>
  <div class="metrix-table">
    <div class="metrix-table__label">{{ label }}</div>
    <b-table :items="items" :fields="fields">
      <template #cell(precision)="data">
        {{ data.value }}
      </template>
      <template #cell(f1-score)="data">
        {{ data.value }}
      </template>
      <template #cell(recall)="data">
        {{ data.value }}
      </template>
      <template v-if="accuracy" #table-caption>Accuracy: {{ accuracy.toFixed(4) }}</template>
    </b-table>
  </div>
</template>

<script lang="ts" src="./p-metrix-table.component.ts" />
<style scoped lang="scss" src="./p-metrix-table.scss" />
