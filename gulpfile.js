const gulp = require("gulp");
const concat = require("gulp-concat");
const aliases = require('gulp-style-aliases');
const scssimport = require('gulp-shopify-sass');
const rename = require("gulp-rename");

gulp.task('concat-style', () => {
  return gulp
    .src(['variables', 'rules'].map(entry => `src/style/_${entry}.scss`))
    .pipe(concat('style.scss'))
    .pipe(aliases({'~@petals': './node_modules/@petals'}))
    .pipe(scssimport())
    .pipe(
      rename((p) => {
        p.basename = p.basename.replace('.cat.scss', '');
        p.extname = '.scss';
      }),
    )
    .pipe(gulp.dest('dist'));
});

gulp.task('copy-scss', () => {
  return gulp
    .src('src/style/**/*.scss')
    .pipe(aliases({"~@petals": "./node_modules/@petals"}))
    .pipe(scssimport())
    .pipe(
      rename((p) => {
        p.basename = p.basename.replace('.cat.scss', '');
        p.extname = '.scss';
      }),
    )
    .pipe(gulp.dest('dist/style'));
});

gulp.task("default", ['concat-style', 'copy-scss']);
