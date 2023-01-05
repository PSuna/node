var express = require('express');
const pool = require('../sql/pool');
var multer  = require('multer'); // 이미지파일을 저장하게 해주는 모듈
const session = require('express-session');
var router = express.Router();

  // 새로 추가한 부분
  //파일을 저장할 디렉토리 설정 (현재 위치에 uploads라는 폴더가 생성되고 하위에 파일이 생성된다.)
  
  // 예담에서
  /* const upload = multer({ 
      dest: "D:\\node\\bookReview\\public\\images", // 이미지 파일이 다운로드 되는 경로
  }) */


  //집에서
  const upload = multer({ 
    dest: "C:\\국비_예담\\node\\bookReview\\public\\images", // 이미지 파일이 다운로드 되는 경로
  })
  

  router.post('/', upload.single('picture_file'), (req, res, next) => {
    const { fieldname, originalname, encoding, mimetype, destination, filename, path, size } = req.file
    
    //const { name } = req.body;
    //name.userId = session.req.userId; // 유저 id
    // console.log("body 데이터 : ", name);
    /* console.log(__dirname);
    console.log("폼에 정의된 input type=file의 필드명 : ", fieldname);
    console.log("사용자가 업로드한 파일 명 : ", originalname);
    console.log("파일의 엔코딩 타입 : ", encoding);
    console.log("파일의 Mime 타입 : ", mimetype);
    console.log("파일이 저장된 폴더 : ", destination);
    console.log("destinatin(목적지)에 저장된 파일 명 : ", filename);
    console.log("업로드된 파일의 전체 경로 ", path);
    console.log("파일의 바이트(byte 사이즈)", size); */
    
    let sql = "insert into reviews set ?"

    req.body.userId = req.session.userId; // 유저 id
    req.body.picture = "/images/" + filename; // 컴퓨터에 다운로드된 파일 이미지 경로를 저장

    //console.log(req.body);

    pool.query(sql, req.body , function(err, results, fields){  // 여기서 results의 형태는 object임
      if(err){ // 에러가 있다면 출력
        console.log(err);
        res.send(err);
      }else {
        //res.redirect("/reviews");
        res.write("<script>alert('sucess');location.assign('/reviews')</script>");
    }
    });
  })


/* 기본 방법
// 리뷰 등록
router.post("/",(req,res)=>{
  let sql = "insert into reviews set ?";
  // pool.query(sql, 보낼 data , 콜백함수)
  // sql 문에대한 결과가 results에 저장됨
  // 여기서 req.body는 json형태가 파싱된거임
  let data = req.body;
  data.userId = req.session.userId;

  pool.query(sql, data, function(err, results, fields){  // 여기서 results의 형태는 object임
    if(err){ // 에러가 있다면 출력
      console.log(err);
    }
    res.json(results);
  });

});
*/

module.exports = router;