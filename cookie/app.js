const http = require("http");
const cookie = require("cookie");

const server = http.createServer((req, res)=>{
  let cookies;
  if(req.headers.cookie){ // 쿠키정보가 있다면
    cookies = cookie.parse(req.headers.cookie); // 스트링을 파싱해서 객체로 만들어줌
    console.log(cookies.username);
  }
  console.log(cookies);

  res.writeHead(200,{ // (스테이터스 코드, 옵션) , 쿠키정보 저장하는법
    "Set-Cookie" : ["yummy_cookie=choco",
                    `username=hong; Max-Age = ${5*60}; HttpOnly; Path=/user`] 
                    // ["쿠키이름=값"];, Max-Age = ${2*60} => 5분, HttpOnly: 서버에서만 접근가능, Path를 user라고 했을때만 쿠기정보가 나옴
  
  });

  res.end("hello");
})
.listen(3000,()=>{
  console.log("server running http://localhost:3000");
}); // 메서드 체인



