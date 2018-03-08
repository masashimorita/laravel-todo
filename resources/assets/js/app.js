import Vue from 'vue';
import router from './router';
import store from './store/store';
import {baseMixins} from "./mixins/base";

require('./bootstrap');

window.Vue = Vue;

router.beforeEach((to, from, next) => {
    if (!store.getters.isAuthenticated && to.path.indexOf('/auth') === -1) {
        store.commit('clearToken');
        return next('/auth/login');
    }
    next();
});

window.axios.interceptors.response.use((response) => {
    let headers = response.headers;
    let token = response.data.token || headers["newtoken"];
    if (token) {
        window.axios.defaults.headers.common['Authorization'] = "Bearer " + token;
        if (headers["newtoken"]) {
            store.state.token = token;
            localStorage.setItem('token', token);
        }
    }
    return response;
}, (error) => {
    let needRedirect = error.response.data.redirect;
    if (needRedirect === true) {
        store.dispatch('logout');
        router.push('/auth/login');
        return null;
    }
    return Promise.reject(error);
});

Vue.mixin(baseMixins);
Vue.component('cycle-spinner', require('./components/utils/spinners/CycleSpinner.vue'));

const app = new Vue({
    el: '#app',
    router,
    store,
    created() {
        this.$store.dispatch('autoLogin', this.$route.path);
    }
});