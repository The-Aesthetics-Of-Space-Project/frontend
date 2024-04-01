import Vue from 'vue'
import App from './App.vue'
import router from './router/router.js';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import axios from "axios";
import 'bootstrap/dist/js/bootstrap'

new Vue({
    router,
    render: h => h(App),
}).$mount('#app')

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(axios)