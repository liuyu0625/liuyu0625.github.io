const gulp = require('gulp');
const cssmin = require('gulp-cssmin');
const autoprefixer = require('gulp-autoprefixer');
const uglify = require('gulp-uglify');
const  babel = require('gulp-babel'); 
const htmlmin = require('gulp-htmlmin');
const del = require('del');
const webserver = require('gulp-webserver');
const cssHandler = ()=>{
    return gulp.src("./src/css/*.css")
    .pipe(autoprefixer())
    .pipe(cssmin())
    .pipe(gulp.dest('./dist/css'))
}
const jsHandler = ()=>{
    return gulp.src('./src/js/*.js')
    .pipe(babel({
        presets:['@babel/env']
    }))
    .pipe(uglify())
    .pipe(gulp.dest('./dist/js'))
}
const htmlHandler = ()=>{
    return gulp.src(['./src/html/*.html','./src/pages/*.htm'])
    .pipe(htmlmin({
        "removeAttributeQuotes":true,   //移除属性上的双引号
        "removeComments":true,    //移除注释
        "collapseBooleanAttributes":true,  //把值为布尔值的属性简写
        "collapseWhitespace":true, //移除所有空格,变成一行代码
        "minifyCSS":true, //把页面里面的style标签里面的css样式也去空格
        "minifyJS":true,  //把页面里面的script标签里面的js代码也去空格
    }))
    .pipe(gulp.dest('./dist/html'))
}
const imgHandler = ()=>{
    return gulp.src('./src/img/**')
    .pipe(gulp.dest('./dist/img'))
}
const delHandler = ()=>{
    return del(['./dist'])
}
const watchHandler = ()=>{
    //监控着src下的css下的所有csswe你按,只要一发生变化,就会自动执行一遍cssHandler这个任务
    gulp.watch('./src/css/*.css',cssHandler);
    gulp.watch('./src/js/*.js',jsHandler);
    gulp.watch('./src/html/*.html',htmlHandler);
    gulp.watch('./src/img/**',imgHandler)
}
const serverHandler = ()=>{
    return gulp.src('./dist') //找到我要打开网页的文件夹,把这个文件夹当做网站根目录
    .pipe(webserver({//需要一些配置项
        port:'8080', //端口号,0-65535,尽量不使用0-1023
        open:'./html/index.html', //你默认打开的首页,从dist下面根目录开始书写
        livereload:true,//自动刷新浏览器,热重启
        //所有的代理配置都在proxies里面
    }))
}

module.exports.default = gulp.series(
    delHandler,
    gulp.parallel(cssHandler,jsHandler,htmlHandler,imgHandler),
    serverHandler,
    watchHandler
)