//引入模块
const express = require('express')

//创建服务
const app = express()
const path = require('path')
const bodyParser = require('body-parser');

const session = require('express-session')

app.use(session({ secret: 'keyboard cat',resave:true,saveUninitialized:true, cookie: { maxAge: 10*60000 }}))
//请求 、处理、响应

// app.use('/index',path.join())


//静态资源

app.use(express.static(path.join(__dirname,'statics')))//唯一的一个中间件

//post请求处理方法
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
//集成登陆 路由中间件
const accountRouter = require(path.join(__dirname,'./routers/accountRouter.js'))
app.use('/account',accountRouter)

//集成学生信息 路由中间件
const studentInfo = require(path.join(__dirname,'./routers/studentInfo.js'))
app.use('/studentmanager',studentInfo)

//链接服务器

app.listen(3000,'127.0.0.1',err=>{
    if(err){
        console.log(err)
    }
    console.log('success')
})