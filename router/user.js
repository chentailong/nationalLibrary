//用户路由,用于登录注册使用
let express = require('express');
let pool = require('../pool');
let router = express.Router();

module.exports = router

router.get('/check_name', (req, res) => {
    // http://127.0.0.1:9000/library/user/check_name?uname=ctl
    var sql = 'select * from l_user where uname=?';
    var uname = req.query.uname;
    console.log(uname)
    pool.query(sql, [uname], (error, result) => {
        if (error) throw error
        console.log(result)
        if (result.length === 0) {
            res.send("no-exists")
        } else {
            res.send("exists")
        }
    })
})