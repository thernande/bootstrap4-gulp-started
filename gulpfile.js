const gulp = require('gulp');
const browserSync = require('browser-sync');
const sass = require('gulp-sass');
const pug = require('gulp-pug');

//compile sass
gulp.task('sass',function(){
    return gulp.src(['node_modules/bootstrap/scss/bootstrap.scss', 'src/scss/*.scss'])
    .pipe(sass())
    .pipe(gulp.dest("src/css"))
    .pipe(browserSync.stream());
});

//compile pug
gulp.task('views', function buildHTML() {
    return gulp.src('src/pug/*.pug')
    .pipe(pug({
      pretty: true
    }))
    .pipe(gulp.dest('src/'))
    .pipe(browserSync.stream());
  });

//move js
gulp.task('js', function(){
    return gulp.src(["node_modules/bootstrap/dist/js/bootstrap.min.js", "node_modules/jquery/dist/jquery.min.js", "node_modules/popper.js/dist/umd/popper.min.js"])
    .pipe(gulp.dest("src/js"))
    .pipe(browserSync.stream());
});

// watch Sass y server

gulp.task('serve', ['sass', 'views'], function(){
    browserSync.init({
        server: "./src"
    });

    gulp.watch(["node_modules/bootstrap/scss/bootstrap.scss", "src/scss/*.scss"], ['sass']);
    gulp.watch(["src/pug/*.pug"], ['views']);
    gulp.watch(["src/*.html"]).on('change', browserSync.reload);
});

gulp.task('default', ['js', 'serve']);