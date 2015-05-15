'use strict';

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

gulp.task('css', ['clean'], function () {

    var pipeline = sass('src/sass/screen.scss', {
            style: 'expanded',
            sourcemap: true
        })
        .pipe(sourcemaps.write())
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
        .pipe(rename({
            basename: 'styles',
            suffix: args.isProd ? '.min' : null
        }));

    if (args.isProd) pipeline.pipe(minifycss());

    return pipeline.pipe(gulp.dest('app/assets/css/'));

});

gulp.task('js', [], function () {

    var pipeline = gulp.src('src/js/**/*.js')
        .pipe(uglify({
            beautify: !args.isProd,
            compress: args.isProd,
            mangle: args.isProd,
            preserveComments: args.isProd ? false : 'all'
        }))
        .pipe(rename({
            basename: 'scripts',
            suffix: args.isProd ? '.min' : null
        }))
        .pipe(gulp.dest('app/assets/js'));

    return pipeline;

});

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

gulp.task('clean', function () {

    del([
        'app/assets/css/*',
        'app/assets/js/*'
    ]);

});

gulp.task('default', ['clean', 'css', 'js'], function () {

    gulp.start();
    // gulp.watch(, []);

});
