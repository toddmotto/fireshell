'use strict';

var config = require('../config.json');
var gulp = require('gulp');
var imagemin = require('gulp-imagemin');

/**
 * Image processing
 *
 */
gulp.task('images:default', function() {

    var pipeline = gulp.src('src/img/{./,**/}*.{jpg,jpeg,png,gif}')
        .pipe(imagemin({
            optimizationLevel: 4,
            progressive: true,
            interlaced: true,
            pngquant: true
        }))
        .pipe(gulp.dest('app/assets/img'));

    return pipeline;

});

gulp.task('images:svg', function() {

    var pipeline = gulp.src('src/img/{./,**/}*.svg')
        .pipe(imagemin({
            svgoPlugins: [
                // More options here: https://github.com/svg/svgo
                { removeViewBox: false },
                { removeUselessStrokeAndFill: false },
                { removeEmptyAttrs: false }
            ],
        }))
        .pipe(gulp.dest('app/assets/img'));

    return pipeline;

});

gulp.task('images', ['images:svg', 'images:default']);
