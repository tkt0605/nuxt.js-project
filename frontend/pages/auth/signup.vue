<template>
  <div class="login-container">
      <div class="login-base">
          <h1 class="title">アカウントの作成</h1>
      </div>
      <form @submit.prevent="signup" class="login-form">
          <input v-model="email" placeholder="メールアドレス" class="form-input" required />
          <input v-model="password" type="password" placeholder="パスワード" class="form-input" required>
          <button type="submit" class="form-button">サインアップ</button>
      </form>
      <p class="other-page">すでにアカウントをお持ちですか？<a href='http://localhost:3000/auth/login'>ログイン</a></p>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useAuthStore } from '../../store/auth';
import { useRouter } from 'nuxt/app';
const email =ref('');
const password = ref('');
const authStore = useAuthStore();
const  router = useRouter();
const signup = async() =>{
  try{
    await authStore.signup(email.value, password.value);
    console.log('アカウント登録:', authStore.user);
    // localStorage.setItem("signup_email", email.value);
    router.push('/');
  }catch(error){
    console.error('アカウント登録エラー:', error);
    throw error;
  }
};

</script>
