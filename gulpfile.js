'use strict';

var gulp = require('gulp');

gulp.task( 'deploy', function () {
  var gutil = require( 'gulp-util' );
  var ftp = require( 'vinyl-ftp' );
  var fs = require('fs');
  var merge = require('merge-stream');
  var ftpConn = JSON.parse(fs.readFileSync('.ftpconn.json', 'utf8'));

  var staticFiles = 'arinabodina/static/**';
  var appFiles = ['arinabodina/templates/**', 'arinabodina/*.py'];

  function createUploadTask(host, user, password, path){
    var conn = ftp.create({
        host:     host,
        user:     user,
        password: password,
        parallel: 2,
        log:      gutil.log
    });
    // using base = '.' will transfer everything to /public_html correctly
    // turn off buffering in gulp.src for best performance
    return gulp.src(path, { base: './arinabodina', buffer: false } )
        .pipe( conn.newer( '.' ) ) // only upload newer files
        .pipe( conn.dest( '.' ) );
  }

  var uploadStatic = createUploadTask(ftpConn.host, ftpConn.staticUser,
    ftpConn.password, staticFiles);
  var uploadApp = createUploadTask(ftpConn.host, ftpConn.appUser,
    ftpConn.password, appFiles);

  return merge(uploadStatic, uploadApp);
} );

gulp.task('sass:build', function () {
  var sass = require('gulp-sass');
  var sourcemaps = require('gulp-sourcemaps');
  var minifycss = require('gulp-minify-css');
  var concat = require('gulp-concat');

  var sassOptions = {
    noCache: false,
    sourcemap: true,
    style: 'compact',
    sourcemapPath: './arinabodina/static/css',
    errLogToConsole: true
  };

  return gulp.src(['./arinabodina/static/scss/customfont.scss',
    './arinabodina/static/scss/flexslider.scss',
    './arinabodina/static/scss/magnific-popup.scss',
    './arinabodina/static/scss/materialize.scss',
    './arinabodina/static/scss/style.scss'])
    .pipe(sass(sassOptions).on('error', sass.logError))
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(minifycss({processImport: false}))
    .pipe(concat('style.css'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./arinabodina/static/css'));
});

gulp.task('sass:watch', function () {
  return gulp.watch('./arinabodina/static/scss/*.scss', ['sass:build']);
});

gulp.task('default', ['sass:watch']);
