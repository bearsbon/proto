<template>
  <div class="auth-wrapper">
    <div class="auth-form">
      <h1>Sign in</h1>
      <div class="auth-form__info">Welcome to the VibroSense portal.</div>
      <div class="auth-form__info _last">Use your credential to Sign In.</div>

      <b-form-input
        id="email-input"
        type="text"
        v-model="email"
        placeholder="Email"
        :state="validationState.email"
        class="auth-form__input"
        trim
        @input="fieldFocused('email')"
        @keyup.enter="submit"
      />

      <b-form-input
        id="password-input"
        type="password"
        v-model="password"
        placeholder="Password"
        :state="validationState.password"
        class="auth-form__input"
        trim
        @input="fieldFocused('password')"
        @keyup.enter="submit"
      />

      <b-overlay
        :show="onLogin"
        rounded
        opacity="0.6"
        spinner-small
      >
        <p-button
          class="btn _auth"
          :disabled="onLogin"
          @click="submit"
        >
          Sign in
        </p-button>
      </b-overlay>
    </div>
  </div>
</template>

<script lang="ts" src="./auth.component.ts" />

<style lang="scss" src="./auth.scss" scoped />
