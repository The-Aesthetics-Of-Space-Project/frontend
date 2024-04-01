import Vue from 'vue'
import VueRouter from 'vue-router'
import LoginView from "@/views/LoginView.vue";
import MainView from "@/views/MainView.vue";
import GuideAndTips from "@/views/GuideAndTips.vue";
import GeneralBoard from "@/views/GeneralBoard/GeneralBoard.vue";
import GeneralBoardPage from "@/views/GeneralBoard/GeneralBoardPage.vue";
import Community from "@/views/Community.vue";
import GeneralBoardWrite from "@/views/GeneralBoard/GeneralBoardWrite.vue";
import IntroduceView from "@/views/IntroduceView.vue";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'main',
    component: MainView,
    //meta: { hideHeader: true, hideFooter: true } // 메타 필드
  },
  {
    path: '/login',
    name: 'LoginView',
    component: LoginView,
    meta: { hideHeader: true } // 메타 필드
  },
  {
    path: '/guideandtips', // URL 경로
    component: GuideAndTips, // 해당 경로로 갔을 때 보여줄 컴포넌트
    meta: { hideHeader: false, hideFooter: true } // 메타 필드
  },
  {
    path: '/GeneralBoard',
    name: 'generalboard',
    component: GeneralBoard,
    meta: { hideHeader: false, hideFooter: false } // 메타 필드
  },
  {
    path: '/GeneralBoardPage',
    name: 'generalboardpage',
    component: GeneralBoardPage,
    meta: { hideHeader: false, hideFooter: false } // 메타 필드
  },
  {
    path: '/community',
    name: 'community',
    component: Community,
    meta: { hideHeader: false, hideFooter: true } // 메타 필드 추가
  },
  {
    path: '/GeneralBoardWrite',
    name: 'generalboard',
    component: GeneralBoardWrite,
    meta: { hideHeader: false, hideFooter: true } // 메타 필드 추가
  },
  {
    path: '/Introduce',
    name: 'introduce',
    component: IntroduceView,
    meta: { hideHeader: false, hideFooter: false }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router