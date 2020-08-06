import Vue from 'vue';

export declare class AprilSelect extends Vue {

    // 当前绑定的值
    public value: string | number;

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
    public filterMethod: Function;

    // 选择框数据列表 类型: Array 格式 [{name: '要展示的字段', value: '唯一key'}]
    public list: Array<any>;

    // 提示文案
    public placeholder: string;
}