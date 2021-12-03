const Koa = require('koa')
const KoaStatic = require('koa-static')
const KoaBody = require('koa-body')
const KoaSession = require('koa-session')
koaRange = require('koa-range')
let { Port, staticDir } = require('./config')

let app = new Koa()

// 处理异常
const error = require('./app/middleware/error');
app.use(error);

// 为静态资源重写url
const rewriteUrl =require('./app/middleware/rewriteUrl')
app.use(rewriteUrl)

app.use(koaRange)
// 使用koa-static处理静态资源
app.use(KoaStatic(staticDir))

// session
const CONFIG = require('./app/middleware/session')
app.keys=['session app keys']
app.use(KoaSession(CONFIG, app))

// 判断是否登录
// const isLogin = require('./app/middleware/isLogin')
// app.use(isLogin)

app.use(async (ctx, next) => {
  ctx.state.user = ctx.session.user
  await next()
})

// 处理请求体数据
const koaBodyConfig = require('./app/middleware/koaBodyConfig')
app.use(KoaBody(koaBodyConfig))


// 使用路由中间件
const Routers = require('./app/routers')
app.use(Routers.routes()).use(Routers.allowedMethods())

app.listen(Port, () => {
  console.log(`the server is running at port ${Port}`)
})
