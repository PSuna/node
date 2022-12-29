/*delete.js*/

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

let sql = "delete from customers where id=?";
let data = 3; // 삭제할 id 값

// connection.query(sql, 보낼 data , 콜백함수)
// sql 문에대한 결과가 results에 저장됨
connection.query(sql, data ,function(err, results, fields){ 
  if(err){ // 에러가 있다면 출력
    console.log(err);
  }
  console.log(results); // 쿼리문 결과 출력
});

connection.end(); // DB접속 종료
