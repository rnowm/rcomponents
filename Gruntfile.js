module.exports = function(grunt) {
  require('jit-grunt')(grunt);

  grunt.initConfig({
    less: {
      default: {
        files: {
          'css/rcomponents.css': 'less/theme.less',
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

    concat: {
      default: {
       src: [
          'icons/fonts/icons.css',
          'css/rcomponents.css',
        ],
        dest: 'css/rcomponents.css'
      }
    },

    cssmin: {
      options: {
        shorthandCompacting: false,
        roundingPrecision: -1
      },
      target: {
        files: {
          'css/rcomponents.min.css': 'css/rcomponents.css'
        }
      }
    },

    bump: {
      // upgrade release and push to master
      options : {
        files: ['bower.json'],
        commitFiles: ["-a"],
        pushTo: 'origin'
      }
    },

    exec: {
      // add new files before commiting
      add: {
        command: 'git add -A'
      },

      // push to gh-pages branch
      pages: {
        command: [
          'git checkout gh-pages',
          'git pull origin master',
          'git push origin gh-pages',
          'git checkout master'
        ].join('&&')
      },

      // adds prompted commit message
      message: {
        command: function() {
          var message = grunt.config('gitmessage');
          return "git commit -am '" + message + "'";
        }
      }
    },

    prompt: {
      commit: {
        options: {
          questions: [
            {
              config: 'gitmessage',
              type: 'input',
              message: 'Commit Message'
            }
          ]
        }
      }
    },

    watch: {
      styles: {
        files: ['less/*.less'],
        tasks: ['less', 'concat'],
        options: {
          nospawn: true,
          livereload: true
        }
      }
    },

    // Creates embedded icon font
    webfont: {
      embedded: {
        src: 'icons/source/*.svg',
        dest: 'icons/fonts/',
        options: {
          font: 'icons',
          embed: 'woff,ttf,eot',
          engine: 'node',
          template: 'icons/templates/style.css',
          htmlDemoTemplate: 'icons/templates/index.html',
          templateOptions: {
            baseClass: '',
            classPrefix: '',
            mixinPrefix: ""
          }
        }
      }
    },

    rename: {
      font: {
        src: 'icons/fonts/icons.eot',
        dest: 'css/icons.eot',
      }
    }
  });

  grunt.registerTask('default', [
    'less',
    'concat',
    'watch'
  ]);

  grunt.registerTask('icons', [
    'webfont',
    'rename'
  ]);

  grunt.registerTask('release', [
    'less',
    'autoprefixer',
    'concat',
    'cssmin',
    'exec:add',
    'prompt',
    'exec:message',
    'bump',
    'exec:pages'
  ]);
};
