import Vue from 'vue';

export declare class AprilFormItem extends Vue {

    // 单个表单组件的标签文本
    public prop: number;

    // 对应表单域 Form 组件 model 里的字段，用于在校验或重置时访问表单组件绑定的数据，类型为 String。
    public itemOption: number;
}