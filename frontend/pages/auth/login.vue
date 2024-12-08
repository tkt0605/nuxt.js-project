<template>
    <div class="login-container">
        <div class="login-base">
            <h1 class="title">お帰りなさい</h1>
        </div>
        <form @submit.prevent="login" class="login-form">
            <input v-model="email" placeholder="メールアドレス" class="form-input" required />
            <input v-model="password" type="password" placeholder="パスワード" class="form-input" required />
            <button type="submit" class="form-button">ログイン</button>
        </form>
        <p class="other-page">アカウントをお持ちではありませんか？<a href='http://localhost:3000/auth/signup'>サインアップ</a></p>
    </div>
</template>
<script>
import '../../assets/css/login.css';
import { ref } from 'vue';
import { useAuthStore } from '../../store/auth';
const email = ref('');
const password = ref('');
const authStore = useAuthStore();

const login = async() =>{
    try{
        await authStore.login(email.value, password.value);
        console.log('ログイン成功:', authStore.user);
    }catch(error){
        console.error("ログインエラー:", error);
        throw error;
    }
};
// export default {
//     name: 'Login',
//     data() {
//         return {
//             email: '',
//             password: '',
//         };
//     },
//     methods: {
//         async login() {
//             try{
//                 await this.$store.dispatch('auth/login', {
//                     email: this.email,
//                     password: this.password,
//                 });
//                 this.$router.push('/');
//             }catch(error){
//                 console.error('ログイン失敗:', error);
//                 throw error;
//             }
//         },
//     },
// };

</script>