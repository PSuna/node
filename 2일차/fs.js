/* fs.js 
비동기식 = non-blocking 함수 => 콜백함수이용 
*/
const fs = require("fs");
fs.readFile("./template/test.txt","utf-8",(err,data)=>{
  console.log(data); // 나중에 이게 실행됨
});
console.log("the end"); // 이게 먼저 실행됨


