const url = "/members";
insert_Member(); // 회원가입

function insert_Member(){ // 회원가입 함수
  btnSignUp.addEventListener("click",function(){
    if(sign_userPw.value == sign_userPw_check.value){ // 비밀번호가 같을때 실행
      let data = {
                  userId: sign_userId.value,
                  password: sign_userPw.value,
                  nickName: sign_userNickName.value,
                  phone: sign_userPhone.value,
                  email: sign_userEmail.value,
                  address: sign_userAddress.value
                  }

      fetch(url, { 
        method : "POST",
        headers : {
                  "Content-type":"application/json"
                  }, 
        body:JSON.stringify(data)}) // json형태(string)여야함
        .then(res=>{
          alert("회원가입이 완료되었습니다.");
          location.assign("/main");
        })
     }else{ // 비밀번호가 같지않다면
      alert("비밀번호가 같지 않습니다. 다시 입력해주세요");
      sign_userPw.focus(); // 비밀번호 입력하는 부분에 포커스
     }
  });
}