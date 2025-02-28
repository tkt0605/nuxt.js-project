import CryptoJS from "crypto-js";
import { defineStore } from "pinia";
import {
  encryptData,
  decryptData,
  generateSecretKey,
} from "@/utils/encrypt.js";
import { definePayloadPlugin, useAppConfig, useRuntimeConfig } from "nuxt/app";
import { useRouter } from "nuxt/app";
import { useAuthStore } from "~/store/auth";
import { renderSlot } from "vue";
export const useLibraryStore = defineStore("library", {
  state: () => ({
    libraries: [],
  }),
  actions: {
    async createLibrary(name, owner, members) {
      const config = useRuntimeConfig();
      const authStore = useAuthStore();
      const secretKey = generateSecretKey(); // 🔑 秘密鍵生成
      const encryptedName = encryptData(name, secretKey); // 🔒 ライブラリ名を暗号化
      try {
        const response = await fetch(`${config.public.apiBase}/library/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${authStore.accessToken}`,
          },
          body: JSON.stringify({
            name: encryptedName,
            owner: owner,
            members: members,
          }),
        });

        if (!response.ok) throw new Error("ライブラリ作成エラー");
        const data = await response.json();
        localStorage.setItem(`library_key_${data.id}`, secretKey); // 🔑 秘密鍵を保存
        this.libraries.push(data);
        return data;
      } catch (error) {
        console.error("ライブラリ作成失敗:", error);
        throw error;
      }
    },

    async fetchLibraries() {
      const authStore = useAuthStore();
      const config = useRuntimeConfig();
      try {
        const response = await fetch(`${config.public.apiBase}/library/`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${authStore.accessToken}`,
          },
        });

        if (!response.ok) throw new Error("ライブラリ取得エラー");
        const data = await response.json();
        // フックになる引数がない場合では、dataオブジェクトをmapとしてlibraryという引数を新規定義
        return data.map((library) => ({
          id: library.id,
          // 新規定義している引数libraryを元データとして秘密鍵の解析を実行。
          name: this.decryptLibraryName(library),
          owner: library.owner,
          members: library.members,
          created_at: library.created_at,
        }));
      }catch(error){
        console.error("ライブラリ取得失敗:", error);
        throw error;
      }
    },
    decryptLibraryName(library) {
        const secretKey = localStorage.getItem(`library_key_${library.id}`);
        if (!secretKey){
            console.warn(`🔒 ライブラリ「${library.id}」の秘密鍵が見つかりません`);
            return "暗号化されたライブラリ";
        }
        try{
            const bytes = CryptoJS.AES.decrypt(library.name, secretKey);
            let decrypted = bytes.toString(CryptoJS.enc.Utf8);
            decrypted = decrypted.replace(/^"|"$/g, "");
            if (!decrypted){
              const errorData = console.error();
              throw new Error(errorData);
            }
            return decrypted;
        }catch(error){
            console.error(`復号エラー「ライブラリ： (${library.id})」:`, error);
            return "復号エラー";
        }
    },
    async LibraryCreategoal(id, goal){
      const config = useRuntimeConfig();
      const authStore = useAuthStore();
      try{
        const response = await fetch(`${config.public.apiBase}/library/${id}/`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${authStore.accessToken}`
          },
          body: JSON.stringify({
            goal: goal.trim(),
          })
        });
        if (!response.ok){
          const errorData = await response.json();
          throw new Error(errorData.detail || "Libraryの取得失敗");
        }
        console.log('GOALの作成完了');
        const data = await response.json();
        return data;
      }catch(error){
        console.error(error);
        throw new error;
      }
    },
    async CreateLibraryToken(tag) {
      const config = useRuntimeConfig();
      const authStore = useAuthStore();
      try{
        const response = await fetch(`${config.public.apiBase}/librarytoken/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${authStore.accessToken}`
          },
          body: JSON.stringify({
            tag: tag,
          })
        });
        if (!response.ok){
          const errorData = await response.json();
          throw new Error(errorData.detail || "Libraryのtoken作成の失敗");
        }
        const data = await response.json();
        return data;
      }catch(error){
        console.error(error);
        throw new error;
      }
    },
    async libraryToken(){
      const config = useRuntimeConfig();
      const authStore = useAuthStore();
      try{
        const response = await fetch(`${config.public.apiBase}/librarytoken/`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${authStore.accessToken}`
          },
        });
        if (!response.ok){
          const errorData = await response.json();
          throw new Error(errorData.detail || "Libraryのtokenの取得失敗");
        }
        const data = await response.json();
        return data.map((item) => ({
          library: item.library,
          token: item.token,
        }));
      }catch(error){
        console.error(error);
        throw new Error(error);
      }
    },
    async joinToLibrary(id, add_memberId){
      const config = useRuntimeConfig();
      const authStore = useAuthStore();
      try{
        const currentlibraryResponse = await fetch(`${config.public.apiBase}/library/${id}/`, {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${authStore.accessToken}`
          }
        });
        if (!currentlibraryResponse.ok){
          throw new Error('現在のライブラリの取得に失敗');
        }
        const currentDetail = await currentlibraryResponse.json();
        const CurrentMembers = currentDetail.members;
        const UpdateMember = [... new Set([...CurrentMembers, add_memberId])];
        const response = await fetch(`${config.public.apiBase}/library/${id}/`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${authStore.accessToken}`
          },
          body: JSON.stringify({
            members: UpdateMember,
          })
        });
        const data = await response.json();
        if (!response.ok){
          const errorData = await response.json();
          throw new Error(errorData.detail || "ライブラリの参加失敗");
        }
        console.log('ライブラリの参加完了：', data);
        return data;
      }catch(error){
        console.error('参加失敗：', error);
        throw new Error;
      }
    },
    async CreateLibraryTodo(tag, auther, todo){
      const config = useRuntimeConfig();
      const authStore = useAuthStore();
      try{
        const response = await fetch(`${config.public.apiBase}/libtodo/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${authStore.accessToken}`
          },
          body: JSON.stringify({
            tag: tag,
            auther: auther,
            todo: todo.trim(),
          })
        });
        if (!response.ok){
          const errorData = await response.json();
          throw new Error(errorData.detail || "ライブラリ内のToDo作成失敗。");
        }
        const data = await response.json();
        console.log("Success!!", data);
        return {
          id: data.id,
          tag: data.tag,
          auther: data.auther,
          todo: data.todo,
          created_at: data.created_at
        }
      }catch(error){
        console.error(error);
        throw new Error
      }
    },


    async fetchId(id) {
      const config = useRuntimeConfig();
      const authStore = useAuthStore();
      try{
        const [response, response_head] = await Promise.allSettled([
          fetch(`${config.public.apiBase}/library/${id}/`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${authStore.accessToken}`
            }
          }),
          fetch(`${config.public.apiBase}/libtodo/${id}/`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${authStore.accessToken}`
            }
          })
        ]);
        let libraryData = null;
        let libtodoData = null;
        if (response.status === "fulfilled" && response.value.ok && response.value) {
          libraryData = await response.value.json();
        }
        if (response_head.status === "fulfilled" && response_head.value.ok && response_head.value) {
          libtodoData = await response_head.value.json();
        }
        if(libraryData){
          return {
          id: libraryData?.id ?? null,
          name: this.decryptLibraryName(libraryData) ?? null,
          owner: libraryData?.owner ?? null,
          goal: libraryData?.goal ?? null,
          members: libraryData?.members ?? [],
          created_at: libraryData?.created_at ?? null,
          };
        }else{
          return{
            id: libtodoData.id ?? null,
            tag: libtodoData.tag ?? null,
            todo: libtodoData.todo ?? null,
            auther: libtodoData.auther ?? null,
            checklist: libtodoData.checklist ?? null,
            created_at: libtodoData.created_at ?? null,
          };
        }
      }catch(error){
        console.error(error);
        throw new Error;
      }
    },
    async LibraryAddtodo(tag, todo, auther){
      const config = useRuntimeConfig();
      const authStore = useAuthStore();
      try{
        const response = await fetch(`${config.public.apiBase}/libadd/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${authStore.accessToken}`,
          },
          body: JSON.stringify({
            tag: tag,
            todo: todo.trim(),
            auther: auther,
          })
        });
        if (!response.ok){
          const errorData = await response.json();
          throw new Error(errorData.detail || "ToDOの追加は失敗しました。");
        }
        const data = await response.json();
        return {
          id: data.id,
          tag: data.tag,
          todo: data.todo,
          auther: data.auther,
          checklist: data.checklist,
          created_at: data.created_at,
        }
      }catch(error){
        console.error(error);
        throw new Error;
      }
    },
    async getLibraryTodo(){
      const config = useRuntimeConfig();
      const authStore = useAuthStore();
      try{
        const [response, response_header] = await Promise.all([
          fetch(`${config.public.apiBase}/libtodo/`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${authStore.accessToken}`
            }
          }),
          fetch(`${config.public.apiBase}/libadd/`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${authStore.accessToken}`
            }
          })
        ]);
        if (!response.ok || !response_header.ok){
          const errorData = await response.json() || await response_header.json();
          throw new Error(errorData.detail || "ToDOの取得を失敗");
        }
        const data = await response.json();
        const data_header = await response_header.json();
        if (!Array.isArray(data)){
          throw new Error('APIレスポンスが配列ではありません。')
        };
        if (!Array.isArray(data_header)){
          throw new Error('APIレスポンスが配列ではありません。')
        };
        return [...(data || []), ...(data_header || [])];
      }catch(error){
        console.error(error);
        throw new Error;
      }
    },
    async libraryCheck(id, isCheck){
      const config = useRuntimeConfig();
      const authStore = useAuthStore();
      try{
        const response = await fetch(`${config.public.apiBase}/libadd/${id}/`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${authStore.accessToken}`
          },
          body: JSON.stringify({
            checklist: isCheck,
          }),
        });
        const response_header = await fetch(`${config.public.apiBase}/libtodo/${id}/`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${authStore.accessToken}`
          },
          body: JSON.stringify({
            checklist: isCheck,
          }),
        });
        if (!response.ok || !response_header.ok){
          const errorData = await response.json() || await response_header.json();
          throw new Error(errorData.detail || "todoのチェックに失敗しました。");
        }
        const data = await response.json();
        const data_header = await response_header.json();
        return {
          id: data.id || data_header.id,
          checklist: data.checklist || data_header.checklist,
          created_at: data.created_at || data_header.created_at,
        };
      }catch(error){
        console.error("ToDOのチェック機能エラー", error);
        throw error;
      }
    },
  },
});
