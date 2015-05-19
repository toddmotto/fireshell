var app = './app';
var src = './src';

module.exports = {

    app: app,
    src: src,

    sass: {
        src: src + '/sass/screen.scss',
        dest: app + '/assets/css/',
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
    },
    js: {
        src: src + '/js/**/*.js',
        dest: app + '/assets/js'
    },
    images: {
        srcRaster: src + '/img/{./,**/}*.{jpg,jpeg,png,gif}',
        srcSvg: src + '/img/{./,**/}*.svg',
        dest: app + '/assets/img'
    },
    clean: {
        assets: [
            app + '/assets/css/*',
            app + '/assets/js/*',
            app + '/assets/img/*'
        ]
    }
}
