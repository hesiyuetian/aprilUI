<template>
    <input
            class="april-input-item"
            :class="[valida.validateState === 'error' && 'april-has-error', disable ? 'april-input-disable' : 'april-input' ]"
            :style="{'font-size': fontSize+'px', 'color': color, 'background-color': backgroundColor}"
            :type="type"
            :placeholder="placeholder"
            :readonly="disable"
            :value="currentValue"
            @input="handleInput"
            @blur="handleBlur"
    />
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
            },
            color: {
                type: String,
                default: 'rgba(0,0,0,.65)'
            },
            backgroundColor: {
                type: String,
                default: '#fff'
            },
            fontSize: {
                type: [String, Number],
                default: '14'
            }
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