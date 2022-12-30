/*update.js*/

const mysql = require("mysql"); //mysql 모듈 로드

//mysql 접속 정보
const conn = {
  host : "localhost",
  port : "3306",
  user : "dev01",
  password : "1234",
  database : "dev"
}

let connection = mysql.createConnection(conn); //DB 컨넥션 생성
connection.connect(); // DB 접속

// set ? 을 사용한 sql문 => 이걸 사용하면 ?자리에 들어올값에(data) 객체로 넣어줘야함
let sql = "update customers set ? where id=?";

// ★★ 물음표가 2개이면 값을 배열로 넣어줘야함
// [{변경할 값}, 변경할 id값]
let data = [{email:"park@gmial.com", name : "park"},3]; 


/* set을 사용하지 않은 sql문
let sql = "update customers set email=?, name=? where id=?";
let data = ["park@gmial.com", "park", 17]; */


// connection.query(sql, 보낼 data , 콜백함수)
// sql 문에대한 결과가 results에 저장됨
connection.query(sql, data ,function(err, results, fields){ 
  if(err){ // 에러가 있다면 출력
    console.log(err);
  }
  console.log(results); // 쿼리문 결과 출력
});

connection.end(); // DB접속 종료
