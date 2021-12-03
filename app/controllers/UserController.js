const moment = require('moment')
const UserDao = require('../dao/UserDao')
const fs = require("fs");
const path = require('path');
const config = require('../../config')
// const { checkUserInfo, checkUserName } = require('../middleware/checkUserInfo')
module.exports = {
  Login: async ctx => {
    let username = ctx.request.body.username
    let password = ctx.request.body.password
    let user = await UserDao.Login(username, password)

    if(user.length === 0 ){
      ctx.body = {
        code: '006',
        msg: '用户名或密码错误'
      }
      return
    }
    if(user.length === 1) {
      ctx.body= {
        code: '005',
        msg: '登录成功',
        user: user
      }
      return
    }
    return
  },

  UserMsg: async ctx => {
    let userId = ctx.request.body.userId
    let user = await UserDao.UserMsg(userId)
    if (user.length === 1) {
      ctx.body = {
        code: '009',
        msg: '获取成功',
        user: user
      }
      return
    } else {
      ctx.body = {
        code: '010',
        msg: '获取失败'
      }
      return
    }
  },

  SignUp: async ctx => {
    let {username, password, sex, birth, introduction} = ctx.request.body
    birth = moment(birth).format("YYYY-MM-DD HH:mm:ss")
    try {
      let signUpResult = await UserDao.SignUp(username, password, sex, birth, introduction)
      // 操作所影响的记录行数为1,则代表注册成功
      if (signUpResult.affectedRows === 1) {
        ctx.body = {
          code: '001',
          msg: '注册成功',
          ss: signUpResult
        }
        return;
      }
      // 否则失败
      ctx.body = {
        code: '500',
        msg: '未知错误，注册失败',
        ss: signUpResult
      }
    } catch (error) {
      ctx.body = {
        code: '700',
        msg: '未知错误，注册失败',
      }
    }
  },
  modifyMsg :
    async ctx => {
      let {userId, username, password, sex, birth, introduction} = ctx.request.body
      birth = moment(birth).format("YYYY-MM-DD HH:mm:ss")
      let modifyResult = await UserDao.ModifyMsg(userId, username, password, sex, birth, introduction)
      if (modifyResult.affectedRows === 1) {
        ctx.body= {
          code: '001',
          msg: '修改成功'
        }
        return
      }
      ctx.body = {
        code: '500',
        msg: '未知错误，注册失败',
        modifyResult: modifyResult
      }
    },
  setAvatar :
    async (ctx, next) => {
      console.log(1)
      let file = ctx.request.files
      const userId= ctx.request.body.id
      // console.log(ctx.request.body.id)
      // return
      console.log(file);
      let filePath = file.avatar.path;
      filePath = filePath.substr(filePath.indexOf('public'))
      console.log("路径："+filePath)
      // const reader = fs.createReadStream(filePath);
      // const writer = fs.createWriteStream();
      // reader.pipe(writer);
      // let result;
      try {
        await UserDao.SetAvatar(filePath,userId).then(res => {
          console.log(res);
          ctx.body = {
            res: res,
            file: file,
            filePath: filePath
          }
        })
      } catch (error) {
        console.log(error);
      }
    }
}
