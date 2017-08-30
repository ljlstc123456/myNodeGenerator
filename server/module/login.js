var express = require('express');
var router = express.Router();
var sign = require('./sign');
/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('login',{msg:''});
    res.end();  
});


router.post('/action', function(req, res, next) {
    sign.post(req,'/sys/sysAdmin/login',function(data){
        if(data.result){
            req.session.islogin = 1 ;
            req.session.data =  data.data;
            res.redirect('/');
        }else{
            res.render('login',{msg:data.msg||"登录失败"});
            res.end();
        }
    }) ;
});
router.get('/out', function(req, res, next) {

    //接口服务器退出登录
    sign.get(req,'/sys/sysAdmin/logout') ;

    //清空nodejs服务器session
    req.session.destroy(function(err) {
      res.redirect('/login');
      res.end();  
    }) ;
});

module.exports = router;
