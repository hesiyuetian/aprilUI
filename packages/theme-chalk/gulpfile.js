'use strict';

const { series, src, dest } = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const cssmin = require('gulp-cssmin');
const concat = require('gulp-concat');

function compile() {
    return src('./src/*.scss')
        .pipe(sass.sync())
        .pipe(autoprefixer({
            browsers: ['ie > 9', 'last 2 versions'],
            cascade: false
        }))
        .pipe(concat('index.css'))
        .pipe(cssmin())
        .pipe(dest('./lib'));
}

function symbelCompile() {
    // return src('./src/*.scss')
    return src('./src/picker-colum.scss')
        .pipe(sass.sync())
        // .pipe(autoprefixer({
        //     browsers: ['ie > 9', 'last 2 versions'],
        //     cascade: false
        // }))
        // .pipe(concat('index.css'))
        .pipe(cssmin())
        .pipe(dest('./lib'));
}

exports.build = series(compile);
