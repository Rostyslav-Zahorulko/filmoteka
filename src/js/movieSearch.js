import refs from './refs.js'
import decGenres from './decodingJenres.js'
import paginationjs from 'paginationjs'
console.log(paginationjs);



export default function searchFilm(){
  const headerSearchForm = document.querySelector('.header-search-form')
  
  headerSearchForm.addEventListener('submit', (e) => {
    const liFilmsGalleryItem = document.querySelector('.films-gallery-item')
    const listMovie = document.querySelector('.list-movie-search-js')
   
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
const pageNumber = 1
const query = imputValue
const API = `https://api.themoviedb.org/3/search/movie?api_key=ffddee44025dd24685ea61d637d56d24&language=en-US&query=${query}&page=${pageNumber}&include_adult=false`
fetch(API)
.then(res => res.json())
  .then(data => {
     showMoveNotFound(data)
       makeNewObjectFilms(data)
    })   

  const makeNewObjectFilms = function (data) {
  const newData = data.results.map((item) => {
    let curentGenres = [];
    item.genre_ids.map((id) => {
      const found = decGenres.find((item) => item.id === id);
      curentGenres.push(found.name);
    });
    if (curentGenres.length >= 3) {
      const normalizedGenres = curentGenres.slice(0, 2);
      normalizedGenres.push("Other");
      item.genre_ids = normalizedGenres.join(', ')
      item.release_date = item.release_date.slice(0, 4);
    } else {
      item.genre_ids = curentGenres.join(', ');
      if (item.release_date) item.release_date = item.release_date.slice(0, 4);
    }

    addMarkup(item)
    
    // Тестовая пагинация
    
var items = $(".list-wrapper .list-item");
    var numItems = items.length;
    var perPage = 3;

    items.slice(perPage).hide();

    $('#pagination-container').pagination({
        items: numItems,
        itemsOnPage: perPage,
        prevText: "&laquo;",
        nextText: "&raquo;",
        onPageClick: function (pageNumber) {
            var showFrom = perPage * (pageNumber - 1);
            var showTo = showFrom + perPage;
            items.hide().slice(showFrom, showTo).show();
        }
    });
  });
 
};
}


function addMarkup(item) {
    return refs.ulListMovie.insertAdjacentHTML('beforeend', `
        <li class="films-gallery-item list-item" data-id="${item.id}">
        <img class="films-gallery-item-image" src="https://image.tmdb.org/t/p/original${item.poster_path}" alt="${item.original_title}" width="150px"/>
        <p class="films-gallery-item-title films-gallery-item-description">${item.original_title}</p> 
        <p class="films-gallery-item-info films-gallery-item-description">${item.genre_ids} | ${item.release_date}</p>
        </li>`) 
}

function showMoveNotFound(data) {
   if (data.results.length === 0) {
        refs.headerSearchWarningShow().classList.add('header-search-warning-show')
    }
    else {
       refs.headerSearchWarningShow().classList.remove('header-search-warning-show')
    }
}