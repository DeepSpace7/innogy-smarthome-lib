const gulp = require('gulp');
const ts = require('gulp-typescript');
const sm = require('gulp-sourcemaps');
const minify = require('gulp-minify');
const concat = require('gulp-concat');
const mocha = require('gulp-mocha');
const merge = require('merge2');
const del = require('del');

const targets = {
  node: 'dist/node',
  dom: 'dist/dom',
  test: 'dist/test'
};

const sources = {
  platforms: 'src/platforms',
  test: 'test'
};

function compile(files, options) {
  const tsProject = ts.createProject('tsconfig.json', options);
  return merge([tsProject.src(), files])
    .pipe(sm.init())
    .pipe(tsProject());
}

gulp.task('build-node', ['clean-node'], function () {
  const target = targets.node;
  const files = gulp.src([sources.platforms + '/node/*.ts']);
  const tsResult = compile(files, {
    lib: ['es2015'],
    types: ['node', 'request', 'ws'],
    module: 'commonjs',
    declaration: true,
    sourceMap: false,
    target: 'es5'
  });
  return merge([
    tsResult.js
      .pipe(gulp.dest(target)),
    tsResult.dts
      .pipe(concat('SmartHome.d.ts'))
      .pipe(gulp.dest(target)),
  ]);
});

gulp.task('clean-node', function () {
  return del([targets.node + '/**/*']);
});

gulp.task('build-dom', ['clean-dom'], function () {
  const target = targets.dom;
  const files = gulp.src([sources.platforms + '/dom/*.ts']);
  const tsResult = compile(files, {
    lib: ['es5', 'dom', 'es2015.promise'],
    types: [],
    module: 'amd',
    declaration: true,
    sourceMap: true,
    target: 'es3',
    out: 'SmartHome.js'
  });
  return merge([
    tsResult
      .pipe(sm.write('./'))
      .pipe(gulp.dest(target)),
    tsResult.js
      .pipe(minify({ ext: { min: '.min.js' }}))
      .pipe(gulp.dest(target)),
    tsResult.dts
      .pipe(gulp.dest(target)),
  ]);
});

gulp.task('clean-dom', function () {
  return del([targets.dom + '/**/*']);
});

gulp.task('build-test', ['clean-test'], function () {
  const target = targets.test;
  const files = gulp.src([sources.test + '/**/*.ts']);
  const tsResult = compile(files, {
    lib: ['es5', 'es2015.promise'],
    types: ['node', 'mocha', 'chai'],
    module: 'commonjs',
    sourceMap: false,
    target: 'es5'
  });
  return tsResult
    .pipe(gulp.dest(target));
});

gulp.task('clean-test', function () {
  return del([targets.test + '/**/*']);
});

gulp.task('test', ['build-test'], function () {
  const files = targets.test + '/*Test.js';
  return gulp.src(files, { read: false })
    .pipe(mocha({ reporter: 'spec' }))
});

gulp.task('build', ['build-node', 'build-dom', 'build-test']);

gulp.task('clean', ['clean-node', 'clean-dom', 'clean-test']);

gulp.task('default', ['build', 'test']);