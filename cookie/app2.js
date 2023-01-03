const express = require("express");
var cookieParser = require('cookie-parser')
const app = express();

app.use(cookieParser());


app.get("/", (req, res) => {
  //쿠키
  console.log("cookies:" , req.cookies.test); // 쿠키정보 읽어오기
  res.cookie("test","test") // 쿠키 정보 넣기
  res.send("express");
});

app.listen(3000,()=>{
  console.log("server running http://localhost:3000");
});