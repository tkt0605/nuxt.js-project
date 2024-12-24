<template>
  <Header/>
  <div class="bord">
    <div class="todo_list">
      <div class="item">
        <input type="checkbox" class="checkboxs"/>
        <div class="details">
          <p class="time">{{ formatDate(todolist?.created_at) }}</p>
          <p class="text">{{ todolist?.todo  }}</p>
        </div>
      </div>
      <br>
      <div v-if="addtodo.length > 0">
        <div v-for="todo in addtodo" :key="todo.id" class="item">
          <input type="checkbox" class="checkboxs"/>
          <div class="details">
            <p class="time">{{ formatDate(todo?.created_at) }}</p>
            <p class="text">{{ todo?.todo  }}</p>
          </div>
        </div>
      </div>
      <div v-else>
      </div>
    </div>
    <div class="text-base">
      <div class="">
        <div class="form">
          <div class="texter" id="texter">
            <div id="text_keybord" ref="textKeybord" class="text_keybord" contenteditable="true" data-placeholder="あなたのすべきことは？" >
              <p></p>
            </div>
          </div>
          <div class="flex-button">
            <span class="flex-button-span">
              <button type="button" class="submit_button"  @click="submitAddToDO">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" class="icon-2xl">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M15.1918 8.90615C15.6381 8.45983 16.3618 8.45983 16.8081 8.90615L21.9509 14.049C22.3972 14.4953 22.3972 15.2189 21.9509 15.6652C21.5046 16.1116 20.781 16.1116 20.3347 15.6652L17.1428 12.4734V22.2857C17.1428 22.9169 16.6311 23.4286 15.9999 23.4286C15.3688 23.4286 14.8571 22.9169 14.8571 22.2857V12.4734L11.6652 15.6652C11.2189 16.1116 10.4953 16.1116 10.049 15.6652C9.60265 15.2189 9.60265 14.4953 10.049 14.049L15.1918 8.90615Z" fill="currentColor"></path>
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
import { useAuthStore } from '~/store/auth';
import { useRoute } from 'vue-router';
import { ref, onMounted } from 'vue';
import Header from '../../components/Header.vue';
const route = useRoute();
const authStore = useAuthStore();
const todolist = ref([]);
const addtodo = ref([]);
// onMounted(async () => {
//   try {
//     const route_id = route.params.id;
//     const todos = await authStore.getAddedToDO();
//     if (!Array.isArray(todos)){
//       addtodo.value = todos;
//     // if (todos.todo_tag === todolist.value.id ) {
//       addtodo.value = todos;
//     }else{
//       console.error(error)
//     }
//     todolist.value = await authStore.getToDOByid(route_id);
//     addtodo.value = await authStore.getAddedTodoId(todos.id);
//     if (!todolist.value || !addtodo.value) {
//       console.error('該当のToDoが見つかりません。');
//     }
//   } catch (error) {
//     console.error('データ取得エラー:', error);
//   }
// });
// const submitAddToDO = async() =>{
//   const todoElement = document.getElementById('text_keybord');
//   const todoContent = todoElement.innerText.trim();
//   const todotagId = route.params.id;
//   if  (!todoContent) {
//     console.log('追加できませんでした。');
//     return;
//   };
//   try{
//     const addtodo = await authStore.addToDO(todotagId, todoContent);
//     if (todotagId === addtodo.todo_tag){
//       // const addtodo = await authStore.addToDO(todotagId, todoContent);
//       addtodo.value = await authStore.getAddedToDO();
//       todoElement.innerText = '';
//     }
//     console.log('todoが作成されました。');
//     return addtodo;
//   }catch(error){
//     console.error("追加に失敗しました。", error);
//     throw error;
//   }
// };

onMounted(async () => {
  try {
    const routeId = route.params.id;
    todolist.value = await authStore.getToDOByid(routeId);
    const todos = await authStore.getAddedToDO();
    console.log('取得した追加ToDoリスト:', todos);
    if (Array.isArray(todos)) {
      addtodo.value = todos.filter(addedtodo => addedtodo.todo_tag === routeId);
    } else {
      console.error('追加ToDoの取得に失敗しました。');
    }
  } catch (error) {
    console.error('データ取得エラー:', error);
  }
});

const submitAddToDO = async () => {
  const todoElement = document.getElementById('text_keybord');
  const todoContent = todoElement?.innerText.trim();
  const todoTagId = route.params.id;

  // 入力内容が空の場合は処理しない
  if (!todoContent) {
    console.log('ToDoの内容が空です。');
    return;
  }

  try {
    // ToDoを追加
    const newAddToDo = await authStore.addToDO(todoTagId, todoContent);

    // 追加されたToDoが現在のルートIDに対応している場合のみ追加
    if (newAddToDo.todo_tag === todoTagId) {
      addtodo.value.unshift(newAddToDo); // 新しいToDoをリストに追加
      todoElement.innerText = ''; // 入力フィールドをクリア
      console.log('ToDoが作成されました。');
    } else {
      console.error('追加されたToDoのタグが一致しません。');
    }
  } catch (error) {
    console.error('ToDoの追加に失敗しました:', error);
    throw error;
  }
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
}
</script>
