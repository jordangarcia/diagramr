var path = require('path')
var gulp = require('gulp')
var shell = require('gulp-shell')
var connect = require('connect')
var serveStatic = require('serve-static')
var del = require('del')

var staticFiles = {
  app: ['./src/app/index.html'],
  test: [
    './src/test/index.html',
    './src/test/static/*.js',
    './src/test/static/*.css',
  ],
}

gulp.task('default', ['dev'])

gulp.task('dev', [
  'copy-app',
  'copy-test',
  'server-dev',
  'watch',
  'webpack',
])

gulp.task('clean', function(cb) {
  del(['dist/*'], cb)
})

gulp.task('copy-app', function() {
  return gulp.src(staticFiles.app)
    .pipe(gulp.dest('./dist/app/'))
})

gulp.task('copy-test', function() {
  return gulp.src(staticFiles.test)
    .pipe(gulp.dest('./dist/test/'))
})

gulp.task('server-dev', function() {
  var appPath = path.join(__dirname, 'dist', 'app')
  var testPath = path.join(__dirname, 'dist', 'test')

  connect().use(serveStatic(appPath)).listen(4000)
  connect().use(serveStatic(testPath)).listen(4001)
})

gulp.task('webpack', shell.task([
  './node_modules/webpack/bin/webpack.js --watch --progress --colors'
]))

gulp.task('watch', function() {
  gulp.watch(staticFiles.app, ['copy-app'])
  gulp.watch(staticFiles.test, ['copy-test'])
})
