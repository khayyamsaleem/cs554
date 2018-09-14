const gulp = require('gulp')
const gulpSASS = require('gulp-sass')
const cleanCSS = require('gulp-clean-css')
const rename = require('gulp-rename')


const sassFiles = 'src/**/*.scss'

gulp.task('sass', () =>
    gulp.src('src/styles/*.scss')
        .pipe(gulpSASS())
        .pipe(gulp.dest('public/css/'))
        .pipe(cleanCSS())
        .pipe(rename('styles.min.css'))
        .pipe(gulp.dest('public/css/'))
)

gulp.task('build', gulp.series(['sass']))

gulp.task('watch', () =>
    gulp.watch(sassFiles, gulp.series(['sass']))
)

gulp.task('default', gulp.series(['build']))
