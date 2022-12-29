const url = "/customers"; // 서버에 저장된 json형태(스트링)의 데이터들의 주소
selectAll(); // 전체조회
insert(); // 등록버튼에 이벤트 지정
customerDelete(); // 삭제와 단건조회
customerPut() // 수정조회

//전체 조회
function selectAll(){
  fetch(url) // 서버에 데이터 요청하는 함수 => 라우터서버로감
  .then(res=>res.json()) // json(스트링)형식으로 되어있는걸 객체로 파싱 // 배열
  .then(res=>{
    // list 클리어
    list.innerHTML = "";
    for( let i =0; i < res.length; i++){
      const tr = `<tr data-id="${res[i].id}">
                    <td><input type="checkbox"></td>
                    <td>${res[i].id}</td>
                    <td>${res[i].name}</td>
                    <td>${res[i].email}</td>
                    <td>${res[i].phone}</td>
                    <td>${res[i].address}</td>
                    <td>
                      <button id="delBtn">삭제</button>
                      <button id="btnSel">단건조회</button>
                    </td>
                  </tr>`
      list.innerHTML += tr;
    }
  })
}


//등록
function insert(){
  addbtn.addEventListener("click",function(){ // 추가버튼 클릭시 이벤트
    let data = {name:username.value, // 추가할 데이터들을 받아옴
                email:email.value, 
                phone:phone.value, 
                address : address.value};
    fetch(url, { 
                method : "POST", //등록
                headers : {
                          "Content-type":"application/json"}, 
                body:JSON.stringify(data)}) // json형태(string)여야함
    .then(res => res.json())
    .then(res => {selectAll()})
  })
}

// 수정
function customerPut(){
  updbtn.addEventListener("click",function(){
    let data = {name:username.value, // 추가할 데이터들을 받아옴
                email:email.value, 
                phone:phone.value, 
                address : address.value, };
       
    fetch(`${url}/${id}`,{method : "put", headers : {
                          "Content-type":"application/json"}, 
                            body:JSON.stringify(data)})})
      .then(res => {res.json()})
      .then(()=>{
        selectAll()
      });
  })
}



// 삭제와 단건조회
function customerDelete(){
  list.addEventListener("click",function(ev){ // tr태그에다가 data- 속성값을 넣어두면됨
    if(ev.target.id == "btnSel"){ // 단건조회
      let id = ev.target.closest("tr").getAttribute("data-id");
      fetch(`${url}/${id}`) // get 방식이라 생략
        .then(res => res.json())
        .then(res => {
          userid.value = res.id; // id 값은 보이지 않게 input태그에 hidden을 줘야함
          username.value = res.name;
          email.value = res.email;
          phone.value = res.phone;
          address.value = res.address;
        });

    }else if(ev.target.id == "delBtn"){ //삭제
      let id = ev.target.closest("tr").getAttribute("data-id");
      fetch(`${url}/${id}`,{method:"delete"})
      .then(() => {
        selectAll()
      });
    }
    
  })
}