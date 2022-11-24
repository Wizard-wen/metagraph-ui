import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { init } from '../src';
import MetagraphTree from '../src/general/metagraph-tree/metagraph-tree.vue'
init();
const app = createApp(App)
app.component('metagraph-tree', MetagraphTree);

app.use(router).mount('#app');
