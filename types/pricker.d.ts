import Vue from 'vue';

export declare class AprilPicker extends Vue {

    // 选择器类型
    public mode: string; // 单列： selector 、多列： multiSelector

    // 渲染的列表
    public rangList: Array<any>;

    // 是否禁用确认按钮
    public disableConfirm: boolean;

    // 选项高度
    public itemHeight: number;

    // 可见的选项个数
    public visibleItemCount: number;

    // 选择器的标题
    private titleColor: string;

    // 关闭按钮的文字
    public closeText: string;

    // 确认按钮的文字
    public confirmText: string;

    // 选择器的标题文字颜色
    private title: string;

    // 表示选择了 rangList 中的第几个（下标从 0 开始）
    private defalutIndex: { [propsName: string]:any };

    // 取消按钮的事件
    public cancel: () => void;

    // 确认按钮的事件
    public comfirm: () => void;

    // change事件
    public change: () => void;

}
