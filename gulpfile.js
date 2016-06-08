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
    .pipe(gulp.dest('app/sass/'));
});
// Compile documentation site SASS
gulp.task('sass-patterns-clean', ['build-eds'], function() {
    return gulp.src('app/patterns/**/*.css*').pipe(clean());
});

gulp.task('sass-patterns-clean-no-build', function() {
    return gulp.src('app/patterns/**/*.css*').pipe(clean());
});

gulp.task('sass-patterns', ['sass-patterns-clean'], function() {
    return gulp.src(['app/patterns/**/*.scss'])
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
        .pipe(gulp.dest('app/patterns'))
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