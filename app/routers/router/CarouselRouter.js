const CarouselController = require('../../controllers/CarouselController')
const Router = require("koa-router");

let CarouselRouter = new Router()

CarouselRouter
  .get('/carousel',CarouselController.Carousel)


module.exports = CarouselRouter

