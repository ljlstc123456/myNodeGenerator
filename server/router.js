var index = require('./module/index');
var login = require('./module/login');
// var module = require('./module/module');
var httpProxy = require('http-proxy');
var config = require('./config');
var filter = require('./module/filter');
var sign = require('./module/sign');
exports.init = function(app){
    var proxy = httpProxy.createProxyServer();
    //首页
    app.use('/',index);
    
    //登录页面
    app.use('/login',login);
    
    //菜单里面的模块
    app.use('/module/:id',filter.authorizeModule,function(req, res, next){
        var id = req.params.id;
        if (id) {
            return require('./module/module'+id)(req, res, next);
        } else {
            return require('./module/module')(req, res, next); // 将控制转向下一个符合URL的路由
        }
    });


    proxy.on('error', function(err, req, res) {
        res.end();
    });




    //需要登录拦截，直接透传
    app.use('/api',function(req,res,next){
        delete req.headers.host;
        if (req.session.islogin) {
            req.headers.token = req.session.data.token ;
        }
        //post提交无法中转，这里用nodejs再次发起post请求
        if(JSON.stringify(req.body)!="{}"){
            sign.post(req,req.path,function(data){
                res.json(data) ;
            }) ;
        }
        else{
            //req.headers['token'] = '123123';
            proxy.web(req, res, {
                target: "http://"+config.resultApi.host+":"+config.resultApi.port+"/"
            });
        }
    });
}