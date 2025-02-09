import CryptoJS from "crypto-js";
import { defineStore } from "pinia";
import {
  encryptData,
  decryptData,
  generateSecretKey,
} from "@/utils/encrypt.js";
import { useRuntimeConfig } from "nuxt/app";
import { useRouter } from "nuxt/app";
import { useAuthStore } from "~/store/auth";
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
        // return {
        //   id: data.id,
        //   name: this.decryptLibraryName(data),
        //   owner: data.owner,
        //   members: data.members,
        //   created_at: data.created_at,
        // };
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
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${authStore.accessToken}`,
          },
        });

        if (!response.ok) throw new Error("ライブラリ取得エラー");
        const data = await response.json();
        return data.map((library) => ({
          id: library.id,
          name: this.decryptLibraryName(library),
          owner: library.owner,
          members: library.members,
          created_at: library.created_at,
        }));
      } catch (error) {
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
  },
});
