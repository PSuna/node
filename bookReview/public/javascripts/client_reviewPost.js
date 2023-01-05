const url = "/reviewPost";

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

//insert_review(); // 책 리뷰 정보 추가
/* function insert_review(){ // 책 리뷰 정보 추가
  
  const formData = new FormData();
  const fileField = document.querySelector('input[type="file"]');

  formData.append = document.querySelector('input[type="file"]');

   let path = document.getElementById('book_picture').files[0].name;

  formData.append('avatar', fileField.files[0]);
  formData.append(picture, path);
  formData.append(category, category.value);
  formData.append(bookName, bookTitle.value);
  formData.append(writer, bookWriter.value);
  formData.append(score, parseInt(bookGood.value));
  formData.append(content, bookContent.value);
  
   let data = {
                  picture: "/images/"+ path,
                  category: category.value,
                  bookName: bookTitle.value,
                  writer: bookWriter.value,
                  score: parseInt(bookGood.value),
                  content:bookContent.value 
                }

   post_review.addEventListener("click",function(){
     fetch(url, { 
      method : "POST",
      headers : {
                "Content-type":"multipart/form-data"
                }, 
      body:formData
    })
    .then(res=>{
      alert("등록이 완료되었습니다");
     // location.assign("/reviews");
    })
  })
} */
