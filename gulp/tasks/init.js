/**
 * init.js
 *
 * Run when a project has been freshly cloned or third-party
 * libraries need to be re-initiated.
 *
 */
'use strict';

var gulp = require('gulp');

gulp.task('init', function () {

    // Bower
    var pipeline = gulp.src([
            // List bower components here
            // 'bower_components/...'
        ])
    .pipe(gulp.dest('src/js/libs'));

    return pipeline;

});
