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

function query(sql){
  return new Promise((resolve,reject)=>{
    pool.query(sql,(err,results,fields)=>{
      resolve(results);
    })
  });

}


module.exports = {pool, query}; // 외부로부터 사용가능, 객체인데 필드명과 변수먕이 같다면 생략하고 하나만 선언가능