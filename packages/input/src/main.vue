<template>
    <span>
        <input
                class="april-input-item"
                :class="[validate.validateState === 'error' && 'april-has-error', disable ? 'april-input-disable' : 'april-input' ]"
                :type="type"
                :placeholder="placeholder"
                :readonly="disable"
                :value="currentValue"
                @input="handleInput"
                @blur="handleBlur"
        />
    </span>
</template>

<script lang="ts">
    import {Vue, Component, Prop, Watch} from 'vue-property-decorator'
    import Emitter from '../../../src/mixins/emitter';
    @Component({
        name: 'april-input',
        inject: ['validate'],
        mixins: [Emitter]
    })
    export default class AprilInput extends Vue{
        dispatch:any;
        public currentValue: any = '';

        @Prop({default: ''})
        public value!: any;

        @Prop({default: 'text', type: String})
        public type!: string;

        @Prop({default: false, type: Boolean})
        public disable!: Boolean;

        @Prop({default: ''})
        public placeholder!: '';

        @Watch("value", {deep: true, immediate:true})
        private changeVlaue(val:any){
            this.currentValue = val;
        }

        handleInput (event:any) {
            const value = event.target.value;
            this.currentValue = value;
            this.$emit('input', value);
            this.dispatch('april-form-item', 'on-form-change', value);
        }
        handleBlur () {
            this.dispatch('april-form-item', 'on-form-blur', this.currentValue);
        }
    }
</script>

<!--<style lang="scss" scoped>-->
<!--    input{-->
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