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
    let sql = 'select tcont from l_article where tid=?'
    console.log(req.query)
    pool.query(sql, [tid], (error, result) => {
        if (error) throw error
        if (result) {
            res.send({code: 200, data: result})
        } else {
            res.send({code: 404, data: '暂无数据'})
        }
    })
})
