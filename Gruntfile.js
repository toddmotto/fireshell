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
            ],
            bower: [
                // Additionally installed Bower files
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
                '<%= project.assets %>/js/*.js',
                '<%= project.assets %>/img/*/**',
                '<%= project.assets %>/img/{,*/,**/}*.{jpg,png,gif,svg}'
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
            img: {
                files: [
                    {
                        expand: true,
                        flatten: false,
                        cwd: '<%= project.src %>/img/',
                        src: [
                            '{,*/,*/*/}*.{jpg,png,gif,svg}'
                        ],
                        dest: '<%= project.assets %>/img',
                    },
                ]
            },
            bower: {
                files: [
                    {
                        expand: true,
                        flatten: true,
                        src: '<%= project.bower %>',
                        dest: '<%= project.src %>/js/libs',
                    }
                ]
            }
        },

        imagemin: {
            dist: {
                options: {
                    optimizationLevel: 4,
                    progressive: true,
                    pngquant: true
                },
                files: [
                    {
                        expand: true,
                        cwd: '<%= project.assets %>/img',
                        src: [
                            '*.{png,jpg,gif}',
                            '**/*.{png,jpg,gif}',
                        ],
                        dest: '<%= project.assets %>/img'
                    }
                ]
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
        'copy:img',
        'copy:bower',
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

        // Bower files
        'copy:bower',

        // Images
        'copy:img',
        'imagemin:dist',

        // CSS
        'sass:dist',
        'autoprefixer:dist',
        'cssmin:dist',

        // JavaScript
        'uglify:dist',
        'modernizr'
    ]);

};
