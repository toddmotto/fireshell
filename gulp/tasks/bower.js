/**
 * bower.js
 *
 * Third-party libraries and externally maintained
 * modules.
 *
 */
'use strict';

var gulp = require('gulp');
var config = require('../config.js');

gulp.task('bower', function () {

    var pipeline = gulp.src(config.bower.src)
        .pipe(gulp.dest(config.bower.dest));

});
