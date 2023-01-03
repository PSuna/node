var express = require('express');
const pool = require('../sql/pool');
var router = express.Router();

/* GET 리뷰페이지 */
router.get('/', function(req, res, next) {
  let sql = "select * from books";
  
  pool.query(sql, function(err, results, fields){  // 여기서 results의 형태는 object임
    if(err){ // 에러가 있다면 출력
      console.log(err);
    }
    console.log(results);
    res.json(results);
  });
});
  
module.exports = router;