/**
 * javascript.js
 *
 * Using browserify and babelify to bundle all javascript
 * files, js:watchify uses watchify to recompile when files
 * have changed.
 *
 */
'use strict';

var gulp = require('gulp');
var size = require('gulp-size');
var gutil = require('gulp-util');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var config = require('../config.js');
var assign = require('lodash').assign;
var babelify = require('babelify');
var watchify = require('watchify');
var sourcemaps = require('gulp-sourcemaps');
var browserify = require('browserify');

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

        .pipe(size({
            showFiles: config.size.showFiles,
            gzip: config.size.gzip,
            title: "JS sizes:"
        }))

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
