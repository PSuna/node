/*mysql_pool.js*/
const mysql = require("./pool_async"); // pool.js 에서 모듈을 가져옴

sql1 = "select * from customers";
sql2 = "select * from board";


//프로미스 사용법
mysql.query(sql1)
.then((result)=> console.log(result));

async function get(){ // 비동기
  let result1 = await mysql.query(sql1); // 동기
  let result2 = await mysql.query(sql2,result1[0].id); // 동기: result1의 값이 들어감
  console.log({cust : result1, board:result2});
  // send 해서 두개의값 모두 보낼수있음
}

get();
