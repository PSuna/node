/* work.js */
const http = require("http");  // require : import 선언과 같은것 => import http from "http" 와 같은것
todoList = [
  {content:"test1",completed : false},
  {content:"test2",completed : true},
  {content:"test3",completed : false},
  {content:"test4",completed : false}
];

const server = http.createServer((req,res)=>{ // 서버 생성

  const myUrl = new URL("http://127.0.0.1:3000" + req.url); // const는 변경불가하게 하는 변수타입
  if(myUrl.pathname == "/todolist"){
    res.end(JSON.stringify(todoList));
  }else if(myUrl.pathname == "/todo"){
    // http://127.0.0.1:3000/todo?no=1
    // 배열에서 todoList[1]
    let no = parseInt(myUrl.searchParams.get("no"));
    res.end(JSON.stringify(todoList[no]));
  }
});

server.listen(3000,()=>{
  console.log("server running http://127.0.0.1:3000");
}) //서버 구동
