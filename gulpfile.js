'use strict';
var gulp              = require('gulp'),
    sass              = require('gulp-sass'),
    cssSortConfig     = require('./smacss.json'),
    clean             = require('gulp-rimraf'),
    zip               = require('gulp-zip'),
    cssnano           = require('gulp-cssnano'),
    sourcemaps        = require("gulp-sourcemaps"),
    scsslint          = require('gulp-scss-lint'),
    importOnce        = require('node-sass-import-once'),
    autoprefixer      = require('gulp-autoprefixer'),
    gulpPostcss       = require('gulp-postcss'),
    gulpPostcssSort   = require('postcss-sorting'),
    cssSortConfig     = require('./smacss.json'),
    rename            = require('gulp-rename'),
    svgmin            = require('gulp-svgmin'),
    svgstore          = require('gulp-svgstore'),
    cheerio           = require('gulp-cheerio'),
    pngquant          = require('imagemin-pngquant'),
    imagemin          = require('gulp-imagemin'),
    nb_package        = require('./package.json'),
    insert            = require('gulp-insert'),
    replace           = require('gulp-replace'),
    packageJson       = require('./package.json'),
    version           = packageJson.version,
    bump              = require('gulp-bump'),
    favicons          = require("gulp-favicons"),
    gutil             = require("gulp-util"),
    svg2png           = require('gulp-svg2png'),
    watchOptions      = {interval: 1000};

gulp.task('bump', function(){
  gulp.src('./package.json')
  .pipe(bump({type:'prerelease'}))
  .pipe(gulp.dest('./'));
});

//==========================================
// SASS preprocessing
//==========================================
// Clean existing CSS before compiling
gulp.task('css-clean', ['bump'], function() {
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
    .pipe(replace('{{versionNumber}}', version))
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
  return gulp.src(['icons/svg/**/*.svg', 'icons/social/**/*.svg', 'img/**.svg'])
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
// Generate Favicon
//==========================================

gulp.task('favicon', function () {
  return gulp.src("img/NB_head-logo.png")
    .pipe(favicons({
      appName: "Nate Baldwin",
      appDescription: "Portfolio website",
      developerName: "Nate Baldwin",
      developerURL: "http://natebaldw.in",
      background: "#ffffff",
      path: "favicons/",
      url: "http://natebaldw.in",
      display: "standalone",
      orientation: "portrait",
      version: version,
      logging: false,
      online: false,
      html: "index.html",
      pipeHTML: true,
      replace: true
    }))
    .on("error", gutil.log)
    .pipe(gulp.dest("nate-baldwin-theme/favicon/"));
});

//==========================================
// Image Minification
//==========================================
gulp.task('imagemin', function() {
  return gulp.src(['nate-baldwin-theme/**/*.png'])
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
gulp.task('copy-icons', ['svg-sprite'], function() {
  return gulp.src('icons/**/*.*')
    .pipe(gulp.dest('nate-baldwin-theme/icons'));
});
gulp.task('copy-css', ['scss'], function() {
  return gulp.src('css/nate-baldwin-theme-ltr.css')
    .pipe(rename('style.css'))
    .pipe(gulp.dest('nate-baldwin-theme'));
});
gulp.task('copy-screenshot', function() {
  return gulp.src('screenshot.png')
    .pipe(gulp.dest('nate-baldwin-theme'));
});

// Clean Temp
gulp.task('clean-temp', ['archive'], function() {
  gulp.src(['nate-baldwin-theme']).pipe(clean());
});

//==========================================
// Environments
//==========================================

gulp.task('copy', ['clean-archive', 'copy-php', 'copy-img', 'copy-external', 'copy-fonts', 'copy-js', 'copy-icons', 'copy-parts', 'copy-css', 'copy-icons', 'copy-screenshot', 'favicon'], function() {
  return gulp.src('nate-baldwin-theme/**/*.*')
    .pipe(zip('nate-baldwin-theme-' + nb_package.version + '.zip')) 
    .pipe(gulp.dest('builds'));
});

gulp.task('default', ['copy', 'imagemin'], function() {
    return gulp.src(['nate-baldwin-theme']).pipe(clean());
})