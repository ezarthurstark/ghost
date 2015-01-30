module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    sass: {
      compile: {
        options: {
          style: 'expanded'
        },
        files: [
          {
            expand: true,
            cwd: 'assets/stylesheets',
            src: ['**/*.scss'],
            dest: 'assets/lib/css',
            ext: '.css'
          }
        ]
      }
    },
    autoprefixer: {
      options: {
        browsers: ['last 15 versions', 'ie 8', 'ie 9', 'ie 10']
      },
      dist: {
        src: 'assets/lib/css/application.css',
        dest: 'assets/lib/css/application.css'
      }
    },
    coffee: {
      compile: {
        expand: true,
        cwd: 'assets/javascripts',
        src: ['**/*.coffee'],
        dest: 'assets/lib/js',
        ext: '.js',
        options: {
          join: true
        }
      }
    },
    watch: {
      html: {
        files: ['**/*.html']
      },
      sass: {
        files: '<%= sass.compile.files[0].src %>',
        tasks: ['sass', 'autoprefixer']
      },
      coffee: {
        files: '<%= coffee.compile.src %>',
        tasks: ['coffee']
      },
      options: {
        livereload: true
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['sass', 'autoprefixer', 'coffee', 'watch']);
};
