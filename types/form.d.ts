import Vue from 'vue';

export declare class AprilForm extends Vue {

    // 表单控件绑定的数据对象，在校验或重置时会访问该数据对象下对应的表单数据，类型为 Object。
    public model: Object;

    // 表单验证规则，即上面介绍的 async-validator 所使用的校验规则，类型为 Object。
    public rules: Object;

}