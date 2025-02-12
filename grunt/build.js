var _ = require('underscore');

module.exports = function (grunt) {
	grunt.config.merge({
		browserify: {
			default: {
				files: {
					'build/skitformat.js': 'src/index.js'
				},
				options: {
					browserifyOptions: {
						debug: true,
						detectGlobals: false
					},
					watch: true
				}
			},
			release: {
				files: {
					'build/skitformat.js': 'src/index.js'
				},
				options: {
					browserifyOptions: {
						debug: false,
						detectGlobals: false
					},
					transform: [['uglifyify', { global: true }]]
				}
			}
		},
		cssmin: {
			default: {
				files: {
					'build/skitformat.css': 'src/**/*.css'
				},
				expand: true
			}
		},
		watch: {
			css: {
				files: 'src/**/*.css',
				tasks: ['cssmin']
			},
			template: {
				files: 'src/index.html',
				tasks: ['html']
			}
		}
	});

	// grunt.registerTask('html:test', function () {
	// var template = _.template(grunt.file.read('src/index.html'));

	// var data = {
	// name: grunt.file.read('test-data/name.txt'),
	// passages: grunt.file.read('test-data/passages.html'),
	// script: '<script src="skitformat.js"></script>',
	// stylesheet: '<link rel="stylesheet" href="skitformat.css">'
	// };

	// grunt.file.write('build/format-test.html', template(data));
	// });

	grunt.registerTask('html:release', function () {
		var template = _.template(grunt.file.read('src/index.html'));

		var data = {
			name: '{{STORY_NAME}}',
			passages: '{{STORY_DATA}}',
			script: '<script>' + grunt.file.read('build/skitformat.js') + '</script>',
			stylesheet: '<style>' + grunt.file.read('build/skitformat.css') + '</style>'
		};

		grunt.file.write('build/format.html', template(data));
	});

	// grunt.registerTask('build', ['browserify:default', 'cssmin', 'html:test']);
	grunt.registerTask('build', ['browserify:default', 'cssmin']);
	grunt.registerTask('build:release', ['browserify:release', 'cssmin', 'html:release']);
	grunt.registerTask('default', ['build']);
	grunt.registerTask('dev', ['build', 'watch']);
};
