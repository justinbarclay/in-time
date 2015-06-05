var gulp = require('gulp'),
    sass = require('gulp-sass-binaries'),
    react = require('gulp-react'),
    concat = require('concat');

    var FRONTEND_FILES = [
      "client/**/*.{js,jsx}"
    ];

    var BACKEND_FILES = [
      "scripts/**/*.js",
      "server/**/*.js",
      "test/**/*.js",
      "*.js"
    ];

// ---------------------------------------------
// SASS
// ---------------------------------------------
gulp.task('sass', function () {
    gulp.src('./scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./css'));
});

// ---------------------------------------------
// REACT
// ---------------------------------------------

gulp.task('react', function() {
    gulp.src('./app/client/**/*.jsx')
    .pipe(react())
    .pipe(concat())
    .pipe(gulp.dest('./app/client/build/main.js'));
});

/*
* WATCH
*/


/*
* DEFAULT
*/
gulp.task('default', function() {
  //place code for default task here
});