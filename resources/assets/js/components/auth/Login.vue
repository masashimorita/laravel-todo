<template>
    <div class="login-wrapper">
        <div class="login-page">
            <img class="logo" :src="baseURL + '/images/logo.png'">
            <div class="form">
                <h3 class="text-center">Member Login</h3>
                <form class="login-form" role="form">
                    <span class="error-text">{{ error }}</span>
                    <div>
                        <input id="email" type="email" name="email" placeholder="email" v-model="email" />
                    </div>
                    <div>
                        <input id="password" type="password" name="password" placeholder="password" v-model="password" />
                    </div>
                    <button type="submit" @click.prevent="login">
                        <div v-if="!isLoading"><span>login</span></div>
                        <div v-else><cycle-spinner :loading="isLoading" :size="'28px'" :color="'#fff'"></cycle-spinner></div>
                    </button>
                    <p class="message"><router-link to="/auth/forgotPassword"><span class="fa fa-lock"></span>Forgot password?</router-link></p>
                </form>
            </div>
            <p class="register">Don't have an account? <router-link to="/auth/register">Sign up</router-link></p>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                error: '',
                email: '',
                password: '',
                isLoading: false,
            }
        },
        methods: {
            login() {
                let vm = this;
                if (this.email === '') {
                    this.error = 'Please input email';
                    return;
                }
                if (this.password === '') {
                    this.error = 'Please input password';
                }

                this.isLoading = true;
                this.$store.dispatch('login', {email: this.email, password: this.password, errorCb: (error) => {
                    vm.error = (error.response.data !== undefined) ? error.response.data.message.replace(/_/g, ' ') : error.message.replace(/_/g, ' ');
                    vm.isLoading = false;
                }});
            }
        }
    }
</script>

<style scoped>
    .login-page {
        width: 420px;
        margin: auto;
        padding: 10px 0 15px;
    }

    .logo {
        display: block;
        height: 85px;
        padding-top: 30px;
        margin: 0 auto 30px;
    }

    .form h3 {
        margin-top: 5px;
        margin-bottom: 15px;
        font-size: 2.25rem;
    }

    .form {
        position: relative;
        z-index: 1;
        background: #FFFFFF;
        max-width: 420px;
        margin: 0 auto 20px;
        padding: 25px 45px;
        text-align: center;
        box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);
    }

    .form span.error-text {
        color: red;
        width: 100%;
        text-align: left;
        display: block;
        margin-bottom: 5px;
    }

    .form input {
        outline: 0;
        background: #f2f2f2;
        width: 100%;
        border: 0;
        margin: 0 0 15px;
        padding: 15px;
        box-sizing: border-box;
        font-size: 14px;
    }

    .form div.has-error input {
        margin-bottom: 0;
    }

    .form button {
        text-transform: uppercase;
        outline: 0;
        background: #ffad33;
        width: 100%;
        border: 0;
        color: #FFFFFF;
        font-size: 14px;
        -webkit-transition: all 0.3 ease;
        transition: all 0.3 ease;
        cursor: pointer;
        min-height: 47px;
    }

    .form button:hover,.form button:active,.form button:focus {
        background: #ffb84d;
    }

    .form span.help-block {
        text-align: left;
        font-size: 90%;
    }

    .form .message, .register {
        margin: 15px 0 0;
        color: #ffb84d;
        font-size: 14px;
    }

    .form .message {
        text-align: right;
    }

    .form .message a {
        color: #ffb84d;
        text-decoration: none;
    }

    .form .message a span {
        margin-right: 3px;
    }

    .form .message a:hover {
        color: #ff9900;
        -webkit-transition: all .5s ease;
        -moz-transition: all .5s ease;
        -ms-transition: all .5s ease;
        -o-transition: all .5s ease;
        transition: all .5s ease;
    }

    .register a {
        color: #ffb84d;
        text-decoration: none;
        border-bottom: 1px solid #ffb84d;
    }

    .register a:hover {
        color: #ff9900;
        border-bottom: 2px solid #ff9900;
        -webkit-transition: all .5s ease;
        -moz-transition: all .5s ease;
        -ms-transition: all .5s ease;
        -o-transition: all .5s ease;
        transition: all .5s ease;
    }

    .register {
        text-align: center;
    }

    @media screen and (min-width: 1200px) {
        .logo {
            height: 115px;
            padding-top: 50px;
        }
    }

    @media screen and (max-width: 450px) {
        .login-page {
            width: 100%;
        }

        .form {
            width: 90%;
            margin: auto auto;
            padding-left: 15px;
            padding-right: 15px;
        }

        .logo {
            height: 65px;
            padding-top: 20px;
            margin-bottom: 20px;
        }
    }
</style>