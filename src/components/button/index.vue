<template>
    <button @click="change" class="a-button" :disabled="disabled||loading||load" :class="[theme, isBorder, isRound, sizes, blockCss]" :style="[minWidthCss]">
        <span>
            <i v-if="loading||load" class="iconfont icon-prefix icon-loading"></i>
            <i v-if="iconPrefix" class="iconfont icon-prefix" :class="iconPrefix"></i>
            <slot></slot>
            <i v-if="iconSuffix" class="iconfont icon-suffix" :class="iconSuffix"></i>
        </span>

    </button>
</template>

<script>
export default {
    name: 'AButton',
    props: {
        type: {
            type: String,
            default: '',
        },
        size: {
            type: String,
            default: ''
        },
        minWidth: {
            type: String,
            default: '',
        },
        prefix: {
            type: String,
            default: '',
        },
        suffix: {
            type: String,
            default: '',
        },
        border: Boolean,// 默认false
        round: Boolean,// 默认false
        disabled: Boolean,// 默认false
        block: Boolean,// 默认false
        loading: Boolean,// 默认false
        beforeChange: Function
    },
    computed: {
        theme() {
            return this.type ? `a-button-${this.type}` : ''
        },
        sizes() {
            return this.size ? `a-button-${this.size}` : ''
        },
        isBorder() {
            return this.border ? 'is-border' : ''
        },
        isRound() {
            return this.round ? 'is-round' : ''
        },
        minWidthCss() {
            if (!this.minWidth) { return '' }
            return { 'min-width': this.minWidth }
        },
        iconPrefix() {
            return this.prefix ? `icon-${this.prefix}` : ''
        },
        iconSuffix() {
            return this.suffix ? `icon-${this.suffix}` : ''
        },
        blockCss() {
            return this.block ?'a-button-block' : ''
        },

    },
    data() {
        return {
            load:false
        };
    },
    methods: {
        // 事件回调
        change() {
            // 首先判断是否是函数 resolve则走.then方法  reject则走.catch方法
            if (typeof this.beforeChange === 'function') {
                this.load = true;
                this.beforeChange().then((res) => {
                    this.load = false;
                }).catch(()=> {
                    this.load = false;

                })
            }
            this.$emit('click')
        }
    }


}

</script>
<style lang='scss' scoped>
@import './button.scss';
</style>