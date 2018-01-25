const router = require('koa-router')()

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
    title: 'koa2 json'
  }
})

module.exports = router
