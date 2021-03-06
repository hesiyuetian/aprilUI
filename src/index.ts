import Vue from 'vue';
import AprilPicker from '../packages/picker';
import AprilPagination from '../packages/pagination';


// 关闭 Vue warn
Vue.config.warnHandler = function(msg, vm, trace) {

};

// 弹框
import {AprilModelCenter, AprilModelRight} from '../packages/model';

// 表单
import {AprilForm, AprilFormItem} from '../packages/form';
import AprilInput from '../packages/input';
import AprilSelect from '../packages/select';
import AprilDatePicker from '../packages/date';

const components: { [propsName: string]: any } = {
    AprilPicker,
    AprilPagination,
    AprilModelCenter,
    AprilModelRight,
    AprilForm,
    AprilFormItem,
    AprilInput,
    AprilSelect,
    AprilDatePicker
};

const install = (vue: typeof Vue): void => {
    // 安装全部的插件
    Object.keys(components).forEach((key) => {
        vue.component(key, components[key]);
    });
};

/* 支持使用标签的方式引入 */
if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
}

export default {
    install,
    ...components,
};




