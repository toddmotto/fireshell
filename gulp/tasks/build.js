/**
 * build.js
 *
 */
'use strict';

var gulp = require('gulp');

gulp.task('build', [
    'clean',
    'bower',
    'sass',
    'js'
]);
