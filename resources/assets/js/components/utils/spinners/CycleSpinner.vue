<template>
    <div class="v-spinner" v-show="loading">
        <div class="v-cycle" v-bind:style="spinnerStyle">
        </div>
    </div>
</template>

<script>
    export default {

        name: 'ClipLoader',
        props: {
            loading: {
                type: Boolean,
                default: true
            },
            color: {
                type: String,
                default: '#5dc596'
            },
            size: {
                type: String,
                default: '35px'
            },
            radius: {
                type: String,
                default: '100%'
            },
            margin: {
                type: String,
                default: 'auto'
            }
        },
        computed: {
            spinnerStyle() {
                return {
                    height: this.size,
                    width: this.size,
                    borderWidth: '2px',
                    borderStyle: 'solid',
                    borderColor: this.color + ' ' + this.color + ' transparent',
                    borderRadius: this.radius,
                    background: 'transparent',
                    margin: this.margin,
                }
            }
        }
    }
</script>

<style>
    .v-spinner {
        /*	  font-size: 10px;
            width: 60px;
            height: 40px;*/
        /*margin: 25px auto;*/
        text-align: center;

    }

    .v-spinner .v-cycle {
        -webkit-animation: v-cycleDelay 0.75s 0s infinite linear;
        animation: v-cycleDelay 0.75s 0s infinite linear;
        -webkit-animation-fill-mode: both;
        animation-fill-mode: both;
        display: inline-block;
    }

    @-webkit-keyframes v-cycleDelay {
        0% {
            -webkit-transform: rotate(0deg) scale(1);
            transform: rotate(0deg) scale(1);
        }
        50% {
            -webkit-transform: rotate(180deg) scale(0.8);
            transform: rotate(180deg) scale(0.8);
        }
        100% {
            -webkit-transform: rotate(360deg) scale(1);
            transform: rotate(360deg) scale(1);
        }
    }

    @keyframes v-cycleDelay {
        0% {
            -webkit-transform: rotate(0deg) scale(1);
            transform: rotate(0deg) scale(1);
        }
        50% {
            -webkit-transform: rotate(180deg) scale(1);
            transform: rotate(180deg) scale(1);
        }
        100% {
            -webkit-transform: rotate(360deg) scale(1);
            transform: rotate(360deg) scale(1);
        }
    }
</style>