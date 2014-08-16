'use strict';

/**
 * Grunt module
 */
module.exports = function (grunt) {

    /**
     * Dynamically load npm tasks
     */
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    /**
     * FireShell Grunt config
     */
    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        /**
         * Set project info
         */
        project: {
            src: 'src',
            app: 'app',
            assets: '<%= project.app %>/assets',
            css: [
                '<%= project.src %>/sass/main.scss'
            ],
            js: [
                '<%= project.src %>/js/*.js'
            ]
        },

        /**
         * Project banner
         */
        tag: {
          banner:   '/*!\n' +
                    ' * <%= pkg.name %>\n' +
                    ' * <%= pkg.url %>\n' +
                    ' * @author <%= pkg.author %>\n' +
                    ' * @version <%= pkg.version %>\n' +
                    ' * Copyright <%= pkg.copyright %>. <%= pkg.license %> licensed.\n' +
                    ' */\n'
        },

        /**
         * Clean files and folders
         */
        clean: {
            dist: [
                '<%= project.assets %>/css/styles.unprefixed.css',
                '<%= project.assets %>/css/styles.prefixed.css'
            ]
        },

        /**
         * Concatenate JavaScript files
         */
        concat: {
            dev: {
                files: {
                    '<%= project.assets %>/js/scripts.min.js': '<%= project.js %>'
                }
            },
            options: {
                stripBanners: true,
                nonull: true,
                banner: '<%= tag.banner %>'
            }
        },

        /**
         * Uglify (minify) JavaScript files
         */
        uglify: {
            options: {
                banner: '<%= tag.banner %>'
            },
            dist: {
                files: {
                    '<%= project.assets %>/js/scripts.min.js': '<%= project.js %>'
                }
            }
        },

        /**
         * Compile Sass/sass files
         */
        sass: {
            dev: {
                options: {
                style: 'expanded',
                banner: '<%= tag.banner %>'
            },
                files: {
                    '<%= project.assets %>/css/style.unprefixed.css': '<%= project.css %>'
                }
            },
            dist: {
                options: {
                    style: 'expanded'
                },
                files: {
                    '<%= project.assets %>/css/style.unprefixed.css': '<%= project.css %>'
                }
            }
        },

        /**
         * Auto vendor prefixes
         */
        autoprefixer: {
            options: {
                browsers: [
                'last 2 version',
                'safari 6',
                'ie 9',
                'opera 12.1',
                'ios 6',
                'android 4'
                ]
            },
            dev: {
                files: {
                    '<%= project.assets %>/css/style.min.css': ['<%= project.assets %>/css/style.unprefixed.css']
                }
            },
            dist: {
                files: {
                    '<%= project.assets %>/css/style.prefixed.css': ['<%= project.assets %>/css/style.unprefixed.css']
                }
            }
        },

        /**
         * Watching development files and run concat/compile tasks
         */
        watch: {
            concat: {
                files: '<%= project.src %>/js/{,*/}*.js',
                tasks: ['concat:dev', 'jshint']
            },
            sass: {
                files: '<%= project.src %>/sass/{,*/}*.{scss,sass}',
                tasks: ['sass:dev', 'cssmin:dev', 'autoprefixer:dev']
            }
        }
    });

    /**
    * Default task
    * Run `grunt` on the command line
    */
    grunt.registerTask('default', [
        'sass:dev',
        'autoprefixer:dev',
        'concat:dev',
        'watch'
    ]);

    /**
    * Build task
    * Run `grunt build` on the command line
    * Then compress all JS/CSS files
    */
    grunt.registerTask('build', [
        'sass:dist',
        'autoprefixer:dist',
        'clean:dist',
        'uglify'
    ]);

};
