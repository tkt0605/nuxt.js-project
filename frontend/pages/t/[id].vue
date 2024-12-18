<template>
    <div>
      <h1>ToDo詳細ページ</h1>
      <p>取得したID: {{ todo?.id }}</p>
      <p>タイトル: {{ todo?.title || "タイトルなし" }}</p>
      <p>内容: {{ todo?.todo || "内容がありません" }}</p>
    </div>
</template>

<script setup>
import { useAuthStore } from '~/store/auth';
import { useRoute } from 'vue-router';
// import { useRouter } from 'nuxt/app';
import { ref, onMounted } from 'vue';
const route = useRoute();
// const router = useRouter();
const authStore = useAuthStore();
const todo = ref(null);
onMounted(async () => {
  try {
    const todos = await authStore.getToDO();
    todo.value = todos.find((item) => item.id === route.params.id);
    if (!todo.value) {
      console.error('該当のToDoが見つかりません。');
    }
  } catch (error) {
    console.error('データ取得エラー:', error);
  }
});
</script>
