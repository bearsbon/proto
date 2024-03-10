<template>
  <div class="navbar-wrapper">
    <b-navbar>
      <b-navbar-brand>
        <div class="logo" @click="() => $router.push('/demo')" />
      </b-navbar-brand>

      <div class="ml-auto user-guide-container__header">LoRa</div>

      <b-navbar-nav class="ml-auto right">
        <div>
          <div class="user-name">{{ userShortName }}</div>
          <div class="logout-button" v-b-modal.modal-multi-1>Log Out</div>
        </div>
      </b-navbar-nav>
    </b-navbar>

    <b-modal id="modal-multi-1">
      <template #modal-header>
        <h5>Confirm your action</h5>
      </template>

      <template #default>
        <p>Are you sure you want to quit?</p>
      </template>

      <template #modal-footer="{ ok }">
        <b-button @click="onLogout"> OK </b-button>
      </template>
    </b-modal>
  </div>
</template>

<script lang="ts" src="./p-navbar.component.ts" />

<style lang="scss" src="./p-navbar.scss" />
