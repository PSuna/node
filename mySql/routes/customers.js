var express = require('express');
const pool = require('../test/pool');
var router = express.Router();


// 전체조회
router.get("/",(req,res)=>{

  sql = "select * from customers";

  // sql 문에대한 결과가 results에 저장됨
  pool.query(sql, function(err, results, fields){ 
    if(err){ // 에러가 있다면 출력
      console.log(err);
    }
    res.json(results); // json(스트링) 형태로 보냄 // json (스트링) => "{ }"
  });

});

// 단건조회
router.get("/:id",(req,res)=>{ // 뒤에 id를 통해 출력해야하므로
  sql = "select * from customers where id = ?";
  let id = req.params.id;
  // sql 문에대한 결과가 results에 저장됨
  pool.query(sql, id , function(err, results, fields){ 
    if(err){ // 에러가 있다면 출력
      console.log(err);
    }
    res.json(results[0]); // 배열로 넘어가므로 1개만 넘어가도록함 , json(스트링) 형태로 보냄 // json (스트링) => "{ }"
  });

});

//등록
router.post("/",(req,res)=>{
  let sql = "insert into customers set ?";
  // sql 문에대한 결과가 results에 저장됨
  pool.query(sql, req.body, function(err, results, fields){ 
    if(err){ // 에러가 있다면 출력
      console.log(err);
    }
    res.json(results); // json(스트링) 형태로 보냄 // json (스트링) => "{ }"
  });

});

//수정
router.put("/:id",(req,res)=>{
  let sql = "update customers set ? where id=?";

  // ★★ 물음표가 2개이면 값을 배열로 넣어줘야함
  // [{변경할 값}, 변경할 id값]
  let data = [res.json(req.body),req.params.id]; 

  // connection.query(sql, 보낼 data , 콜백함수)
  // sql 문에대한 결과가 results에 저장됨
  connection.query(sql, data ,function(err, results, fields){ 
    if(err){ // 에러가 있다면 출력
      console.log(err);
    }
    res.json(results); // 쿼리문 결과 출력
});

});

// 삭제
router.delete("/:id",(req,res)=>{
  let sql = "delete from customers where id = ?";
  
  let id = req.params.id;

  // connection.query(sql, 보낼 data , 콜백함수)
  // sql 문에대한 결과가 results에 저장됨
  pool.query(sql, id ,function(err, results, fields){ 
    if(err){ // 에러가 있다면 출력
      console.log(err);
    }
    res.statusCode=200;
    res.end();
    // res.json(results); // 쿼리문 결과 출력 // 혹은 res.statusCode=200;
  });
});

module.exports = router;