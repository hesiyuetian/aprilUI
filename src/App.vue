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
        <div @click="total = total + 12">修改total------{{total}}</div>
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
            <div class='test-line'>
                <april-form-item label="用户名" prop="name" placeholder="请输入用户名" :item-option="itemOption">
                    <april-input v-model="formValidate.name" />
                </april-form-item>
                <april-form-item label="邮箱" prop="mail" :item-option="itemOption">
                    <april-input v-model="formValidate.mail" />
                </april-form-item>
                <april-form-item label="手机号" prop="phone" :item-option="itemOption">
                    <april-input v-model="formValidate.phone" />
                </april-form-item>
            </div>
            <div class='test-line'>
                <april-form-item label="城市1" :item-option="itemOption">
                    <april-select v-model="formValidate.city" placeholder="请选择城市" :isShowDefalut="1==1 && true" defalutFont="我是默认值" :list="cityList" />
                </april-form-item>
                <april-form-item label="城市2" :item-option="itemOption">
                    <april-select v-model="formValidate.city" placeholder="请选择城市" :disable="1==1 && true" :list="cityList" />
                </april-form-item>
                <april-form-item label="城市3" :item-option="itemOption">
                    <april-select v-model="formValidate.city" :filterable="1==1 && true" :filter-method="filterMethod" :list="cityList" />
                </april-form-item>


            </div>
            <div>
<!--                <april-input v-model="formValidate.phone" />-->
            </div>
            <div class='test-line'>

            </div>
        </april-form>

        <div @click="handleSubmit">提交</div>
        <div @click="handleReset">重置</div>


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
    import AprilSelect from "../packages/select/src/main.vue";
    import AprilModelCenter from "../packages/model/src/center.vue";
    import AprilModelRight from "../packages/model/src/right.vue";

    @Component({
        components: {
            AprilModelRight,
            AprilPicker,
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
        formValidate:object = {
            name: '12312312',
            mail: '163@163.com',
            phone: '19901708693',
            city: 0,
            cityId: 0,
        };
        cityList:Array<any> = [
            {name: '上海', value: 1},
            {name: '北京', value: 2},
            {name: '深圳', value: 3},
            {name: '苏州', value: 4},
            {name: '香港', value: 5},
        ];
        num: number = 7;
        ruleValidate:object = {
            name: [
                { required: true, message: '用户名不能为空', trigger: 'blur' }
            ],
            city: [
                { required: false, message: '请选择城市', trigger: 'blur' }
            ],
            mail: [
                { required: true, message: '邮箱不能为空', trigger: 'blur' },
                { type: 'email', message: '邮箱格式不正确', trigger: 'blur' }
            ],
            phone: [
                { required: true, message: '手机号不能为空', trigger: 'blur' },
                { validator: (rule:any, value:string, callBack:Function) => {
                        if (!value) {
                            callBack('请输入手机号码')
                        } else if (/^[1][0-9]{10}$/.test(value)) {
                            callBack()
                        } else {
                            callBack('请输入正确的手机号码')
                        }
                    },trigger: 'blur' }
            ],
        }

        public $refs!: {
            form: HTMLFormElement,
        };
        public itemOption: object = {
            label: { flex: 3 },
            wrapper: { flex: 5 }
        };

        handleSubmit () {
            this.$refs.form.validate((valid:boolean) => {
                console.log("handleSubmit", this.formValidate)
            })
        }
        handleReset () {
            // this.visible = true;
            this.$refs.form.resetFields();
        }
        close(){
            this.visible = false
        }

        filterMethod(value:string){
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
    @charset "UTF-8";.april-form-item,.april-input-item{font-variant:tabular-nums;width:100%}@-webkit-keyframes april-model-show{0%{display:block;opacity:0}100%{opacity:1}}@keyframes april-model-show{0%{display:block;opacity:0}100%{opacity:1}}@-webkit-keyframes april-model-close{0%{opacity:1}100%{opacity:0;display:none}}@keyframes april-model-close{0%{opacity:1}100%{opacity:0;display:none}}@font-face{font-family:iconfont;src:url(//at.alicdn.com/t/font_1870859_kadxgg9nijm.eot);src:url(//at.alicdn.com/t/font_1870859_kadxgg9nijm.eot?#iefix) format("embedded-opentype"),url(//at.alicdn.com/t/font_1870859_kadxgg9nijm.woff2) format("woff2"),url(//at.alicdn.com/t/font_1870859_kadxgg9nijm.woff) format("woff"),url(//at.alicdn.com/t/font_1870859_kadxgg9nijm.ttf) format("truetype"),url(//at.alicdn.com/t/font_1870859_kadxgg9nijm.svg#iconfont) format("svg")}.iconfont{font-family:iconfont!important;font-size:16px;font-style:normal;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}.april-f-fw1{font-weight:100!important}.april-f-fw2{font-weight:200!important}.april-f-fw3{font-weight:300!important}.april-f-fw4{font-weight:400!important}.april-f-fw5,.april-f-fw6{font-weight:600!important}.april-f-fw7{font-weight:700!important}.april-f-fw8{font-weight:800!important}.april-f-center-x{position:relative;left:50%;-webkit-transform:translateX(-50%);transform:translateX(-50%)}.april-f-center-y{position:relative;top:50%;-webkit-transform:translateY(-50%);transform:translateY(-50%)}.april-f-center{position:relative;left:50%;top:50%;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%)}.april-f-pf,.april-picker{position:fixed}.april-f-common-color{color:rgba(0,0,0,.65)!important}.april-f-tal{text-align:left}.april-f-tac{text-align:center}.april-f-tar{text-align:right}.april-f-cursor-not{cursor:not-allowed}.april-f-cursor{cursor:pointer}.april-f-pr{position:relative}.april-f-pa{position:absolute}.april-input:focus{outline:0;-webkit-box-shadow:0 0 0 2px rgba(24,144,255,.2);box-shadow:0 0 0 2px rgba(24,144,255,.2)}.april-input:focus,.april-input:hover{border-color:#40a9ff;border-right-width:1px!important}.april-input-disable{cursor:not-allowed}.april-has-error{border-color:#f5222d}.april-model-show{opacity:1!important;-webkit-animation:april-model-show .5s linear;animation:april-model-show .5s linear}.april-model-close{opacity:0!important;-webkit-animation:april-model-close .5s linear;animation:april-model-close .5s linear}.april-form-item{margin:0 0 22px;padding:0;color:rgba(0,0,0,.65);font-size:14px;line-height:1.5;list-style:none;-webkit-font-feature-settings:"tnum";font-feature-settings:"tnum";vertical-align:top;display:-webkit-box;display:-ms-flexbox;display:flex}.april-form-item label{line-height:40px;white-space:nowrap;text-align:right}.april-form-item-required:before{content:'*';color:red}.april-form-item-wrapper{position:relative;line-height:40px;zoom:1}.april-form-item-wrapper-message{position:absolute;bottom:-18px;clear:both;min-height:22px;margin-top:-2px;margin-bottom:-1px;line-height:1.5;color:#f5222d;font-size:14px;-webkit-transition:color .3s cubic-bezier(.215,.61,.355,1);transition:color .3s cubic-bezier(.215,.61,.355,1)}.april-input-item{-webkit-box-sizing:border-box;box-sizing:border-box;margin:0;list-style:none;-webkit-font-feature-settings:"tnum";font-feature-settings:"tnum";position:relative;display:inline-block;height:32px;padding:4px 11px;color:rgba(0,0,0,.65);font-size:14px;line-height:1.5;background-color:#fff;background-image:none;border:1px solid #d9d9d9;border-radius:4px;-webkit-transition:all .3s;transition:all .3s}.april-model-cont-head,.april-model-right-cont-head{font-size:16px;border-bottom:1px solid #e8e8e8;letter-spacing:1px}.april-model{width:100%;height:100%;z-index:99;top:0;left:0;opacity:0}.april-model-zhan{width:100%;height:100%;top:0;background-color:rgba(0,0,0,.65)}.april-model-cont-foot,.april-model-cont-head,.april-model-right-cont-foot,.april-model-right-cont-head{padding:0 24px;height:55px;line-height:55px;width:100%}.april-model-cont{min-width:400px;background:#fff;border-radius:6px}.april-model-cont-head{-webkit-box-sizing:border-box;box-sizing:border-box}.april-model-cont-head i{opacity:.4;-webkit-transition:opacity 1s;transition:opacity 1s;right:24px;top:2px}.april-model-cont-head i:hover{opacity:1}.april-model-cont-section{width:100%;overflow-y:auto}.april-model-cont-foot{-webkit-box-sizing:border-box;box-sizing:border-box;border-top:1px solid #e8e8e8}.april-model-right{width:100%;height:100%;z-index:99;top:0;left:0;opacity:0}.april-model-right-zhan{width:100%;height:100%;top:0;background-color:rgba(0,0,0,.65)}.april-model-right-cont{min-width:400px;background:#fff;border-radius:6px;right:0;position:absolute}.april-model-right-cont-head{-webkit-box-sizing:border-box;box-sizing:border-box}.april-model-right-cont-head i{opacity:.4;-webkit-transition:opacity 1s;transition:opacity 1s;right:24px;top:2px}.april-model-right-cont-head i:hover{opacity:1}.april-model-right-cont-section{width:100%;padding:0 24px;min-height:200px;-webkit-box-sizing:border-box;box-sizing:border-box;overflow-y:auto}.april-model-right-cont-foot{-webkit-box-sizing:border-box;box-sizing:border-box;border-top:1px solid #e8e8e8}.april-paginator{width:100%;color:#000}.april-paginator-content{overflow:hidden;padding:10px 20px;display:inline-block}.april-paginator-content-item{width:24px;height:24px;line-height:24px;text-align:center;margin:0 5px;float:left;font-size:12px;border-radius:2px;-webkit-transition:background .5s;transition:background .5s}.april-paginator-content-item:hover{cursor:pointer}.april-paginator-content-item-frist,.april-paginator-content-item-last{width:auto;background-color:rgba(0,0,0,0)!important}.april-paginator-content-item-frist span,.april-paginator-content-item-last span{font-size:14px}.april-paginator-content-item-first{margin-left:0}.april-paginator-content-item-current{background:#409eff;color:#fff}.april-paginator-content-icon{width:24px;height:24px;line-height:24px;margin:0 5px;float:left;text-align:center}.april-paginator-content-change{float:left;margin-left:20px}.april-paginator-content-change input{width:50px;height:24px;outline:0;border-radius:2px;margin:0 10px;text-align:center;overflow:hidden;border:1px solid #ccc}.april-paginator-content-change span{font-size:14px;cursor:pointer;color:#409eff}.april-paginator-content-size{font-size:14px;float:right;margin-left:25px;color:#606266}.april-paginator-content-size input{width:40px;height:24px;outline:0;border-radius:2px;margin:0 10px;text-align:center;border:1px solid #ccc;overflow:hidden}.april-picker-colum{-webkit-box-flex:1;-ms-flex:1;flex:1;font-size:14px;overflow:hidden}.april-picker-colum-item{font-weight:400;font-size:14px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.april-picker-colum-active{font-weight:600;color:#323233}.april-picker{width:100%;bottom:0;-webkit-box-shadow:0 -3.5px 20px .1px rgba(221,210,206,.74);box-shadow:0 -3.5px 20px .1px rgba(221,210,206,.74)}.april-picker-head{width:100%;height:44px;line-height:44px;display:-webkit-box;display:-ms-flexbox;display:flex;padding:0 10px;-webkit-box-sizing:border-box;box-sizing:border-box;font-size:15px;letter-spacing:2px;background:#fff;position:relative;z-index:3;border-bottom:1px solid rgba(241,228,223,.84)}.april-picker-head-cancel{-webkit-box-flex:1;-ms-flex:1;flex:1}.april-picker-head-title{-webkit-box-flex:3;-ms-flex:3;flex:3;font-size:13px;letter-spacing:1px}.april-picker-head-comfirm{-webkit-box-flex:1;-ms-flex:1;flex:1}.april-picker-cont{position:relative;display:-webkit-box;display:-ms-flexbox;display:flex;width:100%;overflow:hidden}.april-picker-mask{position:absolute;top:0;left:0;width:100%;height:100%;background-image:-webkit-gradient(linear,left top,left bottom,from(rgba(255,255,255,.9)),to(rgba(255,255,255,.4))),-webkit-gradient(linear,left bottom,left top,from(rgba(255,255,255,.9)),to(rgba(255,255,255,.4)));background-image:linear-gradient(180deg,rgba(255,255,255,.9),rgba(255,255,255,.4)),linear-gradient(0deg,rgba(255,255,255,.9),rgba(255,255,255,.4));background-repeat:no-repeat;background-position:top,bottom;-webkit-backface-visibility:hidden;backface-visibility:hidden;pointer-events:none}.april-picker-frame{width:100%;position:absolute;top:50%;pointer-events:none;border:1px solid #eee;-webkit-transform:translateY(-50%);transform:translateY(-50%)}.april-select-option{position:absolute;top:0;left:0;width:100%}.april-select-option .april-select-c{padding:0;margin:0;font-size:14px;position:absolute;width:100%;max-height:240px;overflow-y:auto;left:0;z-index:9999;-webkit-box-sizing:border-box;box-sizing:border-box;top:44px;background-color:#fff;border-radius:4px;outline:0;-webkit-box-shadow:0 2px 8px 4px rgba(0,0,0,.15);box-shadow:0 2px 8px 4px rgba(0,0,0,.15)}.april-select-option .april-select-c li:hover,.april-select-option .april-select-c-item-selected{background-color:#bae7ff}.april-select-option .april-select-c li{text-indent:12px;cursor:pointer;line-height:30px}
    .test-line{
        display: flex;
        div{
            flex: 1;
        }
    }
    .zhan{
        position: fixed;
        top: 0;
        left: 0;
        background: rgba(0,0,0,.5);
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        &-cont{
            padding: 20px;
            width: 500px;
            height: 300px;
            border-radius: 20px;
            background: #fff;
        }
    }
</style>
