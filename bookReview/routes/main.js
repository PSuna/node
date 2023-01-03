var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render("main",{session:req.session}) // 세션정보를 보냄
});

module.exports = router;
