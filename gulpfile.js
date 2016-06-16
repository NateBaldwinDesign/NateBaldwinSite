'use strict';
var gulp = require('gulp'),
    sass = require('gulp-sass'),
    cssSortConfig = require('./smacss.json'),
    clean = require('gulp-rimraf'),
    zip = require('gulp-zip'),
    cssnano = require('gulp-cssnano'),
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
    insert = require('gulp-insert'),
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
  return gulp.src('css/nate-baldwin-theme-ltr.css')
    .pipe(cssnano())
    .pipe(rename("nate-baldwin-theme-ltr.min.css"))
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
// Change sprite to PHP file
gulp.task('sprite-php-wrap', ['svg-sprite'], function() {
  return gulp.src('icons/custom-portfolio-sprite.svg')
    .pipe(insert.wrap('<?php ?> ', '<?php ?>'))
    .pipe(gulp.dest('parts/shared'));
});
gulp.task('sprite-php', ['sprite-php-wrap'], function() {
  gulp.src("parts/shared/custom-portfolio-sprite.svg")
    .pipe(rename("custom-portfolio-sprite.php"))
    .pipe(gulp.dest("parts/shared"))
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
// Copy to Temp
gulp.task('copy-php', function() {
  return gulp.src('*.php')
    .pipe(gulp.dest('nate-baldwin-theme'));
});
gulp.task('copy-img', function() {
  return gulp.src('img/**/*.*')
    .pipe(gulp.dest('nate-baldwin-theme/img'));
});
gulp.task('copy-external', function() {
  return gulp.src('external/**/*.*')
    .pipe(gulp.dest('nate-baldwin-theme/external'));
});
gulp.task('copy-fonts', function() {
  return gulp.src('fonts/**/*.*')
    .pipe(gulp.dest('nate-baldwin-theme/fonts'));
});
gulp.task('copy-js', function() {
  return gulp.src('js/**/*.*')
    .pipe(gulp.dest('nate-baldwin-theme/js'));
});
gulp.task('copy-parts', function() {
  return gulp.src('parts/**/*.*')
    .pipe(gulp.dest('nate-baldwin-theme/parts'));
});
gulp.task('copy-icons', function() {
  return gulp.src('icons/**/*.*')
    .pipe(gulp.dest('nate-baldwin-theme/icons'));
});
gulp.task('copy-css', function() {
  return gulp.src('css/nate-baldwin-theme-ltr.css')
    .pipe(rename('style.css'))
    .pipe(gulp.dest('nate-baldwin-theme'));
});
gulp.task('copy', ['copy-php', 'copy-img', 'copy-external', 'copy-fonts', 'copy-js', 'copy-icons', 'copy-parts', 'copy-css']);

// Clean Temp
gulp.task('clean-temp', ['archive'], function() {
  gulp.src(['nate-baldwin-theme']).pipe(clean());
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
  'clean-archive',
  'scss',
  'sort-scss',
  'minify-css',
  'svg-sprite',
  'copy'
], function() {
  return gulp.src('nate-baldwin-theme/**/*.*')
    .pipe(zip('nate-baldwin-theme-' + nb_package.version + '.zip')) 
    .pipe(gulp.dest('builds'));
  return gulp.src(['nate-baldwin-theme']).pipe(clean());
});