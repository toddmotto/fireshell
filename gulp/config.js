/**
 * config.js
 *
 */
'use strict';

var pkg = require('../package.json');
var dest = './app';
var src = './src';

module.exports = {

    pkg: pkg,
    dest: dest,
    src: src,

    bump: {
        src: [
            './package.json'
        ]
    },
    sass: {
        src: src + '/sass/screen.scss',
        dest: dest + '/assets/css/',
        watch: src + '/sass/**/*',
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
        dest: dest + '/assets/js',
        browserify: {
            entries: [
                src + '/js/app.js'
            ],
            debug: true
        }
    },
    images: {
        srcRaster: src + '/img/{./,**/}*.{jpg,jpeg,png,gif}',
        srcSvg: src + '/img/{./,**/}*.svg',
        dest: dest + '/assets/img'
    },
    clean: {
        assets: [
            dest + '/assets/css/*',
            dest + '/assets/js/*',
            dest + '/assets/img/*'
        ]
    },
    stylestats: {
        type: 'json',
        outfile: true,
        config: {
            "published": true,
            "paths": true,
            "stylesheets": true,
            "styleElements": true,
            "size": true,
            "dataUriSize": true,
            "ratioOfDataUriSize": true,
            "gzippedSize": true,
            "simplicity": true,
            "rules": true,
            "selectors": true,
            "declarations": true,
            "averageOfIdentifier": true,
            "mostIdentifier": true,
            "mostIdentifierSelector": true,
            "averageOfCohesion": true,
            "lowestCohesion": true,
            "lowestCohesionSelector": true,
            "totalUniqueFontSizes": true,
            "uniqueFontSizes": true,
            "totalUniqueFontFamilies": true,
            "uniqueFontFamilies": true,
            "totalUniqueColors": true,
            "uniqueColors": true,
            "idSelectors": true,
            "universalSelectors": true,
            "unqualifiedAttributeSelectors": true,
            "javascriptSpecificSelectors": "[#\\.]js\\-", // .json
            "userSpecifiedSelectors": false,
            "importantKeywords": true,
            "floatProperties": true,
            "mediaQueries": true,
            "propertiesCount": 10,
            "requestOptions": {}
        }
    }
}
