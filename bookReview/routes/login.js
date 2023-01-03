var express = require('express');
const pool = require('../sql/pool');
var router = express.Router();

//로그인
router.post("/",(req,res)=>{
  let sql = "select * from members where userId = ?";
  let data = req.body.userId;
  console.log("data",data);
  
  pool.query(sql, data, function(err, results, fields){  // 여기서 results의 형태는 object임
    if(err){ // 에러가 있다면 출력
      console.log(err);
    }
    let login = {};
    if((req.body.userId == results[0].userId) && (req.body.password == results[0].password)){ // 아이디와 비밀번호가 동일하다면
      req.session.logined = true; // 로그인
      req.session.userId = req.body.userId; // 유저 아이디 저장
      login.result = true;  // 로그인 성공시 true값 전달
    }else{ // 로그인 실패시 false 값 전달
      login.result = false;
    }
    res.send(login);
  });
});

module.exports = router;