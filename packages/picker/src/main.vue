<template>
    <div class="april-picker" :style="{'height': itemHeight * visibleItemCount + 45 +'px'}">
        <div class="april-picker-head">
            <div class="april-picker-head-cancel april-f-tal april-f-fw6" @click="cancel">{{closeText}}</div>
            <div class="april-picker-head-title april-f-tac" :style="{'color': titleColor}">{{title}}</div>
            <div class="april-picker-head-comfirm april-f-tar april-f-fw6" @click="onOk">{{confirmText}}</div>
        </div>

        <div class="april-picker-cont" :style="{'height': 'calc(100% - '+itemHeight+'px)'}">
            <april-picker-colum v-for="(item,index) in rangListData" :key="index"
                          :list="item" :value-key='index'
                          :item-height="itemHeight"
                          :visible-item-count="visibleItemCount"
                          :default-index="defalutIndexKey[index] || 0"
                          @moveEnd="pickerChange"/>

            <div class="april-picker-mask" :style="{'background-size': '100% '+ (itemHeight * (visibleItemCount - 1)) / 2 +'px'}"></div>
            <div class="april-picker-frame" :style="{'height': itemHeight+'px'}"></div>
        </div>


    </div>
</template>

<script lang="ts">

    import { Component, Prop, Vue, Emit } from 'vue-property-decorator';
    import AprilPickerColum from './picker-colum.vue'
    import { pickerColumModules } from '../interface'

    @Component({
        name: 'april-pricker',
        components: {
            AprilPickerColum
        }
    })
    export default class AprilPicker extends Vue {
        // 选择器类型
        @Prop({ default: 'selector', type: String })
        public mode!: string; // 单列： selector 、多列： multiSelector

        // 渲染的列表
        @Prop({ default: [], type: Array })
        public rangList!: Array<any>;

        // 是否禁用确认按钮 (防止异步操作)
        @Prop({ default: true, type: Boolean })
        public disableConfirm!: boolean;

        // 选项高度
        @Prop({ default: 45, type: Number })
        public itemHeight!: number;

        // 可见的选项个数
        @Prop({ default: 5, type: Number })
        public visibleItemCount!: number;

        // 选择器的标题
        @Prop({default: '#323233', type: String})
        private titleColor!: string;

        // 关闭按钮的文字
        @Prop({default: '取消', type: String})
        private closeText!: string;

        // 确认按钮的文字
        @Prop({default: '确认', type: String})
        private confirmText!: string;

        // 选择器的标题文字颜色
        @Prop({default: '', type: String})
        private title!: string;

        // 表示选择了 rangList 中的第几个（下标从 0 开始）
        @Prop({default: 0 })
        private defalutIndex!: any ;

        get defalutIndexKey():any {
            const { defalutIndex, mode } = this;
            let index = [];
            if(mode === 'multiSelector') {
                try{
                    for(let item of defalutIndex){
                        index.push(Number(item || 0))
                    }
                }catch (e) { }
            } else {
                index.push(typeof defalutIndex === 'number' ? defalutIndex : 0)
            }

            return index
        }

        get rangListData():Array<any> {
            const { rangList, mode } = this;
            let list = [];
            if(mode === 'multiSelector'){
                for(let item of rangList){
                    list.push(item)
                }
            }else list.push(rangList);
            return list
        }

        get cache():Array<any> {
            const { rangListData } = this;
            let _cache =[];
            for(let item of rangListData){
                _cache.push({})
            }
            return _cache
        }

        /**
         * Picker Plugs Change
         * @param object
         */
        private pickerChange(object: pickerColumModules):void {
            const { cache } = this;
            const useAction = object.useAction;
            delete object.useAction;
            cache.splice(object.column, 1, object);
            useAction && this.columnChange(object)
        }

        /**
         * cancel
         */
        @Emit()
        private cancel():void {

        }

        /**
         * onOk
         */
        private onOk():void {
            const { disableConfirm } = this;
            disableConfirm && this.comfirm()
        }


        /**
         * confirm
         */
        @Emit()
        private comfirm():any {
            const { cache, mode } = this;
            return mode === "multiSelector" ? cache : cache[0]
        }


        /**
         * Column Change
         * @param object
         */
        @Emit("change")
        private columnChange(object: pickerColumModules){
            return object
        }

    }
</script>