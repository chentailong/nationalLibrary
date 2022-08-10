//文章推荐
let express = require('express');
let pool = require('../pool');
let router = express.Router();
module.exports = router


//实现查询文章功能
//get /article
//http://127.0.0.1:9000:library/art/article
router.get('/article', (req, res) => {
    pool.query('select * from l_article', (error, result) => {
        if (error) throw error
        if (result) {
            res.send({code: 200, data: result})
        } else {
            res.send({code: 404, data: '没有数据'})
        }
    })
})

//查询文章详情
//get /art_detail
//http://127.0.0.1:9000/library/art/art_detail?tid=1
router.get('/art_detail', (req, res) => {
    let tid = req.query.tid
    let sql = 'select * from l_article where tid=?'
    pool.query(sql, [tid], (error, result) => {
        if (error) throw error
        if (result) {
            console.log(result)
            res.send({code: 200, data: result})
        } else {
            res.send({code: 404, data: '暂无数据'})
        }
    })
})

//查询四条文章数据，用于首页显示
//get /indexArticle
//http://127.0.0.1:9000:library/art/indexArticle
router.get('/indexArticle', (req, res) => {
    pool.query('select * from l_article LIMIT 4', (error, result) => {
        if (error) throw error
        if (result) {
            res.send({code: 200, data: result})
        } else {
            res.send({code: 404, data: '没有数据'})
        }
    })
})

//分页查询
//get /newPaging
//http://127.0.0.1:9000:library/art/newPaging
router.get('/newPaging', (req, res) => {
    let start = parseInt(req.query.start);
    let sql = 'select * from l_article LIMIT ?,?'
    let count = 9;
    if (start === null || start === 0) {
        start = 1
    }
    pool.query(sql, [(start - 1) * count, count], (error, result) => {
        if (error) throw error
        if (result) {
            res.send({code: 200, data: result})
        } else {
            res.send({code: 404, data: '没有数据'})
        }
    })
})
