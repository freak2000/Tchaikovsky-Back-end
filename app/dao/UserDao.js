const db = require('./db')

module.exports = {
  Login: async (username, password) => {
    const sql = 'select * from user where username = ? and password = ?'
    return await db.query(sql,[username, password])
  },
  SignUp: async (username, password, sex, birth, introduction) => {
    const sql = 'insert into user (id,username,password,sex,birth,introduction) values (null,?,?,?,?,?)'
    return await db.query(sql,[username, password, sex, birth, introduction])
  },
  UserMsg: async (userId) => {
    const sql = 'select * from user where id = ?'
    return await db.query(sql,[userId])
  },
  ModifyMsg: async (userId ,username, password, sex, birth, introduction) => {
    const sql = 'update user set username=?, password=?, sex=?, birth=?, introduction=? where id = ?'
    return await  db.query(sql,[username, password, sex, birth, introduction, userId])
  },
  SetAvatar: async (filePath,id) => {
    console.log(filePath)
    const sql = 'update user set avatar=? where id =?'
    return await db.query(sql,[filePath,id])
  }
}
