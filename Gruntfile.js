module.exports = function(grunt) {
  require('jit-grunt')(grunt);

  grunt.initConfig({
    less: {
      development: {
        options: {
          optimization: 2
        },
        files: {
          "css/buttons.css": "less/buttons.less",
          "css/buttons.movistar.css": "less/movistar.less",
          "css/buttons.o2.css": "less/o2.less",
          "css/buttons.vivo.css": "less/vivo.less"
        }
      },
      production: {
        options: {
          compress: true,
          yuicompress: true,
          optimization: 2
        },
        files: {
          "css/buttons.min.css": "less/buttons.less",
          "css/buttons.movistar.min.css": "less/movistar.less",
          "css/buttons.o2.min.css": "less/o2.less",
          "css/buttons.vivo.min.css": "less/vivo.less"
        }
      }
    },
    watch: {
      styles: {
        files: ['less/**/*.less'], // which files to watch
        tasks: ['less'],
        options: {
          nospawn: true
        }
      }
    }
  });

  grunt.registerTask('default', ['less', 'watch']);
};