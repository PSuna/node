var express = require('express');
const pool = require('../sql/pool');
var router = express.Router();

//조회
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

// 단건조회
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

// 수정
router.put('/:no', function(req, res) {
  let sql = "update reviews set ? where no =?";
  let no = req.params.no;
  let data = [req.body, no];

   pool.query(sql,data, function(err, results, fields){  // 여기서 results의 형태는 object임
    if(err){ // 에러가 있다면 출력
      console.log(err);
    }
    let resultData = {};
    if(results.changedRows > 0){ // 수정된게 있다면
      resultData.result = true;
    }else{
      resultData.result = false;
    }
    res.send(resultData); // 쿼리문 결과 출력
  });
});

// 삭제
router.delete("/:no",(req,res)=>{
  let sql = "delete from reviews where no = ?";
  let no = req.params.no; // 클라이언트가 path를 통해 값을 넘기므로

  pool.query(sql, no ,function(err, results, fields){ 
    if(err){ // 에러가 있다면 출력
      console.log(err);
    }

    let resultData = {};
    if(results.affectedRows > 0){ // 삭제된게 있다면
      resultData.result = true;
    }else{
      resultData.result = false; // 삭제된게 없다면
    }
    res.send(resultData); // 쿼리문 결과 출력 */
  });
});





module.exports = router;