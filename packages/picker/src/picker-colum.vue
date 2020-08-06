<template>
    <div class="april-picker-colum" @touchstart.prevent="start" @touchmove.prevent="move" @touchend.prevent="end" @touchcancel.prevent="end">
        <div :style="{
            'transition': 'transform '+duration+'ms',
            'line-height': itemHeight+'px',
            'transform': 'translate3d(0, '+ (offset + itemHeight * (visibleItemCount - 1) / 2)+'px, 0)'}">

            <div class="april-picker-colum-item april-f-tac"
                 :style="{'height': itemHeight+'px','line-height': itemHeight+'px'}"
                 v-for="(item,index) in list" :key="index"
                 :class="{'april-picker-colum-active': currentIndex === index}">
                {{item.value}}
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import { Component, Prop, Vue, Emit, Watch } from 'vue-property-decorator'
    import { pickerColumModules } from '../interface'
    @Component
    export default class AprilPickerColum extends Vue {
        @Prop({ default: 45, type: Number }) private itemHeight!: number;
        @Prop({ default: 5, type: Number }) private visibleItemCount!: number;
        @Prop({default: 0, type: Number}) private defaultIndex!: number;
        @Prop({default: 0, type: Number}) private valueKey!: number;
        @Prop({type: Array}) private list!: Array<any>;

        public lists: Array<any> = [
            { val: "8点", type: 1 },
            { val: "9点", type: 2 },
            { val: "10点", type: 3 },
            { val: "11点", type: 4 },
            { val: "12点", type: 5 },
            { val: "13点", type: 6 },
            { val: "14点", type: 7 },
            { val: "15点", type: 8 },
            { val: "16点", type: 9 },
            { val: "17点", type: 10 }
        ];

        private startY: number = 0;
        private startOffset: number = 0;
        private offset: number = 0;
        private currentIndex: number = 0;
        private duration: number = 0;

        // get currentIndex(){
        //     return this.defaultIndex;
        // }

        created(){
            this.setIndex(this.defaultIndex)
        }

        @Watch("defaultIndex")
        changeDefaultIndex(){
            this.currentIndex = this.defaultIndex;
            this.setIndex(this.defaultIndex)
        }


        /**
         * Touch Move Start
         * @param event
         */
        private start(event:any):void {
            this.startY = event.touches[0].clientY;
            this.startOffset = this.offset;
            this.duration = 0;
        }

        /**
         * Touch Moving
         * @param event
         */
        private move(event:any):void {
            const { startOffset, itemHeight, list, startY } = this;
            let dealY = event.touches[0].clientY - startY;

            // 向上滚动为正，向下滚动为负
            this.offset = this.round(startOffset + dealY, -(list.length * itemHeight), itemHeight);
        }

        /**
         * Touch Moving End
         * @param event
         */
        private end():void {
            const { itemHeight, offset, list  } = this;

            const moveIndex = Math.round(-offset / itemHeight);
            const currentIndex = this.round(moveIndex, 0, list.length-1)
            this.setIndex(currentIndex, true)
        }


        /**
         * Set Index
         * @param index:number
         */
        private setIndex(index:number, useAction:boolean = false):void {
            const { itemHeight } = this;
            index = this.regularIndex(index);
            this.currentIndex = index;
            this.offset = -index * itemHeight;
            this.onChange(index, useAction)
        }


        /**
         * Emit  MoveEnd Event
         * @param index:number
         */
        @Emit("moveEnd")
        private onChange(index: number, useAction:boolean):pickerColumModules {
            const { list, valueKey } = this;
            return { column:valueKey, data: list[index], index: index, useAction}
        }

        /**
         * Regular Index
         * @param index:number
         */
        private regularIndex(index:number):number {
            const { list } = this;
            if(index >= list.length) index = list.length-1;
            else if(index < 0) index = 0;
            return index
        }


        /**
         * round
         * @param num
         * @param min
         * @param max
         */
        private round(num:number, min:number, max:number):number {
            return Math.min(Math.max(num, min), max)
        }
    }

</script>