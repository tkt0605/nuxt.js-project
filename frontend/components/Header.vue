<template>
    <div>
        <div class="header">
            <div class="headerline"> 
                <div class="container">
                    <a class="logo">ToDO<small class="logo_small"> By Typewriter</small></a>
                    <div v-if="isAuthenticated" class="account_form">
                        <button type="button" @click="logout">ログアウト</button>
                    </div>
                    <div v-else class="account_form">
                        <button type="button" @click="gotoLogin">ログイン</button>
                        <button type="button" @click="gotoSignup">サインアップ </button>
                    </div>
                </div>
            </div>
        </div>
        <aside>
            <ul>
                <li class="create_todo">
                    <NuxtLink class="new_todo" to="/">New ToDO</NuxtLink>
                </li>
                <li class="log_todo">
                    <NuxtLink class="todo_tab" to="/">2024/11/26 ToDO 1</NuxtLink>
                </li>
                <li class="log_todo">
                    <NuxtLink class="todo_tab" to="/">2024/11/26 ToDO 1</NuxtLink>
                </li>
                <li class="log_todo">
                    <NuxtLink class="todo_tab" to="/">2024/11/26 ToDO 1</NuxtLink>
                </li>
                <li class="log_todo">
                    <NuxtLink class="todo_tab" to="/">2024/11/26 ToDO 1</NuxtLink>
                </li>
            </ul>
        </aside>
    </div>
</template>
<script>
import '../assets/css/header.css';
// import { ref } from 'vue';
import { useRouter } from 'nuxt/app';
import { useAuthStore } from '../store/auth';
import { computed } from 'vue';
const router = useRouter();
const authStore = useAuthStore();
const logout = async() =>{
    try{
        await authStore.logout();
        console.log('ログアウト成功');
    }catch(error){
        console.error('ログアウト失敗', error);
        throw error;
    }
};
const gotoLogin = ()=>{
    router.push('/login');
};
const gotoSignup = ()=>{
    router.push('/signup');
};
const isAuthenticated = computed(() => authStore.isAuthenticated);
// export default {
//     methods:{
//         async logout(){
//             try{
//                 await this.$store.dispatch('auth/logout');
//                 this.$router.push('/login');
//             }catch(error){
//                 console.error('ログアウトエラー:', error);
//                 throw error;
//             }
//         },
//     },
// };
</script>   