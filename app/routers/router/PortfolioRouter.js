const PortfolioController = require('../../controllers/PortfolioController')
const Router = require("koa-router")

let PortfolioRouter = new Router()

PortfolioRouter
  .get('/portfolio/allPortfolio',PortfolioController.Portfolio)
  .post('/portfolio/search', PortfolioController.Search)
  .post('/portfolio/like',PortfolioController.LikePortfolio)
  .post('/portfolio/likedPortfolio',PortfolioController.FindLikeByUser)
module.exports = PortfolioRouter
