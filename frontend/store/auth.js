import { defineStore } from "pinia";
export const useAuthStore = defineStore('auth', {
    sate: () => ({
        user: null,
        accessToken: null,
        refreshToken: null,
    }),
    actions: {
        async login(email, password){
            try{
                const response = await this.$fetch('/api/login/', {
                    method: 'POST',
                    body: {email, password},
                });
                this.user = response.user;
                this.accessToken = response.access;
                this.refreshToken = response.refresh;

                localStorage.setItem('access_token', this.accessToken);
                localStorage.setItem('refresh_token', this.refreshToken);

                return response.user;
            }catch(error){
                console.error('ログインエラー:', error);
                throw error;
            }
        },
        async signup(email, password){
            try{
                await $fetch('/api/signup/', {
                    method: "POST",
                    body: {email, password},
                });

                await this.login(email, password);
            }catch(error){
                console.error("アカウント登録エラー:", error);
                throw error;
            }
        },
        async logout() {
            try{
                const refreshToken = this.refreshToken;
                await $fetch('/api/logout/', {
                    method: "POST",
                    body: {refresh: refreshToken}, 
                });

                this.clearAuth();
            }catch(error){
                console.error('ログアウトエラー:', error);
                throw error;
            }
        },

        async refreshToken() {
            try{
                const refreshToken = localStorage.getItem('refresh_token');
                const response = await $fetch('/api/token/refresh/', {
                    method: "POST",
                    body: {refresh: refreshToken},
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