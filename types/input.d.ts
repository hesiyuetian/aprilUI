import Vue from 'vue';

export declare class AprilInput extends Vue {

    // 当前输入值
    public value: any;

    // input输入类型
    public type: string;

    // 是否禁用
    public disable: boolean;

    // 提示文案
    public placeholder: string;

    // 字体颜色
    public color: string;

    // input背景颜色
    public backgroundColor: string;

    // 字体大小 不带单位
    public fontSize: string;
}