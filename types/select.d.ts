import Vue, { VNode } from 'vue';

export interface QueryChangeHandler {
    /**
     * @param queryString Current value of the text input
     */
    (queryString: string): void
}

export declare class AprilSelect extends Vue {

    // 当前绑定的值
    public value: any;

    // input输入类型
    public type: string;

    // 是否展示默认选则项
    public isShowDefalut: number;
    // 展示默认选则项,默认项的文案
    public defalutFont: string;

    // 是否禁用
    public disable: boolean;

    // 是否可搜索
    public filterable: boolean;
    // 可搜索时，自定义搜索方法
    public filterMethod: QueryChangeHandler;

    // 选择框数据列表 类型: Array 格式 [{name: '要展示的字段', value: '唯一key'}]
    public list: any[];

    // 提示文案
    public placeholder: string;

    // 字体颜色
    public color: string;

    // input背景颜色
    public backgroundColor: string;

    // 字体大小 不带单位
    public fontSize: string;

    // 激活的选线背景颜色
    public activeBackgroundColor: string;

    // 选择列表的字体颜色
    public selectColor: string;

    // 选择列表的背景颜色
    public selectBackgroundColor: string;
}