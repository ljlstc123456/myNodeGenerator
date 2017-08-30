var express = require('express');
var router = express.Router();
var sign = require('./sign');
var filter = require('./filter');
var menu = {
    "module1":{class:"administrator",icon:"icon-login_user"},
    "module2":{class:"xuke",icon:"icon-menu_icon1_normal"},
    "module3":{class:"generalize-result",icon:"icon-menu_icon2_normal"}
} ;
/* GET home page. */
router.get('/',filter.authorize, function(req, res, next) {
    

    //请求数据1
    var promise1 = sign.get(req,'/sys/sysResource/getMenu') ;
    promise1.done(function(data){
        if(!data.result&&data.msg == "未登录"){
            res.redirect('/login/out');
        }else{
            data.menu = menu ;
            data.user = req.session.data ;

            //权限保存在session中
            req.session.auth = data.data ;


            res.render('index',data);
            res.end(); 
        }
        
    }) ;
   
});

module.exports = router;
