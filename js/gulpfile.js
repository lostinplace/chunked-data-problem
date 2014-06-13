'use strict';

var gulp = require('gulp'),
  mocha = require('gulp-mocha'),
  paths = ['test/*.js'];

gulp.task('test', function () {
  var readOptions = {
      read:false
    },
    mochaOptions = {
      reporter:'dot'
    },
    streamHandler = mocha(mochaOptions)
  return gulp.src(paths, readOptions)
    .pipe(streamHandler);
});

gulp.task('default', function() {
  
});