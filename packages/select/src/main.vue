<template>
    <span>
        <input  class="april-input-item "
                :class="[validate.validateState === 'error' && 'april-has-error', disable ? 'april-input-disable' : 'april-input april-f-cursor' ]"
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
        <april-select-option :list="optionList" :isShowDefalut="isShowDefalut" :filterable="filterable" :defalutFont="defalutFont" :value="value" @select="select" />
    </span>
</template>

<script lang="ts">
    import {Vue, Component, Prop, Watch} from 'vue-property-decorator'
    import AprilSelectOption from './option.vue'
    import Emitter from '../../../src/mixins/emitter';
    @Component({
        components: {AprilSelectOption},
        name: 'april-select',
        inject: ['validate'],
        mixins: [Emitter]
    })
    export default class AprilSelect extends Vue{
        dispatch:any;
        broadcast:any;
        public currentValue: any = '';
        public optionList: Array<any> = [];

        @Prop() public value!: any;

        // input输入 类型: String
        @Prop({default: 'text', type: String}) public type!: string;

        // 是否展示默认选则项
        @Prop({default: false, type: Boolean}) public isShowDefalut!: Boolean;
        @Prop({default: "请选择", type: String}) public defalutFont!: String;

        // 是否禁用
        @Prop({default: false, type: Boolean}) public disable!: Boolean;

        // 是否可搜索
        @Prop({default: false, type: Boolean}) public filterable!: Boolean;

        // 自定义搜索方法 类型: Function
        @Prop({default: () => {}, type: Function}) public filterMethod!: Function;

        // 选择框数据列表 类型: Array 格式 [{name: '要展示的字段', value: '唯一key'}]
        @Prop({ default: [], type: Array }) private list!: Array<any>;

        // 提示文案 类型: String
        @Prop({default: ''}) public placeholder!: '';


        @Watch('list',{deep: true, immediate:true})
        changeList(val:Array<any>){
            this.optionList = val;
        }

        @Watch("value", {deep: true, immediate:true})
        private changeVlaue(val:any){
            try{
                this.currentValue = this.list.filter(ele => ele.value === val)[0].name;
            }catch (e) { }
        }

        handleInput (event:any) {
            if(!this.disable && this.filterable){
                const value = event.target.value;
                this.currentValue = value;

                if(this.filterMethod){
                    this.filterMethod(value)
                }else{
                    this.optionList = this.list.filter(ele => ele.name.indexOf(value) != -1)
                }
            }
        }
        handleBlur () {
            this.dispatch('april-form-item', 'on-form-blur', this.currentValue);
        }

        handleFocus(){
            const dom = this.$el.getBoundingClientRect();
            const option = {
                width: dom.width,
                top: (dom.top || 0) + (document.documentElement.scrollTop || 0) + dom.height + 14 ,
                left: (dom.left || 0) + (document.documentElement.scrollLeft || 0),
            };

            this.broadcast('april-select-option', 'show', option);
        }

        select(data:any){
            this.currentValue = data ? data.name : '';
            this.$emit('input', data ? data.value : '');
            this.dispatch('april-form-item', 'on-form-change', data ? data.value : '');
        }
    }
</script>

<!--<style lang="scss" scoped>-->
<!--    .april-input-item{-->
<!--        box-sizing: border-box;-->
<!--        margin: 0;-->
<!--        font-variant: tabular-nums;-->
<!--        list-style: none;-->
<!--        font-feature-settings: "tnum";-->
<!--        position: relative;-->
<!--        display: inline-block;-->
<!--        width: 100%;-->
<!--        height: 32px;-->
<!--        padding: 4px 11px;-->
<!--        color: rgba(0,0,0,.65);-->
<!--        font-size: 14px;-->
<!--        line-height: 1.5;-->
<!--        background-color: #fff;-->
<!--        background-image: none;-->
<!--        border: 1px solid #d9d9d9;-->
<!--        border-radius: 4px;-->
<!--        transition: all .3s;-->
<!--    }-->
<!--</style>-->