import refs from './refs.js'
import decGenres from './decodingJenres.js'



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
    console.log('Вывожу фильмы по запросу', e.target[0].value);
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
  });
 
};
}


function addMarkup(item) {
    return refs.ulListMovie.insertAdjacentHTML('beforeend', `
        <li class="films-gallery-item" data-id="${item.id}">
        <img class="films-gallery-item-image" src="https://image.tmdb.org/t/p/original${item.poster_path}" alt="${item.original_title}" width="150px"/>
        <p class="films-gallery-item-title films-gallery-item-description">${item.original_title}</p> 
        <p class="films-gallery-item-info films-gallery-item-description">${item.genre_ids} | ${item.release_date}</p>
        </li>
      `) 
}

// const markupProductInCart =cart.item.reduce(
//   (acc, el) => acc + 
//                    ` <div class="cart-item">
//                     <img src="${el.img.url}" alt="${el.name}">
//                     <div>
//                         <h4>${el.name}</h4>
//                         <h5>${el.price}</h5>
//                         <span class="remove-item" data-id="${el.id}">Remove</span>
//                     </div>
//                     <div>
//                         <i class="fas fa-chevron-up" data-id="${el.id}"></i>
//                         <p class="item-amount">${el.quantity}</p>
//                         <i class="fas fa-chevron-down" data-id="${el.id}"></i>
//                     </div></div>`, ''
//   )