module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        separator: ';\n'
      },
      index: {
        src: [
          'public/javascripts/lib/jquery-1.9.1.min.js',
          'public/javascripts/lib/underscore-1.4.4.js',
          'public/javascripts/lib/backbone.js',
          'public/javascripts/lib/masonry.min.js',
          'public/javascripts/utils.js',
          'public/javascripts/shared.js',
          'public/javascripts/index.js'
        ],
        dest: 'public/javascripts/dist/index-<%= pkg.version %>.js'
      },
      random: {
        src: [
          'public/javascripts/lib/jquery-1.9.1.min.js',
          'public/javascripts/lib/underscore-1.4.4.js',
          'public/javascripts/lib/backbone.js',
          'public/javascripts/lib/masonry.min.js',
          'public/javascripts/utils.js',
          'public/javascripts/shared.js',
          'public/javascripts/random.js'
        ],
        dest: 'public/javascripts/dist/random-<%= pkg.version %>.js'
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      dist: {
        files: {
          'public/javascripts/dist/index-<%= pkg.version %>.min.js': ['public/javascripts/dist/index-<%= pkg.version %>.js'],
          'public/javascripts/dist/random-<%= pkg.version %>.min.js': ['public/javascripts/dist/random-<%= pkg.version %>.js']
        }
      }
    },
    cssmin: {
      options: {
        report: 'min'
      },
      compress: {
        files: {
          'public/stylesheets/dist/index-<%= pkg.version %>.min.css': [
            'public/stylesheets/vendor/font-awesome.css',
            'public/stylesheets/shared.css',
            'public/stylesheets/index.css'
          ],
          'public/stylesheets/dist/random-<%= pkg.version %>.min.css': [
            'public/stylesheets/vendor/font-awesome.css',
            'public/stylesheets/shared.css',
            'public/stylesheets/random.css'
          ]
        }
      }
    },
    qunit: {
      files: ['test/**/*.html']
    },
    jshint: {
      files: ['Gruntfile.js', 'src/**/*.js', 'test/**/*.js'],
      options: {
        // options here to override JSHint defaults
        globals: {
          jQuery: true,
          console: true,
          module: true,
          document: true
        }
      }
    },
    watch: {
      files: ['<%= jshint.files %>'],
      tasks: ['jshint', 'qunit']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  // grunt.loadNpmTasks('grunt-contrib-jshint');
  // grunt.loadNpmTasks('grunt-contrib-qunit');
  // grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-concat');

  // grunt.registerTask('test', ['jshint', 'qunit']);

  grunt.registerTask('default', ['concat', 'uglify', 'cssmin']);

};