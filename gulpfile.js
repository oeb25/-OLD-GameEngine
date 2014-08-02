var gulp = require('gulp'),
	express = require('express'),
	es6 = require('gulp-es6-transpiler'),
	plumber = require('gulp-plumber'),
	livereload = require('gulp-livereload'),
	uglify = require('gulp-uglify'),
	browserify = require('gulp-browserify');

gulp.task('browserify', function() {
	gulp.src('./main.js')
	.pipe(plumber())
	.pipe(browserify({
		debug : true
	}))
	.pipe(gulp.dest('./static'))
	.pipe(livereload());
});

gulp.task('es6', function() {
	gulp.src('./es6/*.js')
	.pipe(plumber())
	.pipe(es6())
	.pipe(gulp.dest('./'));
});

gulp.task('serve', function() {
	var app = express();

	app.use(express.static('./'));

	app.listen(3000);
});

gulp.task('default', ['serve', 'es6', 'browserify'], function() {
	gulp.watch('./es6/*.js', ['es6']);
	gulp.watch('./*.js', ['browserify']);
});

gulp.task('concat', function () {
	gulp.src('static/main.js')
	.pipe(uglify())
	.pipe(gulp.dest('dist'));
});

gulp.task('build', ['es6', 'browserify', 'concat']);