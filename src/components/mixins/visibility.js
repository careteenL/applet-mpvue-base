// 可以通过v-model控制显示隐藏
// 也可以通过show() hide()
export default {
    props: {
        value: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            visible: this.value
        };
    },
    watch: {
        value(newVal) {
            this.visible = newVal;
        },
        visible(newVal, oldVal) {
            this.$emit('input', newVal);

            if (newVal !== oldVal) {
                newVal ? this.show() : this.hide();
            }
        }
    },

    methods: {
        show() {
            this.visible = true;
        },
        hide() {
            this.visible = false;
        }
    }
};
