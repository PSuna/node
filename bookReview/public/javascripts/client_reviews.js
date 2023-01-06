const url = '/reviews';
const search_url = "/search";

fetch(url) // get방식 조회
 .then(() => {})


reviewSearch() // 찾기 버튼 클릭시 실행하는 함수

function reviewSearch(){ // 도서명으로 도서리뷰 찾기
  btnSearch.addEventListener("click",function(){

    let data = "/search?book=" + search.value; // 쿼리스트링으로 데이터를 전달
    location.href=data; // 해당 페이지로 이동
    
  })
}