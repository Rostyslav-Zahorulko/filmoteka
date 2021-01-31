import refs from './refs.js'
import decGenres from './decodingJenres.js'
import paginationjs from 'paginationjs'

import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';

let pageNumbers = 1
let currentPage = 1;
let inputValue =''
export default function searchFilm(){
  const headerSearchForm = document.querySelector('.header-search-form')
  
  headerSearchForm.addEventListener('submit', (e) => {
    currentPage =1
    const liFilmsGalleryItem = document.querySelector('.films-gallery-item')
    const listMovie = document.querySelector('.films-gallery')
    inputValue += e.target[0].value 
    if (liFilmsGalleryItem) {
      listMovie.innerHTML = ''
    }
    e.preventDefault()
    fetchApiSearch(e.target[0].value)
    e.target[0].value = ''
 
    
    const filmsGalleryId = document.querySelector('#films-gallery');
    filmsGalleryId.innerHTML = ''

  })

}

function fetchApiSearch(imputValue) {
// const startingUrl = 'https://image.tmdb.org/t/p/original'
const path = 'https://api.themoviedb.org/3/search/movie?';
const key = 'ffddee44025dd24685ea61d637d56d24';

const query = imputValue
const API = `${path}api_key=${key}&language=en-US&query=${query}&page=${pageNumbers}&include_adult=false`
// fetch(API)
// .then(res => res.json())
//   .then(data => {
     
    // makeNewObjectFilms(data)
    // pagination(data)
  

    // })   

function renderFilmsGallery(page) {
  fetchTrends(page)
    .then(({ results }) => {
  // showMoveNotFound(films)
      fetchGenres().then(({ genres }) => {
        updateFilmsGalleryMarkup(results, genres);
      });
    })
    .catch(console.log);
}


function fetchTrends(page) {
  return fetch(
   `${path}api_key=${key}&language=en-US&query=${query}&page=${page}&include_adult=false`,
  ).then(response => response.json());
}
function fetchGenres() {
  return fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${key}`).then(response =>
    response.json(),
  );
}
function updateFilmsGalleryMarkup(films, genres) {
  // console.log('genres: ', genres);
 
  films.map(({ id, poster_path, title, release_date, genre_ids }) => {
    const filteredGenres = genres.filter(genre => genre_ids.includes(genre.id));
    // console.log("filteredGenres: ", filteredGenres);
    const mapedGenres = filteredGenres.map(({ name }) => name);
    // console.log("mapedGenres: ", mapedGenres);
    const markup = `
<li class="films-gallery-item" data-id="${id}">
  <img
    class="films-gallery-item-image"
    src="https://image.tmdb.org/t/p/w342${poster_path}"
    alt="«${title}» film poster"
  >
  <p class="films-gallery-item-title">${title.toUpperCase()}</p>
  <p class="films-gallery-item-info">${mapedGenres.slice(0, 3).join(', ')} | ${
      release_date.split('-')[0]
    }</p>
</li>
`;
    refs.ulListMovie.insertAdjacentHTML('beforeend', markup);
    
  });
}

renderFilmsGallery(currentPage);



const options = {
  totalItems: 20000,
  itemsPerPage: 20,
  visiblePages: 10,
  page: 1,
  centerAlign: false,
  firstItemClassName: 'tui-first-child',
  lastItemClassName: 'tui-last-child',
  template: {
    page: `<a href="#" class="tui-page-btn qwerty">{{page}}</a>`,
    currentPage:
      '<strong class="tui-page-btn tui-is-selected">{{page}}</strong>',
    moveButton:
      '<a href="#" class="tui-page-btn tui-{{type}}">' +
      '<span class="tui-ico-{{type}}">{{type}}</span>' +
      '</a>',
    disabledMoveButton:
      '<span class="tui-page-btn tui-is-disabled tui-{{type}}">' +
      '<span class="tui-ico-{{type}}">{{type}}</span>' +
      '</span>',
    moreButton:
      '<a href="#" class="tui-page-btn tui-{{type}}-is-ellip">' +
      '<span class="tui-ico-ellip">...</span>' +
      '</a>',
  },
};
const pagination = new Pagination('pagination', options);
const paginationContainer = document.querySelector('#pagination');
// console.log(paginationContainer);
paginationContainer.addEventListener('click', handleOnPaginationContainerClick);
  function handleOnPaginationContainerClick(event) {
    const ulListMovie = document.querySelector('.list-movie-search-js')
   const filmsGallery = document.querySelector('.films-gallery')
    ulListMovie.innerHTML = '';
    filmsGallery.innerHTML = '';
    
      if (event.target.nodeName === 'STRONG') {
    return
  }
    
    if (event.target.nodeName !== 'A' && event.target.nodeName !== 'SPAN') {
      return;
    }
    
    console.log('stong ЛИ ЭТО',event.target.nodeName);

  const button = +event.target.textContent
  // const button
  if (Number.isInteger(button)) {
    currentPage = button
    renderFilmsGallery(currentPage)
  }

    
  //  
    const clickOnSpan = event.target
    console.dir(event.target);
    if (event.target.nodeName==='A') {
       if (event.target.attributes[1].nodeValue === 'tui-page-btn tui-next') {
    currentPage+=1
    renderFilmsGallery(currentPage)
  }
  if (event.target.attributes[1].nodeValue === 'tui-page-btn tui-prev') {
    currentPage-=1
    renderFilmsGallery(currentPage)
  }
  if (event.target.attributes[1].nodeValue === 'tui-page-btn tui-first') {
    currentPage = 1
    renderFilmsGallery(currentPage)
  }
  if (event.target.attributes[1].nodeValue === 'tui-page-btn tui-last') {
    currentPage = 1000
    renderFilmsGallery(currentPage)
  }
    } else {
      if (event.target.className === 'tui-ico-next') {
         currentPage+=1
    renderFilmsGallery(currentPage)
      }
       if (event.target.className === 'tui-ico-prev') {
         currentPage-=1
    renderFilmsGallery(currentPage)
      }
      if (event.target.className === 'tui-ico-first') {
    currentPage = 1
    renderFilmsGallery(currentPage)
      }
      if (event.target.className === 'tui-ico-last') {
    currentPage = 1000
    renderFilmsGallery(currentPage)
  }
     console.log(event.target.className);
    }
    
   
  
  }
 
  
  
  // const makeNewObjectFilms = function (data) {
  //   const newData = data.results.map((item) => {
  //     let curentGenres = [];
  //     // console.log(item.genre_ids);
  //   item.genre_ids.map((id) => {
  //     const found = decGenres.find((item) => item.id === id);
  //     curentGenres.push(found.name);
  //   });
  //   if (curentGenres.length >= 3) {
  //     const normalizedGenres = curentGenres.slice(0, 2);
  //     normalizedGenres.push("Other");
  //     item.genre_ids = normalizedGenres.join(', ')
  //     item.release_date = item.release_date.slice(0, 4);
  //   } else {
  //     item.genre_ids = curentGenres.join(', ');
  //     if (item.release_date) item.release_date = item.release_date.slice(0, 4);
  //   }

  //     addMarkup(item)
     
    
  
 
  // });
 

  // };
}



// function addMarkup(item) {
//     return refs.ulListMovie.insertAdjacentHTML('beforeend', `
//         <li class="films-gallery-item list-item" data-id="${item.id}">
//         <img class="films-gallery-item-image" src="https://image.tmdb.org/t/p/original${item.poster_path}" alt="${item.original_title}" width="150px"/>
//         <p class="films-gallery-item-title films-gallery-item-description">${item.original_title}</p> 
//         <p class="films-gallery-item-info films-gallery-item-description">${item.genre_ids} | ${item.release_date}</p>
//         </li>`) 
  
  
// }

function showMoveNotFound(data) {
   if (data.results.length === 0) {
        refs.headerSearchWarningShow().classList.add('header-search-warning-show')
    }
    else {
       refs.headerSearchWarningShow().classList.remove('header-search-warning-show')
    }
}






// const refs = {
//   filmsGallery: document.querySelector('.films-gallery'),
// };









// _____________________________________________________

// function pagination(data) {



  //   console.log(data.total_results);
  //   var items = $(".list-wrapper .list-item");
  //   var numItems = data.total_results;
  // var perPage = 9;

  //   items.slice(perPage).hide();

  //   $('#pagination-container').pagination({
  //     items: numItems,
  //       itemsOnPage: perPage,
  //       prevText: "&laquo;",
  //     nextText: "&raquo;",
  //       onPageClick: function (pageNumber) {
  //         var showFrom = perPage * (pageNumber - 1);
  //         if (pageNumber === 4) {
  //           pageNumbers += 1
  //           console.log(inputValue);
  //           fetchApiSearch(inputValue)
  //         }
  //         console.log('page', pageNumber);
  //         var showTo = showFrom + perPage;
  //         console.log('showFrom', showFrom);
  //           items.hide().slice(showFrom, showTo).show();
  //       }
  //   });


  
     
  //  }