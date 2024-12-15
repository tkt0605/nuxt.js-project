// import { useAuthStore } from '~/store/auth';

// export default defineNuxtPlugin(() => {
//   if (process.server) return; // サーバーサイドでは何もしない
//   const authStore = useAuthStore();
//   authStore.restoreSession();
// });
import { useAuthStore } from '~/store/auth';

export default defineNuxtPlugin(() => {
    if (process.server) return; // サーバーサイドでは何もしない

    const authStore = useAuthStore();
    authStore.restoreSession();
});
