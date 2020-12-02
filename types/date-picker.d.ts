import Vue, { VNode } from 'vue';

export interface QueryChangeHandler {
    /**
     * @param queryString Current value of the text input
     */
    (queryString: string): void
}


export declare class AprilDatePicker extends Vue {

    // 当前绑定的值
    public value: any;

    //最大可选日期    eg: 2020-10-23
    public maxDate: string;

    //最小可选日期    eg: 2020-06-23
    public minDate: string;


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

    // 选择列表的背景颜色
    public selectBackgroundColor: string;

    // 字体大小 带单位
    public height: string;
}