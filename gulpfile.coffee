g = require 'gulp'
del = require 'del'
coffee = require 'gulp-coffee'
ngAnnotate = require 'gulp-ng-annotate'
uglify = require 'gulp-uglify'
concat = require 'gulp-concat'
webserver = require 'gulp-webserver'

p = console.log

class Conf
    constructor: (isProd)->
        @prod = false
        @src = 'src'
        @dest = 'dist'

conf = new Conf(false)


g.task 'clean', (cb)->
    del [
        "#{conf.dest}/**/*"
    ], cb

g.task 'js', ->
    t = g.src "#{conf.src}/*.coffee", base: "#{conf.src}/"
    .pipe coffee
        bare: true
        sourceRoot: ''
    .pipe ngAnnotate()

    if conf.prod
        t = t
        .pipe concat 'angular-date-binder.min.js'
        .pipe uglify mangle: false

    t.pipe g.dest "#{conf.dest}/"

g.task 'serve', ->
    g.src './'
    .pipe webserver
        port: 9000
        livereload: true

g.task 'watch', ->
    g.watch ["#{conf.src}/*.coffee"], ['js']

g.task 'build', [
    'js'
]

g.task 'prod', ()->
    conf.prod = true

g.task 'default', ['build', 'watch', 'serve']
