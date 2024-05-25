import Vue from 'vue';
import VueRouter from 'vue-router';
import LoginView from "../views/LoginView.vue"
import SignUpView from "@/views/SignUpView.vue"
import MyPageView from "@/views/MyPage/MyPageView.vue"
import SettingView from "@/views/MyPage/SettingView.vue";
import LeaveMembership from "@/views/MyPage/LeaveMembership.vue";
import Community from "@/views/Community.vue";
import MainView from "@/views/MainView.vue";
import GuideAndTips from "@/views/GuideAndTips.vue";
import GeneralBoard from "@/views/GeneralBoard/GeneralBoard.vue";
import GeneralBoardPage from "@/views/GeneralBoard/GeneralBoardPage.vue";
import GeneralBoardWrite from "@/views/GeneralBoard/GeneralBoardWrite.vue";
import IntroduceView from "@/views/IntroduceView.vue";
import FollowerListView from "@/views/MyPage/FollowerListView.vue";
import FollowingListView from "@/views/MyPage/FollowingListView.vue";
import interiorGuideView from "@/views/InteriorGuideView.vue";
import ScrapListView from "@/views/MyPage/ScrapListView.vue";
import LikeListView from "@/views/MyPage/LikeListView.vue";
import ChatView from "@/views/ChatView.vue";
import GeneralReWrite from "@/views/GeneralBoard/GeneralReWrite.vue";
import ObjectRecognitionView from "@/views/ObjectRecognitionView.vue";
import CompetitionMain from "@/views/Competition/CompetitionMain.vue";
import CompetitionWrite from "@/views/Competition/CompetitionWrite.vue";
import CompetitionPoster from "@/views/Competition/CompetitionPoster.vue";

Vue.use(VueRouter)
/*  경로 설정*/
const routes = [
    { path: '/login', component: LoginView, meta: { hideHeader: true,hideFooter: true } },
    { path: '/signup', component: SignUpView, meta: { hideFooter: true,hideHeader: true} },
    { path: '/my-page', component: MyPageView },
    { path: '/setting', component: SettingView },
    { path: '/leave', component: LeaveMembership },
    { path: '/community', component: Community,meta: {hideFooter: true, hideHeader: true }},
    { path: '/interiorguide', component: interiorGuideView, meta: { hideHeader: true,hideFooter: true }},
    { path: '/', component: MainView},
    { path: '/guideandtips', component: GuideAndTips, meta: { hideHeader: false, hideFooter: true }},
    { path: '/generalBoard', component: GeneralBoard, meta: { hideHeader: false, hideFooter: false }},
    { path: '/generalBoardPage', component: GeneralBoardPage, meta: { hideHeader: false, hideFooter: true }},
    { path: '/generalBoardWrite', component: GeneralBoardWrite, meta: { hideHeader: false, hideFooter: true }},
    { path: '/introduce', component: IntroduceView, meta: { hideHeader: false, hideFooter: false }},
    { path: '/follower', component: FollowerListView, meta: {hideHeader: false, hideFooter: false}},
    { path: '/following', component: FollowingListView, meta: {hideHeader: false, hideFooter: false }},
    { path: '/scrap', component: ScrapListView, meta: {hideHeader: false, hideFooter: false}},
    { path: '/like', component: LikeListView, meta: {hideHeader: false, hideFooter: false }},
    { path: '/following', component: FollowingListView, meta: {hideHeader: false, hideFooter: false }},
    { path: '/chatroom/:userId', component: ChatView, meta: {hideHeader: true, hideFooter: true }},
    { path: '/chat/:userId', component: ChatView, meta: {hideHeader: true, hideFooter: true }},
    { path: '/generalReWrite', component: GeneralReWrite, meta: {hideHeader: false, hideFooter: true }},
    { path: '/objectrecognition', component: ObjectRecognitionView, meta: {hideHeader: false, hideFooter: true }},
    { path: '/competitionPoster', component: CompetitionPoster, meta: {hideHeader: false, hideFooter: false}},
    { path: '/competitionWrite', component: CompetitionWrite, meta: {hideHeader: false, hideFooter: false}},
    { path: '/competitionMain', component: CompetitionMain, meta: {hideHeader: false, hideFooter: false}},
]

const router = new VueRouter({
    routes // 단축 속성 이름으로 routes: routes
})

export default router
