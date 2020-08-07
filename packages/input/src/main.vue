<template>
    <span>
        <input
                class="april-input-item"
                :class="[valida.validateState === 'error' && 'april-has-error', disable ? 'april-input-disable' : 'april-input' ]"
                :type="type"
                :placeholder="placeholder"
                :readonly="disable"
                :value="currentValue"
                @input="handleInput"
                @blur="handleBlur"
        />
    </span>
</template>

<script>
    import Emitter from '../../../src/mixins/emitter';

    export default {
        name: 'april-input',
        componentName: 'april-input',
        mixins: [Emitter],
        inject: ["valida"],
        data(){
            return {
                currentValue:''
            }
        },
        props: {
            value: {
                type: String,
            },
            type: {
                type: String,
                default: 'text'
            },
            placeholder: {
                type: String,
            },
            disable: {
                type: Boolean,
                default: false
            }
        },
        watch: {
            value: {
                handler(val) {
                    this.currentValue = val;
                },
                deep: true,
                // 代表在wacth里声明了firstName这个方法之后立即先去执行handler方法
                immediate: true
            }
        },

        methods: {
            handleInput (event) {
                const value = event.target.value;
                this.currentValue = value;
                this.$emit('input', value);
                this.dispatch('april-form-item', 'on-form-change', value);
            },
            handleBlur () {
                this.dispatch('april-form-item', 'on-form-blur', this.currentValue);
            }
        },

    }

</script>