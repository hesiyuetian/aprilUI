import Vue from 'vue';

export declare class AprilModelCenter extends Vue {

    // 是否显示 model，支持 .sync 修饰符
    public visible: boolean;

    // model 的宽度
    public width: string;

    // model 的高度
    public height: string;

    // model 的最小高度
    public minHeight: string;

    // 是否允许点击空白处关闭
    public mask: string;
}