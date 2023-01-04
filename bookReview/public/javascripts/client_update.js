const url = "/myPage"
myReview_update(); // 수정버튼 클릭시
myReview_delete(); // 삭제버튼 클릭시

//수정
function myReview_update(){
  //수정버튼 클릭시
  btnUpdate.addEventListener("click",function(){
    // id의 input 태그는 hidden이므로 안보이지만 단건조회시 input태그의 value값은 들어가있음
    let no = bookNo.value; // no 값이 넘어가야함
    console.log(no);
    let data = { // 클라이언트가 수정된한 값들을 받아옴
                  picture: book_picture.value,
                  category: category.value,
                  bookName: bookTitle.value,
                  writer: bookWriter.value,
                  score: parseInt(bookGood.value),
                  content:bookContent.value 
                }
    
     // 수정이므로 내가 수정할 id를 주소창에다가 줘야함
    fetch(`${url}/${no}`,{
                          method : "PUT", 
                          headers : {
                            "Content-type":"application/json"}, 
                          body:JSON.stringify(data) // json(스트링)형태
                         }) 
      .then(res => res.json())
      .then(res => {
        if(res.result == true){
          alert("게시글 수정 완료");
          location.assign("/myPage");
        }
      })
  })
}

//삭제
function myReview_delete(){
  //버튼 클릭시
  btnDelete.addEventListener("click",function(){
    // id의 input 태그는 hidden이므로 안보이지만 단건조회시 input태그의 value값은 들어가있음
    let no = bookNo.value; // no 값이 넘어가야함
    
     // 삭제 이므로 내가 삭제할 id를 주소창에다가 줘야함
    fetch(`${url}/${no}`,{method:"delete"}) // delete 방식
      .then(res => res.json())
      .then(res => {
        if(res.result == true){
          alert("게시글 삭제 완료");
          location.assign("/myPage");
        }
      })
  })
}

