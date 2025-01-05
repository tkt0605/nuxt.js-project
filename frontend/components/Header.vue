<template>
  <div>
    <div class="header">
      <div class="headerline">
        <div class="container">
          <!-- <a class="logo">ToDO<small class="logo_small"> By Typewriter</small></a> -->
          <a class="logo">TDBT</a>
          <div v-if="isAuthenticated" class="account_form">
            <button class="logout" type="button" @click="logout">
              ログアウト
            </button>
          </div>
          <div v-else class="account_form">
            <button class="login" type="button" @click="gotoLogin">
              ログイン
            </button>
            <button class="signup" type="button" @click="gotoSignup">
              サインアップ
            </button>
          </div>
        </div>
      </div>
    </div>
    <aside>
      <!--  -->
      <ul>
        <li v-if="isAuthenticated" class="account-auth-email">
          <div class="account-auth">
            <p class="auth-new">{{ currentUser.email || "ゲスト" }}</p>
          </div>
        </li>
        <li class="create_todo">
          <div class="todo-item">
            <NuxtLink to="/" class="todo_id">
              <p class="todo-title-new">新しいToDO</p>
            </NuxtLink>
          </div>
        </li>
        <div v-if="isAuthenticated && categorizedTodos" class="lists">
          <li>
            <h5>今日の予定</h5>
            <ul class="aside-todo-padding">
              <li v-for="todo in categorizedTodos.today" :key="todo.id" >
                <NuxtLink :to="`/t/${todo.id}`" class="todo_id" v-if="todo.auther === currentUser.id">
                  <p class="todo-title">{{ formatDate(todo.created_at) }}</p>
                </NuxtLink>
              </li>
            </ul>
          </li>

          <li>
            <h5>昨日</h5>
            <ul class="aside-todo-padding">
              <li v-for="todo in categorizedTodos.yesterday" :key="todo.id" >
                <NuxtLink :to="`/t/${todo.id}`" class="todo_id" v-if="todo.auther === currentUser.id">
                  <p class="todo-title">{{ formatDate(todo.created_at) }}</p>
                </NuxtLink>
              </li>
            </ul>
          </li>

          <li>
            <h5>過去7日間</h5>
            <ul class="aside-todo-padding">
              <li v-for="todo in categorizedTodos.lastsevendays" :key="todo.id" >
                <NuxtLink :to="`/t/${todo.id}`" class="todo_id" v-if="todo.auther === currentUser.id">
                  <p class="todo-title">{{ formatDate(todo.created_at) }}</p>
                </NuxtLink>
              </li>
            </ul>
          </li>

          <li>
            <h5>それ以前</h5>
            <ul class="aside-todo-padding">
              <li v-for="todo in categorizedTodos.older" :key="todo.id" >
                <NuxtLink :to="`/t/${todo.id}`" class="todo_id" v-if="todo.auther === currentUser.id">
                  <p class="todo-title">{{ formatDate(todo.created_at) }}</p>
                </NuxtLink>
              </li>
            </ul>
          </li>

          <li
            v-if="todolist.length === 0 && isAuthenticated"
            class="empty-message"
          >
            <p>ToDOを作成してください。</p>
          </li>
        </div>
      </ul>
    </aside>
  </div>
</template>
<script setup>
import "../assets/css/components/header.css";
import { useRouter } from "nuxt/app";
import { useAuthStore } from "../store/auth";
import { ref, computed, onMounted } from "vue";
const router = useRouter();
const authStore = useAuthStore();
const todolist = ref([]);
const user = ref(null);
const userMap = ref({});
onMounted(async () => {
  try {
    await authStore.restoreSession();
    console.log("セッション復元成功。");
    //カスタムユーザーによる情報
    if(authStore.isAuthenticated){
      try{
        user.value = await authStore.getUserInfo();
        console.log('ユーザー情報取得:', user.value);
      }catch(error){
        console.error("ユーザー情報取得:", error);
        throw error;
      }
    };
    todolist.value = await authStore.AsideTitle();
    const categorized = categorizeTodos(todolist.value);
    categorizedTodos.value = { ...categorized };
    console.log(categorizedTodos.value);
  } catch (error) {
    console.error("初期データのロードに失敗しました。", error);
  }
});
const logout = async () => {
  try {
    await authStore.logout();
    console.log("ログアウト成功");
    router.push("/auth/login");
  } catch (error) {
    console.error("ログアウト失敗", error);
    alert("ログアウトに失敗しました。時間をおいて再試行してください。");
  }
};
const gotoLogin = () => {
  router.push("/auth/login");
};

const gotoSignup = () => {
  router.push("/auth/signup");
};
function formatDate(date) {
  if (!date) return "日付不明";
  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    hour12: true,
    minute: "2-digit",
  };
  return new Date(date).toLocaleDateString("ja-jp", options);
}
const isAuthenticated = computed(() => authStore.isAuthenticated);
const currentUser = computed(() => authStore.currentUser);
// const currentUserId = computed(() => authStore.currentUser?.id);
// const filteringToDO = computed(() => {
//   return todolist.value.filter(todo => todo.auther === currentUserId.value);
// })
const categorizeTodos = (todolist) => {
  const now = new Date();
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const startOfYesterday = new Date(startOfToday.getTime() - 24 * 60 * 60 * 1000);
  const startOfLastSevenDays = new Date(startOfToday.getTime() - 7 * 24 * 60 * 60 * 1000);
  return {
    today: todolist.filter((todo) => {
      const createdDate = new Date(todo.created_at);
      return createdDate >= startOfToday;
    }),
    yesterday: todolist.filter((todo) => {
      const createdDate = new Date(todo.created_at);
      return createdDate >= startOfYesterday && createdDate < startOfToday;
    }),
    lastsevendays: todolist.filter((todo) => {
      const createdDate = new Date(todo.created_at);
      return createdDate >= startOfLastSevenDays && createdDate < startOfYesterday;
    }),
    older: todolist.filter((todo) => {
      const createdDate = new Date(todo.created_at);
      return createdDate < startOfLastSevenDays;
    }),
  };
};


const categorizedTodos = ref({
  today: [],
  yesterday: [],
  lastsevendays: [],
  older: [],
});
</script>
