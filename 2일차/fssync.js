/* fssync.js 
동기식 = 블로킹 함수
*/
const fs = require("fs"); // html <script src="xxx.js"> 와 같은 역할
let data = fs.readFileSync("./template/test.txt","utf-8"); // 콜백함수가 없음
console.log(data);
