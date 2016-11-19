
var gulp = require('gulp'),
	sass =require('gulp-sass'),
	sourcemaps = require('gulp-sourcemaps'),
	config = require('../config.js').scss,
	argv = require('yargs').argv;

gulp.task('scss',function(){
	var srcPath = config.srcPath[argv.p];
	var outputPath = config.outputPath[argv.p];
	
	return gulp.src(srcPath)
		.pipe(sourcemaps.init())
		.pipe(sass({
            'outputStyle': 'compressed',
            'errLogToConsole': true			
		}).on('error',sass.logError))
		.pipe(sourcemaps.write('./map'))
		.pipe(gulp.dest(outputPath));
});

gulp.task('watch:scss',['scss'],function(){
	var pArr = argv.p;
	 console.log('********您已开启watch:'+ pArr + ' *********');
	var cssWatcher = gulp.watch(config.srcPath[pArr],['scss']);
	cssWatcher.on('change',function(event){
		console.log('File '+event.path+' was '+event.type);
	});
});

gulp.task('watch',['watch:scss']);
