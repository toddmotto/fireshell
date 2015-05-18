'use strict';

var config = require('./tasks/config.json');

var gulp = require('gulp');
var sass = require('gulp-ruby-sass');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var minifycss = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var rename = require('gulp-rename');
// var cache = require('gulp-cache');
var del = require('del');

var args = require('yargs')
    .default({ env: 'dev' })
    .argv;

args.env = (args.dist || args.prod) ? 'dist' : args.env;
args.isProd = args.dist || args.prod || false;


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


/**
 * Javascript
 *
 */
gulp.task('js', [], function () {

    var pipeline = gulp.src('src/js/**/*.js')

        // Un-minified
        .pipe(rename({
            basename: 'scripts'
        }))
        .pipe(gulp.dest('app/assets/js'))

        // Minified
        .pipe(uglify({
            beautify: true,
            compress: {},
            mangle: true,
            preserveComments: false
        }))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('app/assets/js'));

    return pipeline;

});


/**
 * Image processing
 *
 */
gulp.task('images', [], function() {

    var pipeline = gulp.src('src/img/**/*.{jpg,jpeg,png,gif}')
        .pipe(imagemin({
            optimizationLevel: 4,
            progressive: true,
            interlaced: true,
            pngquant: true
        }))
        .pipe(gulp.dest('app/assets/img'));

    return pipeline;

});


/**
 * Cleaning project directories
 *
 */
gulp.task('clean:assets', [], function () {

    del([
        'app/assets/css/*',
        'app/assets/js/*'
    ]);

});

gulp.task('clean', ['clean:assets']);


/**
 * Default
 *
 */
gulp.task('default', ['clean', 'css', 'js'], function () {

    gulp.start();

});
