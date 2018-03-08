<template>
    <div class="reset-wrapper">
        <div class="reset-password-page">
            <img class="logo" :src="baseURL + '/images/logo.png'">
            <div class="form">
                <h3 class="text-center">Reset Password</h3>
                <form class="reset-password-form" role="form" method="POST" action="">
                    <span class="error-text">{{ error }}</span>
                    <div>
                        <input id="email" type="email" name="email" placeholder="email" value="" v-model="email" />
                    </div>
                    <div>
                        <input id="password" type="password" name="password" placeholder="password" v-model="password" />
                    </div>
                    <div>
                        <input id="password-confirm" type="password" name="password_confirmation" placeholder="confirm password" v-model="passwordConfirmation" />
                    </div>
                    <button type="submit" @click.prevent="ResetPassword">
                        <div v-if="!isLoading"><span>Reset Password</span></div>
                        <div v-else><cycle-spinner :loading="isLoading" :size="'28px'" :color="'#fff'"></cycle-spinner></div>
                    </button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                error: '',
                token: '',
                email: '',
                password: '',
                passwordConfirmation: '',
                isLoading: false,
            };
        },
        created() {
            this.token = this.$route.params.token;
        },
        methods: {
            ResetPassword() {
                let vm = this;
                if (!this.email) {
                    this.error = 'Email is required...';
                    return;
                }

                if (!this.password) {
                    this.error = 'Password is required...';
                    return;
                }

                if (!this.passwordConfirmation) {
                    this.error = 'Password retype is required...';
                    return;
                }

                if (this.password !== this.passwordConfirmation) {
                    this.error = 'Password did not match...';
                    return;
                }

                this.isLoading = true;
                axios.post('/api/passwordReset', {
                    'token': this.token,
                    'email': this.email,
                    'password': this.password,
                    'password_confirmation': this.passwordConfirmation
                }).then((res) => {
                    this.$router.push('/auth/passwordSuccess');
                }).catch((error) => {
                    vm.error = error.response.data.message;
                    vm.isLoading = false;
                });
            }
        }
    }
</script>

<style scoped>
    .reset-password-page {
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

    .form span.error-text {
        display: block;
        width: 100%;
        color: red;
        text-align: left;
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

    @media screen and (min-width: 1200px) {
        .logo {
            height: 115px;
            padding-top: 50px;
        }
    }

    @media screen and (max-width: 450px) {
        .reset-password-page {
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