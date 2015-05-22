/**
 * clean.js
 *
 * Removes all dist files in preparation for a clean build.
 *
 */
'use strict';

var config = require('../config.js');
var gulp = require('gulp');
var del = require('del');


gulp.task('clean:assets', function () {

    del(config.clean.assets);

});

gulp.task('clean', [
    'clean:assets'
]);
