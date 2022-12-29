const url = "/customers"; // 서버에 저장된 json형태(스트링)의 데이터들의 주소
selectAll(); // 전체조회
insert(); // 추가버튼 클릭시 등록
customerDelete(); // 삭제와 단건조회
customerPut() // 수정

//전체 조회
function selectAll(){
  fetch(url) // get방식 , 서버에 저장된 데이터 요청하는 함수 => 라우터서버로감
  .then(res=>res.json()) // json(스트링)형식으로 되어있는걸 객체로 파싱 // 배열
  .then(res=>{ // 객체로 파싱된걸 받아서
    // list 클리어
    list.innerHTML = "";
    for( let i =0; i < res.length; i++){ // res 배열만큼 돌리기
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
    let data = { // 등록할 데이터들을 받아옴
                name:username.value, 
                email:email.value, 
                phone:phone.value, 
                address : address.value
               };

    fetch(url, { 
                method : "POST",
                headers : {
                          "Content-type":"application/json"
                          }, 
                body:JSON.stringify(data)}) // json형태(string)여야함
    .then(res => res.json())
    .then(res => {selectAll()})
  })
}

// 삭제와 단건조회 => 수정만들기전에 먼저 만들기
function customerDelete(){
  list.addEventListener("click",function(ev){ // tr태그에다가 data- 속성값을 넣어두면됨
    if(ev.target.id == "btnSel"){ // 단건조회
      let id = ev.target.closest("tr").getAttribute("data-id"); //data-id 속성값을 가져옴
      
      // 단건조회이므로 내가 조회할 id를 주소창에다가 줘야함
      fetch(`${url}/${id}`) // get 방식이라 생략
        .then(res => res.json()) // json(스트링)형태 파싱
        .then(res => {
          userid.value = res.id; // id 값은 보이지 않게 input태그에 type="hidden"을 줘야함
          username.value = res.name;
          email.value = res.email;
          phone.value = res.phone;
          address.value = res.address;
        });

    }else if(ev.target.id == "delBtn"){ //삭제
      let id = ev.target.closest("tr").getAttribute("data-id");

      // 삭제이므로 내가 삭제할 id를 주소창(path)에다가 줘야함
      fetch(`${url}/${id}`,{method:"delete"}) // delete 방식
      .then(() => {
        selectAll()
      });
    }
    
  })
}





 // 수정
function customerPut(){
  updbtn.addEventListener("click",function(){
   
    // id의 input 태그는 hidden이므로 안보이지만 단건조회시 input태그의 value값은 들어가있음
    // value 타입은 문자열이므로 숫자 타입으로 변경해야함
    let id = parseInt(userid.value);
    
    let data = { // 클라이언트가 수정한 데이터들을 받아옴
                name: username.value, 
                email: email.value, 
                phone: phone.value, 
                address : address.value
               };
    
    // 수정이므로 내가 수정할 id를 주소창에다가 줘야함
    fetch(`${url}/${id}`,{
                          method : "PUT", 
                          headers : {
                            "Content-type":"application/json"}, 
                          body:JSON.stringify(data)}) // json(스트링)형태
      .then(() => {
        selectAll();
      });
  })
}