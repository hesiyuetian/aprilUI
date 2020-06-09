<template>
    <div id="app">
        <!--    <april-picker v-if="disable"-->
        <!--                   :item-height="itemHeight"-->
        <!--                   :visible-item-count="visibleItemCount"-->
        <!--                   :title-color="titleColor"-->
        <!--                   :defalut-index='defalutIndex'-->
        <!--                   :mode="mode"-->
        <!--                   :title="title"-->
        <!--                   :rangList="rangList"-->
        <!--                   :disable-confirm="disableConfirm"-->
        <!--                   @cancel="cancel"-->
        <!--                   @comfirm="comfirm"-->
        <!--                   @change="change"-->
        <!--    />-->

        <april-pagination
                :current-pages="currentPages"
                :page-size="pageSize"
                :total="total"
                :text-align="textAlign"
                :locale="locale"
                :show-page="showPage"
                :show-page-size="showPageSize"
                @currentPage="currentPage"
                @sizeChange="sizeChange"
        />
    </div>
</template>


<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import AprilPicker from "../packages/picker/src/main.vue";
    import AprilPagination from "../packages/pagination/src/main.vue";

    @Component({
        components: {
            AprilPicker,
            AprilPagination
        },
    })
    export default class App extends Vue {

        /**
         * april-picker
         */
        public itemHeight: Number = 44;
        public visibleItemCount: Number = 5;
        public titleColor: string = '#f00';
        public defalutIndex: any = 0;
        public mode: String = 'multiSelector';
        // public mode: String = 'selector';
        public rangList: Array<any> = [
            [
                {value: "8点", type: 1},
                {value: "9点", type: 2},
                {value: "10点", type: 3},
                {value: "11点", type: 4},
                {value: "12点", type: 5},
                {value: "13点", type: 6},
                {value: "14点", type: 7},
                {value: "15点", type: 8},
                {value: "16点", type: 9},
                {value: "17点", type: 10}
            ],
            [
                {value: "8点", type: 1},
                {value: "9点", type: 2},
                {value: "10点", type: 3},
                {value: "11点", type: 4},
                {value: "12点", type: 5},
                {value: "13点", type: 6},
                {value: "14点", type: 7},
                {value: "15点", type: 8},
                {value: "16点", type: 9},
                {value: "17点", type: 10}
            ]
        ];
        public rangLists: Array<any> = [
            {value: "8点", type: 1},
            {value: "9点", type: 2},
            {value: "10点", type: 3},
            {value: "11点", type: 4},
            {value: "12点", type: 5},
            {value: "13点", type: 6},
            {value: "14点", type: 7},
            {value: "15点", type: 8},
            {value: "16点", type: 9},
            {value: "17点", type: 10}
        ];
        public disableConfirm: boolean = true;
        public title: String = '摩登出行';
        private disable: Boolean = true;


        /**
         * april-pagination
         */
        public currentPages: number = 1;
        public pageSize: number = 10;
        public total: number = 200;
        public textAlign: string = 'right';
        public locale: string = 'zh';
        public showPage: boolean = true;
        public showPageSize: boolean = true;

        /**
         * april-picker
         * cancel
         */
        private cancel(): void {
            this.disable = false;
            console.log("cancel")
        }

        /**
         * april-picker
         * confirm
         */
        private comfirm(data: any): void {
            this.disable = false;
            console.log("comfirm", data)
        }

        /**
         * april-picker
         * change
         */
        private change(data: any): void {
            console.log("change", data);
            this.disableConfirm = false;
            setTimeout(() => {
                this.disableConfirm = true;
            }, 3000)
        }


        /**
         * april-pagination
         * change-page
         */
        currentPage(page:number): void{
            this.currentPages = page;
        }

        /**
         * april-pagination
         * size-page
         */
        sizeChange(pageSize:number): void{
            this.pageSize = pageSize;
        }
    }
</script>

<style lang="scss">
    /*@import "CSS:packages/theme-chalk/lib/index.css";*/
</style>
