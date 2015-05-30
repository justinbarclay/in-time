var gulp = require('gulp');
var sass = require('gulp-sass-binaries');

gulp.task('default', function() {
  //place code for default task here
})


//stolen off of gulp-sass webpage
gulp.task('sass', function () {
    gulp.src('./scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./css'));
});
