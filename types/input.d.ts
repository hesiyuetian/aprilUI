import Vue from 'vue';

export declare class AprilInput extends Vue {

    // 当前输入值
    public value: string | number;

    // input输入类型
    public type: string;

    // 是否禁用
    public disable: boolean;

    // 提示文案
    public placeholder: string;
}