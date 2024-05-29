import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

export default new Vuex.Store({
    plugins: [
        createPersistedState({
            key: 'my-app-state', // localStorage에 저장될 키 이름
            paths: ['userId','nickname','profile'] // 저장할 state 속성 지정
        })
    ],
    state: {
        userId: '',
        nickname: '',
        profile: '',
    },
    getters: {
        isLogin(state) {
            return state.userId !== '';
        },
        userNickname(state) { // 닉네임을 가져오는 getter 추가
            return state.nickname;
        },
        userProfile(state) { // 프로필을 가져오는 getter 추가
            return state.profile; // 'profifle' 오타를 'profile'로 수정
        }
    },
    mutations: {
        setUserId(state, userId) {
            state.userId = userId;
        },
        setUserNickname(state, nickname) {
            state.nickname = nickname;
        },
        setUserProfile(state,profile){
            state.profile = profile;
        },
        clearUsername(state) {
            state.nickname='';
            state.userId = '';
        }
    }
});