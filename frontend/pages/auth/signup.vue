<template>
  <div class="login-container">
      <div class="login-base">
          <h1 class="title">アカウントの作成</h1>
      </div>
      <form @submit.prevent="signup" class="login-form">
          <input v-model="email" placeholder="メールアドレス" class="form-input" />
          <input v-model="password1" type="password" placeholder="パスワード" class="form-input" />
          <input v-model="password2" type="password" placeholder="パスワード" class="form-input" />
          <button type="submit" class="form-button">サインアップ</button>
      </form>
  </div>
</template>
  
<script>
export default {
  name: 'Signup'
};
</script>
  