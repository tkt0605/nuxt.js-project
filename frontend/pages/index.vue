<template>
  <Header />
  <div class="bord">
    <div v-if="isAuthenticated" class="text-base">
      <div class="todo_list">
        <div class="item-text">
          <h1>何かToDOはありますか？</h1>
        </div>
      </div>
      <div class="form">
        <div class="texter" id="texter">
          <div
            id="text_keybord"
            ref="textKeybord"
            class="text_keybord"
            contenteditable="true"
            :class="{ placeholder: isPlaceholderVisible }"
            @focus="handleFocus"
            @blur="handleBlur"
          >
            <p v-if="isPlaceholderVisible">{{ placeholderText }}</p>
          </div>
        </div>
        <div class="flex-button">
          <span class="flex-button-span">
            <button type="button" class="submit_button" @click="submitToDO">
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                class="icon-2xl"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M15.1918 8.90615C15.6381 8.45983 16.3618 8.45983 16.8081 8.90615L21.9509 14.049C22.3972 14.4953 22.3972 15.2189 21.9509 15.6652C21.5046 16.1116 20.781 16.1116 20.3347 15.6652L17.1428 12.4734V22.2857C17.1428 22.9169 16.6311 23.4286 15.9999 23.4286C15.3688 23.4286 14.8571 22.9169 14.8571 22.2857V12.4734L11.6652 15.6652C11.2189 16.1116 10.4953 16.1116 10.049 15.6652C9.60265 15.2189 9.60265 14.4953 10.049 14.049L15.1918 8.90615Z"
                  fill="currentColor"
                ></path>
              </svg>
            </button>
          </span>
        </div>
      </div>
    </div>
    <div v-else>
      <div class="todo_list">
        <div class="item-text">
          <h1>ログイン・サインアップしてください。</h1>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import "../assets/css/pages/index.css";
import Header from "../components/Header.vue";
import { useAuthStore } from "../store/auth";
import { useRouter } from "nuxt/app";
import { useRoute } from "nuxt/app";
import { computed, onMounted, ref } from "vue";
const authStore = useAuthStore();
const router = useRouter();
const todolist = ref([]);
const user = ref(null);
const route = useRoute();
const isAuthenticated = computed(() => authStore.isAuthenticated);
const currentUser = computed(() => authStore.currentUser);
onMounted(async () => {
  try {
    await authStore.restoreSession();
    console.log("セッション復元成功。");
    const todos = await authStore.AllfetchToDO();
    const usr = await authStore.getUserInfo();
    user.value = usr;
    console.log("ログインユーザー情報取得:", user.value);
    if (Array.isArray(todos)) {
      todolist.value = todos;
    };
  } catch (error) {
    console.error("初期データのロードに失敗しました。", error);
  }
});
const placeholderText = ref("あなたのToDO");
const isPlaceholderVisible = ref(true);
const handleFocus = () => {
  if (isPlaceholderVisible.value) {
    isPlaceholderVisible.value = false;
  }
};
const handleBlur = (event) => {
  if (!event.target.innerText.trim()) {
    isPlaceholderVisible.value = true;
  }
};
const submitToDO = async () => {
  const todoElement = document.getElementById("text_keybord");
  const todoContent = todoElement.innerText.trim();
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0"); // 月は0から始まるため+1
  const day = String(now.getDate()).padStart(2, "0");
  const auther = authStore.user?.id || "default@example.com"; // 現在のユーザーIDを取得

  // 入力チェック
  if (!todoContent || todoContent === "あなたのToDO") {
    console.log("ToDoの内容が空です。作成できません。");
    return;
  }

  console.log("送信データ:", { auther, todo: todoContent });
  if (!todoContent) {
    console.log("todoが作成されました。");
    return;
  }
  try {
    const newtodo = await authStore.createToDO(auther, todoContent);
    todolist.value = await authStore.AllfetchToDO();
    todoElement.innerText = "";
    console.log("todoが作成されました。");
    return router.push(`/t/${newtodo.id}`);
  } catch (error) {
    console.error("todoの作成に失敗しました。", error);
    throw error;
  }
};
</script>
