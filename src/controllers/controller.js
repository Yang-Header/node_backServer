//引入模块
const path = require('path')
const captchapng = require('captchapng');
const mongodb = require('mongodb')
// const MongoClient = require('mongodb').MongoClient;
const MongoClients = require(path.join(__dirname,'../tools/tools'))
// var router = express.Router(); 
const loginPath = path.join(__dirname,'../views/login.html')


// Connection URL
// const url = 'mongodb://localhost:27017';
 
// Database Name
// const dbName = '2018-07-10';



//登陆模块
exports.loginPage =(req,res)=>{
    //返回一个静态页面(res.sendFile 文件读取后返回)
    res.sendFile(loginPath)
}

//验证码模块
exports.vcode=(req,res)=>{
    //返回一张编辑后的图片
    console.log('a')
    const vcode = parseInt(Math.random()*9000+1000)
    const p = new captchapng(80,30,vcode); // width,height,numeric captcha
        p.color(0, 0, 0, 0);  // First color: background (red, green, blue, alpha)
        p.color(80, 80, 80, 255); // Second color: paint (red, green, blue, alpha)

        let img = p.getBase64();
        let imgbase64 = new Buffer(img,'base64');
        res.writeHead(200, {
            'Content-Type': 'image/png'
        });
        req.session.vcode = vcode
        res.end(imgbase64);
}


//注册page模块
exports.registerPage=(req,res)=>{
    res.sendFile(path.join(__dirname,'../views/register.html'))
}

//注册模块
exports.register = (req,res) =>{
    const {username,password} = req.body
    
}


exports.register = (req,res) =>{
    // MongoClient.connect(url,{ useNewUrlParser: true } , function(err, client) {

    //     //
    //     const db = client.db(dbName);   
    //     //获取文档集
    //     const collection = db.collection('userInfo');
    
    //    collection.findOne({username:req.body.username},(err,docs)=>{
    //     //    console.log(docs)
    //     //定义一个对象返回
        const result = {"status":0,"message":"注册成功"}
    //         if(docs==null){
    //             collection.insertOne({username:req.body.username,password:req.body.password},(err,data)=>{
    //                 console.log(data)
    //             })
    //             client.close();
    //             res.send(result)

    //         }else{
    //             client.close()
    //             result.status=1
    //             result.message='此用户名已存在'
    //             res.send(result)
    //         }
    //    })
    //   });

    MongoClients.findOneWithInsertOne('userInfo',req.body,(err,docs)=>{
        if(docs==null){
           //掉用方法
            console.log('aa')
            res.send(result)
            MongoClients.insertInfo('userInfo',req.body,(err,docs)=>{
                // console.log(docs)
            })
        }else{
            console.log('bb')
            result.status=1
            result.message='此用户名已存在'
            res.send(result)
        }
    })

}



//登陆模块
exports.login=(req,res)=>{
    console.log(req.session)
    let result = {
        status:0,
        message:'登陆成功'
    }

    //首先验证 验证码是否正确

    if(req.body.vcode!=req.session.vcode){
        console.log(req.session.vcode)
        result.status=0
        result.message='验证码错误'
        res.send(result)
    }
    
    MongoClients.findOne('userInfo',req.body,callback=(err,docs)=>{
        if(docs!=null){
                    
                    res.send(result)
                }else{
                    
                    result.status=2
                    result.message='用户名或密码错误'
                    res.send(result)
                }
              
    })
}