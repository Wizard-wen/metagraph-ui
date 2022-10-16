import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { init } from '../src';

init();
createApp(App).use(router).mount('#app');
