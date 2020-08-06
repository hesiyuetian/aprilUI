<template>
    <div class="april-model april-f-pf" v-if="visible" :class="visible ? 'april-model-show' : 'april-model-close'">
        <div class="april-model-zhan april-f-pa" @click="mask && closeModel()"></div>
        <div class="april-model-cont april-f-center" :style="{'max-width': width}">
            <div class="april-model-cont-head april-f-fw5 april-f-pr">
                <slot name="header"></slot>
                <i class="iconfont april-f-common-color april-f-pa april-f-cursor" @click="closeModels()">&#xe64f;</i>
            </div>

            <div class="april-model-cont-section" :style="{'max-height': height,'min-height': minHeight}">
                <slot name="content"></slot>
            </div>

            <div class="april-model-cont-foot" v-if="$slots.foot">
                <slot name="foot"></slot>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import { Component, Vue, Emit, Prop, Watch } from "vue-property-decorator";

    @Component({
        name: 'april-model-center'
    })
    export default class AprilModelCenter extends Vue{
        @Prop({default: false, type: Boolean}) public visible!: boolean;

        @Prop({default: "600px", type: String}) public width!: string;

        @Prop({default: "600px", type: String}) public height!: string ;

        @Prop({default: "100px", type: String}) public minHeight!: string ;

        @Prop({default: true, type: Boolean}) public mask!: boolean ;

        @Emit("close")
        public closeModel(){}

        @Watch('visible')
        changeVisible(visible:boolean){
            if (visible) {
                (document.body as any).style = `position:relative; width: calc(100% - 8px);overflow: hidden;`
            } else {
                (document.body as any).style = ''
            }
        }

        closeModels(){
            this.$emit('update:visible', false);
            this.closeModel()
        }
    }
</script>