import Vue from 'vue';

export declare class AprilInput extends Vue {

    // 当前输入值
    public value: any;

    // input输入类型
    public type: string;

    // input样式
    public style: object;

    // 是否禁用
    public disable: boolean;

    // 提示文案
    public placeholder: string;
}
