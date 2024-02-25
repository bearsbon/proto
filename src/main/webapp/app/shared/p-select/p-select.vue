<template>
  <div>
    <!-- <div class="label">{{ label }}</div> -->
    <b-dropdown :disabled="disabled">
      <template #button-content>
        <div class="dropdown-inner">
          {{ selected.label }}
        </div>
      </template>
      <b-dropdown-item v-for="item in options" :key="item" @click="selectItem(item)">
        {{ item.label }}
      </b-dropdown-item>
    </b-dropdown>
  </div>
</template>

<script lang="ts" src="./p-select.component.ts" />
<style scoped lang="scss" src="./p-select.scss" />
