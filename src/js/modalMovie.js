import headerTemplates from './components/headers-tpl';
import movieDetailedCardTemplate from '../templates/details-modal.hbs';
import { renderFilmsGallery, libraryHandleClick } from './homePageRendering';
import listenSearchFormSubmit from './movieSearch';
import genres from './decodingJenres';
import refs from './refs';
import {
  updateUserWatched,
  updateUserQueue,
  checkIfInQueue,
  checkIfIsInUserLibrary,
  getUserWatchedFromDatabase,
  getUserQueueFromDatabase,
} from './userLibrary';
import { currentUserId } from './login-form';

const apiKey = 'ffddee44025dd24685ea61d637d56d24';
const baseUrl = 'https://api.themoviedb.org/3/movie/';
let movieId = 0;
let currentPage = 0;
let inputValue = '';
let activeLink = '';
let activeBtn = '';

refs.headerSearchInput = document.querySelector('.header-search-form-input');
refs.header = document.querySelector('.header-container-js');
refs.main = document.querySelector('main');
refs.libraryBtn = document.querySelector(
  '.navigation-list-item-link-my-library',
);
refs.homeLink = document.querySelector('.navigation-list-item-link-home');
refs.filmsGalleryList = document.querySelector('#films-gallery');
refs.pagination = document.querySelector('#pagination');

refs.headerSearchInput.addEventListener('change', getInputValue);
refs.filmsGalleryList.addEventListener('click', handleMovieDetails);

function getActiveElements() {
  activeLink = document.querySelector('.current').textContent;
  currentPage = Number(document.querySelector('.tui-is-selected').textContent);

  if (activeLink === 'MY LIBRARY') {
    refs.activeBtn = document.querySelector('.is-active-btn');
    activeBtn = refs.activeBtn.textContent;
  }
  return [activeLink, currentPage, activeBtn];
}

function getInputValue(event) {
  inputValue = event.target.value;
  return inputValue;
}

function handleMovieDetails(event) {
  getActiveElements();

  if (event.target.parentNode.nodeName !== 'LI') {
    return;
  }

  refs.libraryBtn.addEventListener('click', e => {
    window.removeEventListener('keydown', onPressESC);
    refs.main.removeEventListener('click', closeOnClick);
  });

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
        release_date: data.release_date.split('-')[0],
      };
      if (data.genres.length > 2) {
        newData.genres.push('Other');
      }

      const modalMovieCard = movieDetailedCardTemplate(newData);
      renderMovieDetailsPage(modalMovieCard);

      window.addEventListener('keydown', onPressESC);
      refs.main.addEventListener('click', closeOnClick);

      // ADD BUTTUNS & CHECK IF THE MOVIE IS IN USER LIBRARY
      refs.addToWatchedBtn = document.querySelector('#js-watched-button');
      refs.addToQueueBtn = document.querySelector('#js-queue-button');
      checkIfIsInUserLibrary(newData);

      // WATCHED BUTTON HANDLER
      refs.addToWatchedBtn.addEventListener('click', e => {
        checkIfInQueue(newData);
        updateUserWatched(newData);
      });

      // QUEUE BUTTON HANDLER
      refs.addToQueueBtn.addEventListener('click', e => {
        updateUserQueue(newData);
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
  // document.querySelector('.header-container');
  refs.header.innerHTML = '';
  refs.filmsGalleryList.innerHTML = '';
  // refs.filmsGalleryList.style.display = 'none';
  refs.pagination.style.display = 'none';
  refs.header.insertAdjacentHTML('beforeend', headerTemplates.modalHeader);
  refs.main.insertAdjacentHTML('afterbegin', modalMovieCard);
  refs.libraryBtn.addEventListener('click', libraryHandleClick);
}

function closeMovieDetails() {
  refs.header.innerHTML = '';
  document.querySelector('.modal').remove();
  refs.filmsGalleryList.style.display = 'flex';

  if (activeLink === 'HOME') {
    refs.header.insertAdjacentHTML('beforeend', headerTemplates.homeHeader);
    refs.searchForm = document.querySelector('#search-form');
    refs.searchForm.addEventListener('submit', listenSearchFormSubmit);

    if (inputValue !== '') {
      renderSearchFilmsGallery(currentPage, genres, inputValue);
    } else {
      renderFilmsGallery(currentPage, genres);
    }
    refs.pagination.style.display = 'block';
  }

  if (activeLink === 'MY LIBRARY') {
    refs.header.insertAdjacentHTML(
      'beforeend',
      headerTemplates.myLibraryHeader,
    );
    const userLocalStorageWatched = getUserWatchedFromDatabase(currentUserId);
    const userLocalStorageQueue = getUserQueueFromDatabase(currentUserId);

    refs.watchedBtn = document.querySelector('.header-button-watched');
    refs.queueBtn = document.querySelector('.header-button-queue');

    if (document.querySelector('.modal') === null) {
      refs.main.removeEventListener('click', closeOnClick);
      window.removeEventListener('keydown', onPressESC);
    }

    if (activeBtn === 'watched') {
      renderLibrary(userLocalStorageWatched);
    } else {
      renderLibrary(userLocalStorageQueue);
      refs.watchedBtn.classList.remove('is-active-btn');
      refs.queueBtn.classList.add('is-active-btn');
    }

    refs.watchedBtn = document.querySelector('.header-button-watched');
    refs.queueBtn = document.querySelector('.header-button-queue');

    onLibraryButtonsClick(
      refs.queueBtn,
      refs.watchedBtn,
      userLocalStorageQueue,
    );
    onLibraryButtonsClick(
      refs.watchedBtn,
      refs.queueBtn,
      userLocalStorageWatched,
    );
  }

  inputValue = '';
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

// ========RENDER SearchGalleryFilms============
function renderSearchFilmsGallery(currentPage, genres, inputValue) {
  return fetchApiSearch(currentPage, inputValue).then(
    ({ results, total_results }) => {
      updateFilmsGalleryMarkup(results, genres);
      const data = {
        totalAmountOfFilms: total_results,
      };

      return data;
    },
  );
}
function fetchApiSearch(currentPage, inputValue) {
  return fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${inputValue}&page=${currentPage}&include_adult=false`,
  ).then(res => res.json());
}

function updateFilmsGalleryMarkup(films, genres) {
  films.map(({ id, poster_path, title, release_date, genre_ids }) => {
    const filteredGenres = genres.filter(genre => genre_ids.includes(genre.id));

    const mapedGenres = filteredGenres.map(({ name }) => name);

    let slicedMapedGenres = [];

    if (mapedGenres.length < 3) {
      slicedMapedGenres = mapedGenres;
    } else {
      slicedMapedGenres = mapedGenres.slice(0, 2);
      slicedMapedGenres.push('Other');
    }
    const markup = `
<li class="films-gallery-item" data-id="${id}">
  <img
    class="films-gallery-item-image"
    src="https://image.tmdb.org/t/p/w342${poster_path}"
    alt="«${title}» film poster"
  >
  <p class="films-gallery-item-title">${title.toUpperCase()}</p>
  <p class="films-gallery-item-info">${slicedMapedGenres.join(', ')} | ${
      release_date.split('-')[0]
    }</p>
</li>
`;

    refs.filmsGalleryList.insertAdjacentHTML('beforeend', markup);
  });
}

function onLibraryButtonsClick(activeBtn, inactiveBtn, films) {
  activeBtn.addEventListener('click', event => {
    event.preventDefault();
    refs.filmsGalleryList.innerHTML = '';
    renderLibrary(films);
    inactiveBtn.classList.remove('is-active-btn');
    activeBtn.classList.add('is-active-btn');
  });
}

function renderLibrary(films) {
  if (!films) {
    refs.filmsGallery.innerHTML = '';
    const message =
      '<div class="films-gallery-warning"><p>No movies here yet. Visit Home to add some =)</p><div>';
    refs.filmsGallery.insertAdjacentHTML('beforeend', message);
    return;
  }
  films.map(
    ({ id, poster_path, title, release_date, genres, vote_average }) => {
      const markup = `
<li class="films-gallery-item" data-id="${id}">
  <img
    class="films-gallery-item-image"
    src="https://image.tmdb.org/t/p/w342${poster_path}"
    alt="«${title}» film poster"
  >
  <p class="films-gallery-item-title">${title.toUpperCase()}</p>
  <p class="films-gallery-item-info">${genres.join(
    ', ',
  )} | ${release_date}<span class="modal-info-vote-average library">${vote_average}</span></p>
</li>
`;

      refs.filmsGalleryList.insertAdjacentHTML('beforeend', markup);
    },
  );
}
