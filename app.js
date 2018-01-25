const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
//const logger = require('koa-logger')
//handlebars
// var handlebars = require("koa-handlebars");
var handlebars = require("handlebars");
var fs = require('fs');


//log工具
const logUtil = require('./utils/log_util');

// const index = require('./routes/index')
// const users = require('./routes/users')


//response格式化中间件
const response_formatter = require('./middlewares/response_formatter');

// error handler
onerror(app)

// middlewares
app.use(bodyparser({
    enableTypes:['json', 'form', 'text']
}))
app.use(json())
//app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

//handlebars
// app.use(handlebars({
//     defaultLayout: "main"
// }));
// app.use(function *() {
//     yield this.render("index", {
//         title: "Test Page",
//         name: "World 123"
//     });
// });

//pug模板
// app.use(views(__dirname + '/views', {
//   extension: 'pug'
// }))

app.use(views(__dirname + '/views', {
    extension: 'hbs',
    map: { hbs: 'handlebars'},
    options: {
      partials: {
        header: 'tpl/header',
        footer: 'tpl/footer',
      }
    }
}));
// handlebars.registerPartial(
//     'defaultLayout',
//     fs.readFileSync(__dirname + '/views/layouts/layout.hbs', 'utf8')
// )

// logger
// app.use(async (ctx, next) => {
//   const start = new Date()
//   await next()
//   const ms = new Date() - start
//   console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
// })
//改用log4
// logger
app.use(async (ctx, next) => {
    //响应开始时间
    const start = new Date();
//响应间隔时间
var ms;
try {
    //开始进入到下一个中间件
    await next();

    ms = new Date() - start;
    //记录响应日志
    logUtil.logResponse(ctx, ms);

} catch (error) {

    ms = new Date() - start;
    //记录异常日志
    logUtil.logError(ctx, error, ms);
}
});


// routes
// app.use(index.routes(), index.allowedMethods())
// app.use(users.routes(), users.allowedMethods())


//仅对/api开头的url进行格式化处理response结果，其他的不需要
//app.use(response_formatter);
app.use(response_formatter('^/api'));


//改进一下吧，把路由文件拿出来单独处理
require('./route.js').init(app);


module.exports = app
