import Vue from 'vue';
import Router from 'vue-router';
import GeneralBoardWrite from "@/views/GeneralBoard/GeneralBoardWrite.vue";
import LoginView from "@/views/LoginView.vue";
import MyPageView from "@/views/MyPage/MyPageView.vue";
import MainView from "@/views/MainView.vue";
import store from "@/store";

Vue.use(Router);

const router = new Router({
    mode: 'history',
    routes: [
        { path: '/', component: MainView },
        { path: '/login', component: LoginView },
        { path: '/my-page', component: MyPageView },
        { path: '/GeneralBoardWrite', component: GeneralBoardWrite }
    ]
});

// 전역 네비게이션 가드 설정
// 전역 네비게이션 가드 설정
router.beforeEach((to, from, next) => {
    console.log("라우터 가드 실행됨", to.path, store.getters.isLogin);
    const authRequiredRoutes = ['/my-page', '/GeneralBoardWrite'];
    const authRequired = authRequiredRoutes.includes(to.path);

    if (authRequired && !store.getters.isLogin) {
        console.log("로그인 필요 - 리다이렉트 실행");
        next('/login');
    } else {
        console.log("접근 허용");
        next();
    }
});



export default router;
