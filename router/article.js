//文章推荐
let express = require('express');
let pool = require('../pool');
let router = express.Router();
module.exports = router

router.get('/login', (req, res) => {
    pool.query('select * from l_article', (error, success) => {
        if (error) throw error
        if (success) {
            res.send({code: 200, data: success})
        } else {
            res.send({code: 404, data: '没有数据'})
        }
    })
})