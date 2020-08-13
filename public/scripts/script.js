const currentPage = location.pathname
const menuItems = document.querySelectorAll("header .link a");

for (const item of menuItems) {
  if(currentPage.includes(item.getAttribute("href"))){
    item.classList.add("chosen");
  }
}

// PAGINATION
// totalPages = 20
// selectedPage = 6
// [1,..., 4, 5, 6, 7, 8, ..., 20]


function paginate(selectedPage, totalPages){
  let pages = [];
  let oldPage = 1;
  for (let currentPage = 1; currentPage <= totalPages; currentPage++){
    const firstAndLastPage = currentPage == 1 || currentPage == totalPages;
    const pagesAfterSelectedPage = currentPage <=selectedPage + 2;
    const pagesBeforeSelectedPage = currentPage >= selectedPage - 2;
    const pagesBeforeAndAfterSelectedPage = (pagesAfterSelectedPage && pagesBeforeSelectedPage);
    if( firstAndLastPage || pagesBeforeAndAfterSelectedPage ){
      
      if (oldPage && (currentPage - oldPage > 2)){
        pages.push('...');
      }
      if (oldPage && (currentPage - oldPage == 2)){
        pages.push(currentPage - 1);
      }
      pages.push(currentPage);
      oldPage = currentPage;
    }
    
  }

  return pages
}

function createPagination(){
  const page = +pagination.dataset.page;
  const total = +pagination.dataset.total;
  const filter = pagination.dataset.filter;
  const pages = paginate(page,total);

  let elements ="";
  for (const page of pages){
    if (String(page).includes('...')){
      elements += `<span>${page}</span>`;
    } else {
      if(filter){
        elements += `<a href="?page=${page}&filter=${filter}">${page}</a>`;
      }else{
        elements += `<a href="?page=${page}">${page}</a>`;
      }
      
    }
    
  }

  pagination.innerHTML = elements;
}
const pagination = document.querySelector('.pagination')

if (pagination){
  createPagination();
}