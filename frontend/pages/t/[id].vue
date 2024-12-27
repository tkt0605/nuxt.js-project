<template>
  <Header/>
  <div class="id_bord">
    <div class="id_todo_list">
      <div class="item">
        <input type="checkbox" class="checkboxs"/>
        <div class="details">
          <p class="time">{{ formatDate(todolist?.created_at) }}</p>
          <p class="text">{{ todolist?.todo  }}</p>
        </div>
      </div>
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
import "../assets/css/pages/id.css";
import { useAuthStore } from '~/store/auth';
import { useRoute } from 'vue-router';
import { ref, onMounted } from 'vue';
import Header from '../../components/Header.vue';
const route = useRoute();
const authStore = useAuthStore();
const todolist = ref([]);
const addtodo = ref([]);
onMounted(async() => {
  try{
    // urlでのidを取得する引数を定義
    const routeId = route.params.id;
    // 取得したidをgetoDOByid()関数で該当するDBを持って来る。
    todolist.value = await authStore.getToDOByid(routeId);
    // getAddedToDO()を持って来る引数を定義する。
    const todos = await authStore.getAddedToDO();
    // todosでのtodo_tagと該当するrouteIdを抽出。
    if (Array.isArray(todos)){
      addtodo.value = todos.filter(addtodo => addtodo.todo_tag === routeId);
    }else{
      console.error('追加todoの取得に失敗しました。', error);
    }
  }catch(error){
    console.error("データの取得エラー:", error);
  }
});
const submitAddToDO = async()=>{
  const todoElement = document.getElementById('text_keybord');
  const todoContent = todoElement?.innerText.trim();
  const todoTagId = route.params.id;
  if (!todoContent){
    console.log('ToDOの内容が空です。');
  }
  try{
    const newAddToDo = await authStore.addToDO(todoTagId, todoContent);
    // もし、
    if (newAddToDo.todo_tag === todoTagId){
      addtodo.value.unshift(newAddToDo);
      todoElement.innerText = '';
      console.log('ToDOが作成されました。');
    }else{
      console.error('追加されたToDOのタグが一致しません。');
    }
  }catch(error){
    console.error("todoが追加されませんでした。", error);
    throw error;
  }
}
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
