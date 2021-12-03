const db = require('./db')
module.exports = {
  Songs: async () => {
    const sql = 'select * from songs left join portfolio on(songs.portfolio_id=portfolio.portfolio_id)'
    return await db.query(sql,[])
  },
  SongsByPortfolio: async (portfolio_id) => {
    const sql = 'select * from songs where portfolio_id = ?'
    return await db.query(sql,portfolio_id)
  },
  DownLoad: async (id) => {
    const sql = 'select url from songs where song_id = ?'
    return await db.query(sql,id)
  },
  Search: async word => {
    const sql = `select * from songs left join portfolio on(songs.portfolio_id=portfolio.portfolio_id) where name like "%${ word }%"`
    return await db.query(sql,[])
  },
  Like: async (songId, userId) => {
    const sql = `insert into like_song (song_id, user_id) values (?, ?)`
    return await db.query(sql,[songId, userId])
  },
  FindLike: async (songId, userId) => {
    const sql = `select * from like_song where song_id = ? and user_id = ?`
    return await db.query(sql,[songId, userId])
  },
  FindLikeByUser: async (userId) => {
    const sql = `select * from songs left join like_song on(songs.song_id=like_song.song_id) left join portfolio on(songs.portfolio_id=portfolio.portfolio_id) where user_id = ?`
    return await db.query(sql,[userId])
  },
  DeleteLike: async (songId, userId) => {
    const sql = `delete from like_song where song_id = ? and user_id = ?`
    return await db.query(sql,[songId, userId])
  },
}
