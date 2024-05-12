import Vue from 'vue';
import Vuex from 'vuex';
import router from "@/router/router";
import VueRouter from "vue-router";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        userId :'',
    },
    getters :{
        isLogin(state){
            return state.userId !=='';
        },
    },
    mutations:{
        setUserId(state, userId){
            state.userId=userId;
        },
        clearUsername(state){
            state.userId='';
        },
    },
});