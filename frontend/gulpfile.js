const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const imagemin = require('gulp-imagemin');
const browserSync = require('browser-sync').create();
const del = require('del');

function clean() {
    return del(['build/**', '!build']);
}

function compilaSass() {
    return gulp.src('./source/styles/main.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: 'compressed'
        }).on('error', sass.logError))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./build/styles'))
        .pipe(browserSync.stream());
}

function comprimeJavaScript() {
    return gulp.src('./source/scripts/**/*.js', {
        base: './source/scripts'
    })
        .pipe(uglify())
        .pipe(gulp.dest('./build/scripts'));
}

function comprimeImagens() {
    return gulp.src('./source/images/**/*', {
        base: './source/images'
    })
        .pipe(imagemin())
        .pipe(gulp.dest('./build/images'));
}

function copiaHTML() {
    return gulp.src('./source/html/**/*.html', {
        base: './source/html'
    })
        .pipe(gulp.dest('./build'));
}

function servidor(done) {
    browserSync.init({
        server: {
            baseDir: './build'
        },
        port: 3000,
        open: true
    });

    done();
}

function recarregarPagina(done) {
    browserSync.reload();
    done();
}

function watchFiles() {
    gulp.watch('./source/styles/**/*.scss', compilaSass);

    gulp.watch(
        './source/scripts/**/*.js',
        gulp.series(comprimeJavaScript, recarregarPagina)
    );

    gulp.watch(
        './source/html/**/*.html',
        gulp.series(copiaHTML, recarregarPagina)
    );

    gulp.watch(
        './source/images/**/*',
        gulp.series(comprimeImagens, recarregarPagina)
    );
}

const build = gulp.series(
    clean,
    gulp.parallel(
        compilaSass,
        comprimeJavaScript,
        comprimeImagens,
        copiaHTML
    )
);

exports.build = build;

exports.default = gulp.series(
    build,
    servidor,
    watchFiles
);