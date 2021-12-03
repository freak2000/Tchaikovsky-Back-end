const Router = require('koa-router')

let Routers = new Router()

const carouselRouter = require('./router/CarouselRouter')
const portfolioRouter = require('./router/PortfolioRouter')
const songsRouter = require('./router/SongsRouter')
const userRouter = require('./router/UserRouter')

Routers.use(carouselRouter.routes())
Routers.use(portfolioRouter.routes())
Routers.use(songsRouter.routes())
Routers.use(userRouter.routes())

module.exports = Routers
