<template>
    <div class="todo-details">
    <NuxtLink to="/" class="back-link">← 戻る</NuxtLink>
    <h1 class="todo-title">{{ todo?.title || "タイトルなし" }}</h1>
    <p class="todo-content">{{ todo?.todo || "内容がありません" }}</p>
    <p class="todo-created">作成日: {{ formatDate(todo?.created_at) || "不明" }}</p>
  </div>
</template>
<script setup>
import '../../assets/css/_id.css';
import { useAuthStore } from '../../store/auth';
import { useRoute } from 'nuxt/app';
import { onMounted, ref } from 'vue';

const route = useRoute();
const authStore = useAuthStore();
const todoId = route.params.id;
const todo = ref(null);

const formatDate = (date) => new Date(date).toLocaleString();
const fetchTodo = async() => {
    try{
        const todos = await authStore.getToDO();
        todo.value = todos.find((item) => item.id === todoId);
        if (!todo.value) {
            throw new Error('指定されたToDOが見つかりません。');
        }
    }catch(error){
        console.error('ToDoの詳細の詳細エラー:', error);
        throw error;
    }
};
onMounted(fetchTodo);
</script>
