var express = require('express');
var router = express.Router();
var sign = require('./sign');
/* GET home page. */
router.get("/", function(req, res, next) {
	var reqData = {
		startTime:"",
		endTime: "",
		currentPage: 1
	};
	var promise1 = sign.get(req, '/promotion/promotion/effectIndex', reqData);
	promise1.done(function(data) {
		if(!data.result&&data.msg == "未登录"){
            res.redirect('/login/out');
        }else{
            res.render('module/module3',{data:data});
            res.end(); 
        }   
	});
});

module.exports = router;