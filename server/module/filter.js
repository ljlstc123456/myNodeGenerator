/* 
* @Author: Marte
* @Date:   2017-07-20 09:59:23
* @Last Modified by:   Marte
* @Last Modified time: 2017-08-29 15:27:15
*/

exports.authorize = function(req, res, next) {
  if (!req.session.islogin) {
    res.redirect('/login');
  } else {
    next();
  }
}

exports.authorizeAjax = function(req, res, next) {
  if (!req.session.islogin) {
    res.send('{"status":0,"msg":"未登录","data":[]}');
  } else {
    next();
  }
}

exports.authorizeModule= function(req, res, next) {
  var id = req.params.id;
  if (!req.session.islogin) {
    res.redirect('/login');
  }else if(id) {
    var flags = req.session.auth.findIndex(function(value, index, arr) {  
      return value.id == id;  
    }) ;
    if(flags!=-1){
      next() ;
    }else{
      res.render('nopower');
    }
  }else{
    next();
  }

  
  
}