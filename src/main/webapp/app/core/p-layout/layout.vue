<template>
  <div class="full-content">
    <router-view name="header" />

    <div class="content-wrapper">
      <div :class="{ content: showNavbar }">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./layout.component.ts" />

<style scoped lang="scss" src="./layout.scss" />
