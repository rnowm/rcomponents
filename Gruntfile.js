module.exports = function(grunt) {
  require('jit-grunt')(grunt);

  grunt.initConfig({
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
        command: 'git add .'
      },

      // push to gh-pages branch
      pages: {
        command: [
          'git checkout gh-pages',
          'git pull origin master',
          'git push origin gh-pages',
          'git checkout master'
        ].join('&&')
      }
    }
  });

  grunt.registerTask('release', [
    'exec:add',
    'bump',
    'exec:pages'
  ]);
};
