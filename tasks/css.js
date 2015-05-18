'use strict';

var config = require('./config.json');
var gulp = require('gulp');
var sass = require('gulp-ruby-sass');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var minifycss = require('gulp-minify-css');
var rename = require('gulp-rename');

/**
 * CSS and Styles
 *
 */
gulp.task('css', [], function () {

    var pipeline = sass('src/sass/screen.scss', {
            style: 'expanded',
            sourcemap: true
        })
        .pipe(sourcemaps.write())

        // Un-prefixed
        .pipe(rename({ basename: 'styles.unprefixed' }))
        .pipe(gulp.dest('app/assets/css/'))

        // Prefixed
        .pipe(autoprefixer({
            browsers: [
                'last 2 version',
                'safari 6',
                'ie 9',
                'opera 12.1',
                'ios 6',
                'android 4'
            ]
        }))
        .pipe(rename({ basename: 'styles' }))
        .pipe(gulp.dest('app/assets/css/'))

        // Minified
        .pipe(rename({ basename: 'styles', suffix: '.min' }))
        .pipe(minifycss())
        .pipe(gulp.dest('app/assets/css/'));

    return pipeline;

});
