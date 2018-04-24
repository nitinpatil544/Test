'use strict';
module.exports = function ( grunt ) {

    // load all grunt tasks matching the `grunt-*` pattern
    // Ref. https://npmjs.org/package/load-grunt-tasks
    require( 'load-grunt-tasks' )( grunt );

    grunt.initConfig( {
        // watch for changes and trigger sass, uglify and livereload
        watch: {
            sass: {
                files: [ 'assets/css/sass/**/*.{scss,sass}' ],
                tasks: [ 'sass', 'autoprefixer' ]
            },
            js: {
                files: '<%= uglify.frontend.src %>',
                tasks: [ 'uglify' ]
            }
        },
        // sass
        sass: {
            dist: {
                options: {
                    style: 'expanded'
                },
                files: {
                    'assets/css/main.css': 'assets/css/sass/main.scss'
                }
            }
        },
        // autoprefixer
        autoprefixer: {
            options: {
                browsers: [ 'last 2 versions', 'ie 11', 'ios 6', 'android 4' ],
                map: true
            },
            files: {
                expand: true,
                flatten: true,
                src: '*.css',
                dest: ''
            }
        },
        // uglify to concat, minify, and make source maps
        uglify: {
            options: {
                banner: '/*! \n * Test JavaScript Library \n * @package Test \n */',
                sourceMap: 'assets/js/main.js.map',
                sourceMappingURL: 'main.js.map',
                sourceMapPrefix: 2
            },
            frontend: {
                src: [
                    'assets/js/vendors/slick.js',
                    'assets/js/vendors/fitvids.js',
                    'assets/js/vendors/more-menu.js',
                    'assets/js/vendors/doubletapgo.js',
                    'assets/js/main.js'
                ],
                dest: 'assets/js/main.min.js'
            }
        },
        // Check text domain
        checktextdomain: {
            options: {
                text_domain: [ 'tgmpa', 'test', 'jobmatetm', 'wp-job-manager', 'wp-job-manager-resumes', 'buddypress' ], //Specify allowed domain(s)
                keywords: [ //List keyword specifications
                    '__:1,2d',
                    '_e:1,2d',
                    '_x:1,2c,3d',
                    'esc_html__:1,2d',
                    'esc_html_e:1,2d',
                    'esc_html_x:1,2c,3d',
                    'esc_attr__:1,2d',
                    'esc_attr_e:1,2d',
                    'esc_attr_x:1,2c,3d',
                    '_ex:1,2c,3d',
                    '_n:1,2,4d',
                    '_nx:1,2,4c,5d',
                    '_n_noop:1,2,3d',
                    '_nx_noop:1,2,3c,4d'
                ]
            },
            target: {
                files: [ {
                        src: [
                            '*.php',
                            '**/*.php',
                            '!node_modules/**',
                            '!tests/**'
                        ], //all php
                        expand: true
                    } ]
            }
        },
        // make po files
        makepot: {
            target: {
                options: {
                    cwd: '.', // Directory of files to internationalize.
                    domainPath: 'languages/', // Where to save the POT file.
                    exclude: [ 'node_modules/*' ], // List of files or directories to ignore.
                    mainFile: 'index.php', // Main project file.
                    potFilename: 'test.pot', // Name of the POT file.
                    potHeaders: { // Headers to add to the generated POT file.
                        poedit: true, // Includes common Poedit headers.
                        'Last-Translator': 'test',
                        'Language-Team': 'test',
                        'report-msgid-bugs-to': '',
                        'x-poedit-keywordslist': true // Include a list of all possible gettext functions.
                    },
                    type: 'wp-theme', // Type of project (wp-plugin or wp-theme).
                    updateTimestamp: true // Whether the POT-Creation-Date should be updated without other changes.
                }
            }
        }
    } );

    // register task
    grunt.registerTask( 'default', [ 'sass', 'autoprefixer', 'uglify', 'checktextdomain', 'makepot', 'watch' ] );
};
