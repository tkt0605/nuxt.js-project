import { defineStore } from "pinia";
import { useFetch, useRuntimeConfig } from "nuxt/app";
import { useRouter } from "nuxt/app";
import { useAuthStore } from "./auth";
export const useSearchStore = defineStore('search', {
    state: () => ({
        keybord: "",
        results: [],
        loading: false,
        error: null,
        timer: null,
    }),
    actions: {
        async GlobalSearchEngine () {
            const config = useRuntimeConfig();
            const authStore = useAuthStore();
            try{
                const q = encodeURIComponent(this.keybord);
                const url = `${config.public.apiBase}/search/?q=${q}`;
                this.loading = true;
                this.error = null;
                const response = await fetch(url, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${authStore.accessToken}`,
                    },
                });
                if (!response.ok){
                    const errorData = await response.json();
                    throw new Error(errorData?.detail || "検索エンジンの誤作動");
                }
                const data = await response.json();
                this.results = data;
            }catch(error){
                this.error = error;
                this.results = [];
            }finally{
                this.loading = false;
            }
        },
        debounceSearch(delay = 300){
            if (this.timer)clearTimeout(this.timer)
            this.timer = setTimeout(()=> this.GlobalSearchEngine(), delay)
        },
        clear(){
            this.keybord = "";
            this.error = null;
            this.results = [];
        }
    }
});
