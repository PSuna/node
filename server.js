const http = require("http");

let infoArr = [];
// 배열에 인덱스 대신에 key를 넣어서 작성해줄수도있음
infoArr["kim"] = { name: "김유신", hobby: "게임" };
infoArr["park"] = { name: "박기자", hobby: "독사" };

const server = http.createServer((req, res) => {
  console.log(req.url);
  const myurl = new URL("http://127.0.0.1:3000" + req.url); // 스트링값이 객체로 들어감

  console.log(myurl.pathname);
  console.log(myurl.searchParams);

  // http://127.0.0.1:3000/
  if (myurl.pathname == "/") {
    res.end("main"); // 요청 메세지를 보냄 // res.write 와 res.end를 합친것

    // http://127.0.0.1:3000/info
  } else if (myurl.pathname == "/info") {
    // res.statusCode = 200; // 성공 코드
    //res.setHeader("content-type", "text/plain"); // text/plain : 메모장
    //res.setHeader("content-type", "application / octet - stream"); // application / octet - stream : 파일 다운로드

    res.setHeader("content-type", "text/html"); // content-type : mime type을 의미 => 파일의 형식 - 종류가 아주많음
    let userid = myurl.searchParams.get("userid");
    res.end(info(userid)); // ★★ 요청 완료라는 말 , ★ 무조건 end를 해줘야함 없으면 계속 대기상태에 있음

    // http://127.0.0.1:3000/boardReg
  } else if (myurl.pathname == "/boardReg") {
    res.write(boardReg());
    res.end();
  } else if (myurl.pathname == "/boardRegAction") {
    let title = myurl.searchParams.get("title");
    let content = myurl.searchParams.get("content");
    console.log("title", title);
    console.log("content", content);
    res.end("등록완료");
  } else if (myurl.pathname == "/userReg") {
    res.write(userReg());
    res.end();
  } else if (myurl.pathname == "/userRegAction") {
    let userid = myurl.searchParams.get("userid");
    let username = myurl.searchParams.get("username");
    let pw = myurl.searchParams.get("pw");
    let hp = myurl.searchParams.get("hp");
    console.log("userid", userid);
    console.log("username", username);
    console.log("pw", pw);
    console.log("hp", hp);
    res.end("회원가입완료");
  }
  // 지정해 놓은 사이트가 아닌 아무거나 입력하였을때
  else {
    res.statusCode = 404; // 404 에러 코드 , 성공은 200
    res.end();
  }

  /* console.log(req.url); //req.url : 요청 들어온 url 주소
  res.write("hello");
  res.end(); // 응답 완료라는 말 */
}); //콜백함수 req, res (람다식으로 표시함)

// 포트번호, listeningListener
server.listen(3000, () => {
  console.log("server is running http://127.0.0.1:3000");
}); // 이 포트로 서버를 구축한다는 말, 지정포트로 수신대기, 서버가 준비되면 콜백함수를 호출함

function info(userid) {
  if (!userid || !infoArr[userid]) {
    return "no user";
  }
  let html = `<!DOCTYPE html>
                <html lang="en">
                <head>
                  <meta charset="UTF-8">
                  <meta http-equiv="X-UA-Compatible" content="IE=edge">
                  <meta name="viewport" content="width=device-width, initial-scale=1.0">
                  <title>Document</title>
                </head>
                <body>
                  <h3>my info</h3>
                  <div> id : ${userid ? userid : ""}</div>
                  <div>이름: ${infoArr[userid].name}</div>
                  <div>취미: ${infoArr[userid].hobby}</div>
                </body>
                </html>`;
  //★("")로해도 되지만 엔터키를 포함시켜야하므로 백틱(``)을 씀

  return html;
}

function boardReg() {
  let html = `<!DOCTYPE html>
                <html lang="en">
                  <head>
                    <meta charset="UTF-8" />
                    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                    <title>Document</title>
                  </head>
                  <body>
                    <h3>게시글 작성!!~~~~!!!~</h3>
                    <form action="/boardRegAction">
                      <div>제목
                        <input type="text" name="title"/>
                      </div>
                      <div>내용
                        <textarea name="content" id="" cols="30" rows="10"></textarea>
                      </div>
                      <div>
                        <button>등록</button>
                      </div>
                    </form>
                  </body>
                </html>`;
  return html;
}

function userReg() {
  let html = `<!DOCTYPE html>
              <html lang="en">
                <head>
                  <meta charset="UTF-8" />
                  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
                  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                  <title>Document</title>
                </head>
                <body>
                  <form action="userRegAction">
                    <input type="text" name="userid" placeholder="id" />
                    <input type="text" name="username" placeholder="이름" />
                    <input type="text" name="pw" placeholder="비밀번호" />
                    <input type="text" name="hp" placeholder="전화번호" />
                    <button>회원가입</button>
                  </form>
                </body>
              </html>`;
  return html;
}
