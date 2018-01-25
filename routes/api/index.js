/**
 * Created by liuxiaoxiao1 on 17/9/18.
 */
var router = require('koa-router')();
var user_router = require('./user_router');
var user_router2 = require('./user_router2');

router.prefix('/api')
router.use('/users', user_router.routes(), user_router.allowedMethods());
//router.use('/users2', user_router2.routes(), user_router2.allowedMethods());

module.exports = router;
