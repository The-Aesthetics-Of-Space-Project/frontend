import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

export default new Vuex.Store({
    plugins: [
        createPersistedState({
            key: 'my-app-state', // localStorage에 저장될 키 이름
            paths: ['userId'] // 저장할 state 속성 지정
        })
    ],
    state: {
        userId: ''
    },
    getters: {
        isLogin(state) {
            return state.userId !== '';
        }
    },
    mutations: {
        setUserId(state, userId) {
            state.userId = userId;
        },
        clearUsername(state) {
            state.userId = '';
        }
    }
});
