const CarouselDao = require('../dao/CarouselDao')
module.exports = {
  /**
   * 获取轮播图数据
   * @param {Object} ctx
   */
  Carousel: async ctx => {
    let carousel = await CarouselDao.Carousel()
    ctx.body = {
      code: '001',
      carousel
    }
  }
}

