/**
 * sass.js
 *
 * Source-mapped and Autoprefixed. Stylestats is also used to provide a
 * json file of CSS statistics.
 *
 */
'use strict';

var gulp = require('gulp');
var size = require('gulp-size');
var sass = require('gulp-ruby-sass');
var config = require('../config.js');
var rename = require('gulp-rename');
var minifycss = require('gulp-minify-css');
var sourcemaps = require('gulp-sourcemaps');
var stylestats = require('gulp-stylestats');
var handleErrors = require('../util/handle-errors');
var autoprefixer = require('gulp-autoprefixer');

gulp.task('sass', function () {

    var pipeline = sass(config.sass.src, {
            style: 'expanded',
            sourcemap: true
        })
        .on('error', handleErrors)

        // autoprefix, minify and sourcemaps
        .pipe(autoprefixer(config.sass.autoprefixer))
        .pipe(minifycss())
        .pipe(sourcemaps.write())

        .pipe(rename({ basename: config.sass.basename, suffix: '.min' }))

        .pipe(size({
            showFiles: config.size.showFiles,
            gzip: config.size.gzip,
            title: "CSS size:"
        }))

        .pipe(gulp.dest(config.sass.dest))

        // Style statistics
        .pipe(stylestats(config.stylestats))
        .pipe(rename({ basename: config.sass.basename + '.stats' }))
        .pipe(gulp.dest(config.sass.dest));

    return pipeline;

});
