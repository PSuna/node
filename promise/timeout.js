function greet(){
  return new Promise((resolve,reject)=>{ //동기식이 가능하게 만들어줌
    setTimeout(()=>{ // 비동기
      resolve("hello"); // resolve로 리턴
    },3000); // 지연시간 3초후에 시작함
  }); 
  
}

greet() //동기식이 가능해짐
  .then((res)=>{ // res : resolve로 반환된값 
    console.log(res); 
    return res.length
  }) 
  .then(res => { // 위에서 return된 값이 res로 들어감
    console.log(res);
  })

//var result = greet(); // 비동기라서 값이 3초후에 들어옴
//console.log(result); // 얘는 값이 바로 들어감 => undefined가 나옴

console.log("end");

