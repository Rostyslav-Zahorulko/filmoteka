import refs from './refs.js'
import decGenres from './decodingJenres.js'

export default function searchFilm(){
  const headerSearchForm = document.querySelector('.header-search-form')
  console.log(headerSearchForm);
  headerSearchForm.addEventListener('submit', (e) => {
   e.preventDefault()
  })

}

const startingUrl = 'https://image.tmdb.org/t/p/original'
const pageNumber = 1
const query = 'p'
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

function addMarkup(item) {
    return refs.ulListMovie.insertAdjacentHTML('beforeend', `
        <li class="movie-card" data-id="${item.id}">
        <img src="${startingUrl}${item.poster_path}" alt="${item.original_title}" width="150px"/>
        <h3>${item.original_title}</h3> 
        <p class="js-genre" >${item.genre_ids} | ${item.release_date}  ${item.vote_average}</p>
        </li>
      `) 
}

