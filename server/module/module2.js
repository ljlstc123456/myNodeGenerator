var express = require('express');
var router = express.Router();
var sign = require('./sign');
/* GET home page. */
router.get("/", function (req, res, next) {
  var data = {};
  var promise1 = sign.get(req, '/member/member/initData');
  var promise2 = promise1.then(function (data1) {
    data.data1 = data1;
    return sign.get(req, '/member/member/list');
  });
  promise2.done(function (data2) {
    if(!data2.result&&data2.msg == "未登录"){
      res.redirect('/login/out');
    }else {
      data.data2 = data2;
      res.render('module/module2', {data: data});
      res.end();
    }
  });
});

module.exports = router;