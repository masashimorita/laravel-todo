export const baseMixins = {
    data() {
        return {
            baseURL: '',
        };
    },
    methods: {
        hasClass(el, cls) {
            return el.className && new RegExp("(\\s|^)" + cls + "(\\s|$)").test(el.className);
        },
        addClass(el, cls) {
            if (!el.classList.contains(cls)) {
                el.classList.add(cls);
            }
        },
        removeClass(el, cls) {
            if (el.classList.contains(cls)) {
                el.classList.remove(cls);
            }
        },
    },
    created() {
        this.baseURL = document.head.querySelector('meta[name="asset-path"]').content;
    },
    computed: {
        style() {
            if (this.$route.path.indexOf('/auth') !== -1) {
                return {
                    'width': '100%',
                    'min-height': '100vh',
                    'height': '100%',
                    'background': '#f5f8fa',
                    '-webkit-font-smoothing': 'antialiased',
                    '-moz-osx-font-smoothing': 'grayscale'
                };
            }
            return null;
        }
    }
};