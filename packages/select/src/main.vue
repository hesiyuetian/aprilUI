<template>
    <div style="height: 100%">
        <input  class="april-input-item"
                :style="{'font-size': fontSize+'px', 'color': color, 'background-color': backgroundColor}"
                :class="[valida.validateState === 'error' && 'april-has-error', disable ? 'april-input-disable' : 'april-input april-f-cursor' ]"
                :type="type"
                :readonly="!filterable"
                :disabled="disable"
                :placeholder="placeholder"
                :value="currentValue"
                @focus.stop="!disable && handleFocus()"
                @click.stop="!disable && handleFocus()"
                @input.stop="handleInput"
                @blur.stop="!disable && handleBlur()"
        />
        <april-select-option :list="optionList" :select-color="selectColor" :active-background-color="activeBackgroundColor" :select-background-color="selectBackgroundColor" :isShowDefalut="isShowDefalut" :filterable="filterable" :defalutFont="defalutFont" :value="value" @select="select" />
    </div>
</template>

<script>
    import AprilSelectOption from './option.vue'
    import Emitter from '../../../src/mixins/emitter';
    export default {
        name: 'april-select',
        componentName: 'april-select',
        mixins: [Emitter],
        inject: ["valida"],
        components: {
            AprilSelectOption
        },
        data(){
            return {
                currentValue:'',
                optionList: [],
            }
        },
        props: {
            value: {
                required: true
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
            isShowDefalut: {
                type: Boolean,
                default: false
            },
            defalutFont: {
                type: String,
            },
            filterable: {
                type: Boolean,
                default: false
            },
            filterMethod: {
                type: Function,
                default: () => {}
            },
            list: {
                type: Array,
                default: []
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
            },

            activeBackgroundColor: {
                type: String,
                default: '#bae7ff'
            },
            selectColor: {
                type: String,
                default: 'rgba(0,0,0,.65)'
            },
            selectBackgroundColor: {
                type: String,
                default: '#fff'
            }

        },
        watch: {
            list: {
                handler(val) {
                    this.optionList = val;
                },
                immediate: true
            },
            value: {
                handler(val) {
                    const rus = this.list.filter(ele => ele.value === val);
                    this.currentValue = rus.length > 0 ? rus[0].name : ''
                },
                immediate: true
            }
        },

        methods: {
            handleInput (event) {
                if(!this.disable && this.filterable){
                    const value = event.target.value;
                    this.currentValue = value;

                    if(this.filterMethod){
                        this.filterMethod(value)
                    }else{
                        this.optionList = this.list.filter(ele => ele.name.indexOf(value) != -1)
                    }
                }
            },
            handleBlur () {
                setTimeout(() => {
                    this.broadcast('april-select-option', 'hidden', false);
                    this.dispatch('april-form-item', 'on-form-blur', this.currentValue);
                },200)
            },

            handleFocus(){
                const dom = this.$el.getBoundingClientRect();
                const option = {
                    width: dom.width,
                    top: (dom.top || 0) + (document.documentElement.scrollTop || 0) + dom.height + 10 ,
                    left: (dom.left || 0) + (document.documentElement.scrollLeft || 0),
                };
                this.broadcast('april-select-option', 'show', option);
            },

            select(data){
                const value = data ? data.value : '';
                this.currentValue = data ? data.name : '';
                this.$emit('input', value);
                this.dispatch('april-form-item', 'on-form-change', value);
            }
        },
    }

</script>