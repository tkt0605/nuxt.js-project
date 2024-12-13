import { defineStore } from "pinia";
import { useRuntimeConfig } from "nuxt/app";
export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: null,
        accessToken: localStorage.getItem('access_token') || null,
        refreshToken: localStorage.getItem('refresh_token') || null,
    }),
    actions: {
        async createToDO(title, todo) {
            const config = useRuntimeConfig();
            try{
                const response = await fetch(`${config.public.apiBase}/todolist/`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        title: title.trim(),
                        todo: todo.trim(),
                    }),
                });
                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.detail || "ToDOの作成に失敗しました。");
                }
                const data = await response.json();
                this.todo_post = {
                    title: title.trim(),
                    todo: todo.trim(),
                };
                this.title = data.title;
                this.todo = data.todo;
                localStorage.setItem('title', this.title);
                localStorage.setItem('todo', this.todo);

                return data.todo_post;
            }catch(error){
                console.error('ToDO作成に失敗しました。:', error);
                throw error;
            }
        },
        async login(email, password){
            const config = useRuntimeConfig();
            try{
                const response = await fetch(`${config.public.apiBase}/token/`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        // 'Authorization': 'Bearer',
                    },
                    body: JSON.stringify({
                        email: email.trim(),
                        password: password.trim(),
                    }),
                });
                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.detail || 'ログインに失敗しました');
                }
                const data = await response.json();
                this.user = { user: email.trim() };
                this.accessToken = data.access;
                this.refreshToken = data.refresh;

                localStorage.setItem('access_token', this.accessToken);
                localStorage.setItem('refresh_token', this.refreshToken);

                return data.user;
            }catch(error){
                console.error('ログインエラー:', error);
                throw error;
            }
        },
        async signup(email, password){
            const config = useRuntimeConfig();
            try{
                const response = await fetch(`${config.public.apiBase}/signup/`, {
                    method: "POST",
                    headers:{
                        'Content-Type': "application/json",
                    },
                    body: JSON.stringify({
                        email: email.trim(),
                        password: password.trim(),
                    }),
                });
                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.detail || 'アカウント登録に失敗しました');
                }
                await this.login(email, password);
            }catch(error){
                console.error("アカウント登録エラー:", error);
                throw error;
            }
        },
        async logout() {
            const config = useRuntimeConfig();
            try{
                const refreshToken = this.refreshToken;
                const response = await fetch(`${config.public.apiBase}/token/logout/`, {
                    method: "POST",
                    headers: {
                        'Content-type': 'application/json',
                    },
                    body: JSON.stringify({refresh: refreshToken}),
                });
                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.detail || 'ログアウトに失敗しました');
                }
                this.clearAuth();
            }catch(error){
                console.error('ログアウトエラー:', error);
                throw error;
            }
        },

        async refreshToken() {
            const config = useRuntimeConfig();
            try{
                const refreshToken = localStorage.getItem('refresh_token');
                const response = await fetch(`${config.public.apiBase}/token/refresh/`, {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                        // 'Authorization': 'Bearer',
                    },
                    body: JSON.stringify({refresh: refreshToken}),
                });
                this.accessToken = response.access;
                localStorage.setItem('access_token', this.accessToken);
                return this.accessToken;
            }catch(error){
                console.error('トークンリフレッシュエラー:', error);
                throw error;
            }
        },
        clearAuth(){
            this.user = null;
            this.accessToken = null;
            this.refreshToken = null;

            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
        },
    },
    getters: {
        isAuthenticated(state){
            return !!state.accessToken;
        },
        currentUser(state){
            return state.user;
        },
    },
});
