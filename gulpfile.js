var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var plumber = require('gulp-plumber');
var gutil = require('gulp-util');
var browserify = require('browserify');
var babelify = require('babelify');
var watchify = require('watchify');
var uglify = require('gulp-uglify');
var buffer = require('vinyl-buffer');
var source = require('vinyl-source-stream');

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
    gulp.src('./app/client/scss/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 versions', 'ie >= 8']
        }))
        .pipe(gulp.dest('./app/public/css/'));
});

// ---------------------------------------------
// REACT
// ---------------------------------------------
/* This does too much and should be split to a compile and a watch statement */
gulp.task('browserify-dev', function() {
    var bundler = browserify({
        entries: './app/client/main.js', // Only need initial file, browserify finds the deps
        transform: [[babelify, {"presets": ["react"]}]], // We want to convert JSX to normal javascript
        debug: true, // Gives us sourcemapping
        cache: {}, packageCache: {}, fullPaths: true, // Requirement of watchify
        extensions: ['.jsx','.js']
    });
    var watcher  = watchify(bundler);

    return watcher
    .on('update', function () { // When any files update
        var updateStart = Date.now();
        console.log('Updating!');
        watcher.bundle()
        .on("error", function(err) {
                    gutil.log(
                        gutil.colors.red("Browserify compile error:"),
                        err.message,
                        "\n\t",
                        gutil.colors.cyan("in file"),
                        './app/client/main.js'
                    );
        })  // Create new bundle that uses the cache for high performance
        .pipe(source('main.js'))
    // This is where you add uglifying etc.
        .pipe(gulp.dest('./app/public/js'));
        console.log('Updated!', (Date.now() - updateStart) + 'ms');
    })
    .bundle()
    .on("error", function(err) {
                gutil.log(
                    gutil.colors.red("Browserify compile error:"),
                    err.message,
                    "\n\t",
                    gutil.colors.cyan("in file"),
                    './app/client/main.js'
                );
    }) // Create the initial bundle when starting the task
    .pipe(source('main.js'))
    .pipe(gulp.dest('./app/public/js/'));
});

gulp.task('browserify-prod', function() {
    process.env.NODE_ENV = 'production';
    var bundler = browserify({
        entries: './app/client/main.js', // Only need initial file, browserify finds the deps
        transform: [[babelify, {"presets": ["react"]}]], // We want to convert JSX to normal javascript
        debug: false, // Gives us sourcemapping
        dedupe: true,
        cache: {}, packageCache: {}, fullPaths: false, // Requirement of watchify
        bundleExternal: true,
        extensions: ['.jsx','.js']
    });

    return bundler
    .bundle()
     // Create the initial bundle when starting the task
    .pipe(source('main.js'))
    .pipe(buffer())
    .pipe(uglify())
    .on("error", function(err) {
                gutil.log(
                    gutil.colors.red("Browserify compile error:"),
                    err,
                    "\n\t",
                    gutil.colors.cyan("in file"),
                    './app/client/main.js'
                );
    })
    .pipe(gulp.dest('./app/public/js/'));
});
// ---------------------------------------------
// BrowserSync
// ---------------------------------------------
// Turned off because because it was placed in the server itself.
// This helps ensure that, as nodemon reruns on changes that BrowserSync is always running
//
// gulp.task('browser-sync', function () {
//   browserSync({
//     proxy: 'localhost:8888',
//     files: ['./app/public/**/*.{js,css}']
//   });
// });

// ---------------------------------------------
// Watch
// ---------------------------------------------
gulp.task('sass-watch', function (){
   gulp.watch('./app/client/scss/**/*.scss', ['sass']);
});
// watcher = gulp.watch('./app/client/scss/**/*.scss', ['sass']);
// gulp.task('js-watch', function (){
//     gulp.watch('./app/client/**/*.js', ['']);
// });

/*
* DEFAULT
*/

// watcher.on('change', function(event){
//     console.log("SCSS change");
// });

// gulp.task('dev:watch', ['sass-watch', 'browserify']);
// gulp.task('dev', ['sass-watch', 'browserify','sass']);
gulp.task('default', ['browserify-dev', 'sass', 'sass-watch']);
gulp.task('production', ['browserify-prod', 'sass']);
