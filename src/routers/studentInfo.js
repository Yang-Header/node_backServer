//引入模块
const express = require('express')
const path = require('path')

//创建路由,并连接

const router = express.Router();


//处理

//获取控制器中的方法的路径
const conteollersPath = require(path.join(__dirname,'../controllers/studentInfo.js'))

router.get('/list',conteollersPath.getStudentListPage)


//暴露模块
module.exports=router

