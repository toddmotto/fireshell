var gulp = require('gulp');

var args = require('yargs')
    .default({ env: 'dev' })
    .argv;
args.env = (args.dist || args.prod) ? 'dist' : args.env;
args.isProd = args.dist || args.prod || false;

var sass = require('gulp-ruby-sass');
var autoprefixer = require('gulp-autoprefixer');
var minifycss = require('gulp-minify-css');
// var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var rename = require('gulp-rename');
// var notify = require('gulp-notify');
// var cache = require('gulp-cache');
var del = require('del');

gulp.task('css', ['clean'], function () {

    var process = sass('src/sass/screen.scss', {
            style: 'expanded'
        })
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

    if (args.isProd) process.pipe(minifycss());

    return process.pipe(gulp.dest('app/assets/css/'));

});

gulp.task('js', [], function () {

    var process = gulp.src('src/js/**/*.js')
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

    return process;

});

gulp.task('clean', function () {

    del([
        'app/assets/css/*',
        'app/assets/js/*'
    ]);

});

gulp.task('default', ['clean', 'css', 'js'], function () {

    // gulp.start();

});
