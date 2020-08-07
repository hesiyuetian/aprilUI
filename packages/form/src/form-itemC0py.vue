<template>
    <div class="april-form-item">
        <label v-if="label" :class="{ 'april-form-item-required': isRequired }" :style="{'flex': itemOption.label.flex}">{{ label }}：</label>
        <div class="april-form-item-wrapper" :style="{'flex': itemOption.wrapper.flex}">
            <slot></slot>
            <transition name="fade">
                <div class="april-form-item-wrapper-message" v-if="validateState === 'error' && validateMessage">{{ validateMessage }}</div>
            </transition>
        </div>
    </div>
</template>

<script lang="ts">
    interface itemOption {
        label: { flex: number | string },
        wrapper: { flex: number | string }
    }
    import { Component, Vue, Prop, Provide, Inject } from "vue-property-decorator";
    import Emitter from '../../../src/mixins/emitter';
    import AsyncValidator from 'async-validator';

    @Component({
        name: 'april-form-item',
        mixins: [Emitter],
        // inject: ['form'],
        // provide() {
        //     return {
        //         validate: this
        //     };
        // }
    })
    export default class AprilFormItemCopy extends Vue{
        dispatch:any;

        isRequired: boolean = false;
        initialValue: string = '';  // 初始值
        validateState:string = '';  // 校验状态
        validateMessage:string = '';  // 校验不通过时的提示信息

        @Provide() valida = this;

        @Inject() form!: any;

        // label
        @Prop({default: '',type: String})
        public label!: string;

        // prop
        @Prop({type: String})
        public prop!: string;

        // prop
        @Prop({default: { label: { flex: 3 },wrapper: { flex: 5 }}, type: Object})
        public itemOption!: itemOption;

        // 从 Form 的 model 中动态得到当前表单组件的数据
        get fieldValue():any {
            return this.form.model[this.prop];
        }

        // 组件渲染时，将实例缓存在 Form 中
        mounted () {
            // 如果没有传入 prop，则无需校验，也就无需缓存
            console.log('this.prop', this.prop)
            if (this.prop) {
                this.dispatch('april-form', 'on-form-item-add', this);
                // 设置初始值，以便在重置时恢复默认值
                this.initialValue = this.fieldValue;
                this.setRules();
            }
        }

        // 组件销毁前，将实例从 Form 的缓存中移除
        beforeDestroy () {
            this.dispatch('april-form', 'on-form-item-remove', this);
        }

        setRules () {
            let rules = this.getRules();
            if (rules.length) {
                rules.every((rule:any) => {
                    // 如果当前校验规则中有必填项，则标记出来
                    this.isRequired = rule.required;
                });
            }
            this.$on('on-form-blur', this.onFieldBlur);
            this.$on('on-form-change', this.onFieldChange);
        }


        // 从 Form 的 rules 属性中，获取当前 FormItem 的校验规则
        getRules () {
            let formRules = this.form.rules;

            formRules = formRules ? formRules[this.prop] : [];

            return [].concat(formRules || []);
        }

        // 重置数据
        resetField () {
            this.validateState = '';
            this.validateMessage = '';

            this.form.model[this.prop] = this.initialValue;
        }

        // 只支持 blur 和 change，所以过滤出符合要求的 rule 规则
        getFilteredRule (trigger:string) {
            const rules:any = this.getRules();

            return rules.filter((rule:any) => !rule.trigger || rule.trigger.indexOf(trigger) !== -1);
        }

        /**
         * 校验数据
         * @param trigger 校验类型
         * @param callback 回调函数
         */
        validate(trigger:string, callback?:Function) {
            let rules = this.getFilteredRule(trigger);

            if (!rules || rules.length === 0) {
                return true;
            }

            // 设置状态为校验中
            this.validateState = 'validating';

            // 以下为 async-validator 库的调用方法
            let descriptor:any = {};
            descriptor[this.prop] = rules;

            const validator = new AsyncValidator(descriptor);
            let model:any = {};

            model[this.prop] = this.fieldValue;

            validator.validate(model, { firstFields: true }, (errors:any) => {
                this.validateState = !errors ? 'success' : 'error';
                this.validateMessage = errors ? errors[0].message : '';

                callback && callback(this.validateMessage);
            });
        }


        onFieldBlur() {
            this.validate('blur');
        }
        onFieldChange() {
            this.validate('change');
        }
    }
</script>

<!--<style lang="scss" scoped>-->
<!--    .april-form-item{-->
<!--        width: 100%;-->
<!--        margin: 0 0 22px;-->
<!--        padding: 0;-->
<!--        color: rgba(0,0,0,.65);-->
<!--        font-size: 14px;-->
<!--        font-variant: tabular-nums;-->
<!--        line-height: 1.5;-->
<!--        list-style: none;-->
<!--        font-feature-settings: "tnum";-->
<!--        vertical-align: top;-->
<!--        display: flex;-->
<!--        label{-->
<!--            line-height: 40px;-->
<!--            white-space: nowrap;-->
<!--            text-align: right;-->
<!--        }-->
<!--        &-required:before {-->
<!--            content: '*';-->
<!--            color: red;-->
<!--        }-->
<!--        &-wrapper{-->
<!--            position: relative;-->
<!--            line-height: 40px;-->
<!--            zoom: 1;-->
<!--            &-message{-->
<!--                position: absolute;-->
<!--                bottom: -18px;-->
<!--                clear: both;-->
<!--                min-height: 22px;-->
<!--                margin-top: -2px;-->
<!--                margin-bottom: -1px;-->
<!--                color: rgba(0,0,0,.45);-->
<!--                line-height: 1.5;-->
<!--                color: #f5222d;-->
<!--                font-size: 14px;-->
<!--                transition: color .3s cubic-bezier(.215,.61,.355,1);-->
<!--            }-->
<!--        }-->
<!--    }-->
<!--</style>-->