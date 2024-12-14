import { defineStore } from "pinia";
import { useRuntimeConfig } from "nuxt/app";

export const useTodoStore = defineStore("todo", {
  state: () => ({
    todolist: [],
    activeTabId: null,
  }),
  actions: {
    async fetchTodos() {
      // APIからToDoリストを取得
      const config = useRuntimeConfig();
      try {
        const response = await fetch(`${config.public.apiBase}/todolist/`);
        this.todolist = await response.json();
        if (this.todolist.length > 0) {
          this.activeTabId = this.todolist[0].id; // 最初のタブを選択
        }
      } catch (error) {
        console.error("ToDoの取得に失敗しました:", error);
      }
    },
    setActiveTab(id) {
      this.activeTabId = id;
    },
    async addTodo(newTodo) {
      // APIに新しいToDoを送信
      try {
        const response = await fetch(`${config.public.apiBase}/todolist/`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newTodo),
        });
        const createdTodo = await response.json();
        this.todolist.unshift(createdTodo);
        this.activeTabId = createdTodo.id; // 作成したタブをアクティブに
      } catch (error) {
        console.error("ToDoの作成に失敗しました:", error);
      }
    },
  },
  getters: {
    activeTab(state) {
      return state.todolist.find((todo) => todo.id === state.activeTabId);
    },
  },
});
