/**
 * watch.js
 *
 * Consult config.js for files being watched.
 * The only exception is the task 'js:watch' which is handled by watchify
 * within the javascript tasks file.
 *
 */
'use strict';

var config = require('../config.js');
var gulp = require('gulp');

gulp.task('watch', [ 'js:watchify' ], function() {

    // js:watch called above

    gulp.watch(config.sass.watch, ['sass']);

    gulp.watch([
        config.images.srcRaster,
        config.images.srcSvg
    ], ['images']);

});
