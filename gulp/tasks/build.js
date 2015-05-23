/**
 * build.js
 *
 */
'use strict';

var gulp = require('gulp');

gulp.task('build', [
    'clean',
    'modernizr',
    'bower',
    'sass',
    'images:optimize',
    'js'
]);
