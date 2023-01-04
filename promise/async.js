function greet(){
  return new Promise((resolve,reject)=>{ //동기식이 가능하게 만들어줌
    setTimeout(()=>{ // 비동기
      resolve("hello"); // resolve로 리턴
    },3000); // 지연시간 3초후에 시작함
  }); 
}

async function callgreet(){ // ★ async 안에서만 await를 사용가능, async : 비동기
  var result = await greet(); // 동기로 사용
  console.log(result);
  console.log(result.length);
}

callgreet(); // non-블록킹 : 비동기
console.log("end");

