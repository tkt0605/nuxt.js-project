import { defineStore } from "pinia";
import { useRuntimeConfig } from "nuxt/app";
const storage = {
    get(key) {
        return JSON.parse(localStorage.getItem(key));
    },
    set(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    },
    remove(key) {
        localStorage.removeItem(key);
    },
};
export const useAuthStore = defineStore('auth', {
    state: () => ({
        todolist: [],
        user: null,
        accessToken: null,
        refreshToken: null,
    }),
    actions: {
        clearAuth(){
            this.user = null;
            this.accessToken = null;
            this.refreshToken = null;

            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            localStorage.removeItem('user');
        },
        async restoreSession() {
            if (process.server) return; // サーバーサイドでは何もしない
            const accessToken = localStorage.getItem('access_token'); // キー名を統一
            const refreshToken = localStorage.getItem('refresh_token');
            const user = JSON.parse(localStorage.getItem('user')); // ユーザー情報も復元
            if (accessToken && refreshToken && user) {
                this.accessToken = accessToken;
                this.refreshToken = refreshToken;
                this.user = user;

                // オプション: トークンを検証するためにサーバーに確認を送信
                try {
                    await this.refreshToken(); // 必要に応じてトークンをリフレッシュ
                } catch (error) {
                    console.error('トークン検証またはリフレッシュに失敗しました:', error);
                    this.clearAuth(); // トークンが無効ならログアウト処理
                }
            } else {
                this.clearAuth(); // トークンやユーザー情報がない場合はログアウト状態にする
            }
        },
        async refreshToken() {
            const config = useRuntimeConfig();
            try {
                const refreshToken = process.client? storage.get('refresh_token'): null;
                if (!refreshToken) throw new Error('リフレッシュトークンがありません');

                const response = await fetch(`${config.public.apiBase}/token/refresh/`, {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ refresh: refreshToken }),
                });

                if (!response.ok) throw new Error('トークンリフレッシュに失敗しました');

                const data = await response.json();
                this.accessToken = data.access;

                if (process.client) {
                    // localStorage.setItem('access_token', this.accessToken);
                    storage.set('access_token', this.accessToken);
                }

                return this.accessToken;
            } catch (error) {
                console.error('トークンリフレッシュエラー:', error);
                this.clearAuth();
                throw error;
            }
        },
        async createToDO(title, todo) {
            const config = useRuntimeConfig();
            try{
                const response = await fetch(`${config.public.apiBase}/todolist/`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${this.accessToken}`,
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
                // storage.set('title', this.title);
                // storage.set('todo', this.todo);

                return data.todo_post;
            }catch(error){
                console.error('ToDO作成に失敗しました。:', error);
                throw error;
            }
        },
        async getToDO(){
            const config = useRuntimeConfig();
            try{
                const response = await fetch(`${config.public.apiBase}/todolist/`, {
                    method: 'GET',
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${this.accessToken}`,
                    },
                });
                if(!response.ok){
                    const errorData = await response.json();
                    throw new Error(errorData.detail || "ToDOの取得に失敗しました。");
                };
                const data = await response.json();
                console.log("取得したToDOリスト:", data);
                if (!Array.isArray(data)) {
                    throw new Error('APIレスポンスが配列ではありません。');
                }
                return data.map(todo => ({
                    id: todo?.id,
                    title: todo?.title, // titleがない場合はデフォルト値
                    todo: todo?.todo,           // todoがない場合は空文字
                    created_at: todo?.created_at, // created_atがない場合はデフォルト値
                }));
            }catch(error){
                console.error('ToDOリスト取得エラー:', error);
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
                        "Authorization": `Bearer ${this.accessToken}`,
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
                // storage.set('access_token', this.accessToken);
                // storage.set('refresh_token', this.refreshToken);

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
        // async refreshToken() {
        //     const config = useRuntimeConfig();
        //     try{
        //         const refreshToken = localStorage.getItem('refresh_token');
        //         const response = await fetch(`${config.public.apiBase}/token/refresh/`, {
        //             method: "POST",
        //             headers: {
        //                 'Content-Type': 'application/json',
        //             },
        //             body: JSON.stringify({refresh: refreshToken}),
        //         });
        //         this.accessToken = response.access;
        //         localStorage.setItem('access_token', this.accessToken);
        //         return this.accessToken;
        //     }catch(error){
        //         console.error('トークンリフレッシュエラー:', error);
        //         throw error;
        //     }
        // },
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
