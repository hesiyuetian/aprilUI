<template>
    <div class="april-select-option" v-if="visible">
        <ul class="april-select-c" :style="{'width': option.width + 'px', 'top': option.top+'px', 'left': option.left+'px', 'background': selectBackgroundColor, 'color': selectColor}" v-clickoutside="clickHide">
            <li @click.stop="set()" v-if="isShowDefalut">
                <span>{{defalutFont}}</span>
            </li>
            <li
                :class="{'april-select-c-item-selected': value === item.value}" v-for="(item, index) in list" :key="index" @click.stop="set(item)">
                <span>{{item.name}}</span>
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
    import {Component, Vue, Prop} from "vue-property-decorator";
    import clickoutside from '../../directives/index'
    @Component({
        name: 'april-select-option',
        directives:{
            clickoutside
        },
    })
    export default class AprilSelectOption extends Vue {
        dispatch: any;
        private visible:boolean = false;

        @Prop({ default: [], type: Array }) private list!: Array<any>;

        @Prop() public value!: any;

        @Prop() public name!: any;


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

                // this.$on('hidden', (option:any) => {
                //     this.visible = false;
                // });

                this.$on('show', (option:any) => {
                    // setTimeout(() => {
                        this.visible = true;
                        this.option = option;
                    // },200)
                });
            });
        }

        clickHide(e:any) {
            this.visible = false;
        }

        set(item:any){
            this.$emit('select', item);
            this.visible = false
        }
    }
</script>