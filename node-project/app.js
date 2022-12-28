import express from "express"; 
//★★ require이 아닌 import를 사용하기 위해선 package.json에 "type" : "module"을 추가해야함
// import하는 다른 .js 파일들도 require를 모두 import로 바꿔줘야함
import boardRouter from "./routes/board.js"; //require("파일경로")에선 확장자를 생략해야함
import customerRouter from "./routes/customer.js"; 

const app = express(); // http.createServer()와 같은 역할
const port = 3000;

app.use(express.urlencoded({extended:false})); // url 인코딩
app.use(express.json()); //json 파싱, json(스트링)형식으로 데이터를 post할때

app.use("/board",boardRouter); // /board로 들어온경우 boardRouter로 가라는말
app.use("/customer",customerRouter);// /customer로 들어온경우 customerRouter로 가라는말

app.use(function(err,req,res,next){ // 에러가 발생하였을때 실행하는 함수
  res.send(500).json({code : res.statusCode, msg : err.message});
})

app.get("/login",function(req,res){
  console.log(req.query.email); // express는 쿼리스트링을 알아서 파싱해서 query에다가 넘겨줌
  res.send("로그인 완료");
})

//=============================================================
// 주소창 : http://localhost:3000/main.html
app.use(express.static("public")); // 정적 컨텐츠가 모여있는 폴더 : 이걸통해 바로 접근 가능

// 주소창 : http://localhost:3000/static/main.html
//app.use("/static",express.static("public")); // 가상경로
//=============================================================

// 콜백함수를 여러개 넣어줄수있음
//인수에 함수를 계속 만들어주면됨(pathname,첫밴째핸들러(콜백함수),두번째핸들러(콜백함수)....)
app.get("/example", (req,res,next)=> { // 첫번째 핸들러(인수) 중간에 send할수없음
  //throw new Error("에러발생");
  console.log("첫번째 콜백"); 
  next(); // next()를 해줘야 다음 핸들러(콜백함수)로 넘어감
  },
  (req,res) => { // 두번째 핸들러(인수)
    res.send("두번째 콜백"); // 항상 마지막 콜백함수에서 send를 해줘야함
  }
);

app.get("/",(req,res) =>{  //http.createServer()안에 if(req.url == "/") 와 같은 역할
  res.send("Hello world!~"); // res.send는 write,end 합친거와 같다.
});

// /ab?cd => acd , abcd : b가 있거나 없거나의 의미
//app.get("/ab?cd",(req,res)=>{res.send("정규표현식")});

app.get("/ab[0-9]cd",(req,res)=>{res.send("정규표현식")});

app.listen(port, ()=>{
  console.log(`server running http://localhost:${port}`);
});