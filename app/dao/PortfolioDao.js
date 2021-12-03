const db = require('./db')
module.exports = {
  Portfolio: async () => {
    const sql = 'select * from portfolio'
    return await db.query(sql,[])
  },
  Search: async word => {
    const sql = `select * from portfolio where portfolio_name like "%${ word }%" or op like "%${ word }%" or type like "%${ word }%" or orchestra like "%${ word }%"   `
    return await db.query(sql,[])
  },
  Like: async (portfolio_id, userId) => {
    const sql = `insert into like_portfolio (portfolio_id, user_id) values (?, ?)`
    return await db.query(sql,[portfolio_id, userId])
  },
  FindLike: async (portfolio_id, userId) => {
    const sql = `select * from like_portfolio where portfolio_id = ? and user_id = ?`
    return await db.query(sql,[portfolio_id, userId])
  },
  FindLikeByUser: async (userId) => {
    const sql = `select * from portfolio left join like_portfolio on(portfolio.portfolio_id=like_portfolio.portfolio_id) where user_id = ?`
    return await db.query(sql,[userId])
  },
  DeleteLike: async (portfolio_id, userId) => {
    const sql = `delete from like_portfolio where portfolio_id = ? and user_id = ?`
    return await db.query(sql,[portfolio_id, userId])
  },
}
