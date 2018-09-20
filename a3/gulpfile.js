const gulp = require('gulp')
const concatenate = require('gulp-concat')
const gulpSASS = require('gulp-sass')
const cleanCSS = require('gulp-clean-css')

const sassFiles = 'src/**/*.scss'

gulp.task('sass', () => (
    gulp.src(sassFiles)
        .pipe(gulpSASS())
        .pipe(cleanCSS())
        .pipe(concatenate('styles.min.css'))
        .pipe(gulp.dest('public/css/'))
))

gulp.task('watch', () => {
    gulp.watch(sassFiles, gulp.series(['sass']))
})

gulp.task('default', gulp.series(['sass']))
