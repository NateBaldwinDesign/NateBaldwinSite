'use strict';
var gulp = require('gulp'),
    sass = require('gulp-sass'),
    cssSortConfig = require('./smacss.json'),
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
    svgmin = require('gulp-svgmin'),
    svgstore = require('gulp-svgstore'),
    cheerio = require('gulp-cheerio'),
    pngquant = require('imagemin-pngquant'),
    imagemin = require('gulp-imagemin'),
    nb_package = require('./package.json'),
    watchOptions = {interval: 1000}

//==========================================
// SASS preprocessing
//==========================================
// Clean existing CSS before compiling
gulp.task('css-clean', function() {
  return gulp.src('css/**/*.css*').pipe(clean());
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
gulp.task('scss', ['css-clean'], function() {
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
    .pipe(gulp.dest('css'))
});
//minifiy css
gulp.task('minify-css', function() {
  return gulp.src('css/custom-portfolio.css')
    .pipe(cssnano())
    .pipe(rename("custom-portfolio.min.css"))
    .pipe(gulp.dest('css'));
});

//==========================================
// Create SVG Sprite
//==========================================
// Optimize SVG images
gulp.task('clean-sprite', function() {
  return gulp.src('icons/custom-portfolio-sprite.svg').pipe(clean());
})
gulp.task('svg-imagemin', ['clean-sprite'], function() {
  return gulp.src(['icons/svg/**/*.svg', 'icons/social/**/*.svg'])
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
    .src('icons/svg/*.svg', {
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
    .pipe(gulp.dest('icons'));
});

//==========================================
// Image Minification
//==========================================
// Minify images used in Style Guide site
gulp.task('imagemin', function() {
  return gulp.src(['img/*', '!custom-portfolio-sprite.svg'])
    .pipe(imagemin({
      progressive: true,
      svgoPlugins: [{
        removeViewBox: false
      }],
      use: [pngquant()]
    }))
    .pipe(gulp.dest('img'));
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
  return gulp.src('**/*.*')
    .pipe(zip('nate-baldwin-theme' + nb_package.version + '.zip')) // Need to move files into temp folder first, then run this on the temp folder
    .pipe(gulp.dest('builds'));
});

//==========================================
// Environments
//==========================================
gulp.task('default', [
  'scss',
  'svg-sprite'
], function() {
  gulp.watch(['scss/**/*.scss'], watchOptions, ['scss']);
});

gulp.task('build', [
  'scss',
  'sort-scss',
  'minify-css',
  'svg-sprite',
  'archive'
]);