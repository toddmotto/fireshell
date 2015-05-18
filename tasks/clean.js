'use strict';

var config = require('./config.json');
var gulp = require('gulp');
var del = require('del');

/**
 * Cleaning project directories
 *
 */
gulp.task('clean:assets', [], function () {

    del([
        'app/assets/css/*',
        'app/assets/js/*',
        'app/assets/img/*'
    ]);

});

gulp.task('clean', ['clean:assets']);
