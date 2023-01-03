var express = require('express');
const pool = require('../sql/pool');
var router = express.Router();

router.get('/', function(req, res, next) {
  let sql = "select * from reviews where userId = ?";
  let data = req.session.userId;
   pool.query(sql,data, function(err, results, fields){  // 여기서 results의 형태는 object임
    if(err){ // 에러가 있다면 출력
      console.log(err);
    }
    console.log(results);
    res.render("myPage",{session:req.session, reviews : results});
  });
});

router.get('/:no', function(req, res, next) {
  let sql = "select * from reviews where no = ?";
   pool.query(sql,req.params.no, function(err, results, fields){  // 여기서 results의 형태는 object임
    if(err){ // 에러가 있다면 출력
      console.log(err);
    }
    console.log(results);
    res.render("myWrite",{session:req.session, reviews : results[0]});
  });
});


module.exports = router;