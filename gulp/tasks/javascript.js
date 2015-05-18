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

    var pipeline = gulp.src(config.js.src)

        // Un-minified
        .pipe(rename({
            basename: 'scripts'
        }))
        .pipe(gulp.dest(config.js.dest))

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
        .pipe(gulp.dest(config.js.dest));

    return pipeline;

});
