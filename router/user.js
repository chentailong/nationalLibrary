//用户路由,用于登录注册使用
let express = require('express');
let pool = require('../pool');
let router = express.Router();

module.exports = router

//查询用户名是否已经注册
router.get('/check_name', (req, res) => {
    // http://127.0.0.1:9000/library/user/check_name?uname=ctl
    var format = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/
    var sql = 'select * from l_user where uname=?';
    var uname = req.query.uname;
    pool.query(sql, [uname], (error, result) => {
        if (error) throw error
        if (result.length === 0) {
            res.send("no-exists")
            return;
        } else {
            res.send("exists")
            return;
        }
    })
})

//判断格式
// http://127.0.0.1:9000/library/user/check_format?formats=?
router.get('/check_format', (req, res) => {
    var format = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/
    if (req.query.formats === req.query.formats.replace(format)) {
        res.send("正确格式为数字加字母，长度为6-16位")
    } else {
        res.send("格式正确")
    }
})

//注册用户
//get /register
//接口名称http://127.0.0.1:9000/library/user/reg
router.get('/reg', (req, res) => {
    let sql = 'insert into l_user set ?';
    pool.query(sql, [req.query], (error, result) => {
        if (error) throw error
        if (result.affectedRows !== 0) {
            res.send('注册成功')
        } else {
            res.send('注册失败')
        }
    })
})

//判断密码是否正确
//get /check_pwd
//接口名称http://127.0.0.1:9000/library/user/check_pwd?uname=?&upwd=?
router.get('/check_pwd', (req, res) => {
    let upwd = req.query.upwd
    let sql = 'select upwd from l_user where uname=?';
    pool.query(sql, [req.query.uname], (error, result) => {
        if (error) throw error
        let pwd = result[0].upwd;
        if (pwd === upwd) {
            res.send("旧密码正确")
        } else {
            res.send("旧密码错误")
        }
    })
})

// 修改密码
//get /update_pwd
//接口名称http://127.0.0.1:9000/library/user/update_pwd?new_upwd=?&uname=?
router.get('/update_pwd', (req, res) => {
    let new_upwd = req.query.new_upwd
    let uname = req.query.uname
    let sql = 'update l_user set upwd=? where uname=?';
    pool.query(sql, [new_upwd, uname], (error, result) => {
        if (error) throw error
        if (result.affectedRows > 0) {
            res.send("修改密码成功")
        } else {
            res.send("修改密码失败")

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
        if (request.length === 0) {
            res.send("登录失败")
        } else {
            res.send({code: 400, data: request})
        }
    })
})

//查询用户信息
//get /show_user
//接口名称http://127.0.0.1:9000/library/user/show_user?uname=?
router.get('/show_user', (req, res) => {
    let user = req.query.uname
    let sql = 'select uname,email,address,sex,phone from l_user where uname=?';
    pool.query(sql, [user], (error, request) => {
        if (error) throw error
        res.send({code: 200, data: request})
    })
})
