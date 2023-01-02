var express = require('express');
const pool = require('../sql/pool');
var router = express.Router();

//등록
router.post("/",(req,res)=>{
  let sql = "insert into members set ?";
  // pool.query(sql, 보낼 data , 콜백함수)
  // sql 문에대한 결과가 results에 저장됨
  // 여기서 req.body는 json형태가 파싱된거임
  pool.query(sql, req.body, function(err, results, fields){  // 여기서 results의 형태는 object임
    if(err){ // 에러가 있다면 출력
      console.log(err);
    }
    
    //res.render("main",{ title: 'Express' }); // 화면에 그려줌 ("파일명",{넘길값}) , 만들어진 화면을 클라이언트에게 넘겨줌
    res.json(results); // results를 json(스트링) 형태로 보냄 // json (스트링) => "{ }"

  });

});

module.exports = router;