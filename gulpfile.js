'use strict';

var gulp = require('gulp');
var requireDir = require('require-dir');

// All tasks can be found in "tasks/..."
var tasks = requireDir('./tasks', { recurse: true });
var args = require('yargs')

// var cache = require('gulp-cache');

args.default({ env: 'dev' }).argv;
args.env = (args.dist || args.prod) ? 'dist' : args.env;
args.isProd = args.dist || args.prod || false;


/**
 * Default
 *
 */
gulp.task('default', ['clean', 'css', 'js'], function () {

    gulp.start();

});
