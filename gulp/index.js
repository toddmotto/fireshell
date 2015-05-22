/**
 * index.js
 *
 * Auto-loads all gulp tasks within ./tasks
 * Also handles arguments and environment settings.
 *
 */
'use strict';

var gulp = require('gulp');
var requireDir = require('require-dir');
var tasks = requireDir('./tasks', { recurse: true });
var gutil = require('gulp-util');
var args = require('yargs').argv;

// Specify arguments by double-dashing eg:
// --production
// --type=<type>
gulp.args = gutil.env;
