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
    authStore.restoreSession()
        .then(() => console.log('セッションが復元されました'))
        .catch(error => console.error('セッション復元中にエラー:', error));
});
