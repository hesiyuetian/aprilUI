<template>
    <div class="april-input-line" :style="{'height': height,'width': width}">
        <input  class="april-input-item"
                style="vertical-align: top"
                :style="{'font-size': fontSize+'px', 'color': color, 'background-color': backgroundColor, }"
                :class="[valida.validateState === 'error' && 'april-has-error', disable ? 'april-input-disable' : 'april-input april-f-cursor' ]"
                :type="type"
                readonly="true"
                :disabled="disable"
                :placeholder="placeholder"
                :value="currentValue"
                @focus.stop="!disable && handleFocus()"
                @click.stop="!disable && handleFocus()"
                @input.stop="handleInput"
                @blur.stop="!disable && handleBlur()"
        />
        <i class='iconfont icon-calendar'>&#xe785;</i>
<!--        <i class='iconfont icon-quxiao'-->
<!--           :class="[disable ? 'april-input-disable' : 'april-f-cursor' ]"-->
<!--           @click='cancel'>&#xe6b4;</i>-->

        <april-date-option :value="value" :max-date="maxDate" :min-date="minDate" @select="select" />
    </div>
</template>

<script>
    import AprilDateOption from './option.vue'
    import Emitter from '../../../src/mixins/emitter';
    import './date'
    export default {
        name: 'april-date-picker',
        componentName: 'april-date-picker',
        mixins: [Emitter],
        inject: {
            valida: {
                default: ''
            }
        },
        components: {
            AprilDateOption
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
            maxDate:{
                type: String,
                default:''
            },
            minDate:{
                type: String,
                default:''
            },
            placeholder: {
                type: String,
            },
            disable: {
                type: Boolean,
                default: false
            },

            height: {
                type: String,
                default: '100%'
            },
            width: {
                type: String,
                default: '100%'
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
                    this.currentValue = val
                },
                immediate: true
            }
        },

        beforeDestroy() {
            const domList = document.getElementsByClassName('april-select-option')
            for(var k = 0 ; k < domList.length ; k++ ){
                domList[k].parentNode.removeChild(domList[k])
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
                // setTimeout(() => {
                //     this.broadcast('april-select-option', 'hidden', false);
                //     this.dispatch('april-form-item', 'on-form-blur', this.currentValue);
                // },200)
            },

            handleFocus(){
                const dom = this.$el.getBoundingClientRect();

                const option = {
                    width: dom.width,
                    top: (dom.top || 0) + (document.documentElement.scrollTop || 0) + dom.height + 10 ,
                    left: (dom.left || 0) + (document.documentElement.scrollLeft || 0),
                };
                this.broadcast('april-date-option', 'show', option);
            },

            select(data){
                this.currentValue = data;
                this.$emit('input', data);
                this.dispatch('april-form-item', 'on-form-change', data);
            }
        },
    }

</script>