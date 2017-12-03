"# gulp-workshop-2017-q4-session-5" 

# We work to the start folder, the solutions are in the end folder

## 1. Declare 3 gulp imagemin package in our gulpfile.js
```	
var imagemin = require('gulp-imagemin');
var imageminPngquant = require('imagemin-pngquant');
var imageminJpegRecompress = require('imagemin-jpeg-recompress');
```
## 2. Install the 3 imagemin package
```
npm install --save-dev gulp-imagemin@3.0.1 imagemin-pngquant@5.0.0 imagemin-jpeg-recompress@5.0.0
```

## 3. Create an images task, and run it
```
gulp.task('images', function(){
   return gulp.src(srcImg)
   .pipe(imagemin())
   .pipe(gulp.dest(distImg))
});
```

## 4. Start gulp default task

## 5. Rename the image path in index.html
```
from :src/images/  to: web/images/
```

## 6. Extend our images task
```
imagemin.gifsicle(),
imagemin.jpegtran(),
imagemin.optipng(),
imagemin.svgo(),
imageminPngquant(),
imageminJpegRecompress()
```

## 7. Run again our images task

the result will be:
```
gulp-imagemin: Minified 21 images (saved 569.81 kB - 39.3%)
```