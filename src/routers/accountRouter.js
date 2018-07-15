//引入模块
const express = require('express')
const path = require('path')

//创建路由,并连接

const router = express.Router();


//处理

//获取控制器中的方法的路径
const conteollersPath = require(path.join(__dirname,'../controllers/controller.js'))

router.get('/login',conteollersPath.loginPage)

//验证码模块
router.get('/vcode',conteollersPath.vcode)
//因为都是模块 所以要暴露出来

//注册paga模块
router.get('/register',conteollersPath.registerPage)

//注册模块
router.post('/register',conteollersPath.register)

//登陆模块
router.post('/login',conteollersPath.login)
//
module.exports = router
