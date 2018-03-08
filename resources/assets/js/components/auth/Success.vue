<template>
    <div class="send-wrapper">
        <div class="success-page">
            <img class="logo" :src="baseURL + '/images/logo.png'">
            <div class="wrapper">
                <h3 class="text-center">{{ message }}</h3>
                <button type="submit"><router-link to="/auth/login">Got it</router-link></button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['message']
    }
</script>

<style scoped>
    .success-page {
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

    .wrapper h3 {
        margin-top: 5px;
        margin-bottom: 25px;
        font-size: 2.25rem;
    }

    .wrapper {
        position: relative;
        z-index: 1;
        background: #FFFFFF;
        max-width: 420px;
        margin: 0 auto 20px;
        padding: 25px 45px 35px;
        text-align: center;
        box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);
    }

    .wrapper input {
        outline: 0;
        background: #f2f2f2;
        width: 100%;
        border: 0;
        margin: 0 0 15px;
        padding: 15px;
        box-sizing: border-box;
        font-size: 14px;
    }

    .wrapper div.has-error input {
        margin-bottom: 0;
    }

    .wrapper button {
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
    }

    .wrapper button:hover,.wrapper button:active,.wrapper button:focus {
        background: #ffb84d;
    }

    .wrapper button a {
        color: #ffffff;
        text-decoration: none;
        width: 100%;
        height: 100%;
        padding: 12px;
        display: block;
    }

    .wrapper span.help-block {
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
        .success-page {
            width: 100%;
        }

        .wrapper {
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