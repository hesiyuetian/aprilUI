import Vue from 'vue'
import { AprilUIComponent } from './component'

import { AprilPicker } from './pricker'
import { AprilPagination } from './pagination'

/**
 * Install all april-ui components into Vue.
 * Please do not invoke this method directly.
 * Call `Vue.use(April)` to install.
 */
// export function install (vue: typeof Vue, options: InstallationOptions): void
// export const installs = function (vue: typeof Vue): void
export declare function install(vue: typeof Vue): void;


/** April component common definition */
export type Component = AprilUIComponent

/** Pricker Component */
export class Pricker extends AprilPicker {}

export class Pagination extends AprilPagination {}


