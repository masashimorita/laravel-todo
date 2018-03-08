import Vue from 'vue';
import Vuex from 'vuex';
import router from '../router';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        token: null,
        user: null,
        expirationDate: '',
    },
    mutations: {
        saveCredential(state, data) {
            state.token = data.token;
            state.user = data.user;
            localStorage.setItem('token', state.token);
            localStorage.setItem('user', JSON.stringify(state.user));
            if (data.setExpirationDate !== false) {
                state.expirationDate = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
                localStorage.setItem('expirationDate', state.expirationDate);
            } else {
                state.expirationDate = localStorage.getItem('expirationDate');
            }
        },
        clearToken(state) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            localStorage.removeItem('expirationDate');
            state.token = null;
            state.user = null;
            state.expirationDate = '';
        }
    },
    actions: {
        login(context, auth) {
            axios.post('/api/users/login',{
                email: auth.email,
                password: auth.password
            }).then((res) => {
                let token = res.data.token;
                let user = res.data.user;
                context.commit('saveCredential', {token: token, user: user, setExpirationDate: true});
                router.push('/dashboard');
            }).catch((error) => {
                if (auth.errorCb) {
                    auth.errorCb(error);
                }else {
                    console.log(error);
                }
            });
        },

        register(context, data) {
            axios.post('/api/users/register', {
                email: data.email,
                name: data.name,
                password: data.password
            }).then((res) => {
                let token = res.data.token;
                let user = res.data.user;
                context.commit('saveCredential', {token: token, user: user, setExpirationDate: true});
                router.push('/dashboard');
            }).catch((error) => {
                if (data.errorCb) {
                    data.errorCb(error);
                } else {
                    console.log(error);
                }
            })
        },

        logout(context) {
            context.commit('clearToken');
        },

        autoLogin (context, path) {
            const token = localStorage.getItem('token');
            const user = JSON.parse(localStorage.getItem('user'));
            if (!token || !user) return;
            const expirationDate = localStorage.getItem('expirationDate');
            const now = new Date();
            if (now >= expirationDate) {
                context.commit('clearToken');
                return;
            }
            axios.defaults.headers.common['Authorization'] = "Bearer " + token;
            context.commit('saveCredential', {token: token, user: user, setExpirationDate: false});
            if (path.indexOf('/auth') !== -1) {
                router.push('/dashboard');
            }
        }
    },
    getters: {
        isAuthenticated (state) {
            const now = new Date();
            const expiration = new Date(state.expirationDate ? state.expirationDate : localStorage.getItem('expirationDate'));
            const token = state.token ? state.token : localStorage.getItem('token');
            return (token !== null && now < expiration);
        },
        getUser(state) {
            return state.user;
        }
    },
});