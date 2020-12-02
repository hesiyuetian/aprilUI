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
        <div @click="total = total + 12">修改total------{{formValidate.cityId}}</div>
        <april-input v-model="formValidate.name" font-size="20" color="#f00" height="80px" width="200px"/>
<!--        <april-select v-model="formValidate.city" placeholder="请选择城市" :list="cityList" height="80px" width="200px"/>-->
<!--        <april-select v-model="formValidate.city" :list="cityList" width="150px" height="40px" placeholder="请选择酒店" />-->
        <!--        <april-pagination-->
        <!--                :current-pages="currentPages"-->
        <!--                :page-size="pageSize"-->
        <!--                :total="total"-->
        <!--                :text-align="textAlign"-->
        <!--                :locale="locale"-->
        <!--                :show-page="showPage"-->
        <!--                :show-page-size="showPageSize"-->
        <!--                @currentPage="currentPage"-->
        <!--                @sizeChange="sizeChange"-->
        <!--        />-->

        <april-pagination
                :total="total"
                @currentPage="currentPage"
        />


        <april-form ref="form" :model="formValidate" :rules="ruleValidate">
            <div class='test-line' style="height: 100px">
                <april-form-item label="用户名" prop="name" placeholder="请输入用户名" :item-option="itemOption" :tip-message="tipMessage">
                    <april-input v-model="formValidate.name" font-size="20" color="#f00" background-color="#eee"/>
                </april-form-item>
                <april-form-item label="邮箱" prop="mail" :item-option="itemOption">
                    <april-input v-model="formValidate.mail"/>
                </april-form-item>
                <april-form-item label="手机号" prop="phone" :item-option="itemOption">
                    <april-input v-model="formValidate.phone"/>
                </april-form-item>
            </div>
            <div class='test-line'>
                <april-form-item label="城市1" prop="city" :item-option="itemOption">
                    <april-select v-model="formValidate.city" placeholder="请选择城市" :list="cityList"/>
                </april-form-item>
                <april-form-item label="城市1" prop="city" :item-option="itemOption">
                    <april-select v-model="formValidate.city" placeholder="请选择城市" :list="cityList"/>
                </april-form-item>

<!--                <april-form-item label="城市1" :item-option="itemOption">-->
<!--                    <april-select v-model="formValidate.city" placeholder="请选择城市" :isShowDefalut="1==1 && true"-->
<!--                                  defalutFont="我是默认值" :list="cityList" select-background-color="#fff" select-color="#ff0" active-background-color="blue"/>-->
<!--                </april-form-item>-->
<!--                <april-form-item label="城市2" :item-option="itemOption">-->
<!--                    <april-select v-model="formValidate.city" placeholder="请选择城市" :disable="1==1 && true"-->
<!--                                  :list="cityList"/>-->
<!--                </april-form-item>-->
                <april-form-item label="城市3" :item-option="itemOption">
                    <april-select v-model="formValidate.cityId" :filterable="1==1 && true"
                                  :list="cityList"/>
                </april-form-item>
                <april-form-item label="起飞城市" prop="date" :item-option="itemOption">
                    <april-date-picker v-model="formValidate.date" min-date="2020-06-23" max-date="2020-11-23" placeholder="请选择起飞城市" />
                </april-form-item>

<!--                <april-form-item label="城市3" :item-option="itemOption">-->
<!--                    <april-select v-model="formValidate.city" :filterable="1==1 && true"-->
<!--                                  :list="cityList"/>-->
<!--                </april-form-item>-->
            </div>
<!--            <div class='test-line' style="height: 62px">-->
<!--                <april-form-item label="城市1" :item-option="itemOption">-->
<!--                    <april-select v-model="formValidate.city" placeholder="请选择城市" :isShowDefalut="1==1 && true"-->
<!--                                  defalutFont="我是默认值" :list="cityList"/>-->
<!--                </april-form-item>-->
<!--            </div>-->
        </april-form>



        <div @click="handleSubmit">提交</div>
        <div @click="handleReset">重置</div>

<!--        <april-form ref="form" :model="formValidate" :rules="ruleValidate">-->
<!--                <april-form-item label="用户名" prop="name" placeholder="请输入用户名" :item-option="itemOption">-->
<!--                    <april-input v-model="formValidate.name" font-size="20" color="#f00" background-color="#eee"/>-->
<!--                </april-form-item>-->
<!--                <april-form-item label="邮箱" prop="mail" :item-option="itemOption">-->
<!--                    <april-input v-model="formValidate.mail"/>-->
<!--                </april-form-item>-->
<!--                <april-form-item label="城市1" :item-option="itemOption">-->
<!--                    <april-select v-model="formValidate.city" placeholder="请选择城市1212" :isShowDefalut="1==1 && true"-->
<!--                                  defalutFont="我是默认值" :list="cityList" select-background-color="#fff" select-color="#ff0" active-background-color="blue"/>-->
<!--                </april-form-item>-->
<!--                <april-form-item label="城市2" :item-option="itemOption">-->
<!--                    <april-select v-model="formValidate.city" placeholder="请选择城市" :disable="1==1 && true"-->
<!--                                  :list="cityList"/>-->
<!--                </april-form-item>-->
<!--                <april-form-item label="城市3" :item-option="itemOption">-->
<!--                    <april-select v-model="formValidate.city" :filterable="1==1 && true" :filter-method="filterMethod"-->
<!--                                  :list="cityList"/>-->
<!--                </april-form-item>-->
<!--                <april-form-item label="城市1" :item-option="itemOption">-->
<!--                    <april-select v-model="formValidate.city" placeholder="请选择城市" :isShowDefalut="1==1 && true"-->
<!--                                  defalutFont="我是默认值" :list="cityList"/>-->
<!--                </april-form-item>-->
<!--            <div>-->
<!--            </div>-->
<!--            <div class='test-line'>-->

<!--            </div>-->
<!--        </april-form>-->


        <april-model-right :visible.sync="visible" @close="close">
            <template slot="content">
                <div class="zhan-cont">

                    <!--                    <april-form-item label="城市" :item-option="itemOption">-->
                    <!--                        <april-select v-model="formValidate.city" :list="cityList" />-->
                    <!--                    </april-form-item>-->
                </div>
            </template>

            <template slot="foot">
                <!--                    <april-form-item label="城市" :item-option="itemOption">-->
                <!--                        <april-select v-model="formValidate.city" :list="cityList" />-->
                <!--                    </april-form-item>-->
            </template>
        </april-model-right>
    </div>
</template>


<script lang="ts">



    import {Component, Vue} from 'vue-property-decorator';
    import AprilPicker from "../packages/picker/src/main.vue";
    import AprilPagination from "../packages/pagination/src/main.vue";

    import AprilForm from "../packages/form/src/form.vue";
    import AprilFormItem from "../packages/form/src/form-item.vue";
    import AprilInput from "../packages/input/src/main.vue";
    import AprilDatePicker from "../packages/date/src/main.vue";
    import AprilSelect from "../packages/select/src/main.vue";
    import AprilModelCenter from "../packages/model/src/center.vue";
    import AprilModelRight from "../packages/model/src/right.vue";

    @Component({
        components: {
            AprilModelRight,
            AprilPicker,
            AprilDatePicker,
            AprilPagination,
            AprilForm, AprilFormItem, AprilInput, AprilSelect, AprilModelCenter
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

        private tipMessage: string = 'cron表达式网址：<a href="https://cron.qqe2.com/" target="_blank">https://cron.qqe2.com</a>';


        /**
         * april-pagination
         */
        public currentPages: number = 1;
        public pageSize: number = 10;
        public total: number = 15;
        public textAlign: string = 'right';
        public locale: string = 'zh';
        public showPage: boolean = true;
        public showPageSize: boolean = true;

        /**
         * form
         */
        visible: boolean = false;
        formValidate: object = {
            name: '',
            mail: '163@163.com',
            phone: '19901708693',
            city: 4,
            cityId: 1,
            date: '2020-09-23'
        };
        cityList: Array<any> = [
            // {name: '上海', value: 1},
            // {name: '北京', value: 2},
            // {name: '深圳', value: 3},
            // {name: '苏州', value: 4},
            // {name: '香港', value: 5},
        ];
        num: number = 7;
        ruleValidate: object = {
            name: [
                {required: true, message: '用户名不能为空', trigger: 'blur'}
            ],
            date: [
                {required: true, message: '起飞城市不能为空', trigger: 'blur'}
            ],
            city: [
                {type: "number", required: true, message: '请选择城市', trigger: 'change'}
            ],
            mail: [
                {required: true, message: '邮箱不能为空', trigger: 'blur'},
                {type: 'email', message: '邮箱格式不正确', trigger: 'blur'}
            ],
            phone: [
                {required: true, message: '手机号不能为空', trigger: 'blur'},
                {
                    validator: (rule: any, value: string, callBack: Function) => {
                        if (!value) {
                            callBack('请输入手机号码')
                        } else if (/^[1][0-9]{10}$/.test(value)) {
                            callBack()
                        } else {
                            callBack('请输入正确的手机号码')
                        }
                    }, trigger: 'blur'
                }
            ],
        }

        created(){
            setTimeout(() => {
                this.cityList = [
                    {name: '上海', value: 1},
                    {name: '北京', value: 2},
                    {name: '深圳', value: 3},
                    {name: '苏州', value: 4},
                    {name: '香港', value: 5},
                ]
            },2000)
        }

        public $refs!: {
            form: HTMLFormElement,
        };
        public itemOption: object = {
            label: {flex: 3},
            wrapper: {flex: 5},
            tipMessageColor: 'red'
            // height: 100
        };


        handleSubmit() {
            this.$refs.form.validate((valid: boolean) => {
                console.log("handleSubmit",valid, this.formValidate)
            })
        }

        handleReset() {
            // this.visible = true;
            this.$refs.form.resetFields();
        }

        close() {
            this.visible = false
        }

        filterMethod(value: string) {
            this.num++;
            this.cityList = [...this.cityList, {name: value, value: this.num}]
        }


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
            this.disableConfirm = false;
            setTimeout(() => {
                this.disableConfirm = true;
            }, 3000)
        }


        /**
         * april-pagination
         * change-page
         */
        currentPage(page: number): void {
            this.currentPages = page;
        }

        /**
         * april-pagination
         * size-page
         */
        sizeChange(pageSize: number): void {
            this.pageSize = pageSize;
        }
    }
</script>

<style lang="scss">
    .show {
        width: 100px;
        height: 100px;
        background-color: red;
    }
    html, body {
        height: 100%;
    }

    .test-line {
        /*height: 100px;*/
        display: flex;

        div {
            flex: 1;
        }
    }

    .zhan {
        position: fixed;
        top: 0;
        left: 0;
        background: rgba(0, 0, 0, .5);
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;

        &-cont {
            padding: 20px;
            width: 500px;
            height: 300px;
            border-radius: 20px;
            background: #fff;
        }
    }
</style>
