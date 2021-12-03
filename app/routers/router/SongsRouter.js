const SongsController = require('../../controllers/SongsController')
const Router = require('koa-router')

const SongsRouter = new Router()

SongsRouter
  .get('/songs/allSongs',SongsController.Songs)
  .post('/songs/songByPortfolio',SongsController.SongsByPortfolio)
  .get('/songs/download/:id',SongsController.DownLoad)
  .post('/songs/search',SongsController.Search)
  .post('/songs/like',SongsController.LikeSongs)
  .post('/songs/likedSongs',SongsController.FindLikeByUser)
module.exports = SongsRouter
