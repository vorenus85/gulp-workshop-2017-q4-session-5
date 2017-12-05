# Images tasks with gulp
Work to the <b>start</b> folder, the solutions are in the <b>end</b> folder

## 1. Declare packages 
Declare packages in your gulpfile.js
```	
var imagemin = require('gulp-imagemin');
var imageminPngquant = require('imagemin-pngquant');
var imageminJpegRecompress = require('imagemin-jpeg-recompress');
var cache = require('gulp-cache');
```
## 2. Install packages
Install the 3 imagemin packages
```
npm install --save-dev gulp-imagemin@3.0.1 imagemin-pngquant@5.0.0 imagemin-jpeg-recompress@5.0.0 gulp-cache
```

## 3. Declare static variables

Write code to gulpfile.js
```
// static image variables
var srcImg = 'images/**/*.{png,jpeg,jpg,svg,gif}';
var distImg = '../web/images';
```

## 4. Create an images task, and run it
Write code to gulpfile.js
```
gulp.task('images', function(){
   return gulp.src(srcImg)
   .pipe(imagemin())
   .pipe(gulp.dest(distImg))
});
```
Run task
```
gulp images
```

## 5. Start gulp default task
Run default task
```$xslt
gulp
```

## 6. Rename the image path in index.html
```
from :src/images/  to: web/images/
```

## 7. Extend our images task
```
imagemin.gifsicle(),
imagemin.jpegtran(),
imagemin.optipng(),
imagemin.svgo(),
imageminPngquant(),
imageminJpegRecompress()
```

## 8. Run again your images task

the result will be:
```
gulp-imagemin: Minified 21 images (saved 569.81 kB - 39.3%)
```

## 9. Extend images task

```$xslt
.pipe(cache(imagemin(
    [
        imagemin.gifsicle(),
        imagemin.jpegtran(),
        imagemin.optipng(),
        imagemin.svgo(),
        imageminPngquant(),
        imageminJpegRecompress()
    ]
)))
```

## 10. Run again your images task

the result will be:
```
gulp-imagemin: Minified 0 images
```