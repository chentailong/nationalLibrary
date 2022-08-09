// 图书接口
let express = require('express');
let pool = require('../pool');
let router = express.Router();
module.exports = router

//查询全部图书
//get /books
//http://127.0.0.1:9000/library/book/books
router.get('/books', (req, res) => {
    let sql = 'select * from l_book'
    pool.query(sql, (error, result) => {
        if (error) throw error
        if (result) {
            res.send({code: 200, data: result})
        } else {
            res.send({code: 404, data: '没有数据'})
        }
    })
})

//查询十条图书，用于首页显示
//http://127.0.0.1:9000/library/book/indexBook
router.get('/indexBook', (req, res) => {
    let sql = 'SELECT * FROM l_book LIMIT 10'
    pool.query(sql, (error, result) => {
        if (error) throw error
        if (result) {
            res.send({code: 200, data: result})
        } else {
            res.send({code: 404, data: '没有数据'})
        }
    })
})