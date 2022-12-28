import { Router } from "express";
const route = Router();

// 주소창 : /customer/ 입력하였을때
route
  .get("/", (req,res)=>{
      res.send("get customer");
  })
  .post("/", (req,res)=>{
      res.send("post customer");
  })
  .put("/", (req,res)=>{
      res.send("put customer");
  })
  .delete("/",(req,res)=>{
      res.send("delete customer");
  });

  export default route;