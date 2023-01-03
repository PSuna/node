var express = require('express');
const pool = require('../sql/pool');
var router = express.Router();

//로그아웃
router.get("/",(req,res)=>{
    req.session.destroy(); // 세션 삭제
    res.send();
});

module.exports = router;