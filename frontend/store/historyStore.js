import { defineStore } from "pinia";
import { useAuthStore } from "./auth";
const SERACH_HISTORY = "search_history";
export const useHistoryStore = defineStore("history", {
    state: () => ({
        history: [],
        userId: null,
    }),
    actions: {
        setUser(userId){
            this.userId = userId;
        },
        getHistoryStorage(){
            const authStore = useAuthStore();
            const user = authStore.currentUser;
            if(!user.code_name)throw new Error("codenameが未定義です。");
            return `${SERACH_HISTORY}_${user.code_name}`;
        },
        Addhistory(target, link){
            if (!target || !link) return;
            console.log("💾 Addhistory 実行:", { target, link });
            const index = this.history.findIndex((item)=> item.target === target);
            if (index !==-1){
                this.history.splice(index, 1);
            }
            this.history.unshift({target, link});
            if (this.history.length > 10){
                this.history.pop()
            }
            const key = this.getHistoryStorage();
            localStorage.setItem(key, JSON.stringify(this.history));
        },
        Loadhistory(){
            try{
                // const key = `${SERACH_HISTORY}`;
                const key = this.getHistoryStorage();
                const saved = localStorage.getItem(key);
                if(saved){
                    const parsed = JSON.parse(saved);
                    if (Array.isArray(parsed)){
                        this.history = parsed;
                    }
                }
            }catch(error){
                console.error("検索履歴のロード失敗:", error);
            }
        },
        Clearhistory(){
            this.history = [];
            const key = this.getHistoryStorage();
            // const key = `${SERACH_HISTORY}`;
            localStorage.removeItem(key);
        }
    }
})
