//用户路由,用于登录注册使用
let express = require('express');
let pool = require('../pool');
let router = express.Router();

module.exports = router

//查询用户名是否已经注册
router.get('/check_name', (req, res) => {
    // http://127.0.0.1:9000/library/user/check_name?uname=ctl
    var sql = 'select * from l_user where uname=?';
    var uname = req.query.uname;
    console.log(uname)
    pool.query(sql, [uname], (error, result) => {
        if (error) throw error
        console.log(result)
        if (result.length === 0) {
            res.send({code: 200, msg: "no-exists"})
        } else {
            res.send({code: 200, msg: "exists"})
        }
    })
})

//注册用户
//get /register
//接口名称http://127.0.0.1:9000/library/user/reg
router.get('/reg', (req, res) => {
    console.log(req.query)
    let sql = 'insert into l_user set ?';
    pool.query(sql, [req.query], (error, result) => {
        if (error) throw error
        if (result.affectedRows !== 0) {
            res.send({code: 200, msg: '注册成功'})
        } else {
            res.send({code: 200, msg: '注册失败'})
        }
    })
})


//实现用户登录
//接口名称http://127.0.0.1:9000/library/user/login
router.get('/login', (req, res) => {
    let user = req.query.uname
    let pwd = req.query.upwd
    let sql = 'select * from l_user where uname=? and upwd=?';
    pool.query(sql, [user, pwd], (error, request) => {
        if (error) throw error
        console.log(request)
        if (request.length === 0) {
            res.send("登录失败")
        } else {
            res.send("登录成功")
        }
    })
})

