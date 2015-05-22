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
var args = require('yargs')
    .default({ type: 'patch' })
    .argv;

gulp.task('bump', function () {

    var options = {};

    // arguments: --type=(patch|minor|major)
    var type = args.type;

    // if --type=<type> is not specified then either of
    // --patch|--minor|--major is accepted
    if (args.patch) type = 'patch';
    if (args.minor) type = 'minor';
    if (args.major) type = 'major';

    // versions override type
    if (args.version) {
        options.version = args.version;
    } else if (type) {
        options.type = type;
    }

    var pipeline = gulp.src(config.bump.src)
        .pipe(bump(options))
        .pipe(gulp.dest('./'));

    return pipeline;

});
