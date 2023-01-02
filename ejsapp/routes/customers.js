const express = require("express");
const mysql = require("mysql");

const pool = require("../../exam/sql/pool");
const router = express.Router();


router.get("/",(req,res)=>{
  const sql = "select * from customers";
  pool.query(sql,(err,results)=>{
    
    res.render("customers",{list:results}) // 화면에 그려줌 ("파일명",{넘길값}) , 만들어진 화면을 클라이언트에게 넘겨줌
    
  })

});

module.exports = router;