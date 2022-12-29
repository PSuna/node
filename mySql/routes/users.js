var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) { /* /users/ */
  res.send('respond with a resource');
});

router.post("/login",function(req,res){ /* /users/login */
  req.session.email = req.body.email; //post 파라미터(이메일)
  req.session.is_logined = true; // 로그인 되었는지 여부
  req.session.save((err)=>{ // 저장할때 에러가 나면 실행하는 함수
    if(err) throw err;
    res.redirect("/"); // index의 페이지로 이동
  });
});

// 로그아웃 요청시 세션 삭제후 로그인 페이지로 이동
router.post("/logout",(req, res,next) => { /* /users/logout */
  req.session.destroy(); // destroy() 함수를 사용해서 세션 삭제
  res.redirect("/login.html"); // 로그인 페이지로 이동
});

module.exports = router;
