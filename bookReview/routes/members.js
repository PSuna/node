var express = require('express');
const pool = require('../sql/pool');
var router = express.Router();

//회원가입
router.post("/",(req,res)=>{
  let sql = "insert into members set ?";
  // pool.query(sql, 보낼 data , 콜백함수)
  // sql 문에대한 결과가 results에 저장됨
  // 여기서 req.body는 json형태가 파싱된거임
  pool.query(sql, req.body, function(err, results, fields){  // 여기서 results의 형태는 object임
    if(err){ // 에러가 있다면 출력
      console.log(err);
    }
    res.json(results);
  });

});

module.exports = router;