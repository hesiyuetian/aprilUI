<template>
    <div class="april-select-option" v-if="visible">
        <ul class="april-select-c" :style="{'width': option.width + 'px', 'top': option.top+'px', 'left': option.left+'px', 'background': selectBackgroundColor, 'color': selectColor}">
            <li @click.stop="set()" v-if="isShowDefalut">
                <span>{{defalutFont}}</span>
            </li>
            <li
                :class="{'april-select-c-item-selected': value === item.value}" v-for="(item, index) in list" :key="index" @click="set(item)">
                <span>{{item.name}}</span>
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
    import { Component, Vue, Prop, Emit, Watch } from "vue-property-decorator";

    @Component({
        name: 'april-select-option'
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
                //     console.log("监听hidden事件，关闭了", that.visible)
                //     this.visible = false;
                // });

                this.$on('show', (option:any) => {
                    // onfocus  onblur
                    // console.log("得到焦点点了-------》")
                    // this.visible = true;
                    // this.option = option;
                    // if(this.$refs.aprilSelectOption){
                    //     console.log('this.$refs.aprilSelectOption===>', this.$refs, this.$refs.aprilSelectOption)
                    //     this.$refs.aprilSelectOption.focus();
                    // }

                    // document.onmouseup = (e) => {
                    //     console.log("执行onmouseup事件，关闭了", that.visible)
                    //     var e = e || window.event;
                    //     setTimeout(()=>{
                    //         console.log("visible：",that.visible, "开始关闭==关闭了, visible = true的时候", that.visible)
                    //         if(that.visible){
                    //             this.visible = false;
                    //             this.filterable && this.$emit('select');
                    //         }
                    //     })
                    // };

                    // body.addEventListener('click', (event:any) => {
                    //     if(that.visible){
                    //         this.visible = false;
                    //         this.filterable && this.$emit('select');
                    //     }
                    // });
                    // setTimeout(() => {
                    //     this.visible = true;
                    //     this.option = option;
                    // },200)

                    this.visible = true;
                    this.option = option;
                });
            });
        }

        set(item:any){
            console.log('set===>item', item)
            // this.dispatch('april-select','handle-option-select', {data: item})
            this.$emit('select', item);
            // this.visible = false
        }
    }
</script>