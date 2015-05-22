/**
 * javascript.js
 *
 * Using browserify and babelify to bundle all javascript
 * files, js:watchify uses watchify to recompile when files
 * have changed.
 *
 */
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

// This ensures the following args properties are passed
// into browserify as watchify requires them:
// { cache: {}, packageCache: {} }
var options = assign({}, watchify.args, config.js.browserify);

// used for the watchify stream below
var w;


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
gulp.task('js:watchify', bundlify);

function bundlify() {

    w = w || getWatchifyInstance();

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

function getWatchifyInstance () {

    // Open the watchify stream if not already set
    // and bind update/log events.

    if (!w) {
        w = watchify(browserify(options));
        w.on('update', bundlify);
        w.on('log', gutil.log);
    }

    return w;

}
