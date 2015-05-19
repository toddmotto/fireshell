'use strict';

var config = require('../config.js');
var gulp = require('gulp');

gulp.task('watch', [
    // 'watchify',
    // 'browserSync'
], function() {

    gulp.watch(config.sass.src,   ['sass']);

    gulp.watch([
        config.images.srcRaster,
        config.images.srcSvg
    ], ['images']);

    gulp.watch(config.js.src, ['js']);
    // TODO
    // Watchify will watch and recompile our JS, so no need to gulp.watch it

});
