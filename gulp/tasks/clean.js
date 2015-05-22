/**
 * clean.js
 *
 * Removes all dist files in preparation for a clean build.
 *
 */
'use strict';

var del = require('del');
var gulp = require('gulp');
var config = require('../config.js');


gulp.task('clean:assets', function () {

    del(config.clean.assets);

});

gulp.task('clean:bower', function () {

    del(config.clean.bower);

});

gulp.task('clean', [
    'clean:assets',
    'clean:bower'
]);
