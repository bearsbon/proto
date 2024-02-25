<template>
    <b-button :variant="variant" :disabled="disabled" @click="$emit('click')">
      <slot />
    </b-button>
</template>

<script lang="ts" src="./p-button.component.ts" />

<style scoped lang="scss" src='./p-button.scss' />
