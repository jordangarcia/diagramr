var gulp = require('gulp')
var shell = require('gulp-shell')
var connect = require('gulp-connect')
var del = require('del')

var staticFiles = ['./src/index.html']

gulp.task('default', [
  'clean',
  'copy',
  'server',
  'webpack',
  'watch',
])

gulp.task('clean', function(cb) {
  del(['dist'], cb)
})

gulp.task('copy', function() {
  return gulp.src(staticFiles)
    .pipe(gulp.dest('./dist/'))
})

gulp.task('server', function() {
  connect.server({
    root: 'dist',
    port: 4000,
  })
})

gulp.task('webpack', shell.task([
  './node_modules/webpack/bin/webpack.js --watch --progress --colors'
]))

gulp.task('watch', function() {
  gulp.watch(staticFiles, ['copy'])
})
