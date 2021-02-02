import headerTemplates from './components/headers-tpl';
import genres from './decodingJenres';
import { paginateTrends, paginateOnClick } from './pagination';
import { showSpinner, hideSpinner } from './spinner';

const refs = {
  header: document.querySelector('.header-container-js'),
  filmsGallery: document.querySelector('#films-gallery'),
};

const path = 'https://api.themoviedb.org/3';
const key = 'ffddee44025dd24685ea61d637d56d24';

let currentPage = 1;

function renderHomePage(headerTemplates, currentPage, genres) {
  showSpinner();
  updateHeaderMarkup(headerTemplates);
  renderFilmsGallery(currentPage, genres)
    .then(({ totalAmountOfFilms }) => paginateTrends(totalAmountOfFilms))
    .catch(console.log)
    .finally(hideSpinner);
  paginateOnClick();
  refs.header.addEventListener('click', reRendering);
}

function updateHeaderMarkup(headerTemplates) {
  refs.header.insertAdjacentHTML('beforeend', headerTemplates);
}

function renderFilmsGallery(page, genres) {
  return fetchTrends(page).then(({ results, total_results }) => {
    updateFilmsGalleryMarkup(results, genres);
    const data = {
      totalAmountOfFilms: total_results,
    };

    return data;
  });
}

function fetchTrends(page) {
  return fetch(
    `${path}/trending/movie/day?api_key=${key}&page=${page}`,
  ).then(response => response.json());
}

function updateFilmsGalleryMarkup(films, genres) {
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

function reRendering(event) {
  event.preventDefault();
  console.log(event);
  const onclickedLinkName = event.target.textContent;
  const watchedFilms = JSON.parse(localStorage.getItem('localWatched'));
  const queuedFilms = JSON.parse(localStorage.getItem('localQueue'));
  if (
    event.target.parentNode.classList.contains('header-logo-js') ||
    onclickedLinkName === 'HOME'
  ) {
    renderHomePage(headerTemplates.homeHeader, currentPage, genres);
  }
  if (onclickedLinkName === 'MY LIBRARY' || onclickedLinkName === 'watched') {
    updateHeaderMarkup(headerTemplates.myLibraryHeader);
    const watchedBtn = document.querySelector('.header-button-watched');
    watchedBtn.classList.add('is-active-btn');
    updateFilmsLibraryMarkup(watchedFilms);
    const paginationContainer = document.querySelector('#pagination');
    paginationContainer.innerHTML = '';
  }

  if (onclickedLinkName === 'watched') {
    const queuedBtn = document.querySelector('.header-button-queue');
    const watchedBtn = document.querySelector('.header-button-watched');
    queuedBtn.classList.remove('is-active-btn');
    watchedBtn.classList.add('is-active-btn');
    updateFilmsLibraryMarkup(watchedFilms);
  }

  if (onclickedLinkName === 'queue') {
    const queuedBtn = document.querySelector('.header-button-queue');
    const watchedBtn = document.querySelector('.header-button-watched');
    queuedBtn.classList.add('is-active-btn');
    watchedBtn.classList.remove('is-active-btn');
    updateFilmsLibraryMarkup(queuedFilms);
  }
}

renderHomePage(headerTemplates.homeHeader, currentPage, genres);

export default renderFilmsGallery;
