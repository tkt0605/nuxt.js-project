<template>
  <Header />
  <div class="id_bord">
    <div class="id_todo_list">
      <div class="item">
        <input
          type="checkbox"
          :checked="todolist.checklist"
          @change="checkToDO(todolist.id, $event.target.checked)"
          class="checkboxs"
        />
        <div class="details">
          <p class="time">{{ formatDate(todolist?.created_at) }}</p>
          <!-- <p class="text">{{ todolist?.todo }}</p> -->
           <p class="text" v-html="convertLinks(todolist?.todo)"></p>
        </div>
      </div>
      <div v-if="addtodo.length > 0">
        <div v-for="todo in addtodo" :key="todo.id" class="item">
          <input type="checkbox" :checked="todo.checklist" @change="checkAddToDO(todo.id, todo.todo_tag, $event.target.checked)" class="checkboxs" />
          <div class="details">
            <p class="time">{{ formatDate(todo?.created_at) }}</p>
            <!-- <p class="text">{{ todo?.todo }}</p> -->
            <p class="text" v-html="convertLinks(todo?.todo)"></p>
          </div>
        </div>
      </div>
      <div v-else></div>
    </div>
    <div class="text-base_id">
      <div class="">
        <div class="form_id">
          <div class="texter" id="texter">
            <div
              id="text_keybord"
              class="text_keybord"
              ref="textKeybord"
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
              <button
                type="button"
                class="submit_button"
                @click="submitAddToDO"
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
  </div>
</template>

<script setup>
import "../assets/css/pages/id.css";
import { useAuthStore } from "~/store/auth";
import { useRoute } from "vue-router";
import { ref, onMounted } from "vue";
import Header from "../../components/Header.vue";
const textKeybord = ref(null);
const route = useRoute();
const authStore = useAuthStore();
const todolist = ref([]);
const addtodo = ref([]);
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
const convertLinks = (text) => {
  if (!text) return "";
  return text.replace(
    /(https?:\/\/[^\s]+|www\.[^\s]+)/g,
    (url) => {
      let href = url;
      if (!url.startsWith("http")) {
        href = "https://" + url;
      }
      return `<a href="${href}" target="_blank" rel="noopener noreferrer">${url}</a>`;
    }
  );
};
onMounted(async () => {
  try {
    await authStore.restoreSession();
    console.log("セッション復元成功。");
    const routeId = route.params.id;
    todolist.value = await authStore.getToDOByid(routeId);
    const todos = await authStore.getAddedToDO();
    if (Array.isArray(todos)) {
      // addtodo.value = todos.filter((addtodo) => addtodo.todo_tag === routeId);
      addtodo.value = todos.filter((addtodo) => addtodo.todo_tag === routeId).sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    } else {
      console.error("追加todoの取得に失敗しました。", error);
    }
  } catch (error) {
    console.error("データの取得エラー:", error);
  }
});
const checkToDO = async (id, isCheck) => {
  try {
    await authStore.ToDOchecklist(id, isCheck);
    console.log("チェック状態の更新が起こりました。");
    if (todolist.value.id === id) {
      todolist.value.checklist = isCheck;
    } else {
      const index = todolist.value.findIndex((todolist) => todolist.id === id);
      if (index !== -1) {
        todolist.value[index].checklist = isCheck;
      }
    }
  } catch (error) {
    console.error("チェックの更新中にエラーが発生しました:", error);
  }
};
const checkAddToDO = async(id, todo_tag, isCheck) => {
  try{
    const routeId = route.params.id;
    await authStore.AddToDOchecklist(id, todo_tag, isCheck);
    console.log("チェック状態の更新が起こりました。(追加)");
    if (addtodo.value.id === id, addtodo.value.todo_tag === routeId){
      addtodo.value.checklist === isCheck;
    }else{
      const add_index = addtodo.value.findIndex((todo) => todo.id === id && todo.todo_tag ===todo_tag);
      if (add_index !== -1){
        addtodo.value[add_index].checklist = isCheck;
      }
    }
  }catch(error){
    console.log("チェックの更新時にエラー発生:", error);
  }
}
const submitAddToDO = async () => {
  // const todoElement = document.getElementById('text_keybord');
  // const todoContent = todoElement?.innerText.trim();
  const todoContent = textKeybord.value?.innerText.trim();
  const todoTagId = route.params.id;
  if(!todoContent || todoContent === "あなたのToDO") {
    alert('有効なToDOの内容にしてください。');
    return;
  }
  try {
    const newAddToDo = await authStore.addToDO(todoTagId, todoContent);
    if (newAddToDo.todo_tag === todoTagId) {
      addtodo.value.unshift(newAddToDo);
      addtodo.value.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
      // todoElement.innerText = "";
      textKeybord.value.innerText = "";
      isPlaceholderVisible.value = true;
      console.log("ToDOが作成されました。");
    }
  } catch (error) {
    console.error("todoが追加されませんでした。", error);
    throw error;
  }
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
</script>
