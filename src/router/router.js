import Vue from 'vue';
import VueRouter from 'vue-router';
import LoginView from "../views/LoginView.vue"
import SignUpView from "@/views/SignUpView.vue"
import MyPageView from "@/views/MyPageView.vue"
import SettingView from "@/views/SettingView.vue";
import LeaveMembership from "@/views/LeaveMembership.vue";

Vue.use(VueRouter)

const routes = [
    { path: '/login', component: LoginView },
    { path: '/signup', component: SignUpView },
    { path: '/my-page', component: MyPageView },
    { path: '/setting', component: SettingView },
    { path: '/leave', component: LeaveMembership }
]

const router = new VueRouter({
    routes // 단축 속성 이름으로 routes: routes
})

export default router
