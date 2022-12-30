var express = require('express');
const pool = require('../sql/pool');
var router = express.Router();

sql = {
  select : "select * from books order by title",
  selectOne: "select * from books where no=?",
  insert : "insert into books set ?",
  update : "update books set ? where no = ?",
  delete : "delete from books where no = ?"
}

// 전체조회 - 전달할 data 없음
router.get("/", function(req,res){
  pool.query(sql.select, function(err, results, fields){
    res.json(results); // res.send(results)도 됨 , 결과를(json string 형태) 클라이언트로 보냄
  });
})

// 단건조회 - 전달할 data 있음
router.get("/:no",function(req,res){

  let no = req.params.no
  pool.query(sql.selectOne, no, function(err, results, fields){
    res.json(results); // res.send(results)도 됨 , 결과를(json string 형태) 클라이언트로 보냄
  });
})

// 등록 - 전달할 data 있음
router.post("/",function(req,res){
  pool.query(sql.insert, req.body, function(err, results, fields){
    res.json(results); // res.send(results)도 됨 , 결과를(json string 형태) 클라이언트로 보냄
  });
})


// 수정 - 전달할 data 있음
router.put("/:no",function(req,res){
  let data = [req.body,req.params.no];
  pool.query(sql.update, data, function(err, results, fields){
    res.json(results); // res.send(results)도 됨 , 결과를(json string 형태) 클라이언트로 보냄
  });
})


// 삭제 - 전달할 data있음
router.delete("/:no",function(req,res){
  pool.query(sql.delete, req.params.no, function(err, results, fields){
    res.json(results); // res.send(results)도 됨 , 결과를(json string 형태) 클라이언트로 보냄
  });
})

module.exports = router;