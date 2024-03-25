import Vue from 'vue'
import App from './App.vue'
import router from './router/router.js';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/display.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

new Vue({
    router,
    render: h => h(App),
}).$mount('#app')

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)