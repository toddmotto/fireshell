'use strict';

var config = require('../config.js');
var gulp = require('gulp');

gulp.task('watch', [ 'js:watch' ], function() {

    // js:watch called above

    gulp.watch(config.sass.watch, ['sass']);

    gulp.watch([
        config.images.srcRaster,
        config.images.srcSvg
    ], ['images']);

});
