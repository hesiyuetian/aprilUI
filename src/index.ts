import Vue from 'vue';
import AprilPicker from '../packages/picker';
import AprilPagination from '../packages/pagination';

const components: { [propsName: string]: any } = {
    AprilPicker,
    AprilPagination
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



