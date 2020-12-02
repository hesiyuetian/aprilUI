<template>
    <input
            class="april-input-item"
            :class="[valida.validateState === 'error' && 'april-has-error', disable ? 'april-input-disable' : 'april-input' ]"
            :style="{...style}"
            :type="type"
            :placeholder="placeholder"
            :readonly="disable"
            :value="currentValue"
            @input="handleInput"
            @keyup="handleKeyup"
            @keydown="handleKeydown"
            @keypress="handleKeypress"
            @blur="handleBlur"
    />
</template>

<script>
    import Emitter from '../../../src/mixins/emitter';

    export default {
        name: 'april-input',
        componentName: 'april-input',
        mixins: [Emitter],
        inject: {
            valida: {
                default: ''
            }
        },
        inheritAttrs: false,
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
            style: {
                type: Object,
                default: () => { return {} }
            },
            disable: {
                type: Boolean,
                default: false
            },
        },
        watch: {
            value: {
                handler(val) {
                    this.currentValue = val;
                },
                deep: true,
                immediate: true
            }
        },

        methods: {
            handleKeyup (event){
                const value = event.target.value;
                this.$emit('keyup', value);
            },
            handleKeydown (event){
                const value = event.target.value;
                this.$emit('keydown', value);
            },
            handleKeypress (event){
                const value = event.target.value;
                this.$emit('keypress', value);
            },
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
