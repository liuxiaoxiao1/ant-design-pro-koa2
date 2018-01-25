const router = require('koa-router')();
var handlebars = require("koa-handlebars");
var assign = require('object-assign');


router.prefix('/test')

router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
    console.log(5555);
})

router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string'
})

router.get('/json/:id', async (ctx, next) => {
    //console.log('ctx.request', ctx.request);
    // for(var a in ctx.request) {
    //   console.log(a);
    // }
    // console.log('ctx.request.param', ctx.params.id);
    // console.log('ctx.request.body',  ctx.request.body.id);
    // console.log('ctx.request.query', ctx.request.query.id);
  await console.log(1+1);
  console.log(99);
  ctx.body = {
    title: 'koa2 jsonfdsfs'
  }
})

router.get('/html/:id', async (ctx, next) => {
    await ctx.render('index',{
        title : '4545',
    })
})
router.get('/hbs/:id', async (ctx, next) => {
    console.log(222);
    await ctx.render('index',{
        layout: 'layouts/test',
        title : 'Hello',
        name: 'world'
    })
})

var view = {
    partials : {
        header : "tpl/header",
        footer : "tpl/footer"
    },
    head : {
        title : "hello world"
    },
    body : {
        name : "hello world"
    }
}

var view2 = {
    body : {
        name : "hello world"
    },
    partials : {
        footer: 'tpl/footer'
    }
}

router.get('/html/get/:id', async (ctx, next) => {
    await ctx.render('index',assign({}, view))
})


router.get('/html/get2/:id', async (ctx, next) => {
    await ctx.render('index2',{
        body : {
            name : "hello world"
        },
        partials : {
            footer: 'tpl/footer'
        }
    })
})


module.exports = router
