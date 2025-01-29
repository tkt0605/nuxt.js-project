<template>
  <div>
    <div class="header" v-if="isAsideOpen">
      <div class="headerline">
        <div class="container">
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
    <div class="header_down" v-else>
      <div class="headerline_down">
        <div class="container_down">
          <div class="line_down">
            <button class="icon_down" @click="toggleAsideTag">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                class="bi bi-layout-text-window-reverse"
                viewBox="0 0 16 16"
              >
                <path
                  d="M13 6.5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h5a.5.5 0 0 0 .5-.5m0 3a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h5a.5.5 0 0 0 .5-.5m-.5 2.5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1 0-1z"
                />
                <path
                  d="M14 0a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2zM2 1a1 1 0 0 0-1 1v1h14V2a1 1 0 0 0-1-1zM1 4v10a1 1 0 0 0 1 1h2V4zm4 0v11h9a1 1 0 0 0 1-1V4z"
                />
              </svg>
            </button>
            <button class="create_icon_down">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-pencil-square"
                viewBox="0 0 16 16"
              >
                <path
                  d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"
                />
                <path
                  fill-rule="evenodd"
                  d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
                />
              </svg>
            </button>
            <a class="logo_down">TDBT</a>
          </div>
          <div v-if="isAuthenticated" class="account_form">
            <button class="logout" type="button" @click="logout">
              <b>ログアウト</b>
            </button>
          </div>
          <div v-else class="account_form">
            <button class="login" type="button" @click="gotoLogin">
              <b>ログイン</b>
            </button>
            <button class="signup" type="button" @click="gotoSignup">
              <b>サインアップ</b>
            </button>
          </div>
        </div>
      </div>
    </div>
    <aside :class="{ open: isAsideOpen }">
      <!--  -->
      <ul class="mains">
        <div class="button_line">
          <button class="icon" @click="toggleAsideTag">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              class="bi bi-layout-text-window-reverse"
              viewBox="0 0 16 16"
              style="background-color: rgb(230, 230, 230)"
            >
              <path
                d="M13 6.5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h5a.5.5 0 0 0 .5-.5m0 3a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h5a.5.5 0 0 0 .5-.5m-.5 2.5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1 0-1z"
              />
              <path
                d="M14 0a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2zM2 1a1 1 0 0 0-1 1v1h14V2a1 1 0 0 0-1-1zM1 4v10a1 1 0 0 0 1 1h2V4zm4 0v11h9a1 1 0 0 0 1-1V4z"
              />
            </svg>
          </button>
          <button class="create_icon">
            <NuxtLink to="/" class="create_icon_color">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-pencil-square"
                viewBox="0 0 16 16"
              >
                <path
                  d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"
                />
                <path
                  fill-rule="evenodd"
                  d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
                />
              </svg>
            </NuxtLink>
          </button>
        </div>
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
              <li v-for="todo in categorizedTodos.today" :key="todo.id">
                <NuxtLink
                  :to="`/t/${todo.id}`"
                  class="todo_id"
                  v-if="todo.auther === currentUser.id"
                >
                  <p class="todo-title">{{ formatDate(todo.created_at) }}</p>
                </NuxtLink>
              </li>
            </ul>
          </li>

          <li>
            <h5>昨日</h5>
            <ul class="aside-todo-padding">
              <li v-for="todo in categorizedTodos.yesterday" :key="todo.id">
                <NuxtLink
                  :to="`/t/${todo.id}`"
                  class="todo_id"
                  v-if="todo.auther === currentUser.id"
                >
                  <p class="todo-title">{{ formatDate(todo.created_at) }}</p>
                </NuxtLink>
              </li>
            </ul>
          </li>

          <li>
            <h5>過去7日間</h5>
            <ul class="aside-todo-padding">
              <li v-for="todo in categorizedTodos.lastsevendays" :key="todo.id">
                <NuxtLink
                  :to="`/t/${todo.id}`"
                  class="todo_id"
                  v-if="todo.auther === currentUser.id"
                >
                  <p class="todo-title">{{ formatDate(todo.created_at) }}</p>
                </NuxtLink>
              </li>
            </ul>
          </li>

          <li>
            <h5>それ以前</h5>
            <ul class="aside-todo-padding">
              <li v-for="todo in categorizedTodos.older" :key="todo.id">
                <NuxtLink
                  :to="`/t/${todo.id}`"
                  class="todo_id"
                  v-if="todo.auther === currentUser.id"
                >
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
import { ref, computed, onMounted, onBeforeUnmount } from "vue";
const router = useRouter();
const authStore = useAuthStore();
const todolist = ref([]);
const user = ref(null);
const isAsideOpen = ref(true);
const userMap = ref({});
const checkWindow = () => {
  if (window.innerWidth < 768) {
    isAsideOpen.value = false;
  } else {
    isAsideOpen.value = true;
  }
};
onMounted(async () => {
  try {
    await authStore.restoreSession();
    console.log("セッション復元成功。");
    //カスタムユーザーによる情報
    checkWindow();
    window.addEventListener("resize", checkWindow);
    if (authStore.isAuthenticated) {
      try {
        user.value = await authStore.getUserInfo();
        console.log("ユーザー情報取得:", user.value);
      } catch (error) {
        console.error("ユーザー情報取得:", error);
        throw error;
      }
    }
    todolist.value = await authStore.AsideTitle();
    const categorized = categorizeTodos(todolist.value);
    categorizedTodos.value = { ...categorized };
    console.log(categorizedTodos.value);
  } catch (error) {
    console.error("初期データのロードに失敗しました。", error);
  }
});
onBeforeUnmount(async () => {
  window.removeEventListener("resize", checkWindow);
});
const toggleAsideTag = () => {
  isAsideOpen.value = !isAsideOpen.value;
};
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
const categorizeTodos = (todolist) => {
  const now = new Date();
  const startOfToday = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate()
  );
  const startOfYesterday = new Date(
    startOfToday.getTime() - 24 * 60 * 60 * 1000
  );
  const startOfLastSevenDays = new Date(
    startOfToday.getTime() - 7 * 24 * 60 * 60 * 1000
  );
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
      return (
        createdDate >= startOfLastSevenDays && createdDate < startOfYesterday
      );
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
