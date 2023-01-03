const url = "/reviewPost";
insert_review(); // 책 리뷰 정보 추가

function insert_review(){ // 책 리뷰 정보 추가
  post_review.addEventListener("click",function(){
      let data = {
                  picture: book_picture.value,
                  category: category.value,
                  bookName: bookTitle.value,
                  writer: bookWriter.value,
                  score: parseInt(bookGood.value),
                  content:bookContent.value 
                }
    //console.log(data);
     fetch(url, { 
      method : "POST",
      headers : {
                "Content-type":"application/json"
                }, 
      body:JSON.stringify(data)}) // json형태(string)여야함
    .then(res=>{
      alert("등록이 완료되었습니다");
      location.assign("./reviews");
    })
  })
}

function readURL(input) { // 이미지 미리보기
  if (input.files && input.files[0]) {
    var reader = new FileReader();
    reader.onload = function(e) {
      document.getElementById('preview').src = e.target.result;
    };
    reader.readAsDataURL(input.files[0]);
  } else {
    document.getElementById('preview').src = "";
  }
}