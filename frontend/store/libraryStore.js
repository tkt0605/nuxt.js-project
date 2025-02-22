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
          // method: "GET",
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
    async getLibraryId(id){
      const config = useRuntimeConfig();
      const authStore = useAuthStore();
      try{
        const response = await fetch(`${config.public.apiBase}/library/${id}/`, {
          method: 'GET',
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${authStore.accessToken}`
          }
        });
        if (!response.ok){
          const errorData = await response.json();
          throw new Error(errorData.detail || "Libraryの取得に失敗しました。");
        }
        const data = await response.json();
        console.log(`取得したLibrary:${data.name}`);
        return {
          id: data.id,
          // 元のdataというobjectから、秘密鍵を解析して名前を取得している
          name: this.decryptLibraryName(data),
          owner: data.owner,
          goal: data.goal,
          members: data.members,
          created_at: data.created_at,
        };
        // return data;
      }catch(error){
        console.error('Libraryの取得に失敗しました。');
        throw new error;
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
    async fetchLibraryId(id) {
      const config = useRuntimeConfig();
      const authStore = useAuthStore();
      try{
        const response = await fetch(`${config.public.apiBase}/library/${id}/`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${authStore.accessToken}`
          },
        });
        if (!response.ok){
          const errorData = await response.json();
          throw new Error(errorData.detail || "取得失敗");
        }
        const data = await response.json();
        return {
          goal: data.goal,
        }
      }catch(error){
        console.error(error);
        throw new error;
      }
    },
    // async getLibraryToken(library){
    //   const config = useRuntimeConfig();
    //   const authStore = useAuthStore();
    //   try{
    //     const response = await fetch(`${config.public.apiBase}/librarytoken/${library}/`, {
    //       method: "GET",
    //       headers: {
    //         "Content-Type": "application/json",
    //         "Authorization": `Bearer ${authStore.accessToken}`
    //       }
    //     });
    //     if(!response){
    //       const errorData = await response.json();
    //       throw new Error(errorData.detail || "トークンの取得失敗");
    //     }
    //     const data = await response.json();
    //     return {
    //       library: data.library,
    //       token: data.token
    //     }
    //   }catch(error){
    //     console.error(error);
    //     throw new Error(error);
    //   }
    // },
    async CreateLibraryToken(library) {
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
            library: library,
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
    async CreateLibraryTodo(library, auther, todo){
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
            library: library,
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
          library: data.library,
          auther: data.auther,
          todo: data.todo,
          created_at: data.created_at
        }
      }catch(error){
        console.error(error);
        throw new Error
      }
    },
    async getLibraryTodo(){
      const config = useRuntimeConfig();
      const authStore = useAuthStore();
      try{
        const response = await fetch(`${config.public.apiBase}/libtodo/`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${authStore.accessToken}`
          },
        });
        if (!response.ok){
          const errorData = await response.json();
          throw new Error(errorData.detail || "ライブラリToDoの取得に失敗");
        }
        const data = await response.json();
        if (!Array.isArray(data)){
          throw new Error('APIレスポンスが取得できない。', error);
        }
        console.log(`取得したLibraryのID:`, data);
        return data.map(data => ({
          id: data?.id,
          title: data?.title,
          library: data?.library,
          auther: data?.auther,
          todo: data?.todo,
          created_at: data?.created_at
        })) || data;
      }catch(error){
        console.error(error);
        throw new Error;
      }
    },
    async fetchLibraryTodoId(){
      const config = useRuntimeConfig();
      const authStore = useAuthStore();
      try{
        const response = await fetch(`${config.public.apiBase}/libtodo/`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${authStore.accessToken}`,
          }
        });
        if (!response.ok){
          const errorData = await response.json();
          throw new Error(errorData.detail || "ライブラリToDOのID取得失敗。");
        }
        const data = await response.json();
        return {
          id: data.id,
          library: data.library,
          auther: data.auther,
          todo: data.todo,
          created_at: data.created_at
        };
      }catch(error){
        console.error(error);
        throw new Error;
      }
    },
  },
});
