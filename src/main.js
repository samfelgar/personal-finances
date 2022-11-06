import { createApp } from "vue";
import App from "@/App.vue";
import { createPinia } from "pinia";
import { router } from './services/routes';
import "./assets/index.css";
import '@vuepic/vue-datepicker/dist/main.css'

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount('#app');
