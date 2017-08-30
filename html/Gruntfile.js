
var fs = require('fs');

module.exports = function (grunt) {
  // 项目配置
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    //合并js
    concat: {
      options: {
        separator: '\n'
      },
      myjs: {
        src: 'src/js/*.js',
        dest: 'dist/js/base.js'
      },
      //编译bootstrapjs，只把项目用到的js编译进去
      bootstrap: {
        src: [
          'src/bootstrap/js/transition.js',
          // 'src/bootstrap/js/alert.js',
          // 'src/bootstrap/js/button.js',
          // 'src/bootstrap/js/carousel.js',
          'src/bootstrap/js/collapse.js',
          // 'src/bootstrap/js/dropdown.js',
          'src/bootstrap/js/modal.js',
          'src/bootstrap/js/tooltip.js',
          'src/bootstrap/js/popover.js',
          // 'src/bootstrap/js/scrollspy.js',
          'src/bootstrap/js/tab.js',
          // 'src/bootstrap/js/affix.js',
          'src/bootstrap/js/placeholder.js'//自己加入的 兼容ie的  placeholder插件
//        'src/bootstrap/js/_tpl.js'//underscore的模板引擎

        ],
        dest: 'dist/js/bootstrap.min.js'
      }
    },
    //压缩js
    uglify: {
         options: {
          compress: {
            drop_console: true
          }
         },
         myjs: {
          src: 'dist/js/base.js',
          dest:'dist/js/base.min.js'
         },
         bootstrap:{
            src: 'dist/js/bootstrap.min.js',
            dest: 'dist/js/bootstrap.min.js'
         }
    },
    //bootstrap自定义less编译成css
    less: {  
      compileCore: {
        options: {
          strictMath: true
        },
        src: 'src/bootstrap/less/bootstrap.less',
        dest: 'dist/css/mybootstrap.css'
      },
        base:{
        options: {
          strictMath: true,
          //sourceMap: true,
          outputSourceFiles: true,
          // sourceMapURL: 'mybootstrap.css.map',
          // sourceMapFilename: 'dist/css/mybootstrap.css.map'
        },
        src: 'src/css/_code.less',
        dest: 'src/css/_code.css'
      },
    },
    //css压缩合并
    cssmin: {
         options:{
            keepSpecialComments: 0
         },
         bootstrapmin:{
          src: 'dist/css/mybootstrap.css',
          dest: 'dist/css/mybootstrap.min.css'
         },
         default:{
            src: 'src/css/*.css',
            dest: 'dist/css/base.css'
         }
     },
    copy: {
      main: {
      	expand: true,
        cwd: './dist/',
        src: ['**'],
        dest: '../server/static'
      },
    },
    watch: {
      client: {
        files: ['src/js/*','src/css/*'],
        tasks:["build",'copyfile'],
        options: {
          livereload: false
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-less') ;
  grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-copy');
 	
  // 默认任务
  grunt.registerTask('build', ['concat:myjs','less:base','cssmin:default']);

  //编译bootstrap
  grunt.registerTask('bootstrap', ['concat:bootstrap','uglify:bootstrap','less:compileCore','cssmin:bootstrapmin']);
  //js压缩
  grunt.registerTask("jszip",["uglify:myjs"]) ;
  
  //监听任务
	grunt.registerTask("watcher",["watch"]) ;
	//复制文件
	grunt.registerTask("copyfile",["copy"]) ;
}