<template>
  <Header />
  <div class="lib-todo-bord">
    <div class="lib-todoitems-list">
      <div class="todo-items">
        <input
          type="checkbox"
          :checked="libtodo?.checklist"
          @change="LibrarycheckToDO(libtodo?.id, $event.target.checked)"
          class="checkboxs"
        />
        <div class="todo-items-detail">
          <p class="time">{{ formatDate(libtodo?.created_at) }}</p>
          <p class="text">{{ libtodo?.todo }}</p>
        </div>
      </div>
      <div class="todo-additem" v-for="libadd in libaddtodo" :key="libadd.id">
        <input
          type="checkbox"
          :checked="libadd?.checklist"
          @change="LibrarycheckToDO(libadd.id, $event.target.checked)"
          class="checkboxs"
        />
        <div class="todo-items-detail">
          <p class="time">{{ formatDate(libadd?.created_at) }}</p>
          <p class="text">{{ libadd?.todo }}</p>
        </div>
      </div>
    </div>
    <div class="text-base-line">
      <div class="form_id-id">
        <div class="texter-id">
          <div
            id="text-keybord"
            class="text-keybord"
            ref="textKeyWard"
            contenteditable="true"
            :class="{ placeholder: isPlaceholderVisable }"
            @focus="handleFocus"
            @blur="handleBlur"
          >
            <p v-if="isPlaceholderVisable">{{ placeholderText }}</p>
            <p v-else></p>
          </div>
        </div>
        <div class="flex-button-lib-todo">
          <span class="flex-button-lib-todo-span">
            <button
              type="button"
              class="submit-button-id"
              @click="submitLibAddToDO"
            >
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
  </div>
</template>
<script setup>
import { useRoute, useRouter } from "vue-router";
import Header from "../../../../components/Header.vue";
import { useAuthStore } from "../../../../store/auth";
import { useLibraryStore } from "../../../../store/libraryStore";
import "../../../../assets/css/pages/lid-todo.css";
import { ref, onMounted, computed } from "vue";
import { lib } from "crypto-js";
import { errorMessages } from "vue/compiler-sfc";
const libtodo = ref(null);
const libaddtodo = ref([]);
const textKeyWard = ref(null);
const authStore = useAuthStore();
const libraryStore = useLibraryStore();
const route = useRoute();
const placeholderText = ref("追加するToDO");
const isPlaceholderVisable = ref(true);
onMounted(async () => {
  try {
    await authStore.restoreSession();
    console.log("セッション復元成功");
    const routeId = route.params.id;
    libtodo.value = await libraryStore.fetchId(routeId);
    const todos = await libraryStore.getLibraryTodo();
    if (Array.isArray(todos)) {
      libaddtodo.value = todos
        .filter((libaddtodo) => libaddtodo.tag === routeId)
        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    } else {
      console.error("取得に失敗", error);
    }
  } catch (error) {
    console.error("データの取得エラー", error);
  }
});
function formatDate(date) {
  if (!date) return "日付不明";
  const details = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    hour12: true,
    minute: "2-digit",
  };
  return new Date(date).toLocaleDateString("ja-jp", details);
}
const LibrarycheckToDO = async (id, isCheck) => {
    try{
        const routeId = route.params.id;
        await libraryStore.libraryCheck(id, isCheck);
        console.log('チェック状態の更新。');
        if (libaddtodo.value.id === id || libtodo.value.id === routeId){
            libaddtodo.value.checklist === isCheck;
            libtodo.value.checklist === isCheck;
        }else{
            const add_index = libaddtodo.value.findIndex((todo) => todo.id === id);
            const todo_index = libtodo.value.findIndex((todo) => todo.id === routeId);
            if (add_index !== -1 || todo_index !== -1){
                libaddtodo.value[add_index].checklist = isCheck;
                libtodo.value[todo_index].checklist = isCheck;
            }
        }
    }catch(error){
        console.error(error);
        throw new Error;
    }
};
const handleFocus = () => {
  if (isPlaceholderVisable.value) {
    isPlaceholderVisable.value = false;
  }
};
const handleBlur = (event) => {
  if (!event.target.innerText.trim()) {
    isPlaceholderVisable.value = true;
  }
};
const submitLibAddToDO = async () => {
  const todoElement = textKeyWard.value?.innerText.trim();
  const todoTagId = route.params.id;
  const currentUser = authStore?.user?.id;
  if (!todoElement || todoElement === "追加するToDO") {
    alert("有効なTODOにしてください。");
    return;
  }
  if (!currentUser) {
    alert("ログインしてください");
    return;
  }
  try {
    const LibAddtodo = await libraryStore.LibraryAddtodo(
      todoTagId,
      todoElement,
      currentUser
    );
    if (LibAddtodo.tag === todoTagId) {
      libaddtodo.value.unshift(LibAddtodo);
      libaddtodo.value.sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
      );
      textKeyWard.value.innerText = "";
      isPlaceholderVisable.value = true;
      console.log("ToDOが正常に追加されました。");
    }
  } catch (error) {
    console.error("todoが追加されませんでした。");
  }
};
</script>
