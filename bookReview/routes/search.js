var express = require('express');
const pool = require('../sql/pool');
var router = express.Router();

router.get("/",(req,res)=>{
  let sql = "select * from reviews where bookName like ?";
  let data = "%" + req.query.book + "%";
  //console.log(data);

  pool.query(sql, data, function(err, results, fields){  // 여기서 results의 형태는 object임
    if(err){ // 에러가 있다면 출력
      console.log(err);
    }
    console.log(results);
    //res.send("성공");
    res.render("search",{session:req.session, result : results});
  });

});



module.exports = router;