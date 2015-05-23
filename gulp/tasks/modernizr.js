/**
 * modernizr.js
 *
 * Progressive enhancment. Nodernizr will scan all .js and .scss files
 * for references to tests and include those in the build.
 *
 */
'use strict';

var gulp = require('gulp');
var config = require('../config.js');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var modernizr = require('gulp-modernizr');

gulp.task('modernizr', function () {

    var pipeline = gulp.src(config.modernizr.src)
        .pipe(modernizr(config.modernizr.options))
        .pipe(uglify())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest(config.modernizr.dest));

    return pipeline;

});
