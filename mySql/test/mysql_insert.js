/*insert.js*/

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

sql = "insert into customers set ?"; // values를 따로 안주고 set ? 해주면 자동으로 데이터가 들어감
let data = { // id는 자동부여이므로 안해도됨
  name: "최기자",
  email: "ab@com",
  phone: "010-1234",
  address: ""
};

// connection.query(sql, 보낼 data , 콜백함수)
// sql 문에대한 결과가 results에 저장됨
connection.query(sql, data ,function(err, results, fields){ 
  if(err){ // 에러가 있다면 출력
    console.log(err);
  }
  console.log(results); // 쿼리문 결과 출력
});

connection.end(); // DB접속 종료
