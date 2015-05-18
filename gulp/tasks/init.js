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
