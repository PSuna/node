var express = require('express');
const pool = require('../sql/pool');
var router = express.Router();

sql = {
  select : "select * from board",
  insert : "insert into board set ?",
  update : "update board set ? where no = ?",
  delete : "delete from board where no = ?"
}

// 전체조회
router.get("/", function(req,res){
  pool.query(sql.select, function(err, results, fields){
    res.json(results); // res.send(results)도 됨 , 결과를(json string 형태) 클라이언트로 보냄
  });
})

// 게시글 등록
router.post("/",function(req,res){
  pool.query(sql.insert, req.body, function(err, results, fields){
    res.json(results); // res.send(results)도 됨 , 결과를(json string 형태) 클라이언트로 보냄
  });
})

// 수정
router.put("/:no",function(req,res){
  let data = [req.body,req.params.no];
  pool.query(sql.update, data, function(err, results, fields){
    res.json(results); // res.send(results)도 됨 , 결과를(json string 형태) 클라이언트로 보냄
  });
})

// 삭제
router.delete("/:no",function(req,res){
  pool.query(sql.delete, req.params.no, function(err, results, fields){
    let resultData = {};
    if(results.affectedRows > 0){ // 삭제된게 있다면
      resultData.result = true;
    }else{
      resultData.result = false; // 삭제된게 없다면
    }
    res.send(resultData); // 쿼리문 결과 출력 */
  });
})


module.exports = router;



