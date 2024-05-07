import Vue from 'vue';
import VueRouter from 'vue-router';
import LoginView from "../views/LoginView.vue"
import SignUpView from "@/views/SignUpView.vue"
import MyPageView from "@/views/MyPageView.vue"
import SettingView from "@/views/SettingView.vue";
import LeaveMembership from "@/views/LeaveMembership.vue";
import Community from "@/views/Community.vue";
import MainView from "@/views/MainView.vue";
import GuideAndTips from "@/views/GuideAndTips.vue";
import GeneralBoard from "@/views/GeneralBoard/GeneralBoard.vue";
import GeneralBoardPage from "@/views/GeneralBoard/GeneralBoardPage.vue";
import GeneralBoardWrite from "@/views/GeneralBoard/GeneralBoardWrite.vue";
import IntroduceView from "@/views/IntroduceView.vue";
import FollowerView from "@/views/FollowerView.vue";
import interiorGuideView from "@/views/InteriorGuideView.vue";

Vue.use(VueRouter)

const routes = [
    { path: '/login', component: LoginView },
    { path: '/signup', component: SignUpView },
    { path: '/my-page', component: MyPageView },
    { path: '/setting', component: SettingView },
    { path: '/leave', component: LeaveMembership },
    { path: '/community', component: Community},
    { path: '/interiorguide', component: interiorGuideView, meta: { hideHeader: true,hideFooter: true }}, // 메타 필드},
    {
        path: '/',
        component: MainView,
       // meta: { hideHeader: true, hideFooter: true } // 메타 필드
    },
    {
        path: '/login',
        component: LoginView,
        meta: { hideHeader: true } // 메타 필드
    },
    {
        path: '/guideandtips', // URL 경로
        component: GuideAndTips, // 해당 경로로 갔을 때 보여줄 컴포넌트
        //meta: { hideHeader: false, hideFooter: true } // 메타 필드
    },
    {
        path: '/GeneralBoard',
        component: GeneralBoard,
        meta: { hideHeader: false, hideFooter: false } // 메타 필드
    },
    {
        path: '/GeneralBoardPage',
        component: GeneralBoardPage,
        meta: { hideHeader: false, hideFooter: false } // 메타 필드
    },
    {
        path: '/community',
        component: Community,
        meta: { hideHeader: false, hideFooter: true } // 메타 필드 추가
    },
    {
        path: '/GeneralBoardWrite',
        component: GeneralBoardWrite,
        meta: { hideHeader: false, hideFooter: true } // 메타 필드 추가
    },
    {
        path: '/Introduce',
        component: IntroduceView,
        meta: { hideHeader: false, hideFooter: false }
    }
    ,{path: '/follower', component: FollowerView}
]

const router = new VueRouter({
    routes // 단축 속성 이름으로 routes: routes
})

export default router
