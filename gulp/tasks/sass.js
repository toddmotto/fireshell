'use strict';

var config = require('../config.js');
var gulp = require('gulp');
var sass = require('gulp-ruby-sass');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var minifycss = require('gulp-minify-css');
var rename = require('gulp-rename');

/**
 * CSS and Styles
 *
 */
gulp.task('sass', [], function () {

    var pipeline = sass(config.sass.src, {
            style: 'expanded',
            sourcemap: true
        })
        .pipe(sourcemaps.write())

        // Un-prefixed
        .pipe(rename({ basename: 'styles.unprefixed' }))
        .pipe(gulp.dest(config.sass.dest))

        // Prefixed
        .pipe(autoprefixer(config.sass.autoprefixer))
        .pipe(rename({ basename: 'styles' }))
        .pipe(gulp.dest(config.sass.dest))

        // Minified
        .pipe(rename({ basename: 'styles', suffix: '.min' }))
        .pipe(minifycss())
        .pipe(gulp.dest(config.sass.dest));

    return pipeline;

});
