import headerTemplates from './components/headers-tpl';
import movieDetailedCardTemplate from '../templates/details-modal.hbs';
import renderFilmsGallery from './homePageRendering';
import genres from './decodingJenres';
import refs from './refs';
import {
  addToLocalWatched,
  updateUserWatched,
  addToLocalQueue,
  updateUserQueue,
  checkIfInQueue,
  checkIfinWatched,
} from './userLibrary';

const apiKey = 'ffddee44025dd24685ea61d637d56d24';
const baseUrl = 'https://api.themoviedb.org/3/movie/';
let movieId = 0;
let currentPage = 0;

refs.filmsGallery = document.querySelector('.films-gallery-container');
refs.header = document.querySelector('.header-container-js');
refs.main = document.querySelector("main");
refs.filmsGalleryListSearch = document.querySelector('.list-movie-search-js');
refs.filmsGalleryList = document.querySelector('#films-gallery');
refs.pagination = document.querySelector("#pagination");

refs.filmsGalleryList.addEventListener('click', handleMovieDetails);
refs.filmsGalleryListSearch.addEventListener('click', handleMovieDetails);

function handleMovieDetails(event) {
  if (event.target.parentNode.nodeName !== 'LI') {
    return;
  };
  refs.currentPage = document.querySelector('.tui-is-selected');
  currentPage = Number(refs.currentPage.textContent);
  
  movieId = event.target.parentNode.dataset.id;
  refs.spinner.classList.add('is-open');
  getMovieDetails(baseUrl, apiKey, movieId)
    .then(data => {
      const newData = {
        id: data.id,
        poster_path: data.poster_path,
        title: data.title,
        vote_average: data.vote_average,
        vote_count: data.vote_count,
        popularity: Math.ceil(data.popularity * 10) / 10,
        original_title: data.original_title,
        overview: data.overview,
        genres: data.genres.slice(0, 2).map(({ name }) => name),
      };
      if (data.genres.length > 2) {
        newData.genres.push('Other');
      }

      const modalMovieCard = movieDetailedCardTemplate(newData);
      renderMovieDetailsPage(modalMovieCard);

      window.addEventListener('keydown', onPressESC);
      refs.main.addEventListener('click', closeOnClick);

      // WATCHED BUTTON HANDLER
      refs.addToWatchedBtn = document.querySelector('#js-watched-button');
      refs.addToWatchedBtn.addEventListener('click', e => {
        addToLocalWatched(updateUserWatched(newData));
        checkIfInQueue(newData);
      });

      // QUEUE BUTTON HANDLER
      refs.addToQueueBtn = document.querySelector('#js-queue-button');
      refs.addToQueueBtn.addEventListener('click', e => {
        addToLocalQueue(updateUserQueue(newData));
      });
    })
    .catch(error => console.log(error))
    .finally(() => {
      refs.spinner.classList.remove('is-open');
    });
}

function getMovieDetails(baseUrl, apiKey, movieId) {
  return fetch(`${baseUrl}${movieId}?api_key=${apiKey}&language=en-US`)
    .then(response => response.json())
    .catch(error => {
      throw error;
    });
}

function renderMovieDetailsPage(modalMovieCard) {
  refs.header.innerHTML = "";
  refs.filmsGalleryList.innerHTML = "";
  refs.filmsGalleryListSearch.innerHTML = "";
  refs.filmsGalleryList.style.display = "none";
  refs.filmsGalleryListSearch.style.display = "none";
  refs.pagination.style.display = "none";
  refs.header.insertAdjacentHTML('beforeend', headerTemplates.modalHeader);
  refs.filmsGallery.insertAdjacentHTML('afterbegin', modalMovieCard);
}

function closeMovieDetails() {
  refs.header.innerHTML = "";
  refs.header.insertAdjacentHTML('beforeend', headerTemplates.homeHeader);
  document.querySelector('.modal').remove();
  refs.filmsGalleryList.style.display = "flex";
  refs.filmsGalleryListSearch.style.display = "flex";
  renderFilmsGallery(currentPage, genres);
  refs.pagination.style.display = "block";
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
      refs.main.removeEventListener('click', closeOnClick);
  }
}
