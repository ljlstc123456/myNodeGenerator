var express = require('express');
//var cookieSession = require('cookie-session')
var FileStreamRotator = require('file-stream-rotator') ;
var session = require('express-session');
var RedisStrore = require('connect-redis')(session);
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var MongoStore = require('connect-mongo')(session);

var config = require('./config');
var router = require('./router');

var app = express();
var logDirectory = path.join(__dirname, 'log');

//定义静态资源路径
app.locals.static = config.static ;




// view engine setup
app.set('./views', path.join(__dirname, './views'));
//app.set('view engine', 'jade');
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, './', 'favicon.ico')));


//配置日志切割
var accessLogStream = FileStreamRotator.getStream({
  date_format: 'YYYYMMDD',
  filename: path.join(logDirectory, 'access-%DATE%.log'),
  frequency: 'daily',
  verbose: false
}) ;

logger.token('from', function(req, res){
    return req.query.from || '-';
});
logger.format('pretang', '[pretang]:remote-addr:referrer [:date[clf]]:method :url :status :from');

//==================日志输出=======================
app.use(logger('combined', {stream: accessLogStream})) ;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'static'),{maxAge: 1000000}));

// app.use(session({
//     secret: '12345',
//     name: 'testapp',
//     cookie: {maxAge: 4*60*60*1000 },
//     resave: false,
//     saveUninitialized: true
// }));


var configRedis={
"cookie" : {
   "maxAge" : 3.9*60*60*1000
},
"sessionStore" : {
   "host" : config.redisDB.host,
   "port" : config.redisDB.port,
   "pass" : "",
   "db" : config.redisDB.db,
   "ttl" : 1800,
   "logErrors" : true
}
}

app.use(session({
    name : "naryou",
    secret : 'Asecret123-',
    resave : false,
    rolling:true,
    saveUninitialized : true,
    cookie : configRedis.cookie,
    store : new RedisStrore(configRedis.sessionStore)
}));
// app.use(session({
//     secret: '12345',
//     name: 'testapp',
//     cookie: {maxAge: 3.9*60*60*1000 },
//     resave: false,
//     rolling:true,
//     saveUninitialized: true,
//     store: new MongoStore({   //创建新的mongodb数据库
//         host: config.mongodb.host,    //数据库的地址，本机的话就是127.0.0.1，也可以是网络主机
//         port: config.mongodb.port,          //数据库的端口号
//         url: 'mongodb://'+config.mongodb.host+'/'+config.mongodb.db,
//         username:config.mongodb.username,
//         password:config.mongodb.password
//     })
// }));



router.init(app) ;

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  res.render('404');
  res.end();
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error',{msg:err.message});
  console.log("500:"+err.message) ;
  res.end();
});

module.exports = app;
