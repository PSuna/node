const url = '/reviews';

fetch(url) // get방식 조회
 .then(res => res.json())
 .then(res => {
  for(let i = 0; i<res.length; i++){
   tbodyList.innerHTML += `<tr>
                              <td>${i+1}</td>
                              <td>${res[i].bookName}</td>
                              <td>${res[i].writer}</td>
                              <td>${res[i].score}</td>
                            </tr>`
  }
 });


 