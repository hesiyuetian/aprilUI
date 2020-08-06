<template>
    <div class="april-select-option" v-if="visible">
        <ul class="april-select-c" :style="{'width': option.width + 'px', 'top': option.top+'px', 'left': option.left+'px'}">
            <li  @click.stop="set()" v-if="isShowDefalut">
                <span>{{defalutFont}}</span>
            </li>
            <li :class="{'april-select-c-item-selected': value === item.value}" v-for="(item, index) in list" :key="index" @click.stop="set(item)">
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


                this.$on('show', (option:any) => {
                    body.addEventListener('click', (event:any) => {
                        if(that.visible){
                            this.visible = false;
                            this.filterable && this.$emit('select');
                        }
                    });
                    setTimeout(() => {
                        this.visible = true;
                        this.option = option;
                    },200)
                });
            });
        }

        set(item:any){
            this.$emit('select', item);
            this.visible = false
        }
    }
</script>

<!--<style lang="scss" scoped>-->
<!--    .april-select-option{-->
<!--        position: absolute;-->
<!--        top: 0;-->
<!--        left: 0;-->
<!--        width: 100%;-->
<!--        .april-select-c{-->
<!--            width: 100%;-->
<!--            max-height: 240px;-->
<!--            overflow-y: auto;-->
<!--            left: 0;-->
<!--            z-index: 9999;-->
<!--            box-sizing: border-box;-->
<!--            top: 44px;-->
<!--            background-color: #fff;-->
<!--            border-radius: 4px;-->
<!--            outline: none;-->
<!--            box-shadow: 0 2px 8px 4px rgba(0, 0, 0, 0.15);-->
<!--            &-item-selected{-->
<!--                background-color: #bae7ff;-->
<!--            }-->
<!--            li{-->
<!--                text-indent: 12px;-->
<!--                cursor: pointer;-->
<!--                line-height: 30px;-->
<!--                &:hover{-->
<!--                    background-color: #bae7ff;-->
<!--                }-->
<!--            }-->
<!--        }-->
<!--    }-->
<!--    .april-select{-->
<!--        width: 100%;-->
<!--        max-height: 200px;-->
<!--        min-height: 40px;-->
<!--        display: flex;-->
<!--        font-size: 14px;-->
<!--        z-index: 9;-->
<!--        &-label{-->
<!--            flex: 2;-->
<!--            span{-->
<!--                position: absolute;-->
<!--                right: 0;-->
<!--                i{-->
<!--                    vertical-align: top;-->
<!--                    font-size: 16px;-->
<!--                }-->
<!--            }-->
<!--        }-->
<!--        &-cont{-->
<!--            flex: 4;-->
<!--            input{-->
<!--                width: 100%;-->
<!--                height: 32px;-->
<!--                border: 1px solid #d9d9d9;-->
<!--                border-radius: 4px;-->
<!--                padding: 4px 11px;-->
<!--                box-sizing: border-box;-->
<!--                text-indent: 2px;-->
<!--                position: absolute;-->
<!--                &:focus{-->
<!--                    border-color: #40a9ff;-->
<!--                }-->
<!--            }-->
<!--            input:disabled{-->
<!--                border:1px solid #d9d9d9;-->
<!--                background-color:#fff;-->
<!--            }-->

<!--            &-error{-->
<!--                border-color: #f5222d !important;-->
<!--            }-->
<!--            &-tip{-->
<!--                bottom: -20px;-->
<!--                height: 22px;-->
<!--                line-height: 22px;-->
<!--                color: #f5222d;-->
<!--                z-index: 9;-->
<!--            }-->
<!--        }-->
<!--        &-c{-->
<!--            width: 100%;-->
<!--            max-height: 240px;-->
<!--            overflow-y: auto;-->
<!--            left: 0;-->
<!--            z-index: 9999;-->
<!--            box-sizing: border-box;-->
<!--            top: 44px;-->
<!--            background-color: #fff;-->
<!--            border-radius: 4px;-->
<!--            outline: none;-->
<!--            box-shadow: 0 2px 8px 4px rgba(0, 0, 0, 0.15);-->
<!--            &-item-selected{-->
<!--                background-color: #bae7ff;-->
<!--            }-->
<!--            li{-->
<!--                text-indent: 12px;-->
<!--                cursor: pointer;-->
<!--                line-height: 30px;-->
<!--                &:hover{-->
<!--                    background-color: #bae7ff;-->
<!--                }-->
<!--            }-->
<!--        }-->
<!--    }-->
<!--</style>-->
