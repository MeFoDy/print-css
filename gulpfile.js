const
    fs = require('fs'),
    gulp = require('gulp'),
    run = require('gulp-run'),
    mjpage = require('mathjax-node-page'),
    mjnode = require('mathjax-node-svg2png'),
    browserSync = require('browser-sync');

gulp.task('build', ['mathjax'], function () {
    return run('npm run build')
        .exec();
});

gulp.task('pdf', function () {
    return run('npm run pdf')
        .exec();
});

gulp.task('md', function () {
    return run('npm run md')
        .exec();
});

gulp.task('mathjax', ['md'], function (cb) {
    mjpage.init(mjnode);
    mjpage.addOutput('png', (wrapper, data) => {
        wrapper.innerHTML = `<img src="${data}">`;
    });
    const input = fs.readFileSync('index.html');
    mjpage.mjpage(input, { format: ["TeX"] }, { png: true, scale: 1.2 }, function (output) {
        fs.writeFileSync('index.html', output);
        cb();
    });
});

gulp.task('serve', ['build'], function () {
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
