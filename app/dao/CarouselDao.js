// export let Carousel = undefined;
const db = require('./db')

module.exports = {
  Carousel: async () => {
    const sql = 'select * from carousel'
    return await db.query(sql,[])
  }
}
