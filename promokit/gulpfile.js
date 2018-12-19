const fs = require('fs');
const path = require('path');

const pkg = require('./package');
const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const flatten = require('gulp-flatten');
const sass = require('node-sass');

const rollup = require('rollup');
const babel = require('rollup-plugin-babel');
const progress = require('rollup-plugin-progress');
const uglify = require('rollup-plugin-uglify');
const license = require('rollup-plugin-license');

const version = pkg.version.slice(0, -2);
const ui_static = /^win/.test(process.platform) ? `//ui-static/wwwroot` : `/Volumes/wwwroot`;

const banner = () =>{
    const date = new Date();

    return [
        `@name: promokit.js`,
        `@version: v${pkg.version}`,
        `@author: `,
        '@update: ' + date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()
    ].join('\n');
};

const compileSass = (e) =>{
    sass.render({
        file: `src/promokit.scss`,
        outputStyle: 'compressed',
        sourceMap: true,
        outFile: `dist/css/promokit.css`,
    }, (error, result) =>{
        if(error) {
            console.log(`error:${error.message}`);
            console.log(`file:${error.file}`);
        } else {
            if(e) {
                e.path && console.log(`Change detected to: ${path.basename(e.path)}`);
            } else {
                console.log(`SASS Compiled: ${path.basename(result.stats.entry)}`);
            }

            if(fs.existsSync('dist/css')) {
                fs.writeFile(`dist/css/promokit.css`, result.css, function(err){});
                fs.writeFile(`dist/css/promokit.css.map`, result.map, function(err){});
            } else {
                fs.mkdir('dist/css', () =>{
                    fs.writeFile(`dist/css/promokit.css`, result.css, function(err){});
                    fs.writeFile(`dist/css/promokit.css.map`, result.map, function(err){});
                });
            }

            gulp.src([`${__dirname}/dist/css/**/*`])
                .pipe(gulp.dest(`${__dirname}/document/lib/css/`));
        }
    });
};

const minifyImg = () =>{
    gulp.src(['src/**/*+(.png|.jpg|.gif)'])
        .pipe(imagemin([
                imagemin.gifsicle({interlaced: true}),
                imagemin.jpegtran({progressive: true}),
                imagemin.optipng({optimizationLevel: 5})
            ])
        )
        .pipe(flatten())
        .pipe(gulp.dest('dist/img'))
        .pipe(gulp.dest('document/lib/img'));
};

gulp.task('get dev sample <- ui-static', () =>{
    gulp.src([`${ui_static}/promokit/document/v${version}/dev/**/*`])
        .pipe(gulp.dest(`${__dirname}/document/dev/`));
});

gulp.task('distribute -> ui-static', () =>{
    gulp.src([`${__dirname}/dist/css/**/*`])
        .pipe(gulp.dest(`${ui_static}/promokit/v${version}/css/`));

    gulp.src([`${__dirname}/dist/img/**/*`])
        .pipe(gulp.dest(`${ui_static}/promokit/v${version}/img/`));

    gulp.src([`${__dirname}/dist/js/promokit.js`, `${__dirname}/dist/js/promokit.js.map`])
        .pipe(gulp.dest(`${ui_static}/promokit/v${version}/js/`));

    gulp.src([`${__dirname}/document/**/*`])
        .pipe(gulp.dest(`${ui_static}/promokit/document/v${version}/`));
});

gulp.task('production -> dist', () =>{
    rollup.rollup({
        input: `src/promokit.js`,
        plugins: [
            babel(),
            progress(),
            uglify(),
            license({
                banner: banner()
            })
        ]
    }).then(bundle =>{
        return bundle.write({
            file: `dist/js/promokit.js`,
            format: 'umd',
            name: `nc.promokit`,
            sourcemap: true
        });
    }).then(() =>{
        gulp.src([`${__dirname}/dist/js/promokit.js`, `${__dirname}/dist/js/promokit.js.map`])
            .pipe(gulp.dest(`${__dirname}/document/lib/js/`));
    });

    compileSass();
    minifyImg();
});

gulp.task('develop', () =>{
    const jsModule = 'plugin';
    const name = 'plugin';

    const input = `src/${jsModule}/js/${jsModule}.js`;
    const watcher = rollup.watch({
        input: input,
        output: [
            {
                file: `dist/js/${jsModule}.js`,
                format: 'umd',
                name: `nc.promokit.${name}`,
                sourcemap: true
            },
            {
                file: `document/lib/js/${jsModule}.js`,
                format: 'umd',
                name: `nc.promokit.${name}`,
                sourcemap: true
            }
        ],
        plugins: [
            babel(),
            progress(),
            uglify(),
            license({
                banner: banner()
            })
        ]
    });

    watcher.on('event', e =>{
        if(e.code === 'START' || e.code === 'END') return;
        if(e.duration) {
            console.log(`\x1b[0m`, `${e.code}`, `\x1b[36m`, `${e.duration} ms`);
        } else {
            console.log(`\x1b[0m`, `${e.code}`);
        }
    });

    compileSass();
    gulp.watch([`src/**/*.scss`], compileSass);

    minifyImg();
});