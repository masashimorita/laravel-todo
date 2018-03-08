<template>
    <div class="register-wrapper">
        <div class="register-page">
            <img class="logo" :src="baseURL + '/images/logo.png'">
            <div class="form">
                <h3 class="text-center">Sign Up</h3>
                <form class="register-form" role="form">
                    <span class="error-text">{{ error }}</span>
                    <div>
                        <input id="name" type="text" name="name" placeholder="name" v-model="formData.name" />
                    </div>
                    <div>
                        <input id="email" type="email" name="email" placeholder="email" v-model="formData.email" />
                    </div>
                    <div>
                        <input id="password" type="password" name="password" placeholder="password" v-model="formData.password" />
                    </div>
                    <div>
                        <input id="password-confirm" type="password" name="password_confirmation" placeholder="confirm password" v-model="formData.confirmPassword" />
                    </div>
                    <button type="submit" @click.prevent="register">
                        <div v-if="!isLoading"><span>Register</span></div>
                        <div v-else><cycle-spinner :loading="isLoading" :size="'28px'" :color="'#fff'"></cycle-spinner></div>
                    </button>
                </form>
            </div>
            <p class="login">Already have an account? <router-link to="/auth/login">Login</router-link></p>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                error: '',
                isLoading: false,
                formData: {
                    name: '',
                    email: '',
                    password: '',
                    confirmPassword: '',
                }
            };
        },
        methods: {
            register() {
                let result = this.validateProps(this.formData);
                if (result) {
                    this.error = result;
                    return;
                }

                if (this.formData.password !== this.formData.confirmPassword) {
                    this.error = 'Password not match...';
                    return;
                }

                this.isLoading = true;
                let vm = this;
                this.$store.dispatch('register', {email: this.formData.email, name: this.formData.name, password: this.formData.password, errorCb: (error) => {
                    vm.error = (error.response.data !== undefined) ? error.response.data.message.replace(/_/g, ' ') : error.message.replace(/_/g, ' ');
                    vm.isLoading = false;
                }});
            },
            validateProps(data) {
                let error = null;
                for (let i in data) {
                    if (!data[i]) {
                        error = i + ' is required...';
                        break;
                    }
                }
                return error;
            }
        }
    }
</script>

<style scoped>
    .form span.error-text {
        color: red;
        width: 100%;
        text-align: left;
        display: block;
        margin-bottom: 5px;
    }

    .register-page {
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
        padding: 25px 45px 30px;
        text-align: center;
        box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);
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

    .login {
        margin: 15px 0 0;
        color: #ffffff;
        font-size: 14px;
    }

    .login a {
        color: #ffffff;
        text-decoration: none;
        border-bottom: 1px solid #ffffff;
    }

    .login a:hover {
        color: #eeeeee;
        border-bottom: 2px solid #eeeeee;
        -webkit-transition: all .5s ease;
        -moz-transition: all .5s ease;
        -ms-transition: all .5s ease;
        -o-transition: all .5s ease;
        transition: all .5s ease;
    }

    .login {
        text-align: center;
    }

    @media screen and (min-width: 1200px) {
        .logo {
            height: 115px;
            padding-top: 50px;
        }
    }

    @media screen and (max-width: 450px) {
        .register-page {
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