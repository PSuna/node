var express = require('express');
const pool = require('../sql/pool');
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

// 단건조회 - 주소창에 조회할 id 부분을 :id로 표현
router.get("/:id",(req,res)=>{ // 뒤에 id를 통해 출력해야하므로
  sql = "select * from customers where id = ?";
  let id = req.params.id; // 클라이언트가 경로(path)를 통해 값을 넘기므로
  
  // pool.query(sql, 보낼 data , 콜백함수)
  // sql 문에대한 결과가 results에 저장됨
  pool.query(sql, id , function(err, results, fields){ 
    if(err){ // 에러가 있다면 출력
      console.log(err);
    }
    res.json(results[0]); // 객체배열 형태로 넘어가므로 1개만 넘어가도록함 , json(스트링) 형태로 보냄 // json (스트링) => "{ }"
  });

});

//등록
router.post("/",(req,res)=>{
  let sql = "insert into customers set ?";

  // pool.query(sql, 보낼 data , 콜백함수)
  // sql 문에대한 결과가 results에 저장됨
  // 여기서 req.body는 json형태가 파싱된거임
  pool.query(sql, req.body, function(err, results, fields){  // 여기서 results의 형태는 object임
    if(err){ // 에러가 있다면 출력
      console.log(err);
    }
    res.json(results); // results를 json(스트링) 형태로 보냄 // json (스트링) => "{ }"
  });

});

 //수정 - 주소창(path)에 수정할 id 부분을 :id로 표현
router.put("/:id",(req,res)=>{
  let sql = "update customers set ? where id = ?";

  // ★★ 물음표가 2개이상이면 값을 배열로 넣어줘야함
  // [{객체형태의 변경할 값}, 변경할 id값]
  // req.body는 json(객체) 형태임
  let data = [req.body, req.params.id];

  // pool.query(sql, 보낼 data , 콜백함수)
  // sql 문에대한 결과가 results에 저장됨
  pool.query(sql, data ,function(err, results, fields){ 
    if(err){ // 에러가 있다면 출력
      console.log(err);
      throw err; // 에러 던짐
    }

    /* res.statusCode=200;
    res.end(); */

    let resultData = {}
    if(results.changedRows > 0){ // 수정된게 있다면
      resultData.result = true;
      resultData.data = req.body;
    }else{
      resultData.result = false;
    }
    res.send(resultData); // 쿼리문 결과 출력
  });

});

// 삭제 - 주소창(path)에 삭제할 id 부분을 :id로 표현
router.delete("/:id",(req,res)=>{
  let sql = "delete from customers where id = ?";
  
  let id = req.params.id; // 클라이언트가 path를 통해 값을 넘기므로

  // connection.query(sql, 보낼 data , 콜백함수)
  // sql 문에대한 결과가 results에 저장됨
  pool.query(sql, id ,function(err, results, fields){ 
    if(err){ // 에러가 있다면 출력
      console.log(err);
    }
    res.statusCode=200;
    res.end();
    // res.json(results); // 쿼리문 결과 출력 // 혹은 res.statusCode=200; res.end();
  });
});

module.exports = router;