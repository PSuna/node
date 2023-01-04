var express = require('express');
const pool = require('../sql/pool');
var router = express.Router();

router.get('/', function(req, res, next) {
  let sql = "select * from reviews where score = 5"; // 별점이 5점인것만 나타내도록
	
  pool.query(sql,function(err, results, fields){  // 여기서 results의 형태는 object임
    if(err){ // 에러가 있다면 출력
      console.log(err);
    }
    res.render("popularBook",{session:req.session, books:results}); // 세션정보를 보냄
  });
  
  
});



module.exports = router;