import { defineStore } from "pinia";
import { useRuntimeConfig } from "nuxt/app";
import { useRouter } from "nuxt/app";
import { jwtDecode } from "jwt-decode";
import { getTransitionRawChildren, nextTick, toDisplayString } from "vue";
import { useCookie } from "nuxt/app";
export const useAuthStore = defineStore("auth", {
  state: () => ({
    todolist: [],
    user: null,
    accessToken: null,
    refreshTokens: null,
    refreshTokenTimer: null,
  }),
  actions: {
    clearAuth() {
      this.user = null;
      this.accessToken = null;
      this.refreshTokens = null;
      if (this.refreshTokenTimer) {
        clearTimeout(this.refreshTokenTimer);
        this.refreshTokenTimer = null;
      }
      // localStorage.removeItem('access_token');
      // localStorage.removeItem('refresh_token');
      // localStorage.removeItem('user');

      useCookie("access_token").value = null;
      useCookie("refresh_token").value = null;
      useCookie("user").value = null;
    },
    // async restoreSession() {
    //   // if (process.server) return;
    //   // const accessToken_const = localStorage.getItem('access_token');
    //   // const refreshToken_const = localStorage.getItem('refresh_token');
    //   // const storeUser = JSON.parse(localStorage.getItem('user'));
    //   // if (accessToken_const && refreshToken_const && storeUser) {
    //   //     this.accessToken = accessToken_const;
    //   //     this.refreshTokens = refreshToken_const;
    //   //     this.user = storeUser;
    //   //     this.scheduleTokenRefresh();
    //   //     try {
    //   //         await this.refreshToken();
    //   //     } catch (error) {
    //   //         console.error('トークン検証またはリフレッシュに失敗しました:', error);
    //   //     }
    //   // } else {
    //   //     this.clearAuth();
    //   // }
    //   if (process.server) return;
    //   const accessToken_const = useCookie("access_token");
    //   const refreshToken_const = useCookie("refresh_token");
    //   const userCookie = useCookie("user");
    //   // const storeUser = [JSON.parse(user)] ? [] : null;
    //   let storeUser;
    //   if (typeof userCookie.value === "string") {
    //     try {
    //       storeUser = JSON.parse(userCookie.value);
    //     } catch (error) {
    //       console.error("❌ ユーザーデータの JSON 解析エラー:", error);
    //       storeUser = null;
    //     }
    //   } else {
    //     storeUser = userCookie.value;
    //   }
    //   if (accessToken_const && refreshToken_const && storeUser) {
    //     this.accessToken = accessToken_const.value;
    //     this.refreshTokens = refreshToken_const.value;
    //     this.user = storeUser;
    //     this.scheduleTokenRefresh();
    //     try {
    //       await this.refreshToken();
    //     } catch (error) {
    //       console.error("トークン検証またはリフレッシュに失敗しました:", error);
    //     }
    //   } else {
    //     this.clearAuth();
    //   }
    // },
    // // ここで問題
    // async refreshToken() {
    //   const config = useRuntimeConfig();
    //   // const refreshTokens = localStorage.getItem("refresh_token");
    //   const refreshTokens = useCookie("refresh_token", {path: "/",maxAge: 2592000});
    //   if (!refreshTokens.value) {
    //     console.error("リフレッシュトークンがありません。ログインが必要です。");
    //     throw new Error("リフレッシュトークンが存在しません。");
    //   }

    //   try {
    //     const response = await fetch(
    //       `${config.public.apiBase}/token/refresh/`,
    //       {
    //         method: "POST",
    //         headers: {
    //           "Content-Type": "application/json",
    //           // "credentials": "include",
    //         },
    //         body: JSON.stringify({ refresh: refreshTokens.value }),
    //       }
    //     );

    //     if (!response.ok) {
    //       const errorData = await response.json();
    //       console.error("トークンのリフレッシュに失敗しました:", errorData);
    //       throw new Error(`リフレッシュトークンエラー: ${errorData.detail}`);
    //     }
    //     const data = await response.json();
    //     // 新しいアクセストークンを保存
    //     // this.accessToken = data.access;
    //     // this.refreshTokens.value = data.refresh;
    //     //   localStorage.setItem("access_token", data.access);
    //     //   localStorage.setItem('refresh_token', data.refresh);
    //     // useCookie("access_token", { path: "/"}).value = data.access;
    //     // useCookie("refresh_token", { path: "/"}).value = data.refresh;
    //     const AccessToken = useCookie("access_token", {path: "/", maxAge: 3600});
    //     refreshTokens.value = data.refresh || refreshTokens.value;
    //     AccessToken.value = data.access;
    //     // data.refresh = refreshTokens.value;
    //     this.scheduleTokenRefresh();

    //     console.log("アクセストークンがリフレッシュされました");
    //     return data.access;
    //   } catch (error) {
    //     console.error("リフレッシュトークン処理中のエラー:", error.message);
    //     throw error;
    //   }
    // },
    // async scheduleTokenRefresh() {
    //   if (this.refreshTokenTimer) {
    //     clearTimeout(this.refreshTokenTimer);
    //   }
    //   if (!this.accessToken) return;
    //   try {
    //     const decode = jwtDecode(this.accessToken);
    //     const exprisesAt = decode.exp * 1000;
    //     const now = Date.now();
    //     const refreshTime = exprisesAt - now - 60000;
    //     if (refreshTime > 0) {
    //       this.refreshTokenTimer = setTimeout(() => {
    //         this.refreshToken();
    //       }, refreshTime);
    //       console.log(
    //         `アクセストークンのリフレッシュをスケジュールしました: ${
    //           refreshTime / 1000
    //         }秒後`
    //       );
    //     }
    //   } catch (error) {
    //     console.error("トークンのデコード中にエラーが発生しました:", error);
    //   }
    // },
    // async login(email, password) {
    //   const config = useRuntimeConfig();
    //   try {
    //     const response = await fetch(`${config.public.apiBase}/token/`, {
    //       method: "POST",
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //       body: JSON.stringify({
    //         email: email.trim(),
    //         password: password.trim(),
    //       }),
    //     });
    //     if (!response.ok) {
    //       const errorData = await response.json();
    //       throw new Error(errorData.detail || "ログインに失敗しました");
    //     }
    //     const data = await response.json();
    //     // ローカルストレージに保存
    //     // localStorage.setItem('access_token', this.accessToken);
    //     // localStorage.setItem('refresh_token', this.refreshTokens);
    //     // localStorage.setItem('user', JSON.stringify(this.user));

    //     // const accessTokenCookie = useCookie("access_token", {path: "/",maxAge: 3600,secure: process.client,sameSite: "lax",});
    //     // const refreshTokenCookie = useCookie("refresh_token", {path: "/",maxAge: 2592000, secure: process.client,sameSite: "lax",});
    //     const accessTokenCookie = useCookie('access_token');
    //     const refreshTokenCookie= useCookie('refresh_token');
    //     console.log("🟢 クッキーに保存する前 - アクセストークン:", data.access);
    //     console.log("🟢 クッキーに保存する前 - リフレッシュトークン:",data.refresh);
    //     accessTokenCookie.value = data.access;
    //     refreshTokenCookie.value = data.refresh;
    //     await nextTick();
    //     console.log("🟢 クッキーに保存後 - アクセストークン:",accessTokenCookie.value);
    //     console.log("🟢 クッキーに保存後 - リフレッシュトークン:",refreshTokenCookie.value);
    //     const user = useCookie("user", { path: "/" });
    //     const userResponse = await this.getUserInfo();
    //     user.value = JSON.stringify(userResponse);
    //     this.user = userResponse.find((u) => u.email === email.trim());
    //     return this.user;
    //   } catch (error) {
    //     console.error("ログインエラー:", error);
    //     throw error;
    //   }
    // },
    // async signup(email, password) {
    //   const config = useRuntimeConfig();
    //   const generateAvatar = (email) => {
    //     return `https://api.dicebear.com/7.x/identicon/svg?seed=${email}`;
    //   };
    //   try {
    //     const avatarUrl = generateAvatar(email);
    //     const response = await fetch(`${config.public.apiBase}/signup/`, {
    //       method: "POST",
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //       body: JSON.stringify({
    //         email: email.trim(),
    //         password: password.trim(),
    //         avatar: avatarUrl,
    //       }),
    //     });
    //     if (!response.ok) {
    //       const errorData = await response.json();
    //       throw new Error(errorData.detail || "アカウント登録に失敗しました");
    //     }
    //     await this.login(email, password, avatar);
    //   } catch (error) {
    //     console.error("アカウント登録エラー:", error);
    //     throw error;
    //   }
    // },
    // async logout() {
    //   const config = useRuntimeConfig();
    //   try {
    //     const refreshTokens = this.refreshTokens;
    //     const response = await fetch(`${config.public.apiBase}/token/logout/`, {
    //       method: "POST",
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //       body: JSON.stringify({ refresh: refreshTokens }),
    //     });
    //     if (!response.ok) {
    //       const errorData = await response.json();
    //       throw new Error(errorData.detail || "ログアウトに失敗しました");
    //     }
    //     this.clearAuth();
    //     console.log("ログアウト成功");
    //   } catch (error) {
    //     console.error("ログアウトエラー:", error);
    //     throw error;
    //   }
    // },
    // async getUserInfo() {
    //   const config = useRuntimeConfig();
    //   const token = useCookie("access_token",{path: "/",maxAge: 3600});
    //   if (!token.value) {
    //     console.error(
    //       "取得可能なトークンはありません。リフレッシュを試みます。"
    //     );
    //     this.refreshToken();
    //     if (!token.value) {
    //       console.error("リフレッシュ失敗・ログインしてください。");
    //       return;
    //     }
    //   }
    //   try {
    //     const response = await fetch(`${config.public.apiBase}/user/`, {
    //       method: "GET",
    //       headers: {
    //         "Content-Type": "application/json",
    //         "Authorization": `Bearer ${token.value}`,
    //       },
    //     });
    //     if (!response.ok) {
    //       const errorData = await response.json();
    //       throw new Error(
    //         errorData.detail || "ユーザー情報の取得に失敗しました。"
    //       );
    //     }
    //     const data = await response.json();
    //     if (!Array.isArray(data)) {
    //       return { id: data.id, email: data.email, avatar: data.avatar };
    //     }
    //     return data.map((user) => ({
    //       id: user?.id,
    //       email: user?.email,
    //       avatar: user?.avatar,
    //     }));
    //   } catch (error) {
    //     console.error("ユーザー情報取得エラー:", error);
    //     console.log("取得したトークン:", token.value);
    //     throw error;
    //   }
    // },
    async refreshToken() {
      const config = useRuntimeConfig();
      const router = useRouter();
      const refreshTokens = localStorage.getItem("refresh_token");

      if (!refreshTokens) {
        console.error("リフレッシュトークンがありません。ログインが必要です。");
        router.push("/auth/login");
        throw new Error("リフレッシュトークンが存在しません。");
      }

      try {
        const response = await fetch(
          `${config.public.apiBase}/token/refresh/`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ refresh: refreshTokens }),
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          console.error("トークンのリフレッシュに失敗しました:", errorData);

          router.push("/auth/login");
          throw new Error(`リフレッシュトークンエラー: ${errorData.detail}`);
        }

        const data = await response.json();

        // 新しいアクセストークンを保存
        this.accessToken = data.access;
        this.refreshTokens = data.refresh;
        localStorage.setItem("access_token", data.access);
        localStorage.setItem("refresh_token", data.refresh);
        this.scheduleTokenRefresh();
        console.log("アクセストークンがリフレッシュされました");
        return data.access;
      } catch (error) {
        console.error("リフレッシュトークン処理中のエラー:", error.message);
        router.push("/auth/login");
        throw error;
      }
    },
    async scheduleTokenRefresh() {
      if (this.refreshTokenTimer) {
        clearTimeout(this.refreshTokenTimer);
      }
      if (!this.accessToken) return;
      try {
        const decode = jwtDecode(this.accessToken);
        const exprisesAt = decode.exp * 1000;
        const now = Date.now();
        const refreshTime = exprisesAt - now - 60000;
        if (refreshTime > 0) {
          this.refreshTokenTimer = setTimeout(() => {
            this.refreshToken();
          }, refreshTime);
          console.log(
            `アクセストークンのリフレッシュをスケジュールしました: ${
              refreshTime / 1000
            }秒後`
          );
        }
      } catch (error) {
        console.error("トークンのデコード中にエラーが発生しました:", error);
      }
    },
    async restoreSession() {
      if (process.server) return; // サーバーサイドでは何もしない
      const accessToken_const = localStorage.getItem("access_token"); // キー名を統一
      const refreshToken_const = localStorage.getItem("refresh_token");
      const storeUser = JSON.parse(localStorage.getItem("user")); // ユーザー情報も復元
      if (accessToken_const && refreshToken_const && storeUser) {
        this.accessToken = accessToken_const;
        this.refreshTokens = refreshToken_const;
        this.user = storeUser;
        this.scheduleTokenRefresh();
        // オプション: トークンを検証するためにサーバーに確認を送信
        try {
          await this.refreshToken(); // 必要に応じてトークンをリフレッシュ
        } catch (error) {
          console.error("トークン検証またはリフレッシュに失敗しました:", error);
          this.clearAuth(); // トークンが無効ならログアウト処理
        }
      } else {
        this.clearAuth(); // トークンやユーザー情報がない場合はログアウト状態にする
      }
    },

    async login(email, password) {
      const config = useRuntimeConfig();
      try {
        const response = await fetch(`${config.public.apiBase}/token/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email.trim(),
            password: password.trim(),
          }),
        });
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.detail || "ログインに失敗しました");
        }
        const data = await response.json();
        this.accessToken = data.access;
        this.refreshTokens = data.refresh;

        // ログイン後、ユーザー情報を取得
        const userResponse = await this.getUserInfo();
        this.user = userResponse.find((u) => u.email === email.trim());

        // ローカルストレージに保存
        localStorage.setItem("access_token", this.accessToken);
        localStorage.setItem("refresh_token", this.refreshTokens);
        localStorage.setItem("user", JSON.stringify(this.user));

        return this.user;
      } catch (error) {
        console.error("ログインエラー:", error);
        throw error;
      }
    },
    async signup(email, password) {
      const config = useRuntimeConfig();
      const generateAvatar = (email) => {
        return `https://api.dicebear.com/7.x/identicon/svg?seed=${email}`;
      };
      try {
        const avatarUrl = generateAvatar(email);
        const response = await fetch(`${config.public.apiBase}/signup/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email.trim(),
            password: password.trim(),
            avatar: avatarUrl,
          }),
        });
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.detail || "アカウント登録に失敗しました");
        }
        await this.login(email, password, avatar);
      } catch (error) {
        console.error("アカウント登録エラー:", error);
        throw error;
      }
    },
    async logout() {
      const config = useRuntimeConfig();
      try {
        const refreshTokens = this.refreshTokens;
        const response = await fetch(`${config.public.apiBase}/token/logout/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ refresh: refreshTokens }),
        });
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.detail || "ログアウトに失敗しました");
        }
        this.clearAuth();
        console.log("ログアウト成功");
      } catch (error) {
        console.error("ログアウトエラー:", error);
        throw error;
      }
    },
    async getUserInfo() {
      const config = useRuntimeConfig();
      try {
        const response = await fetch(`${config.public.apiBase}/user/`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.accessToken}`,
          },
        });
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(
            errorData.detail || "ユーザー情報の取得に失敗しました。"
          );
        }

        const data = await response.json();

        // サーバーが単一のユーザーを返す場合
        if (!Array.isArray(data)) {
          return { id: data.id, email: data.email, avatar: data.avatar };
        }

        // サーバーが複数のユーザーを返す場合
        return data.map((user) => ({
          id: user?.id,
          email: user?.email,
          avatar: user?.avatar,
        }));
      } catch (error) {
        console.error("ユーザー情報取得エラー:", error);
        throw error;
      }
    },
    async createToDO(auther, todo) {
      const config = useRuntimeConfig();
      try {
        const response = await fetch(`${config.public.apiBase}/todolist/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${this.accessToken}`,
          },
          body: JSON.stringify({
            auther: auther,
            todo: todo.trim(),
          }),
        });
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.detail || "ToDOの作成に失敗しました。");
        }
        const data = await response.json();
        return {
          id: data.id, // 作成したToDoのID
          auther: data.auther, // 作成したToDoのタイトル
          todo: data.todo, // 作成したToDoの内容
          created_at: data.created_at,
        };
      } catch (error) {
        console.error("ToDO作成に失敗しました。:", error);
        throw error;
      }
    },
    async addToDO(todo_tag, todo) {
      const config = useRuntimeConfig();
      try {
        const response = await fetch(`${config.public.apiBase}/addtodo/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${this.accessToken}`,
          },
          body: JSON.stringify({
            todo_tag: todo_tag.trim(),
            todo: todo.trim(),
          }),
        });
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.detail || "todoの追加失敗。");
        }
        const data = await response.json();
        return {
          id: data.id,
          todo_tag: data.todo_tag,
          checklist: data.checklist,
          todo: data.todo,
          created_at: data.created_at,
        };
      } catch (error) {
        console.error("ToDO追加作成:", error);
        throw error;
      }
    },

    async getToDOByid(id) {
      const config = useRuntimeConfig();
      try {
        const response = await fetch(
          `${config.public.apiBase}/todolist/${id}/`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${this.accessToken}`,
            },
          }
        );
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.detail || "ToDO取得に失敗しました。");
        }
        const data = await response.json();
        console.log("取得したToDOリスト:", data);
        return {
          id: data.id,
          checklist: data.checklist,
          title: data.title,
          todo: data.todo,
          created_at: data.created_at,
        };
      } catch (error) {
        console.error("ToDOの取得エラー:", error);
        throw error;
      }
    },
    async deleteTodoId(id) {
      const config = useRuntimeConfig();
      try {
        const response = await fetch(
          `${config.public.apiBase}/todolist/${id}/`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${this.accessToken}`,
              // "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
            },
          }
        );
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.detail || "ERROR");
        }
        window.location.reload();
        console.log("削除成功");
      } catch (error) {
        console.error("削除失敗:", error);
        throw error;
      }
    },
    async editTitleId(id, newTitle) {
      const config = useRuntimeConfig();
      try {
        const response = await fetch(
          `${config.public.apiBase}/todolist/${id}/`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${this.accessToken}`,
            },
            body: JSON.stringify({
              title: newTitle,
            }),
          }
        );
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.detail || "Error");
        }
        window.location.reload();
        return await response.json();
      } catch (error) {
        console.error(error);
        throw error;
      }
    },

    async editTitleId(id, newTitle) {
      const config = useRuntimeConfig();
      try {
        const [todo, library] = await Promise.allSettled([
          fetch(`${config.public.apiBase}/todolist/${id}/`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${this.accessToken}`,
            },
            body: JSON.stringify({
              title: newTitle,
            }),
          }),
          fetch(`${config.public.apiBase}/libtodo/${id}/`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${this.accessToken}`,
            },
            body: JSON.stringify({
              title: newTitle,
            }),
          }),
        ]);
        let TodoList = null;
        let LibTodo = null;

        if (todo.status === "fulfilled" && todo.value.ok) {
          TodoList = await todo.value.json();
        }
        if (library.status === "fulfilled" && library.value.ok) {
          LibTodo = await library.value.json();
        }

        if (TodoList) {
          return {
            id: TodoList.id ?? null,
            title: TodoList.title ?? null,
            created_at: TodoList.created_at ?? null,
          };
        } else {
          return {
            id: LibTodo.id ?? null,
            title: LibTodo.title ?? null,
            created_at: LibTodo.created_at ?? null,
          };
        }
      } catch (error) {
        console.error(error);
        throw error;
      }
    },

    async AllfetchToDO() {
      const config = useRuntimeConfig();
      try {
        const [todolist, addtodo] = await Promise.allSettled([
          fetch(`${config.public.apiBase}/todolist/`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${this.accessToken}`,
            },
          }),
          fetch(`${config.public.apiBase}/addtodo/`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${this.accessToken}`,
            },
          }),
        ]);
        let TodoGet = null;
        let AddGet = null;
        if (todolist.status === "fulfilled" && todolist.value.ok) {
          TodoGet = await todolist.value.json();
        }
        if (addtodo.status === "fulfilled" && addtodo.value.ok) {
          AddGet = await addtodo.value.json();
        }
        if (TodoGet) {
          return TodoGet.map((todo) => ({
            id: todo.id ?? null,
            title: todo.title ?? null,
            todo: todo.todo ?? null,
            checklist: todo.checklist ?? null,
            auther: todo.auther ?? null,
            created_at: todo.created_at ?? null,
          }));
        } else {
          return {
            id: AddGet.id ?? null,
            todo: AddGet.todo ?? null,
            checklist: AddGet.checklist ?? null,
            todo_tag: AddGet.todo_tag ?? null,
            created_at: AddGet.created_at ?? null,
          };
        }
      } catch (error) {
        console.error(error);
        throw new Error();
      }
    },
    async TodoCheck(id, isCheck) {
      const config = useRuntimeConfig();
      try {
        const [todocheck, addcheck] = await Promise.allSettled([
          fetch(`${config.public.apiBase}/todolist/${id}/`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${this.accessToken}`,
            },
            body: JSON.stringify({
              checklist: isCheck,
            }),
          }),
          fetch(`${config.public.apiBase}/addtodo/${id}/`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${this.accessToken}`,
            },
            body: JSON.stringify({
              checklist: isCheck,
            }),
          }),
        ]);
        let ischeck = null;
        let add_check = null;
        if (todocheck.status === "fulfilled" && todocheck.value.ok) {
          ischeck = await todocheck.value.json();
        }
        if (addcheck.status === "fulfilled" && addcheck.value.ok) {
          add_check = await addcheck.value.json();
        }
        if (ischeck) {
          return {
            id: ischeck.id,
            checklist: ischeck.checklist,
            created_at: ischeck.created_at,
          };
        } else {
          return {
            id: add_check.id,
            checklist: add_check.checklist,
            created_at: add_check.created_at,
          };
        }
      } catch (error) {}
    },
  },
  //
  getters: {
    isAuthenticated(state) {
      return !!state.accessToken;
      // return !!(state.accessToken || useCookie('access_token').value);
    },
    currentUser(state) {
      const user = state.user;
      console.log("Vuex state.user:", user);
      if (user && typeof user === "object") {
        return {
          id: user.id,
          email: user.email,
          avatar: user.avatar,
        };
        // return {id: state.user.id, email: state.user.email};
      }
      return null; // 未ログインの場合は null を返す
    },
  },
});
