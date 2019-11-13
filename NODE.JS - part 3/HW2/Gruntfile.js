module.exports = function(grunt) {

    // 1. Вся настройка находится здесь
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        concat: {
            // 2. Настройка для объединения файлов находится тут
            dist:{
                src: [ './src/*.js' ], 
                dest: 'dst/production.js',   
                
            }
        },
        babel: {
            options: {
                sourceMap: true,
                presets: ['@babel/preset-env']
            },
            dist: {
                files: [{
                    "expand": true,
                    "cwd": "src",
                    "src": ["./*.js"],
                    "dest": "dst/js-compiled/",
                    "ext": "-compiled.js"
                }]
            }            
        },
        uglify: {
            build: {
                src: './dist/es5.js',
                dest: './dist/server.min.js'
            }
        }
    });

    // 3. Тут мы указываем Grunt, что хотим использовать этот плагин    
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-babel');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    // 4. Указываем, какие задачи выполняются, когда мы вводим «grunt» в терминале
    grunt.registerTask('default', ['concat', 'babel', 'uglify']);
};