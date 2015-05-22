'use strict';

var config = require('../config.js');
var gulp = require('gulp');

var browserify = require('browserify');
var babelify = require('babelify');
var watchify = require('watchify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var gutil = require('gulp-util');
var sourcemaps = require('gulp-sourcemaps');
var assign = require('lodash.assign');

// TODO cehck watchify args
// { cache: {}, packageCache: {} }
var options = assign({}, watchify.args, config.js.browserify);

// open the watchify stream
var w = watchify(browserify(options));


/**
 * Single build using browserify and babelify.
 *
 */
gulp.task('js', bundle);

function bundle () {

    var pipeline = browserify(options)

        .transform(babelify)
        .bundle()

        .on('error', gutil.log.bind(gutil, 'Browserify Error'))

        .pipe(source('scripts.min.js'))
        .pipe(buffer())

        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(config.js.dest));

    return pipeline;

};


/**
 * Run watchify on browserify tasks ad re-bundle when
 * files have changed
 *
 */
gulp.task('js:watch', bundlify);

w.on('update', bundlify);
w.on('log', gutil.log);

function bundlify() {

    var pipeline = w

        .transform(babelify)
        .bundle()

        .on('error', gutil.log.bind(gutil, 'Browserify Error'))

        .pipe(source('scripts.min.js'))
        .pipe(buffer())

        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(config.js.dest));

    return pipeline;

};
