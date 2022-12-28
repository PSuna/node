import { Router } from "express";
const route = Router();

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