import Vue from 'vue';

export declare class AprilPagination extends Vue {

    // 当前页数
    public currentPages: number;

    // 每页显示条目个数
    public pageSize: number;

    // 总条目数
    public total: number;

    // 分页器位置
    public textAlign: string;

    // 语言
    public locale: string;

    // 是否展示输入页码跳转
    public showPage: boolean;

    // 是否展示修改每页大小
    public showPageSize: boolean;

    // currentPage 改变时会触发
    public currentPage: () => void;

    // pageSize 改变时会触发
    public sizeChange: () => void;
}