/* 
* @Author: Marte
* @Date:   2017-07-20 16:36:04
* @Last Modified by:   Marte
* @Last Modified time: 2017-08-30 17:45:25
*/
//任何配置都需要配置3个环境，开发测试和线上
const resultApi = {
    "Online":{host:"xxx.xxx.com",port:9205},
    "Dev":{host:"xxx.xxx.com",port:8080},
    "Test":{host:"xxx.xxx.com",port:80}
}
const redisDB = {
    "Online":{   //创建新的mongodb数据库,存储session数据
        host: 'xxx.xxx.xxx.xxx', //数据库的地址，本机的话就是127.0.0.1，也可以是网络主机
        port: "6379",          //数据库的端口号
        db: 1,        //数据库的名称。
        username:"",//数据库用户名
        password:""//密码
    },
    "Dev":{   //创建新的mongodb数据库,存储session数据
        host: 'xxx.xxx.xxx.xxx', //数据库的地址，本机的话就是127.0.0.1，也可以是网络主机
        port: "6379",          //数据库的端口号
        db: 1,        //数据库的名称。
        username:"",//数据库用户名
        password:""//密码
    },
    "Test":{   //创建新的mongodb数据库,存储session数据
        host: 'xxx.xxx.xxx.xxx', //数据库的地址，本机的话就是127.0.0.1，也可以是网络主机
        port: "6379",          //数据库的端口号
        db: 1,        //数据库的名称。
        username:"",//数据库用户名
        password:""//密码
    }
}


module.exports = {
    resultApi:resultApi[global.env],
    redisDB:redisDB[global.env]
};