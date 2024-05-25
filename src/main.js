import Vue from 'vue'
import App from './App.vue'
import router from './router/router.js';
import 'bootstrap/dist/css/bootstrap.css'
import axios from "axios";
import 'bootstrap/dist/js/bootstrap'
import store from './store/index.js'
import '@dotlottie/player-component'; // Import the Lottie player
Vue.prototype.$http = axios;

new Vue({
    store,
    router,
    render: h => h(App),
}).$mount('#app')
