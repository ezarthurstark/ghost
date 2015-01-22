module.exports = function(grunt) {

  grunt.initConfig({
    sass: {
      dist: {
        options: {
          style: 'expanded'
        },
        files: [{
          "expand": true,
          "cwd": "assets/stylesheets/",
          "src": ["*.scss"],
          "dest": "assets/css/",
          "ext": ".css"
        }]
      }
    },
    autoprefixer: {
      options: {
        browsers: ['last 15 versions', 'ie 8', 'ie 9', 'ie 10']
      },
      dist: {
        src: 'assets/css/application.css',
        dest: 'assets/css/application.css'
      }
    },
    watch: {
      styles: {
        files: 'assets/**/*.scss',
        tasks: ['sass:dist', 'autoprefixer']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['sass:dist', 'autoprefixer']);
};
