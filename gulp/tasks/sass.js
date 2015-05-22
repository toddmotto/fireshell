/**
 * sass.js
 *
 * Source-mapped and Autoprefixed. Stylestats is also used to provide a
 * json file of CSS statistics.
 *
 */
'use strict';

var gulp = require('gulp');
var sass = require('gulp-ruby-sass');
var config = require('../config.js');
var rename = require('gulp-rename');
var sourcemaps = require('gulp-sourcemaps');
var minifycss = require('gulp-minify-css');
var stylestats = require('gulp-stylestats');
var handleErrors = require('../util/handle-errors');
var autoprefixer = require('gulp-autoprefixer');

gulp.task('sass', [], function () {

    var pipeline = sass(config.sass.src, {
            style: 'expanded',
            sourcemap: true
        })
        .on('error', handleErrors)
        .pipe(sourcemaps.write())

        // Un-prefixed
        .pipe(rename({ basename: config.sass.basename + '.unprefixed' }))
        .pipe(gulp.dest(config.sass.dest))

        // Prefixed
        .pipe(autoprefixer(config.sass.autoprefixer))
        .pipe(rename({ basename: config.sass.basename }))
        .pipe(gulp.dest(config.sass.dest))

        // Minified
        .pipe(rename({ basename: config.sass.basename, suffix: '.min' }))
        .pipe(minifycss())
        .pipe(gulp.dest(config.sass.dest))

        .pipe(stylestats(config.stylestats))
        .pipe(rename({ basename: config.sass.basename + '.stats' }))
        .pipe(gulp.dest(config.sass.dest));

    return pipeline;

});
