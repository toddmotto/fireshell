/**
 * images.js
 *
 * Image optimisation for rasters (jpg, png, gif) and vectors.
 *
 */
'use strict';

var gulp = require('gulp');
var config = require('../config.js');
var imagemin = require('gulp-imagemin');

/**
 * Image processing
 *
 */
gulp.task('images:raster', function() {

    var pipeline = gulp.src(config.images.srcDefault)
        .pipe(imagemin({
            optimizationLevel: 4,
            progressive: true,
            interlaced: true,
            pngquant: true
        }))
        .pipe(gulp.dest(config.images.dest));

    return pipeline;

});

gulp.task('images:svg', function() {

    var pipeline = gulp.src(config.images.srcSvg)
        .pipe(imagemin({
            svgoPlugins: [
                // More options here: https://github.com/svg/svgo
                { removeViewBox: false },
                { removeUselessStrokeAndFill: false },
                { removeEmptyAttrs: false }
            ],
        }))
        .pipe(gulp.dest(config.images.dest));

    return pipeline;

});

gulp.task('images', [
    'images:svg',
    'images:raster'
]);
