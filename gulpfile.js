var gulp = require('gulp');
var notify = require('gulp-notify');
// LOAD STYLUS
var stylus = require('gulp-stylus');
// STYLUS PLUGINS
var koutoSwiss = require('kouto-swiss');
var rupture = require('rupture');
// LOAD POST CSS
var postcss = require('gulp-postcss');
// POST CSS PLUGINS
var autoprefixer = require('autoprefixer');
var lost = require('lost');
var rucksack = require('rucksack-css');
var mqpack = require('css-mqpacker');
var cssnano = require("cssnano");

gulp.task('default',['styles']);

gulp.task('styles', function() {

	var processors = [
		lost({}),
		rucksack({}),
		mqpack({
			sort: true
		}),
		cssnano({}),
		autoprefixer({browsers: ['last 1 version']}),
	];

    gulp.src('stylus/style.styl')
      .pipe(stylus({
      	'use': [koutoSwiss(), rupture()]
      }))
      .pipe(postcss(processors))
      .pipe(gulp.dest('bin/css'))
      .pipe(notify('Styles Compiled!'));
});

gulp.task('watch', function() {
    gulp.watch('stylus/**/*.styl', ['styles']);
});