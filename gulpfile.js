'use strict';
var gulp = require('gulp'),
    sass = require('gulp-sass'),
    cssSortConfig = require('./smacss.json')
    clean = require('gulp-rimraf'),
    zip = require('gulp-zip'),
    sourcemaps = require("gulp-sourcemaps"),
    scsslint = require('gulp-scss-lint'),
    importOnce = require('node-sass-import-once'),
    autoprefixer = require('gulp-autoprefixer'),
    gulpPostcss = require('gulp-postcss'),
    gulpPostcssSort = require('postcss-sorting'),
    cssSortConfig = require('./smacss.json'),
    rename = require('gulp-rename'),
    nb_package = require('./package.json');

var watchOptions = {
    interval: 1000
}

//==========================================
// SASS preprocessing
//==========================================
// Clean existing CSS before compiling
gulp.task('css-clean', function() {
  return gulp.src('nate-baldwin-theme/css/**/*.css*').pipe(clean());
});
// Sorts properties form SCSS files
gulp.task('sort-scss', ['css-clean'], function() {
  return gulp.src('scss/**/*.scss')
    .pipe(gulpPostcss([
      gulpPostcssSort({
        "empty-lines-between-children-rules": 1,
        "sort-order": cssSortConfig
      })
    ]))
    .pipe(gulp.dest('scss/'));
});
// Compile documentation site SASS
gulp.task('scss', ['sort-scss'], function() {
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
//minifiy css
gulp.task('minify-css', function() {
  return gulp.src('nate-baldwin-theme/css/custom-portfolio.css')
    .pipe(cssnano())
    .pipe(rename("custom-portfolio.min.css"))
    .pipe(gulp.dest('nate-baldwin-theme/css'));
});

//==========================================
// Create SVG Sprite
//==========================================
// Optimize SVG images
gulp.task('svg-imagemin', function() {
  return gulp.src('icons/svg/**/*.svg')
    .pipe(svgmin({
      plugins: [{
        removeXMLProcInst: false
      }, {
        removeViewBox: false
      }, {
        removeStyleElement: true
      }, {
        removeAttrs: {
          attrs: ['id', 'path:fill', 'class']
        }
      }, {
        removeDimensions: true
      }, {
        removeTitle: true
      }]
    }))
    .pipe(gulp.dest('icons/svg'));
});

// Create SVG symbol sprite
gulp.task('svg-sprite', ['svg-imagemin'], function() {
  return gulp
    .src(['icons/svg/*.svg', {
      base: '.'
    })
    .pipe(rename({
      prefix: 'icon-'
    }))
    .pipe(svgstore({
      inlineSvg: true
    }))
    .pipe(cheerio({
      run: function($) {
        $('svg').attr('style', 'display:none');
      },
      parserOptions: {
        xmlMode: true
      }
    }))
    .pipe(rename('custom-portfolio-sprite.svg'))
    .pipe(gulp.dest('nate-baldwin-theme/img'));
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

  gulp.watch(['scss/**/*.scss'], watchOptions, ['scss']);
  gulp.watch(['**/*.php', '**/*.css', 'nate-baldwin-theme/img/*.*']).on('change', function () {
    browserSync.reload();
  });
});

//==========================================
// Archiving Builds
//==========================================
// Clean Archive directory
gulp.task('clean-archive', function() {
  gulp.src(['builds']).pipe(clean());
});
// Archive Theme
gulp.task('archive', ['clean-archive'], function() {
  return gulp.src('nate-baldwin-theme/**/*.*')
    .pipe(zip('nate-baldwin-theme' + nb_package.version + '.zip'))
    .pipe(gulp.dest('builds'));
});

//==========================================
// Environments
//==========================================
gulp.task('development', [
  'scss',
  'svg-sprite',
  'connect-sync'
]);

gulp.task('build', [
  'scss',
  'minify-css',
  'svg-sprite',
  'archive'
]);