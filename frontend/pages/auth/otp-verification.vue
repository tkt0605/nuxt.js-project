<template>
    <div class="otp-container">
      <h1 class="title">OTP 認証</h1>
      <p class="text-center text-gray-600">送信された OTP を入力してください</p>

      <div class="otp-input-container">
        <input v-for="(digit, index) in otp"
               :key="index"
               type="text"
               v-model="otp[index]"
               maxlength="1"
               class="otp-input"
               @input="focusNext($event, index)" />
      </div>

      <button @click="verifyOtp" class="otp-button">OTP を確認</button>
      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
    </div>
</template>
<script setup>

</script>

