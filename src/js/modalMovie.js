import headerTemplates from './components/headers-tpl';
import movieDetailedCardTemplate from '../templates/details-modal.hbs';
import refs from './refs';
import {
  userWatched,
  updateUserWatched,
  userQueue,
  updateUserQueue,
} from './userLibrary';

const apiKey = 'ffddee44025dd24685ea61d637d56d24';
const baseUrl = 'https://api.themoviedb.org/3/movie/';
let movieId = 0;

refs.filmsGallery = document.querySelector('.films-gallery-container');
refs.body = document.querySelector('body');

refs.filmsGallery.addEventListener('click', handleMovieDetails);

function handleMovieDetails(event) {
  if (event.target.parentNode.nodeName !== 'LI') {
    return;
  }
  movieId = event.target.parentNode.dataset.id;
  getMovieDetails(baseUrl, apiKey, movieId)
    .then(data => {
      const newData = {
        id: data.id,
        poster_path: data.poster_path,
        title: data.title,
        vote_average: data.vote_average,
        vote_count: data.vote_count,
        popularity: Math.ceil(data.popularity*10)/10,
        original_title: data.original_title,
        overview: data.overview,
        genres: data.genres.slice(0, 3),
      };

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
      refs.modalContainer = document.querySelector('.modal-container');
      refs.modalContainer.addEventListener('click', closeOnClick);

      // WATCHED BUTTON HANDLER
      refs.addToWatchedBtn = document.querySelector('#js-watched-button');
      refs.addToWatchedBtn.addEventListener('click', e => {
        updateUserWatched(newData);
      });

      // QUEUE BUTTON HANDLER
      refs.addToQueueBtn = document.querySelector('#js-queue-button');
      refs.addToQueueBtn.addEventListener('click', e => {
        updateUserQueue(newData);
      });
    })
    .catch(error => console.log(error));
}

function getMovieDetails(baseUrl, apiKey, movieId) {
  return fetch(`${baseUrl}${movieId}?api_key=${apiKey}&language=en-US`)
    .then(response => response.json())
    .catch(error => {
      throw error;
    });
}

function closeMovieDetails() {
  refs.modalCard = document.querySelector('.modal-backdrop');
  refs.modalCard.remove();
}

function onPressESC(event) {
  if (event.code === 'Escape') {
    closeMovieDetails();
    window.removeEventListener('keydown', onPressESC);
  }
}

function closeOnClick(event) {
  switch (event.target) {
  case refs.addToWatchedBtn:
  case refs.addToQueueBtn:
    break;
  default:
    closeMovieDetails();
    refs.modalContainer.removeEventListener('click', closeOnClick);
}
}
