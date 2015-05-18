'use strict';

var config = require('../config.js');
var gulp = require('gulp');
var del = require('del');

/**
 * Cleaning project directories
 *
 */
gulp.task('clean:assets', [], function () {

    del(config.clean.assets);

});

gulp.task('clean', [
    'clean:assets'
]);
