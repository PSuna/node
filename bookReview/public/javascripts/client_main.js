 /* main.js */
let books = [];
//공공데이터 포털 API : XML형식
const url = 'http://api.kcisa.kr/openapi/service/rest/meta13/getNLSF0401?serviceKey=d2252ebd-bfd4-44d8-b005-ff9a8878b9a8&numOfRows=10&pageNo=1'; /*URL*/

fetch(url) // get방식 조회
 .then(res => res.text()) //text로 가져옴
 .then(res => {
  let parser = new DOMParser();
  let xmlDoc = parser.parseFromString(res, "application/xml"); //text를 xml형식으로 변환
  let count = xmlDoc.getElementsByTagName("item"); // 갯수
  let img = xmlDoc.getElementsByTagName("referenceIdentifier"); // 이미지
  let title = xmlDoc.getElementsByTagName("title"); // 책이름
  let write = xmlDoc.getElementsByTagName("rights"); // 저자
  let description = xmlDoc.getElementsByTagName("description"); // 줄거리

  for(let i=0; i<count.length; i++){ // 파싱한걸 객체로 만들어서 넣어줌
    books.push({
                img: img[i].innerHTML, 
                title: title[i].innerHTML, 
                write: write[i].innerHTML, 
                description : description[i].innerHTML
              });
  }

  for(let i = 0 ; i<books.length-1; i++){ //10개있지만 미관상 9개만
    popular_div.innerHTML += popular_html(books[i]);
  }
 })

 function popular_html(books){
  let html = `<div class="col mb-5 div_piece">
                <div class="card h-100">
                    <div class="badge bg-dark text-white position-absolute" style="top: 0.5rem; right: 0.5rem">추천</div>
                    <!-- Product image-->
                    <img class="card-img-top" src="${books.img}" alt="도서사진" />
                    <!-- Product details-->
                    <div class="card-body p-4">
                        <div class="text-center">
                            <!-- Product name-->
                            <h5 class="fw-bolder">${books.title}</h5>
                            <!-- Product reviews-->
                            <div class="mb-2">- ${books.write}</div>
                        </div>
                    </div>
                    <!-- Product actions-->
                    <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                        <div class="text-center"><a class="btn btn-outline-dark mt-auto" href="#">자세히보기</a></div>
                    </div>
                </div>
              </div>`
  return html;
}
