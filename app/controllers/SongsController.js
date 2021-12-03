const send = require('koa-send')
const SongsDao = require('../dao/SongsDao')
const fs = require("fs");
module.exports = {
  Songs: async ctx => {
    let songs = await SongsDao.Songs()
    ctx.body = {
      code: '003',
      songs
    }
  },

  SongsByPortfolio: async ctx => {
    console.log("后端："+ctx.request.body)
    let data = ctx.request.body.portfolio_id
    let songs = await SongsDao.SongsByPortfolio(data)
    // console.log(songs)
    ctx.body = {
      code: '004',
      songs,
    }
  },
  DownLoad: async ctx => {
    const id = ctx.request.params.id
    const path =  await SongsDao.DownLoad(id)
    const url = path[0].url
    console.log('url:'+url)
    ctx.attachment(url)
    let res = await send(ctx, url)
    console.log('res:'+res)
  },
  Search: async ctx => {
    const word = ctx.request.body.word
    let songs = await SongsDao.Search(word)
    ctx.body = {
      code: '007',
      songs
    }
  },
  FindLikeByUser: async ctx => {
    const userId = ctx.request.body.userId
    console.log(userId)
    let likes = await SongsDao.FindLikeByUser(userId)
    ctx.body = {
      code: '008',
      likes
    }
  },
  LikeSongs: async ctx => {
    const userId = ctx.request.body.userId
    const songId = ctx.request.body.songId
    let like_songs = await SongsDao.FindLike(songId, userId)
    if (like_songs.length !== 0) {
      await SongsDao.DeleteLike(songId, userId)
      ctx.body = {
        code: '006',
        msg: '已取消喜欢'
      }
    } else {
      await SongsDao.Like(songId, userId)
      ctx.body = {
        code: '007',
        msg: '已喜欢'
      }
    }
  }
}
