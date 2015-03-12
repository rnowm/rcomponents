module.exports = function(grunt) {
  require('jit-grunt')(grunt);

  grunt.initConfig({
    less: {
      development: {
        files: {
          "css/buttons.css": "less/buttons.less",
          "css/tef-button.css": "less/tef-button.less"
        }
      },
      production: {
        options: {
          compress: true,
          yuicompress: true,
          optimization: 2
        },
        files: {
          "css/buttons.min.css": "less/buttons.less"
        }
      }
    },

    watch: {
      styles: {
        files: ['less/**/*.less'],
        tasks: ['less', 'autoprefixer'],
        options: {
          nospawn: true,
          livereload: true
        }
      }
    },

    autoprefixer: {
      options: {
        browsers: ['last 5 versions']
      },
      dist: {
        src: 'css/*.css'
      },
    },

    includes: {
      files: {
        cwd: 'templates/',
        src: '**/*.html',
        dest: ''
      }
    }
  });

  grunt.registerTask('default', ['less','includes','watch']);
};
