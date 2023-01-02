/* 모든 mysql에 통일한 pool 부분*/

const mysql = require("mysql"); //mysql 모듈 로드

//mysql 접속 정보
const conn = {
  host : "localhost",
  port : "3306",
  user : "dev01",
  password : "1234",
  database : "dev",
  connectionLimit : 10 // createPool() 일때 추가하는 부분 => pool을 10개만듦
}

let pool = mysql.createPool(conn); //DB컨넥션 생성
//pool.getConnection()

module.exports = pool; // 외부로부터 사용가능