const router = require('koa-router')()

router.prefix('/')

router.get('/', async (ctx, next) => {
  console.log(99999);
  ctx.body = 'koa2 string999';
  await ctx.render('index', {
    title: 'Hello Koa 2!',
    name: 'Xiaoxiaoliu'
  })
    console.log(5555);
})

router.get('/render', async (ctx, next) => {
  console.log(888);
  await ctx.render('index2', {
    title: 'Hello Koa 2!',
    name: 'Xiaoxiaoliu',
    layout: 'layouts/layout'
  })
  console.log(5555);
})

router.get('/string', async (ctx, next) => {
  console.log(8888);
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
    title: 'koa2 json99'
  }
})

module.exports = router
