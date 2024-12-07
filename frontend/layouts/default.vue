<template>
  <div>
    <Header/>
    <NuxtPage />
    <!-- <nuxt /> -->
  </div>
</template>
<script>
import Header from '../components/Header.vue';
export default {
  components: {
    Header,
  },
};
</script>