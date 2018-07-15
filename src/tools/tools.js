
const MongoClient = require('mongodb').MongoClient;

// Connection URL
const url = 'mongodb://localhost:27017';
 
// Database Name
const dbName = '2018-07-10';

//封装共有的，只在此页面使用

const template = (collections,callback) => {
    MongoClient.connect(url,{ useNewUrlParser: true } , function(err, client) {

        //
        const db = client.db(dbName);   
        //获取文档集
        const collection = db.collection(collections);
        callback(collection,client)
    })
}

exports.findOne=(collections,data,callback)=>{
    MongoClient.connect(url,{ useNewUrlParser: true } , function(err, client) {

        //
        const db = client.db(dbName);   
        //获取文档集
        const collection = db.collection(collections);
        collection.findOne({username:data.username,password:data.password},(err,docs)=>{
            callback(err,docs)
            client.close()
    })
})
}

//函数封装
 const functi = (collections,callback)=>{
    MongoClient.connect(url,{ useNewUrlParser: true } , function(err, client) {
         //
         const db = client.db(dbName);   
         //获取文档集
         const collection = db.collection(collections);
         callback(client,collection)
    })
 }

exports.findOneWithInsertOne = (collections,data,callback) => {
   
   template(collections,) 
       collection.findOne({username:data.username},(err,docs)=>{
           client.close()
           callback(err,docs)
       
      })
  
}


//插入新用户
exports.insertInfo=(collections,data,callback) => {//参一与参二为型参，
    template(collections,(collection,client)=>{
        collection.insertOne({username:data.username,password:data.password},(err,data)=>{
            client.close()
            callback(err,data)
        })
    })
}