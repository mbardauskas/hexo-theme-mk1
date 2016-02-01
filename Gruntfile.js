/* jslint node: true */
module.exports = function(grunt) {
	"use strict";

	// Load grunt tasks automatically
	require('load-grunt-tasks')(grunt);

	// Configurable paths
	var config = {
		source: 'code',
		temp: '.temp',
		dist: 'source'
	};

	// grunt config
	grunt.initConfig({

		// Project settings
		config: config,

		// NPM Package
		pkg: grunt.file.readJSON('package.json'),

		watch: {
			css: {
				files: ["<%= config.source %>/styles/*.scss"],
				tasks: ['sass:dist']
			}
		},

		// Compiles Sass to CSS and generates necessary files if requested
		sass: {
			dist: {
				options: {
					style: 'compressed'
				},
				files: [{
					expand: true,
					cwd: '<%= config.source %>/styles',
					src: ['**/*.scss'],
					dest: '<%= config.temp %>/styles',
					ext: '.css'
				}]
			}
		},

		// Add vendor prefixed styles
		autoprefixer: {
			options: {
				browsers: ['last 5 versions', 'Safari 6.1', 'Opera 12.1', 'IE 9']
			},
			dist: {
				files: [{
					expand: true,
					cwd: '<%= config.temp %>/styles/',
					src: '**/*.css',
					dest: '<%= config.temp %>/styles/'
				}]
			}
		},

		// Copy remaining files so other tasks can use
		copy: {
			dist: {
				files: [{
					expand: true,
					dot: true,
					cwd: '<%= config.source %>/js',
					dest: '<%= config.dist %>/js',
					src: [
						'**/*.js'
					]
				},
					{
						expand: true,
						dot: true,
						cwd: '<%= config.source %>/images',
						dest: '<%= config.dist %>/images',
						src: [
							'*.png',
							'*.jpg',
							'*.jpeg',
							'*.gif',
							'*.svg'
						]
					},
					{
						expand: true,
						dot: true,
						cwd: '<%= config.source %>/fonts',
						dest: '<%= config.dist %>/fonts',
						src: [
							'*.otf',
							'*.woff',
							'*.woff2',
							'*.ttf',
							'*.eot',
							'*.svg'
						]
					},
					{
						expand: true,
						dot: true,
						cwd: '<%= config.source %>',
						dest: '<%= config.dist %>',
						src: ['**/*.html']
					},
					{
						expand: true,
						dot: true,
						cwd: '<%= config.source %>',
						dest: '<%= config.dist %>',
						src: ['.htaccess', 'web.config']
					}
				]
			}
		},

		concat: {
			dist: {
				options: {
					separator: ''
				},
				files: [{
					src: ['<%= config.temp %>/styles/**/*.css'],
					dest: '<%= config.temp %>/styles/bundle.css'
				}]
			}
		},

		cssmin: {
			dist: {
				options: {
					advanced: false
				},
				files: [{
					expand: true,
					cwd: '<%= config.temp %>/styles',
					src: ['bundle.css'],
					dest: '<%= config.dist %>/css',
					ext: '.css'
				}]
			}
		},

		// Empties folders to start fresh
		clean: {
			dist: {
				files: [{
					dot: true,
					src: [
						'<%= config.temp %>',
						'<%= config.dist %>/*'
					]
				}]
			},
			after: {
				files: [{
					dot: true,
					src: [
						'<%= config.temp %>',
						'.sass-cache'
					]
				}]
			}
		}
	});

	grunt.registerTask('default', [
		'clean:dist',
		'sass:dist',
		'copy:dist',
		'autoprefixer',
		'concat:dist',
		'cssmin:dist',
		'clean:after'
	]);

	grunt.registerTask('dev', ['watch']);

};