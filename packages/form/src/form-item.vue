<template>
    <div class="april-form-item">
        <label v-if="label" :class="{'april-form-item-required': isRequired }" :style="{'flex': itemOption.label.flex}">
            <span class="">{{ label }}：</span>
        </label>
        <div class="april-form-item-wrapper" :style="{'flex': itemOption.wrapper.flex}">
            <slot></slot>
            <transition name="fade">
                <div class="april-form-item-wrapper-message" v-if="validateState === 'error' && validateMessage">{{ validateMessage }}</div>
            </transition>
        </div>
    </div>
</template>

<script>
    import Emitter from '../../../src/mixins/emitter';
    import AsyncValidator from 'async-validator';

    export default {
        name: 'april-form-item',
        componentName: 'april-form-item',
        mixins: [Emitter],
        provide(){
            return {
                valida : this
            };
        },
        inject: ["form"],
        data(){
            return {
                isRequired: false,
                initialValue: '',  // 初始值
                validateState:'',  // 校验状态
                validateMessage:'',  // 校验不通过时的提示信息
            }
        },
        props: {
            label: {
                type: String,
            },
            prop: {
                type: String,
            },
            itemOption: {
                type: Object,
                default: { label: { flex: 3 },wrapper: { flex: 5 }}
            }
        },
        computed: {
            fieldValue() {
                return this.form.model[this.prop];
            }
        },
        // 组件渲染时，将实例缓存在 Form 中
        mounted () {
            // 如果没有传入 prop，则无需校验，也就无需缓存
            if (this.prop) {
                this.dispatch('april-form', 'on-form-item-add', this);
                // 设置初始值，以便在重置时恢复默认值
                this.initialValue = this.fieldValue;
                this.setRules();
            }
        },
        // 组件销毁前，将实例从 Form 的缓存中移除
        beforeDestroy () {
            this.dispatch('april-form', 'on-form-item-remove', this);
        },
        methods: {
            setRules () {
                let rules = this.getRules();
                if (rules.length) {
                    rules.every((rule) => {
                        // 如果当前校验规则中有必填项，则标记出来
                        this.isRequired = rule.required;
                    });
                }
                this.$on('on-form-blur', this.onFieldBlur);
                this.$on('on-form-change', this.onFieldChange);
            },


            // 从 Form 的 rules 属性中，获取当前 FormItem 的校验规则
            getRules () {
                let formRules = this.form.rules;

                formRules = formRules ? formRules[this.prop] : [];

                return [].concat(formRules || []);
            },

            // 重置数据
            resetField () {
                this.validateState = '';
                this.validateMessage = '';

                this.form.model[this.prop] = this.initialValue;
            },

            // 只支持 blur 和 change，所以过滤出符合要求的 rule 规则
            getFilteredRule (trigger) {
                const rules = this.getRules();

                return rules.filter((rule) => !rule.trigger || rule.trigger.indexOf(trigger) !== -1);
            },

            /**
             * 校验数据
             * @param trigger 校验类型
             * @param callback 回调函数
             */
            validate(trigger, callback) {
                let rules = this.getFilteredRule(trigger);

                if (!rules || rules.length === 0) {
                    return true;
                }

                // 设置状态为校验中
                this.validateState = 'validating';

                // 以下为 async-validator 库的调用方法
                let descriptor = {};
                descriptor[this.prop] = rules;

                const validator = new AsyncValidator(descriptor);
                let model = {};

                model[this.prop] = this.fieldValue;

                validator.validate(model, { firstFields: true }, (errors) => {
                    this.validateState = !errors ? 'success' : 'error';
                    this.validateMessage = errors ? errors[0].message : '';

                    callback && callback(this.validateMessage);
                });
            },


            onFieldBlur() {
                this.validate('blur');
            },
            onFieldChange() {
                this.validate('change');
            }
        },

    }

</script>
