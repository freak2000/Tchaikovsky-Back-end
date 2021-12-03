const Router = require('koa-router')
const UserRouter = new Router()
// const upload = require('../../middleware/multerConfig')

const UserController = require('../../controllers/UserController')

UserRouter
  .post('/user/login',UserController.Login)
  .post('/user/signup',UserController.SignUp)
  .post('/user/msg',UserController.UserMsg)
  .post('/user/modify',UserController.modifyMsg)
  .post('/user/avatar',UserController.setAvatar)

module.exports = UserRouter
