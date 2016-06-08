'use strict';
var gulp = require('gulp'),
    sass = require('gulp-sass'),
    cssSortConfig = require('./smacss.json')

//==========================================
// SASS preprocessing
//==========================================
// Sorts properties form SCSS files
gulp.task('sort-scss', function() {
  return gulp.src('scss/**/*.scss')
    .pipe(gulpPostcss([
      gulpPostcssSort({
        "empty-lines-between-children-rules": 1,
        "sort-order": cssSortConfig
      })
    ]))
    .pipe(gulp.dest('scss/'));
});
// Clean existing CSS before compiling
gulp.task('scss-clean', function() {
  return gulp.src('nate-baldwin-theme/css/**/*.css*').pipe(clean());
});
// Compile documentation site SASS
gulp.task('scss', ['scss-clean'], function() {
  return gulp.src(['scss/**/*.scss'])
    .pipe(sourcemaps.init())
    .pipe(sass({
      importer: importOnce,
      importOnce: {
        index: false,
        css: false,
        bower: false
      }
    }).on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 3 versions', 'not ie <= 9'],
      cascade: true
    }))
    .pipe(sourcemaps.write({
      addComment: false
    }))
    .pipe(gulp.dest('nate-baldwin-theme/css'))
});

//==========================================
// PHP Server
//==========================================
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