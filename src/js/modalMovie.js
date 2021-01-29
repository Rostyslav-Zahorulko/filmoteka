import headerTemplates from './components/headers-tpl';
import movieDetailedCardTemplate from '../templates/details-modal.hbs';
import refs from './refs';

const apiKey = 'ffddee44025dd24685ea61d637d56d24';
const baseUrl = 'https://api.themoviedb.org/3/movie/';
let movieId = 0;

refs.filmsGallery = document.querySelector('.films-gallery-container');
refs.body = document.querySelector('body');

refs.filmsGallery.addEventListener("click", handleMovieDetails);

function handleMovieDetails(event) {
  if (event.target.parentNode.nodeName !== "LI") {
    return
  }
  movieId = event.target.parentNode.dataset.id;
  getMovieDetails(baseUrl, apiKey, movieId).then(data => {
    const newData = {
    poster_path: data.poster_path,
    title: data.title,
    vote_average: data.vote_average,
    vote_count: data.vote_count,
    popularity: data.popularity,
    original_title: data.original_title,
    overview: data.overview,
    genres: data.genres.slice(0, 3),
    }

    const modalMovieCard = movieDetailedCardTemplate(newData);
    const markup = `<div class="modal-backdrop">
    ${headerTemplates.modalHeader}
    ${modalMovieCard}
    <footer class="footer">
      <div class="block">
        <p class="text">&#169; 2020 | All Rights Reserved |</p>
        <div class="mob-container">
          <p class="develop-text">Developed with</p>
          <span class="footer-heart-svg heart-svg"></span>
          <a class="open-modal-develop" href="#">by GoIT Students</a>
        </div>
      </div>
    </footer>
    </div>`;
    refs.body.insertAdjacentHTML('beforeend', markup);

    window.addEventListener('keydown', onPressESC);
    refs.modalCard = document.querySelector('.modal-backdrop');
    refs.modalCard.addEventListener('click', closeOnClick); 
  })
    .catch(error => console.log(error))
};

function getMovieDetails(baseUrl, apiKey, movieId) {
    return fetch(`${baseUrl}${movieId}?api_key=${apiKey}&language=en-US`)
        .then(response => response.json())
        .catch(error => {
            throw error;
        });
};

function closeMovieDetails() {
  console.log('closeMovieDetails');
  refs.modalCard.remove();
}
    
function onPressESC(event) {
  console.log('onPresEsc');
  if (event.code === 'Escape') {
    closeMovieDetails();
    window.removeEventListener('keydown', onPressESC);
  }
}
  
function closeOnClick(event) {
refs.modalDetailedCard = document.querySelector('.modal');
refs.modalInfo = document.querySelector('.modal-info');
refs.modalGenreInfo = document.querySelector('.modal-info-genres');
    
  switch (event.target.parentNode) {
    case refs.modalGenreInfo:
    case refs.modalInfo:
    case refs.modalDetailedCard:
      closeMovieDetails();
      refs.modalCard.removeEventListener('click', closeOnClick);
      break;
    default:
      return;
   }
};