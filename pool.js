//数据库连接池文件
let mysql = require('mysql');
let pool = mysql.createPool({
    host: '127.0.0.1',
    port: '3307',
    user: 'root',
    password: '',
    database: 'library',
    connectionLimit: 15
});
//暴露连接池对象
module.exports = pool;