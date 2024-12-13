// import { createPinia } from 'pinia'
// import { useAuthStore } from '../store/auth'
// export default defineNuxtPlugin((nuxtApp) => {
//   const pinia = createPinia()
//   nuxtApp.vueApp.use(pinia)
//   const authStore = useAuthStore();
//   authStore.restoreSession();
// })
// plugins/auth.js
import { useAuthStore } from '~/store/auth';

export default defineNuxtPlugin(() => {
  const authStore = useAuthStore();
  authStore.restoreSession();
});
