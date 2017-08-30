var express = require('express');
var router = express.Router();
var sign = require('./sign');
/* GET home page. */
router.get("/", function(req, res, next) {
    var promise1 = sign.get(req,'/sys/sysAdminBuilding/listSysAdmin') ;
    promise1.done(function(data){
        if(!data.result&&data.msg == "未登录"){
            res.redirect('/login/out');
        }else{
            res.render('module/module1',data);
            res.end(); 
        }     
    }) ;


    
});

module.exports = router;