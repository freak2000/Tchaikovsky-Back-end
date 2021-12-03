const path = require('path')
module.exports = {
  Port: 8852,
  staticDir: path.resolve('./public'),
  uploadDir: path.join(path.resolve('public/imgs/avatar')),
  dbConfig: {
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: '191711',
    database: 'tchaikovsky'
  }
}
