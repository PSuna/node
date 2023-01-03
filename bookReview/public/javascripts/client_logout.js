const url2 = "/logout";
Logout() // 로그아웃 함수

function Logout(){
  if(document.querySelector("#btnHomeLogout")){ // 로그아웃 버튼이 생겼다면 실행
    btnHomeLogout.addEventListener("click",function(){
      fetch(url2) // json형태(string)여야함)
      .then(res=>{ // 로그아웃이 됬다면
        alert("로그아웃 되셨습니다.");
        location.assign("./main");
      })
    })
  }
}