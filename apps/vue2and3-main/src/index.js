import { createApp, h } from 'vue';
import Vue3Component from './Vue3Component.vue';

const app = createApp({
  render: () => h(Vue3Component)
});

app.mount('#vue3app');