var http = require('http');
var url=require("url");  
var querystring = require('querystring');
var Promise = require("bluebird");
var config = require('../config');

exports.get = function(reqs,path,data){
    return new Promise(function(resolve, reject) {
        var headers = reqs.headers;
        delete reqs.headers.host;
        if (reqs.session.islogin) {
            headers.token = reqs.session.data.token ;
        }
        var options = {
            host: config.resultApi.host,
            port: config.resultApi.port,
            path: path,
            method: 'GET',
            headers:headers
        };
		
        if(typeof data == 'object'){
        	
            options.path += "?"+querystring.stringify(data) ;
        }
        var str='';
        var req = http.request(options, function(res) {
            res.setEncoding('utf8');
            res.on('data', function (data) {
            	str+=data ;
            });
            res.on('end', function(){
				resolve(JSON.parse(str));
			});
        });
        
        req.on('error', function(e){
           reject(new Error('User cancelled'));
           console.log("auth_user error: " + e.message);
        });

        req.end();
      });
}


/**
 * 转发客户端的请求
 */
exports.post = function(sreq,path,success){
    var headers = sreq.headers;
    delete sreq.headers.host;
    if (sreq.session.islogin) {
        headers.token = sreq.session.data.token ;
    }
    var opts={  
        host:config.resultApi.host,
        port:config.resultApi.port,  
        path:path,  
        method:"POST",
        headers:headers
    };  
    var post_data = querystring.stringify(sreq.body);
    var str='';
    var req = http.request(opts, function(res) {  
        res.setEncoding('utf8');
        res.on('data',function(data){
        	str+=data;
        }) ;
        res.on("end",function(){
        	success(JSON.parse(str));  
        });
    });
    req.write(post_data);
    req.on('error', function(e) {  
        console.log("Got error: " + e.message);  
    });
    req.end();  
} ;
