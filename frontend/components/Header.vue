<template>
    <div>
        <div class="header">
            <div class="headerline">
                <div class="container">
                    <a class="logo">ToDO<small class="logo_small"> By Typewriter</small></a>
                    <div v-if="isAuthenticated" class="account_form">
                        <button class="logout" type="button" @click="logout">ログアウト</button>
                    </div>
                    <div v-else class="account_form">
                        <button class="login" type="button" @click="gotoLogin">ログイン</button>
                        <button class="signup" type="button" @click="gotoSignup">サインアップ </button>
                    </div>
                </div>
            </div>
        </div>
        <aside>
            <ul>
                <li class="create_todo">
                    <NuxtLink class="new_todo" to="/">New ToDO</NuxtLink>
                </li>
                <div class="tab" v-for="todo in todolist" :key="todo.id" :class="{ active: activeTabId === todo.id}" @click="selectTab(todo.id)">
                    <p>{{ todo.title }}</p>
                </div>
            </ul>
        </aside>
    </div>
</template>
<script setup>
import '../assets/css/header.css';
// import { ref } from 'vue';
import { useRouter } from 'nuxt/app';
import { useAuthStore } from '../store/auth';
import { }
import { ref, computed } from 'vue';
const router = useRouter();
const authStore = useAuthStore();
const todostore =
const todolist = ref([]);
const selectTab = (id) =>{
    t
}
const logout = async() =>{
    try{
        await authStore.logout();
        console.log('ログアウト成功');
        router.push('/auth/login');
    }catch(error){
        console.error('ログアウト失敗', error);
        throw error;
    }
};
const gotoLogin = ()=>{
    router.push('/auth/login');
};
const gotoSignup = ()=>{
    router.push('/auth/signup');
};
const isAuthenticated = computed (() => authStore.isAuthenticated);
</script>
