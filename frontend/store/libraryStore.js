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
import { useCookie } from "nuxt/app";
import { renderSlot } from "vue";
import { walk } from "vue/compiler-sfc";
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
      const token = useCookie("access_token");
      try {
        const response = await fetch(`${config.public.apiBase}/library/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token.value}`
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
      const token = useCookie("access_token");
      try {
        const response = await fetch(`${config.public.apiBase}/library/`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token.value}`,
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
        // const token = useCookie("access_token").value;
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
      const token = useCookie("access_token");
      try{
        const response = await fetch(`${config.public.apiBase}/library/${id}/`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token.value}`
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
    async LibraryNameEdit(id, name){
      const config = useRuntimeConfig();
      const authStore = useAuthStore();
      const token = useCookie("access_token");
      const secretKey = generateSecretKey(); // 🔑 秘密鍵生成
      const encryptedName = encryptData(name, secretKey); // 🔒 ライブラリ名を暗号化
      try{
        const response = await fetch(`${config.public.apiBase}/library/${id}/`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token.value}`
          },
          body: JSON.stringify({
            name: encryptedName,
          })
        });
        if (!response.ok){
          const errorData = await response.json();
          throw new Error(errorData.detail || "Error");
        }
        const data = await response.json();
        localStorage.setItem(`library_key_${data.id}`, secretKey); // 🔑 秘密鍵を保存
        this.libraries.push(data);
        // return data.map((item)=>({
        //   id: item.id,
        //   name: this.decryptLibraryName(item),
        // }));
        return data;
      }catch(error){
        console.error(error);
        throw new Error;
      }
    },
    async CreateLibraryToken(library) {
      const config = useRuntimeConfig();
      const authStore = useAuthStore();
      const token = useCookie("access_token");
      try{
        const response = await fetch(`${config.public.apiBase}/librarytoken/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token.value}`
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
    // async getTokenId(library){
    //   const cinfig = useRuntimeConfig();
    //   const authStore = useAuthStore();
    //   try{
    //     const response = await fetch(`${cinfig.public.apiBase}/library/`)
    //   }
    // },
    async libraryToken(){
      const config = useRuntimeConfig();
      const authStore = useAuthStore();
      const token = useCookie("access_token");
      try{
        const response = await fetch(`${config.public.apiBase}/librarytoken/`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token.value}`
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
      const token = useCookie("access_token");
      try{
        const currentlibraryResponse = await fetch(`${config.public.apiBase}/library/${id}/`, {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token.value}`
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
            "Authorization": `Bearer ${token.value}`
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

    async fetchId(id) {
      const config = useRuntimeConfig();
      const authStore = useAuthStore();
      const token = useCookie("access_token");
      try{
        const [response, response_head] = await Promise.allSettled([
          fetch(`${config.public.apiBase}/library/${id}/`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token.value}`
            }
          }),
          fetch(`${config.public.apiBase}/libtodo/${id}/`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token.value}`
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
    async CreateTodo(tag, todo, auther){
      const config = useRuntimeConfig();
      const authStore = useAuthStore();
      const token = useCookie("access_token");
      try{
        const [libtodo, addtodo] = await Promise.allSettled([
          fetch(`${config.public.apiBase}/libtodo/`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token.value}`
            },
            body: JSON.stringify({
              tag: tag,
              todo: todo.trim(),
              auther: auther
            })
          }),
          fetch(`${config.public.apiBase}/libadd/`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token.value}`,
            },
            body: JSON.stringify({
              tag: tag,
              todo: todo.trim(),
              auther: auther
            })
          })
        ]);
        let Headtodo = null;
        let Addtodo = null;
        if (libtodo.status="fulfilled" && libtodo.value.ok){
          Headtodo = await libtodo.value.json();
        }
        if (addtodo.status="fulfilled" && addtodo.value.ok){
          Addtodo = await addtodo.value.json();
        }
        if (Headtodo){
          return {
          id: Headtodo.id ?? null,
          tag: Headtodo.tag ?? null,
          auther: Headtodo.auther ?? null,
          todo: Headtodo.todo ?? null,
          created_at: Headtodo.created_at ?? null,
          };
        }else{
          return {
          id: Addtodo.id ?? null,
          tag: Addtodo.tag ?? null,
          todo: Addtodo.todo ?? null,
          auther: Addtodo.auther ?? null,
          checklist: Addtodo.checklist ?? null,
          created_at: Addtodo.created_at ?? null,
          };
        }
      }catch(error){
        console.error(error);
        throw new Error;
      }
    },
    async getLibraryTodo(){
      const config = useRuntimeConfig();
      const authStore = useAuthStore();
      const token = useCookie("access_token");
      try{
        const [response, response_header] = await Promise.all([
          fetch(`${config.public.apiBase}/libtodo/`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token.value}`
            }
          }),
          fetch(`${config.public.apiBase}/libadd/`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token.value}`
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
      const token = useCookie("access_token");
      try{
        const [head, add] = await Promise.allSettled([
          fetch(`${config.public.apiBase}/libtodo/${id}/`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token.value}`
            },
            body: JSON.stringify({
              checklist: isCheck
            }),
          }),
          fetch(`${config.public.apiBase}/libadd/${id}/`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token.value}`
            },
            body: JSON.stringify({
              checklist: isCheck
            })
          })
        ]);
        let headCheck = null;
        let addCheck = null;

        if (head.status === "fulfilled" && head.value.ok){
          headCheck = await head.value.json();
        }
        if (add.status === "fulfilled" && add.value.ok){
          addCheck = await add.value.json();
        }
        if(headCheck){
          return {
            id: headCheck.id ?? null,
            checklist: headCheck.checklist ?? null,
            created_at: headCheck.created_at ?? null,
          };
        }else{
          return{
            id: addCheck.id ?? null,
            checklist: addCheck.checklist ?? null,
            created_at: addCheck.created_at ?? null,
          };
        }
      }catch(error){
        console.error(error);
        throw new Error;

      }
    }
  },
});
