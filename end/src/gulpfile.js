var gulp = require('gulp');
var sass = require('gulp-sass');
var plumber = require('gulp-plumber');
var autoprefixer = require('gulp-autoprefixer');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var browserSync = require('browser-sync').create();
var imagemin = require('gulp-imagemin');
var imageminPngquant = require('imagemin-pngquant');
var imageminJpegRecompress = require('imagemin-jpeg-recompress');


// static css variables
var srcScss = 'scss/style.scss';
var distCss = '../web/css';
var minCss = 'style.min.css';

// vendor static css variables
var distVendorCss = '../web/css/vendor';
var vendorCss = 'css/vendor/*.css';
var vendorPackCssMin = 'vendor.packs.min.css';

// static javascript variables
var srcMainJs = 'js/main.js';
var distMainJs = '../web/js';
var minMainJs = 'main.min.js';

// vendor static javascript variables
var distVendorJs = '../web/js/vendor';
var vendorJs = 'js/vendor/plugins/*.js';
var vendorPackJsMin = 'vendor.packs.min.js';

// static image variables
var srcImg = 'images/**/*.{png,jpeg,jpg,svg,gif}';
var distImg = '../web/images';

// Styles
gulp.task('sass', function(){
    console.log('starting sass task');
    return gulp.src(srcScss)
    .pipe(plumber(function (err){
      console.log('Sass task error');
      console.log(err);
      this.emit('end');
    }))
    .pipe(sourcemaps.init())
    .pipe(autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
    }))
    .pipe(sass({
        outputStyle: 'compressed'
    })) // Converts Sass to Css with gulp sass
    .pipe(concat(minCss))
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest(distCss))
    .pipe(browserSync.stream());
});

gulp.task('vendor-css', function(){
   return gulp.src(vendorCss)
   .pipe(plumber(function (err){
       console.log('Sass task error');
       console.log(err);
       this.emit('end');
   }))
   .pipe(concat(vendorPackCssMin))
   .pipe(autoprefixer({
       browsers: ['last 2 versions'],
       cascade: false
   }))
   .pipe(sass({
       outputStyle: 'compressed'
   })) // Converts Sass to Css with gulp sass
   .pipe(gulp.dest(distVendorCss));
   
});
// /Styles

// Scripts
gulp.task('main-js', function(){
   return gulp.src(srcMainJs)
   .pipe(sourcemaps.init())
   .pipe(uglify())
   .pipe(concat(minMainJs))
   .pipe(sourcemaps.write('./maps'))
   .pipe(gulp.dest(distMainJs))
   .pipe(browserSync.stream());
});

gulp.task('vendor-js', function(){
   return gulp.src(vendorJs)
   .pipe(uglify())
   .pipe(concat(vendorPackJsMin))
   .pipe(gulp.dest(distVendorJs));
});
// /Scripts

/* images */
gulp.task('images', function(){
    return gulp.src(srcImg)
    .pipe(imagemin(
        [
            imagemin.gifsicle(),
            imagemin.jpegtran(),
            imagemin.optipng(),
            imagemin.svgo(),
            imageminPngquant(),
            imageminJpegRecompress()
        ]
    ))
    .pipe(gulp.dest(distImg))
});

// browserSync
gulp.task('browserSync', function() {
    browserSync.init({
        server: {
            baseDir: '../'
        }
    });
    
    gulp.watch("scss/*.scss", ['sass']);
    gulp.watch("js/*.js", ['main-js']);
});

gulp.task('default', ['browserSync'], function (){
    gulp.watch('../index.html', browserSync.reload);
});