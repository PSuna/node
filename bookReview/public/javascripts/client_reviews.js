const url = '/reviews';
reviewSearch() // 찾기 버튼 클릭시 실행하는 함수

fetch(url) // get방식 조회
 .then(() => {})


function reviewSearch(){ // 도서명으로 도서리뷰 찾기
  btnSearch.addEventListener("click",function(){
    let data = { // 찾을 도서명 입력 input 태그
                book_name:search.value
              };
    fetch(url,{ 
        method : "POST",
        headers : {
                  "Content-type":"application/json"
                  }, 
        body:JSON.stringify(data)}) // json형태(string)여야함
    .then(res=>res.json()) // 파싱
    .then(res=>{
      list.innerHTML = ""; // 클리어
      
      for(let i = 0; i<res.legth; i++){
        list.innerHTML += `<tr onclick="location.href='/reviews/<%= reviews[i].no%>'" style="cursor:pointer;">
                            <td><%= i+1 %></td>
                            <td><%= reviews[i].category %></td>
                            <td><%= reviews[i].bookName %></td>
                            <td><%= reviews[i].userId %></td>
                            <td>
                              <%for(let j=0; j<reviews[i].score; j++ ){ %>
                              <span>★</span>
                              <%}%>
                            </td>
                          </tr>`
      }
    })
  })
}