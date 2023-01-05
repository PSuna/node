const url = "/login";
Login(); // 로그인 함수

function Login(){
  btnLogin.addEventListener("click",function(){
    let data = { userId : userId.value,
                 password : userPw.value
               }
    fetch(url,{ 
        method : "POST",
        headers : {
                  "Content-type":"application/json"
                  }, 
        body:JSON.stringify(data)}) // json형태(string)여야함)
    .then(res =>res.json()) // 로그인 성공여부 객체를 받아옴
    .then(res => {
      if(res.result){ // 로그인 성공시 true
        alert("로그인 성공")
        location.assign("/main"); // 이동
      }else{ // 로그인 실패시
        alert("아이디와 비밀번호가 틀렸습니다.");
        userId.value = "";
        userPw.value = "";
      } 
    })
  })
}