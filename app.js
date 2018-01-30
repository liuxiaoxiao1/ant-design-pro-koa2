const Koa = require('koa')
const app = new Koa()
const path = require('path')
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
//const logger = require('koa-logger')
//handlebars
// var handlebars = require("koa-handlebars");
//var handlebars = require("handlebars");
var fs = require('fs');

//以下是koa-hbs写法
const hbs = require('koa-hbs');
const convert = require('koa-convert');
const co = require('co');

//zxq add begin
//var hbs = require('./hbs');
//zxq add end

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
app.use(require('koa-static')(__dirname + '/dist'))

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

//以下为express中的用法--暂时跑不通
// global.__basename = __dirname;
// global.__hbstplname = __dirname + '/views/tpl';
// hbs.registerPartials(__hbstplname);
// // view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'html');
// app.engine('html', hbs.__express);

//下面是koa2-hbs的写法--尝试--未通过
// app.use(hbs.middleware({
//   viewPath: __dirname + '/views',
//   partialsPath: __dirname + '/views/tpl'
// }));


//下面是koa-hbs的写法--尝试下--->通过--可行  20180129
app.use(convert(hbs.middleware({
  viewPath: __dirname + '/views',
  partialsPath: __dirname + '/views/tpl'
})));
app.use(async (ctx, next) => {
  ctx.render_ = ctx.render;
  ctx.render = function (tpl, locals) {
    return co.call(ctx, ctx.render_(tpl, locals));
  }
  await next();
})





//以下为空koa2中的用法--正在调试
app.use(views(__dirname + '/views', {
    extension: 'hbs',
    map: { hbs: 'handlebars'},
    options: {
      helpers: {

      },
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
