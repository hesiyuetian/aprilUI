<template>
    <form>
        <slot></slot>
    </form>
</template>

<script lang="ts">
    import { Component, Vue, Prop, Provide } from "vue-property-decorator";
    import Emitter from '../../../src/mixins/emitter';

    @Component({
        name: 'april-form',
        mixins: [Emitter],
        // provide(){
        //     return {
        //         form : this
        //     };
        // }
    })
    export default class AprilFormCopy extends Vue{
        public fields:Array<any> = [];

        @Provide() form = this;

        // 当前页码
        @Prop({ type: Object})
        public model!: Object;

        // 当前页码
        @Prop({ type: Object})
        public rules!: Object;

        created(){
            this.$on('on-form-item-add', (field:any) => {
                if (field) this.fields.push(field);
            });
            this.$on('on-form-item-remove', (field:any) => {
                if (field.prop) this.fields.splice(this.fields.indexOf(field), 1);
            });
        }

        // 公开方法：全部重置数据
        resetFields() {
            this.fields.forEach(field => {
                field.resetField();
            });
        }
        // 公开方法：全部校验数据，支持 Promise
        validate(callback:Function) {
            return new Promise(resolve => {
                let valid = true;
                let count = 0;
                this.fields.forEach(field => {
                    field.validate('', (errors:any) => {
                        if (errors) {
                            valid = false;
                        }
                        if (++count === this.fields.length) {
                            // 全部完成
                            resolve(valid);
                            if (typeof callback === 'function') {
                                callback(valid);
                            }
                        }
                    });
                });
            });
        }
    }
</script>