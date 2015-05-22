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
var args = require('yargs').argv;

gulp.args = args;

gulp._env = {
    prod: !!args.prod,
    dev: !!args.dev
};
