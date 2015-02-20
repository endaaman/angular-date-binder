g = require 'gulp'
concat = require 'gulp-concat'
uglify = require 'gulp-uglify'
browserSync = require 'browser-sync'


g.task 'build', ->
    g.src './angular-date-binder.js'
    .pipe concat 'angular-date-binder.min.js'
    .pipe uglify()
    .pipe g.dest './'


g.task 'serve', ->
    browserSync
        port: 9000
        server:
            baseDir: "./"


g.task 'watch', ['serve'], ->
    g.watch ['./*.{js,html}'], [browserSync.reload]


g.task 'default', ['watch']
