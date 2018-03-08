import Vue from 'vue';
import VueRouter from 'vue-router';

import Login from './components/auth/Login.vue';
import Register from './components/auth/Register.vue';
import ForgotPasswordEmail from './components/auth/ForgotPasswordEmail.vue';
import PasswordReset from './components/auth/PasswordReset.vue';
import Success from './components/auth/Success.vue';
import Dashboard from './components/app/Dashboard.vue';

Vue.use(VueRouter);

const routes = [
    {path: '/auth/login', component: Login, meta: {requiresAuth: false}},
    {path: '/auth/register', component: Register, meta: {requiresAuth: false}},
    {path: '/auth/forgotPassword', component: ForgotPasswordEmail, meta: {requiresAuth: false}},
    {path: '/auth/emailSent', component: Success, props: {message: 'Email has successfully been sent!!'}, meta: {requiresAuth: false}},
    {path: '/auth/passwordReset/:token', component: PasswordReset, meta: {requiresAuth: false}},
    {path: '/auth/passwordSuccess', component: Success, props: {message: 'Password has successfully been reset'}, meta: {requiresAuth: false}},
    {path: '/dashboard', component: Dashboard, meta: {requiresAuth: true}},
];

export default new VueRouter({
    mode: 'history',
    routes,
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition;
        }
        if (to.hash) {
            return {selector: to.hash};
        }
        return {x: 0, y:0};
    }
});