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
                <div class="lists">
                  <li class="create_todo">
                    <div class="todo-item">
                      <NuxtLink to="/" class="todo_id" >
                        <p class="todo-title">新しいToDO</p>
                      </NuxtLink>
                    </div>
                  </li>
                  <li v-for="todo in todolist" :key="todo.id" >
                    <div class="todo-item">
                      <NuxtLink v-if="todo.id" :to="`/t/${todo.id}`" data-discover="true" class="todo_id" >
                        <p class="todo-title">{{ todo.title || "タイトルなし" }}</p>
                        <!-- <p class="todo-title">{{ formatDate(todo.created_at) }}</p> -->
                      </NuxtLink>
                    </div>
                  </li>
                  <li v-if="todolist.length === 0 && isAuthenticated" class="empty-message">
                    <p>ToDOを作成してください。</p>
                  </li>
                </div>
            </ul>
        </aside>
    </div>
</template>
<script setup>
import '../assets/css/components/header.css';
import { useRouter } from 'nuxt/app';
import { useAuthStore } from '../store/auth';
import { ref, computed, onMounted } from 'vue';

const router = useRouter();
const authStore = useAuthStore();
const todolist = ref([]);

onMounted(async () => {
  try{
    todolist.value = await authStore.AsideTitle();
  }catch(error){
    console.error('初期データのロードに失敗しました。', error);
  }
});
const logout = async () => {
  try {
    await authStore.logout();
    console.log('ログアウト成功');
    router.push('/auth/login');
  } catch (error) {
    console.error('ログアウト失敗', error);
    alert('ログアウトに失敗しました。時間をおいて再試行してください。');
  }
};

const gotoLogin = () => {
  router.push('/auth/login');
};

const gotoSignup = () => {
  router.push('/auth/signup');
};
function formatDate(date){
  if (!date) return  '日付不明';
  const options = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: "2-digit",
    hour12: true,
    minute: "2-digit",
  };
  return new Date(date).toLocaleDateString('ja-jp', options);
};
const isAuthenticated = computed(() => authStore.isAuthenticated);
</script>

