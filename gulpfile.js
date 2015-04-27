var gulp = require('gulp');

var args = require('yargs')
    .usage('Usage: $0 [--dist]')
    .default({
        env: 'dev'
    })
    .argv;
args.env = args.dist ? 'dist' : args.env;

var paths = {
    input: {
        sass: 'src/sass/screen.scss'
    },
    output: {
        css: {
            dir: 'app/assets/css/',
            name: 'styles',
            suffix: null
        }
    }
};

var settings = {
    rename: {
        css: {
            basename: paths.output.css.name,
            suffix: paths.output.css.suffix
        }
    },
    sass: {
        style: 'expanded'
    },
    autoprefixer: {
        browsers: [
            'last 2 version',
            'safari 6',
            'ie 9',
            'opera 12.1',
            'ios 6',
            'android 4'
        ]
    }
};

var sass = require('gulp-ruby-sass');
var autoprefixer = require('gulp-autoprefixer');
var minifycss = require('gulp-minify-css');
// var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var rename = require('gulp-rename');
// var concat = require('gulp-concat');
// var notify = require('gulp-notify');
// var cache = require('gulp-cache');
// var livereload = require('gulp-livereload');
var del = require('del');

gulp.task('css', function () {

    del(paths.output.css.dir + '/*');

    return sass(paths.input.sass, settings.sass)
        .pipe(autoprefixer(settings.autoprefixer))
        .pipe(rename(settings.rename.css))
        // .pipe(minifycss())
        .pipe(gulp.dest(paths.output.css.dir));

});

gulp.task('build', function () {

});
