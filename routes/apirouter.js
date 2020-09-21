var express = require('express');
var router = express.Router();
var USER = require("../database/user");
var valid = require("../utils/valid");

router.post('/user', async(req,res,next)=>{
    var params = req.body;
  
    params["registerdate"] = new Date();
    var b = valid.checkParams(params);
    var a = valid.checkEmail(params.email);
    var c = valid.checkPassword(params.password);
    if(a==true && b==true&&c==true){
        var user = new USER(params);
    var result = await user.save();
    res.status(200).json(result);
    }
    if(a==false){
        res.status(300).json({msn : "Verifique que su Email sea valido."});
    }
    if(b==false){
        res.status(300).json({msn : "Verifique que halla escrito todos los parametros."});
    }
    if(c==false){
        res.status(300).json({msn : "Su contrasena debe tener al menos 2 numeros seguidos y letras."});
    }    
});
router.get('/user',(req,res)=>{
    var params = req.query;
    var limit = 10;
    if(params.limit != null){
        limit = parseInt(params.limit);
    }
    var order = -1;
    if (params.order != null) {
         if (params.order == "desc") {
              order = -1;
             } 
      else if (params.order == "asc") {
        order = 1;
          }
    }
    var skip = 0;
    if(params.skip != null){
        skip = parseInt(params.skip);
    }
    USER.find().limit(limit ).sort({order}).skip(skip).exec((err,docs)=>{
        res.status(200).json(docs);
    });
});

router.patch('/user',(req,res)=>{
    if(req.query.id==null){
        res.status(300).json({
            "mns" : "Error no existe id"
        });
        return;
    }
    var id = req.query.id;
    var params = req.body;
    USER.findOneAndUpdate({_id:id}, params, (err,docs)=>{
        res.status(200).json(docs);
    });
});
router.delete('/user', async(req,res)=>{
    if(req.query.id==null){
        res.status(300).json({
            "mns" : "Error de id"
        });
        return;
    }
    var id = req.query.id;
    var r = await USER.remove({_id:id});
    res.status(300).json(r);
});
module.exports = router;