'use strict';

var config = require('../config.js');
var gulp = require('gulp');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

/**
 * Javascript
 *
 */
gulp.task('js', [], function () {

    var pipeline = gulp.src('src/js/**/*.js')

        // Un-minified
        .pipe(rename({
            basename: 'scripts'
        }))
        .pipe(gulp.dest('app/assets/js'))

        // Minified
        .pipe(uglify({
            beautify: true,
            compress: {},
            mangle: true,
            preserveComments: false
        }))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('app/assets/js'));

    return pipeline;

});
