const http = require("http"); // http.js(모듈)의 http 객체 참조
const fs = require("fs"); //파일 시스템

// 서버 선언(클라이언트 요청 시 호출(처리)될 핸들러)
const server = http.createServer((req,res)=>{ // requestListener : 요청이 들어왔을때 실행되는 함수
  const myurl = new URL("http://localhost:3000" + req.url);

  console.log("pathname:" , myurl.pathname);
  console.log("searchParam",myurl.searchParams);

  if(myurl.pathname.startsWith("/page")){ // startsWith("특정문자열") : 해당문자열이 특정문자열로 시작하는가
    const pagename = "./template" + myurl.pathname.substring(5) + ".html"; // /page 까지 자르고 그뒤에 파일명
    fs.readFile(pagename,"utf8",(err,data)=>{ // (파일경로, 인코딩, 콜백함수);
                                              // 파일을 다읽고나면 콜백함수가 실행됨 date : 파일을 read한 내용
      res.end(data);
    });
  }else{
    res.end("no path");
  }
});

server.listen(3000, () => { // listeningListener : 서버가 동작(구동)되면 호출하는 함수
  console.log("server running http://localhost:3000"); // localhost : 127.0.0.1 과 같음
}); 