/**
 * bump.js
 *
 * Project versioning.
 *
 * TODO: add git tags and commit
 *
 */
'use strict';

var config = require('../config.js');
var gulp = require('gulp');
var bump = require('gulp-bump');
var gutil = require('gulp-util');

gulp.task('bump', function () {

    var options = {};

    // arguments: --type=(patch|minor|major)
    var type = gulp.args.type || 'patch';

    // if --type=<type> is not specified then either of
    // --patch|--minor|--major is accepted
    if (gulp.args.patch) type = 'patch';
    if (gulp.args.minor) type = 'minor';
    if (gulp.args.major) type = 'major';

    // versions override type
    if (gulp.args.version) {
        options.version = gulp.args.version;
    } else if (type) {
        options.type = type;
    }

    var pipeline = gulp.src(config.bump.src)
        .pipe(bump(options))
        .pipe(gulp.dest('./'));

    return pipeline;

});
