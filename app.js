//web服务器文件,入口文件
var express = require('express');
var app = express();
var port = 9000;
app.listen(port);
app.use(express.static('./public'));
app.use(express.urlencoded({extended: true}))

//引用自定义路由
let loginRouter = require('./router/user');
app.use('/library/user', loginRouter);
let art = require('./router/article');
app.use('/library/art', art);
