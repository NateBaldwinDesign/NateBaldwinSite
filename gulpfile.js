'use strict';
var gulp = require('gulp'),
    sass = require('gulp-sass'),

// PHP Server
gulp.task('connect-sync', function() {
  connect.server({}, function (){
    browserSync({
      proxy: '127.0.0.1:8000'
    });
  });

  gulp.watch(['**/*.php', '**/*.css']).on('change', function () {
    browserSync.reload();
  });
});