
const MongoClient = require('mongodb').MongoClient;
const path = require('path')
const xtpl = require('xtpl')
const urls = require('url')
const querystring = require('querystring')
// Connection URL
const url = 'mongodb://localhost:27017';
 
// Database Name
const dbName = '2017-07-10';

exports.getStudentListPage=(req,res)=>{
    // console.log(req.url)
    const art = urls.parse(req.url)
    const key = querystring.parse(art.query)
    const keywords = key.keyword || ""
    MongoClient.connect(url,{ useNewUrlParser: true } , function(err, client) {
    const db = client.db(dbName);   
    //获取文档集
    const collection = db.collection('studentInfo');
    collection.find({name:{$regex:keywords}}).toArray(function(err, docs){
        // console.log(docs)
        xtpl.renderFile(path.join(__dirname,'../views/list.html'),{
            // RightContent:path.join(__dirname,'../views/list.html'),
            studentList:docs,
            keyword:keywords
        },function(error,content){
            res.send(content)
        })
        client.close()
    })

   

})
}
