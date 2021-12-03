const PortfolioDao = require('../dao/PortfolioDao')
module.exports = {
  Portfolio : async ctx => {
    let portfolio = await PortfolioDao.Portfolio()
    ctx.body = {
      code: '002',
      portfolio
    }
  },
  Search : async ctx => {
    const word = ctx.request.body.word
    let portfolio = await PortfolioDao.Search(word)
    ctx.body = {
      code: '007',
      portfolio
    }
  },
  FindLikeByUser: async ctx => {
    const userId = ctx.request.body.userId
    console.log(11115)
    console.log(userId)
    let likes = await PortfolioDao.FindLikeByUser(userId)
    ctx.body = {
      code: '008',
      likes
    }
  },
  LikePortfolio: async ctx => {
    const userId = ctx.request.body.userId
      const portfolioId = ctx.request.body.portfolio_id
    // console.log(userId)
    let like_songs = await PortfolioDao.FindLike(portfolioId, userId)
    if (like_songs.length !== 0) {
      await PortfolioDao.DeleteLike(portfolioId, userId)
      ctx.body = {
        code: '006',
        msg: '已取消喜欢'
      }
    } else {
      await PortfolioDao.Like(portfolioId, userId)
      ctx.body = {
        code: '007',
        msg: '已喜欢'
      }
    }
  }
}
