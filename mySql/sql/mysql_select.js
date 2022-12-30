/*select.js*/

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

sql = "select * from customers";
connection.query(sql, function(err, results, fields){ // sql 문에대한 결과가 results에 저장됨
  if(err){ // 에러가 있다면 출력
    console.log(err);
  }
  console.log(results); // 쿼리문 결과 출력 // results : json 객체 구조임
  // res.json(results)는 res.send(results) 와같음
});

connection.end(); // DB접속 종료
