import { Router } from "express";
const route = Router(); // 라우트 객체생성

route
    .get("/",(req,res)=>{
    // ?writer=kim (쿼리스트링 일때)
    console.log("writer",req.query.writer); // 쿼리 스트링일때 req.query 사용
    console.log("wdt",req.query.wdt);
    res.send("board get");
    })

    .post("/",(req,res)=>{
    console.log(req.body.title); // json(스트링)형식일때 req.body 사용
    res.send("board post");
    })

    .put("/",(req,res)=>{
        res.send("board put");
    })
    
    .delete("/:boardno",(req,res)=>{ // 뒤에 입력할 값에 : (콜론) 필요
        console.log("boardno",req.params.boardno); // path(경로)에 데이터값이 입력된 경우 req.params 사용
        res.send("board delete");
    });

export default route; // 외부에서 접근 가능