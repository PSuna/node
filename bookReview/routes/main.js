var express = require('express');
const pool = require('../sql/pool');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render("main",{session:req.session}) // 세션정보를 보냄
});

router.post("/",(req,res)=>{
	let sql = "insert ignore into books set ?"; // ignore : 책제목이 기본키이고, 중복값 무시
	//console.log(req.body);
		pool.query(sql, req.body, function(err, results, fields){  // 여기서 results의 형태는 object임
			if(err){ // 에러가 있다면 출력
				console.log(err);
			}
			res.json(results);
  	});
})

router.get("/:no",function(req, res, next) {
	let sql = "select * from books where no = ?";
  let no = req.params.no;
	pool.query(sql, no, function(err, results, fields){  // 여기서 results의 형태는 object임
		if(err){ // 에러가 있다면 출력
			console.log(err);
		}
		res.render("book_info",{session:req.session, book:results[0]}) // 세션정보를 보냄
	});
});

module.exports = router;
