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
import CompetitionMain from "@/views/Competition/CompetitionMain.vue";
import CompetitionWrite from "@/views/Competition/CompetitionWrite.vue";
import CompetitionPoster from "@/views/Competition/CompetitionPoster.vue";
import CompetitionPage from "@/views/Competition/CompetitionPage.vue";
import CompetitionReWrite from "@/views/Competition/CompetitionReWrite.vue";
import ObjectRecogView from "@/views/ObjectRecognition/ObjectRecogView.vue";

Vue.use(VueRouter)
/*  경로 설정*/
const routes = [
    { path: '/login', component: LoginView, meta: { hideHeader: true,hideFooter: true } },
    { path: '/signup', component: SignUpView, meta: { hideFooter: true,hideHeader: true} },
    { path: '/my-page', component: MyPageView },
    /* 마이페이지 일반 게시글 목록의 게시글 클릭 -> 해당 페이지  */
    {
        path: '/my-page/:articleId',
        name: 'GeneralBoardPage',
        component: GeneralBoardPage
    },
    /* 마이페이지 팔로워 클릭 -> 해당 페이지  */
    {
        path: '/my-page/:userId',
        name: 'FollowerListView',
        component: FollowerListView
    },
    /* 마이페이지 팔로잉 클릭 -> 해당 페이지  */
    {
        path: '/my-page/:userId',
        name: 'FollowingListView',
        component: FollowingListView
    },
    /* 마이페이지 스크랩 목록 클릭 -> 해당 페이지  */
    {
        path: '/my-page/:userId',
        name: 'ScrapListView',
        component: ScrapListView
    },
    /* 마이페이지 좋아요 클릭 -> 해당 페이지  */
    {
        path: '/my-page/:userId',
        name: 'LikeListView',
        component: LikeListView
    },
    /* 마이페이지 공모전 게시글 목록의 게시글 클릭 -> 해당 페이지  */
    {
        path: '/my-page/:articleId',
        name: 'CompetitionPage',
        component: CompetitionPage
    },
    /* 마이페이지 스크랩 목록의 닉네임 클릭 -> 마이페이지  */
    {
        path: '/scrap/:nickname',
        name: 'MyPageView',
        component: MyPageView
    },
    /* 마이페이지 스크랩 목록의 게시글 클릭 -> 일반 게시판  */
    {
        path: '/scrap/:articleId',
        name: 'GeneralBoardPage',
        component: GeneralBoardPage
    },
    /* 마이페이지 좋아요 목록의 닉네임 클릭 -> 마이페이지  */
    {
        path: '/like/:nickname',
        name: 'MyPageView',
        component: MyPageView
    },
    /* 마이페이지 좋아요 목록의 게시글 클릭 -> 일반 게시판  */
    {
        path: '/like/:articleId',
        name: 'GeneralBoardPage',
        component: GeneralBoardPage
    },
    /* 공모전 메인 -> 마이페이지로 */
    {
        path: '/competitionMain/:nickname',
        name: 'MyPageView',
        component: MyPageView
    },
    /* 공모전 글 상세 페이지로 */
    {
        path: '/competitionMain/:articleId',
        name: 'CompetitionPage',
        component: CompetitionPage,
        meta: {hideHeader: false, hideFooter: true}
    },
    /* 글 재작성 페이지로 */
    {
        path: '/competitionReWrite/:articleId',
        name: 'CompetitionReWrite',
        component: CompetitionReWrite
    },
    /* 댓글 -> 상대 마이페이지로 */
    {
        path: '/competitionPage/:nickname',
        name: 'MyPageView',
        component: MyPageView
    },
    /* 일반 게시판 -> 상대 마이페이지로 */
    {
        path: '/generalBoard/:nickname',
        name: 'MyPageView',
        component: MyPageView
    },
    /* 마이페이지 -> 팔로워 목록 -> 상대 마이페이지로 */
    {
        path: '/follower/:nickname',
        name: 'MyPageView',
        component: MyPageView
    },
    /* 마이페이지 -> 팔로잉 목록 -> 상대 마이페이지로 */
    {
        path: '/following/:nickname',
        name: 'MyPageView',
        component: MyPageView
    },
    { path: '/setting', component: SettingView },
    { path: '/leave', component: LeaveMembership },
    { path: '/community', component: Community,meta: {hideFooter: true, hideHeader: true }},
    { path: '/interiorguide', component: interiorGuideView, meta: { hideHeader: true,hideFooter: true }},
    { path: '/', component: MainView},
    { path: '/guideandtips', component: GuideAndTips, meta: { hideHeader: false, hideFooter: true }},
    { path: '/generalBoard', component: GeneralBoard, meta: { hideHeader: false, hideFooter: true }},
    { path: '/GeneralBoardPage', component: GeneralBoardPage, meta: { hideHeader: false, hideFooter: true }},
    { path: '/generalBoardWrite', component: GeneralBoardWrite, meta: { hideHeader: false, hideFooter: true }},
    { path: '/introduce', component: IntroduceView, meta: { hideHeader: false, hideFooter: false }},
    { path: '/follower', component: FollowerListView, meta: {hideHeader: false, hideFooter: false}},
    { path: '/following', component: FollowingListView, meta: {hideHeader: false, hideFooter: false }},
    { path: '/scrap', component: ScrapListView, meta: {hideHeader: false, hideFooter: false}},
    { path: '/like', component: LikeListView, meta: {hideHeader: false, hideFooter: false }},
    { path: '/following', component: FollowingListView, meta: {hideHeader: false, hideFooter: false }},
    { path: '/chatroom/:userId', component: ChatView, meta: {hideHeader: true, hideFooter: true }},
    { path: '/api/chat_room/:nickname/:userId', component: ChatView, meta: {hideHeader: true, hideFooter: true }},
    { path: '/generalReWrite', component: GeneralReWrite, meta: {hideHeader: false, hideFooter: true }},
    { path: '/competitionPoster', component: CompetitionPoster, meta: {hideHeader: false, hideFooter: false}},
    { path: '/competitionWrite', component: CompetitionWrite, meta: {hideHeader: false, hideFooter: true}},
    { path: '/competitionMain', component: CompetitionMain, meta: {hideHeader: false, hideFooter: true}},
    { path: '/competitionPage', component: CompetitionPage, meta: {hideHeader: false, hideFooter: true}},
    { path: '/competitionReWrite', component: CompetitionReWrite, meta: {hideHeader: false, hideFooter: true}},
    { path: '/objectrecognition', component: ObjectRecogView, meta: {hideHeader: false, hideFooter: true }},
]

const router = new VueRouter({
    routes // 단축 속성 이름으로 routes: routes
})

export default router
