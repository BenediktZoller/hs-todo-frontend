import { createApp } from 'vue';
import './index.css';
import App from './App.vue';
import { VueQueryPlugin } from '@tanstack/vue-query';

const app = createApp(App);
app.use(VueQueryPlugin);

app.mount('#app');
