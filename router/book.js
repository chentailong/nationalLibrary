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

//根据分类查询图书数据
//get /bookCl
//http://127.0.0.1:9000/library/book/bookCl?bclass=?
router.get('/bookCl', (req, res) => {
    let bclass = req.query.bclass
    let sql = 'select * from l_book where bclass=?'
    pool.query(sql, [bclass], (error, result) => {
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
    let sql = 'SELECT * FROM l_book LIMIT 10'//查数据表前10条数据
    pool.query(sql, (error, result) => {
        if (error) throw error
        if (result) {
            res.send({code: 200, data: result})
        } else {
            res.send({code: 404, data: '没有数据'})
        }
    })
})

//根据id查询具体图书(涉及多表查询)
//get /books
//http://127.0.0.1:9000/library/book/bookId?bid=1
router.get('/bookId', (req, res) => {
    let id = req.query.bid
    let sql = 'select * from l_det,l_book  where l_det.bid=l_book.bid and l_det.bid=?'
    pool.query(sql, [id], (error, result) => {
        if (error) throw error
        if (result) {
            res.send({code: 200, data: result})
        } else {
            res.send({code: 404, data: '没有数据'})
        }
    })
})

//添加收藏

//获取随机推荐图书
//get /randomBook
//http://127.0.0.1:9000/library/book/randomBook
router.get('/randomBook', (req, res) => {
    let sql = 'select * from l_book order by rand() limit 15;'
    pool.query(sql, (error, result) => {
        if (error) throw error
        if (result) {
            res.send({code: 200, data: result})
        } else {
            res.send({code: 404, data: '没有数据'})
        }
    })
})