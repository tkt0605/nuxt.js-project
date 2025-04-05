import { defineStore } from "pinia";
import { useAuthStore } from "~/store/auth";
const SEARCH_HISTORY = 'search_history';
export const useHistoryStore = defineStore("history", {
    state: () => ({
        history: [],
        userId: null,
    }),
    actions:{
        setUserId(id){
            this.userId = id;
        },
        getUserHistory(){
            // const  authStore = useAuthStore();
            return `${SEARCH_HISTORY}_${this.userId}`;
        },
        addHistory(target, url){
            if (!target || !url) return;
            console.log("検索履歴に追加・完了しました。");
            const index = this.history.findIndex((item) => item.target === target && item.url === url);
            if (index !== -1){
                this.history.splice(index, 1)
            }
            this.history.unshift({target, url});
            if (this.history.length > 10) {
                this.history.pop()
            }
            const key = this.getUserHistory();
            localStorage.setItem(key, JSON.stringify(this.history));
        },
        loadHistory(){
            try{
                const key = this.getUserHistory();
                const save = localStorage.getItem(key);
                if (save){
                    const parsed = JSON.parse(save)
                    if (Array.isArray(parsed)){
                        this.history = parsed
                    }
                }
            }catch(error){
                console.error('履歴のロード・失敗：', error);
                throw new Error("Loading Error...");

            }
        },
        clearHistory(){
            this.history = [];
            const key = this.getUserHistory();
            localStorage.removeItem(key);
        }
    }
});
