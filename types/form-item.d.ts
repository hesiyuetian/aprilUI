import Vue from 'vue';

export declare class AprilFormItem extends Vue {
    // 单个表单组件的标签文本
    public label: any;

    // 对应表单域 Form 组件 model 里的字段，用于在校验或重置时访问表单组件绑定的数据，类型为 String。
    public prop: string;

    public style: object;

    // label和内容的比例配置  例如：{ label: { flex: 3 },wrapper: { flex: 5 }, height: 40, paddingBottom: 26}
    public itemOption: object;

}
