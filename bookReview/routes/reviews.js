var express = require('express');
const pool = require('../sql/pool');
var router = express.Router();

/* GET 리뷰 전체 페이지 */
router.get('/', function(req, res, next) {
  let sql = "select * from reviews";
   pool.query(sql, function(err, results, fields){  // 여기서 results의 형태는 object임
    if(err){ // 에러가 있다면 출력
      console.log(err);
    }
    //console.log(results);
    res.render("review",{session:req.session, reviews : results});
  });
});

// 단건 조회
router.get('/:no', function(req, res, next) {
  let sql = "select * from reviews where no = ?";
  let no = req.params.no;
   pool.query(sql, no ,function(err, results, fields){  // 여기서 results의 형태는 object임
    if(err){ // 에러가 있다면 출력
      console.log(err);
    }
    //console.log(results);
    res.render("reviewInfo",{session:req.session, reviews : results[0]});
  });
});
  
module.exports = router;