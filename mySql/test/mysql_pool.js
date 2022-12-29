/*mysql_pool.js*/
const pool = require("./pool"); // pool.js 에서 모듈을 가져옴

sql = "select * from customers";

// sql 문에대한 결과가 results에 저장됨
pool.query(sql, function(err, results, fields){ 
  if(err){ // 에러가 있다면 출력
    console.log(err);
  }
  console.log(results); // 쿼리문 결과 출력
});

// pool.release()