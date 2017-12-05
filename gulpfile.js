const
    gulp = require('gulp'),
    run = require('gulp-run'),
    browserSync = require('browser-sync');

gulp.task('build', function() {
    return run('npm run build')
        .exec();
});

gulp.task('pdf', function() {
    return run('npm run pdf')
        .exec();
})

gulp.task('serve', ['build'], function() {
    browserSync.init({
        server: {
            baseDir: "./"
        },
        ghostMode: {
            scroll: false
        },
        notify: false,
        open: false,
        port: 3001,
        reloadDelay: 2000,
        reloadDebounce: 2000,
        files: [
            './**/*.css',
            './**/*.html',
        ]
    });
    gulp.watch("./index.md", ['build']);
    gulp.watch("./print.css", ['pdf']);
});
