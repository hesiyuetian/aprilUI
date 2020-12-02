<template>
    <div class="april-select-option" v-if="visible">
        <div class="april-date-cont" :style="{
            // 'width': option.width + 'px',
            'top': option.top+'px', 'left': option.left+'px', 'background': selectBackgroundColor, 'color': selectColor}" v-clickoutside="clickHide">
            <div class='april-date-cont-g'></div>
            <header>
                <div>
                    <i @click='yeared("pre")' class='iconfont'>&#xe624;</i>
                    <i  @click='monted("pre")' class='iconfont'>&#xe602;</i>
                </div>
                <span v-if='locale === "en"'>{{year}}&nbsp;&nbsp;&nbsp;&nbsp;{{month|changEn}} </span>
                <span v-else>{{year}} 年 {{month}} 月</span>
                <div>
                    <i  @click='monted("pro")' class='iconfont'>&#xe604;</i>
                    <i @click='yeared("pro")' class='iconfont'>&#xe62d;</i>
                </div>

            </header>
            <table class="april-date-cont-table">
                    <thead>
                    <tr>
                        <!--汉字表头-->
                        <th v-for="(item,index) in daynamearr" :key='index'>{{item}}</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(week,i) in wek" :key='i'>
                        <td v-for="(item,ind) in week" :key='ind'
                            v-if='ind < week.length'
                            :class="{'gray': item.prevmonth }"
                            @mouseenter="over(i,ind)"
                            @mouseleave="leave()"
                            @click.stop='setD(item.prevmonth,item.day)'>
                        <span :class="['april-date-cont-table-block',(year == defaultYear && month == defaultMonth && defaultDay == item.day && !item.prevmonth) ? 'acts' : null ,
                         toYear == year && toMonth == month && toDay == item.day && !item.prevmonth ? 'today' : null ,
                         defaultI == i && defaultInd == ind && !item.prevmonth ? 'hover' : null ]"
                        >
                            {{item.day}}
                        </span>
                        </td>
                    </tr>
                    </tbody>
                </table>
        </div>
    </div>
</template>

<script lang="ts">
    import { Component, Vue, Prop } from "vue-property-decorator";
    import clickoutside from '../../directives/index'

    @Component({
        name: 'april-date-option',
        directives:{
            clickoutside
        },
        filters:{
            changEn(data:any){
                switch(data){
                    case 1 : return 'January' ; break;
                    case 2 : return 'February' ; break;
                    case 3 : return 'March' ; break;
                    case 4 : return 'April' ; break;
                    case 5 : return 'May' ; break;
                    case 6 : return 'June' ; break;
                    case 7 : return 'July' ; break;
                    case 8 : return 'August' ; break;
                    case 9 : return 'September' ; break;
                    case 10 : return 'October' ; break;
                    case 11 : return 'November' ; break;
                    case 12 : return 'December' ; break;
                }
            }
        },
    })
    export default class AprilSelectOption extends Vue {
        dispatch: any;
        private visible:boolean = false;

        private defaultI:any = null;
        private defaultInd:any = null;

        private daynamearr:Array<any> = ["日", "一", "二", "三", "四", "五", "六"]; //星期天数组
        //本月的本期构成
        private dayarr:Array<any> = [];
        private year:any = '';
        private month:any = '';
        private day:any = '';
        private wek:Array<any> = []; //日历中的数据
        private dis:boolean = false;   //让日历消失

        private toYear:any = (new Date() as any).getFullYear();
        private toMonth:any = (new Date() as any).getMonth() + 1;
        private toDay:any = (new Date() as any).getDate();
        private defaultYear:any = '';
        private defaultMonth:any = '';
        private defaultDay:any = '';

        @Prop() public value!: any;

        @Prop() public name!: any;

        @Prop({default: "zh", type: String}) public locale!: String;
        @Prop() public maxDate!: any;
        @Prop() public minDate!: any;

        // 是否可搜索 类型: Function
        @Prop({default: false, type: Boolean}) public filterable!: Boolean;

        @Prop({default: false, type: Boolean}) public isShowDefalut!: Boolean;
        @Prop({default: "请选择", type: String}) public defalutFont!: String;

        @Prop({default: "rgba(0,0,0,.65)", type: String}) public selectColor!: String;
        @Prop({default: "#fff", type: String}) public selectBackgroundColor!: String;
        @Prop({default: "#bae7ff", type: String}) public activeBackgroundColor!: String;

        private option: object = {
            width: '',
            top: '',
            left: '',
        };

        mounted(){
            this.$nextTick(() => {
                let that = this;
                const body:any = document.querySelector("body");

                if (body.append) {
                    body.append(this.$el);
                } else {
                    body.appendChild(this.$el);
                }

                this.$on('hidden', (option:any) => {
                    this.visible = false;
                });

                this.$on('show', (option:any) => {
                    // setTimeout(() => {
                        this.visible = true;
                        this.option = option;
                        this.reset();
                    // },200)
                });
            });
        }

        clickHide(e:any) {
            this.visible = false;
        }

        reset(){  //初始化默认日期
            this.$nextTick(() => {
                // this.currentValue = this.currentValue ? this.currentValue : this.defaultDate;
                this.value = this.value ? this.value : ((new Date() as any) as any).format('yyyy-MM-dd');

                this.defaultYear = this.getDateYear(this.value);
                this.defaultMonth = this.getDateMonth(this.value);
                this.defaultDay = this.getDateDay(this.value);
                this.year = this.getDateYear(this.value);
                this.month = this.getDateMonth(this.value);
                this.day = this.getDateDay(this.value);
                this.daynamearr = this.locale === 'en' ? ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] : ["日", "一", "二", "三", "四", "五", "六"] ,
                this.calculation();
            })
        }
        getDateYear(date:string){   //获取年份
            return (new Date(date.replace(/-/g, '/')) as any).getFullYear()
        }
        getDateMonth(date:string){   //获取月份
            return (new Date(date.replace(/-/g, '/')) as any).getMonth() + 1
        }
        getDateDay(date:string){     //获取日
            return (new Date(date.replace(/-/g, '/')) as any).getDate()
        }
        maxLimit(day:number){  //最大日期限制
            //false  打开可以选择  true 关闭 不可以选择
            if(this.maxDate){
                if(this.year > this.getDateYear(this.maxDate))
                    return true
                else if(this.year <= this.getDateYear(this.maxDate) && this.month > this.getDateMonth(this.maxDate))
                    return true
                else if(day > this.getDateDay(this.maxDate)){
                    if(this.month < this.getDateMonth(this.maxDate)){
                        return false
                    }else{
                        return true
                    }
                }else
                    return false
            }else{
                return false
            }
        }
        minLimit(day:number){   //最小日期限制
            if(this.minDate){
                if(this.year < this.getDateYear(this.minDate))
                    return true
                else if(this.month < this.getDateMonth(this.minDate))
                    return true
                else if(day < this.getDateDay(this.minDate)){
                    if(this.getDateMonth(this.minDate) < this.month){
                        return false
                    }else{
                        return true
                    }
                }else
                    return false
            }else{
                return false
            }
        }
        calculation(){
            // 初始化配置
            this.dayarr = [];
            this.wek = [];
            //需要知道这个月的第一天是星期几
            var themonth1stday = ((new Date(this.year,this.month - 1,1)) as any).getDay();
            // console.log(themonth1stday,'本月第一天是周几')
            //本月有多少天，这个月的最后一天就是下个月的最后一天减去一毫秒
            var y = this.month == 12?this.year + 1:this.year;  //年份
            var m = this.month == 12? 1 :this.month;   //月份
            var themonthdaysamount = (new Date((new Date(y,m,1) as any) - 1) as any).getDate();
            // console.log(themonthdaysamount,'计算这个月的天数')
            //上个月有多少天
            var prevmonthlastday = (new Date((new Date(this.year,this.month - 1,1) as any) - 1) as any).getDate();
            // console.log(prevmonthlastday,'计算上个月的天数')
            // 上个月在本月的前几天中出现
            while(themonth1stday-- > 0){
                this.dayarr.unshift({
                    "day":prevmonthlastday--,
                    "prevmonth":true,
                    // "nextmonth": false,
                });
            };
            //本月的日期
            var count = 0;
            while (themonthdaysamount--){
                this.dayarr.push({
                    "day":++count,
                    // "prevmonth": false,
                    // "nextmonth": false,
                    "prevmonth": (this.maxLimit(count) || this.minLimit(count)) ? true : false
                });
            }
            // console.log(this.dayarr,'9988')
            //下个月日期
            var c = 42 - this.dayarr.length;
            var count2 = 1
            while (c-- > 0){
                this.dayarr.push({
                    "day":count2++,
                    // "nextmonth":true,
                    "prevmonth": true,

                });
            }
            this.theweek();
        }
        theweek(){
            var _arr = [];
            for (var i=0;i<6;i++) {
                var _week = [];
                for (var j=0;j<7;j++) {
                    _week.push(this.dayarr[i*7 + j]);
                }
                _arr.push(_week)
            }
            this.wek = _arr;
        }
        yeared(type:string){
            if(type=='pre'){
                this.year--
            }else{
                this.year++
            }
            this.calculation();
        }
        monted(type:string){
            if(type=='pre'){
                if(this.month-1 <= 0){
                    this.month = 12;
                    this.year--
                }
                else
                    this.month--
            }else{
                if(this.month++ < 12)
                    this.month
                else{
                    this.year++
                    this.month = 1
                }
            }
            this.calculation();
        }
        setD(type:string,val:string){
            if(!type){
                let f = this.year+'-'+this.month+'-'+val;
                const _date = (new Date(f) as any).format('yyyy-MM-dd');
                this.$emit('select', _date );
                this.visible = false
            }
        }
        over(i:any,ind:any){
            this.defaultI = i;
            this.defaultInd = ind;
        }
        leave(){
            this.defaultI = null;
            this.defaultInd = null;
        }
    }
</script>