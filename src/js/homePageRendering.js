import headerTemplates from './components/headers-tpl';
import genres from './decodingJenres';
import { paginateFilms, paginateOnClick } from './pagination';
import { showSpinner, hideSpinner } from './spinner';
import apiServise from './api-servise';

const refs = {
  header: document.querySelector('.header-container-js'),
  filmsGallery: document.querySelector('#films-gallery'),
  libraryBtn: document.querySelector('.navigation-list-item-link-my-library'),
  paginationContainer: document.querySelector('#pagination'),
  watchedFilms: JSON.parse(localStorage.getItem('localWatched')),
  queuedFilms: JSON.parse(localStorage.getItem('localQueue')),
  homeLink: document.querySelector('.navigation-list-item-link-home'),
};

const path = 'https://api.themoviedb.org/3';
const key = 'ffddee44025dd24685ea61d637d56d24';

function renderHomePage() {
  apiServise.resetPage();
  showSpinner();
  updateHeaderMarkup();
  setPagination().catch(console.log).finally(hideSpinner);
}

function updateHeaderMarkup() {
  refs.header.innerHTML = '';
  refs.header.insertAdjacentHTML('beforeend', headerTemplates.homeHeader);
  refs.libraryBtn.addEventListener('click', libraryHandleClick);
}

function setPagination() {
  return renderFilmsGallery().then(({ totalAmountOfFilms }) => {
    // console.log('totalAmountOfFilms: ', totalAmountOfFilms);

    paginateFilms(totalAmountOfFilms);
    paginateOnClick(totalAmountOfFilms);
  });
}

function renderFilmsGallery() {
  return fetchTrends().then(({ results, total_results }) => {
    // console.log('results: ', results);
    // console.log('total_results: ', total_results);

    updateFilmsGalleryMarkup(results);

    const data = {
      totalAmountOfFilms: total_results,
    };

    return data;
  });
}

function fetchTrends() {
  return fetch(
    `${path}/trending/movie/day?api_key=${key}&page=${apiServise.page}`,
  ).then(response => response.json());
}

function updateFilmsGalleryMarkup(films) {
  // console.log('genres: ', genres);

  films.map(({ id, poster_path, title, release_date, genre_ids }) => {
    const filteredGenres = genres.filter(genre => genre_ids.includes(genre.id));
    // console.log('filteredGenres: ', filteredGenres);

    const mapedGenres = filteredGenres.map(({ name }) => name);
    // console.log('mapedGenres: ', mapedGenres);

    let slicedMapedGenres = [];

    if (mapedGenres.length < 3) {
      slicedMapedGenres = mapedGenres;
    } else {
      slicedMapedGenres = mapedGenres.slice(0, 2);
      slicedMapedGenres.push('Other');
    }
    // console.log('slicedMapedGenres: ', slicedMapedGenres);

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

    refs.filmsGallery.insertAdjacentHTML('beforeend', markup);
  });
}

//--------------ОТРИСОВКА БИБЛИОТЕКИ ПОЛЬЗОВАТЕЛЯ----------------
function libraryHandleClick(event) {
  event.preventDefault();
  refs.homeLink.classList.remove('current');
  refs.libraryBtn.classList.add('current');
  const filmsGalleryListSearch = document.querySelector(
    '.list-movie-search-js',
  );
  filmsGalleryListSearch.style.display = 'none';
  updateHeaderMarkup(headerTemplates.myLibraryHeader);
  refs.filmsGallery.innerHTML = '';
  refs.paginationContainer.style.display = 'none';
  updateFilmsLibraryMarkup(refs.watchedFilms);

  const watchedBtn = document.querySelector('.header-button-watched');
  const queueBtn = document.querySelector('.header-button-queue');
  function onLibraryButtonsClick(activeBtn, inactiveBtn, films) {
    activeBtn.addEventListener('click', event => {
      event.preventDefault();
      updateFilmsLibraryMarkup(films);
      inactiveBtn.classList.remove('is-active-btn');
      activeBtn.classList.add('is-active-btn');
    });
  }

  onLibraryButtonsClick(queueBtn, watchedBtn, refs.queuedFilms);
  onLibraryButtonsClick(watchedBtn, queueBtn, refs.watchedFilms);

  function updateFilmsLibraryMarkup(localStorageFilms) {
    refs.filmsGallery.innerHTML = '';
    localStorageFilms.map(
      ({ id, poster_path, title, release_date, genres }) => {
        const markup = `
<li class="films-gallery-item" data-id="${id}">
  <img
    class="films-gallery-item-image"
    src="https://image.tmdb.org/t/p/w342${poster_path}"
    alt="«${title}» film poster"
  >
  <p class="films-gallery-item-title">${title.toUpperCase()}</p>
  <p class="films-gallery-item-info">${genres.join(', ')} | ${
          release_date.split('-')[0]
        }</p>
</li>
`;
        refs.filmsGallery.insertAdjacentHTML('beforeend', markup);
      },
    );
  }
}
//-------------------------------------------------------------

renderHomePage();

export default renderFilmsGallery;
