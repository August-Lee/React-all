var MongoClient = require('mongoose');
var DB_CONN_STR = 'mongodb://localhost:27017/li';
const express = require('express');
const app = express();
const path = require('path');
var http = require('http');
var fs = require('fs');
var querystring = require('querystring');
var formidable = require('formidable');
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();
var ObjectId = require('mongodb').ObjectId;
var params;

app.use(express.static(path.join(__dirname, 'public')))
app.listen(80,() => {
    console.log(`App listening at port 80`);
})
//用户
app.post("/sendList",function(req,res){
        params = req.body;
        MongoClient.connect(DB_CONN_STR, function(err, db) {
            console.log("连接成功！");
            insertData(db, function(result) {
                res.status(200).json(result);
                db.close();
            },"user");
        });
})
app.post("/updateUser",function(req,res){
        params = req.body;
        MongoClient.connect(DB_CONN_STR, function(err, db) {
            console.log("连接成功！");
            updateData(db, function(result) {
                res.status(200).json(result);
                db.close();
            },"user");
        });
})
app.get("/getUser",function(req,res){
        MongoClient.connect(DB_CONN_STR, function(err, db) {
            console.log("连接成功！");
            selectData(db, function(result) {
                console.log(result);
                res.status(200).json(result);
                db.close();
            },"user");
        });

})
app.post("/deleteUser",function(req,res){
        params = req.body;
        MongoClient.connect(DB_CONN_STR, function(err, db) {
            console.log("连接成功！");
            removeData(db, function(result) {
                res.status(200).json(result);
                db.close();
            },"user");
        });
})
app.post("/login",function(req,res){
        params =req.body;
        console.log(params);
        MongoClient.connect(DB_CONN_STR, function(err, db) {
            console.log("连接成功！");
            findData(db, function(result) {
                console.log(result);
                res.status(200).json(result);
                db.close();
            },"user");
        });
})
//首页
app.post("/updateList",function(req,res){
    params = req.body;
    MongoClient.connect(DB_CONN_STR, function(err, db) {
        console.log("连接成功！");
        updateData(db, function(result) {
            res.status(200).json(result);
            db.close();
        },"list");
    });
})
app.post("/addSlide",function(req,res){
        params = req.body;
        MongoClient.connect(DB_CONN_STR, function(err, db) {
            console.log("连接成功！");
            insertData(db, function(result) {
                res.status(200).json(result);
                db.close();
            },"site");
        });
})
app.get("/getSlide",function(req,res){
    MongoClient.connect(DB_CONN_STR, function(err, db) {
        console.log("请求轮播图成功！");
        selectData(db, function(result) {
            res.status(200).json(result);
            db.close();
        },"site");
    });

})
app.get("/getList",function(req,res){
    MongoClient.connect(DB_CONN_STR, function(err, db) {
        console.log("请求小院列表成功！");
        selectData(db, function(result) {
            var arr=[];
            if(result.data){
                list=result.data;
                for(var ele of list){
                    arr=[];
                    for (var i of ele.detail){
                        arr.push(i.response.data);
                        console.log(arr);
                    }
                    ele.detail=arr;
                }
            }
            res.status(200).json(result);
            db.close();
        },"list");
    });

})
app.post("/deleteSlide",function(req,res){
        params = req.body;
        MongoClient.connect(DB_CONN_STR, function(err, db) {
            console.log("连接成功！");
            removeData(db, function(result) {
                res.status(200).json(result);
                db.close();
            },"site");
        });

})
app.post("/deleteList",function(req,res){
        params = req.body;
        MongoClient.connect(DB_CONN_STR, function(err, db) {
            console.log("连接成功！");
            deleteData(db, function(result) {
                res.status(200).json(result);
                db.close();
            },"list");
        });

})
app.post("/addList",function(req,res){
    params = req.body;
    params.update= new Date();
    MongoClient.connect(DB_CONN_STR, function(err, db) {
        console.log("连接成功！");
        insertData(db, function(result) {
            res.status(200).json(result);
            db.close();
        },"list");
    });
})
app.post("/upload",multipartMiddleware,function(req, res, next) {
    var oldpath = req.files.file.path;
    var newpath = './public/images/' + req.files.file.name;

    fs.readFile(oldpath, function (err, data) {
        if (err) throw err;
        console.log('File read!');
        fs.writeFile(newpath, data, function (err) {
            if (err) throw err;
            var result={code:'0',msg:'succ',data:{url:newpath,name:req.files.file.name}};
            res.status(200).json(result);
            res.end();
            console.log('File written!');
        });
        // Delete the file
        fs.unlink(oldpath, function (err) {
            if (err) throw err;
            console.log('File deleted!');
        });
    });

})
var insertData = function(db, callback,name) {
    var collection = db.collection(name);
    var data = params;
    collection.insert(data, function(err, result) {
        if(err)
        {
            console.log('Error:'+ err);
            return;
        }
        // console.log(result);
        callback(result);
    });
}
var updateData = function(db, callback,name) {
    var collection = db.collection(name);
    var data = params._id;
    var clone =params;
    delete clone._id;
    console.log(data);
    console.log(clone);
    collection.update({"_id": ObjectId(data)},{$set:clone}, function(err, result) {
        if(err)
        {
            console.log('Error:'+ err);
            return;
        }
        // console.log(result);
        callback(result);
    });
}
var findData = function(db, callback,name) {
        var collection = db.collection(name);
        var data = params;
        collection.find(data).toArray(function(err, result) {
            if(err)
            {
                console.log('Error:'+ err);
                return;
            }
            var data;
            if(result[0]==undefined){
                data={code:'1',msg:'err'}
            }else{
                data={code:'0',msg:'succ'}
            }
            callback(data);
        });
}
var selectData = function(db, callback,name) {
        var collection = db.collection(name);
        collection.find().toArray(function(err, result) {
            if(err)
            {
                console.log('Error:'+ err);
                return;
            }
        if(result[0]==undefined){
            data={code:'1',msg:'err'}
        }else{
            data={code:'0',msg:'succ',data:result}
        }
        callback(data);
    });
}
var removeData = function(db, callback,name) {
    var collection = db.collection(name);
    var data = params;
    console.log(data);
    collection.remove({"uname": data.uname},function(err, result) {
        if(err)
        {
            console.log('Error:'+ err);
            return;
        }
        callback(result);
    });
}
var deleteData = function(db, callback,name) {
    var collection = db.collection(name);
    var data = params;
    console.log(data);
    collection.remove({"name": data.name},function(err, result) {
        if(err)
        {
            console.log('Error:'+ err);
            return;
        }
        callback(result);
    });
}

