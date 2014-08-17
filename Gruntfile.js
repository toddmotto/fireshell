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
                    ' * <%= pkg.name %> - <%= pkg.url %>\n' +
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
                '<%= project.assets %>/css/*.css',
                '<%= project.assets %>/js/*.js'
            ]
        },

        /**
         * Uglify (minify) JavaScript files
         */
        uglify: {
            dev: {
                options: {
                    banner: '<%= tag.banner %>',
                    beautify: true,
                    compress: false,
                    mangle: false,
                    preserveComments: 'all'
                },
                files: {
                    '<%= project.assets %>/js/script.js': '<%= project.js %>'
                }
            },
            dist: {
                options: {
                    banner: '<%= tag.banner %>',
                    beautify: false,
                    compress: true,
                    mangle: false,
                    preserveComments: false
                },
                files: {
                    '<%= project.assets %>/js/script.min.js': '<%= project.js %>'
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
                    '<%= project.assets %>/css/styles.unprefixed.css': '<%= project.css %>'
                }
            },
            dist: {
                options: {
                    style: 'compressed',
                    banner: '<%= tag.banner %>'
                },
                files: {
                    '<%= project.assets %>/css/styles.unprefixed.css': '<%= project.css %>'
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
                    '<%= project.assets %>/css/styles.prefixed.css': ['<%= project.assets %>/css/styles.unprefixed.css']
                }
            },
            dist: {
                files: {
                    '<%= project.assets %>/css/styles.prefixed.css': ['<%= project.assets %>/css/styles.unprefixed.css']
                }
            }
        },

        /**
         * CSS Minification
         */
         cssmin: {
            dist: {
                files: {
                    '<%= project.assets %>/css/styles.css': [
                        '<%= project.assets %>/css/styles.prefixed.css'
                    ]
                }
            }
        },

        /**
         * Stylestats
         */
        stylestats: {
            src: ['<%= project.assets %>/css/styles.prefixed.css']
        },

        /**
         * Copy required application files
         */
        copy: {
            dist: {
                files: {}
            }
        },

        modernizr: {
            dist: {
                devFile : '',
                outputFile : "<%= project.assets %>/js/modernizr.build.js",
                parseFiles : false,
                uglify: true,
                extra : {
                    load : false,
                },
                tests : [
                    'touch'
                ]
            }
        },

        /**
         * Watching development files and run concat/compile tasks
         */
        watch: {
            concat: {
                files: '<%= project.src %>/js/{,*/}*.js',
                tasks: [
                    'uglify:dev'
                ]
            },
            sass: {
                files: '<%= project.src %>/sass/{,*/}*.{scss,sass}',
                tasks: [
                    'sass:dev',
                    'autoprefixer:dev'
                ]
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
        'uglify:dev',
        'modernizr',
        'watch'
    ]);

    /**
     * CSS Task
     */
    grunt.registerTask('css', [
        'sass:dev',
        'autoprefixer:dev',
        'cssmin:dist',
        'stylestats'
    ]);

    /**
     * Javascript Task
     */
    grunt.registerTask('js', [
        'uglify:dev',
        'modernizr'
    ]);

    /**
     * Build task
     * Run `grunt build` on the command line
     * Then compress all JS/CSS files
     */
    grunt.registerTask('build', [
        'clean:dist',
        // CSS
        'sass:dist',
        'autoprefixer:dist',
        'cssmin:dist',
        // JS
        'uglify:dist',
        'modernizr'
    ]);

};
