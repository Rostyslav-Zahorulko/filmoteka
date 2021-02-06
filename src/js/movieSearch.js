import { paginateFilms } from './pagination';
import genres from './decodingJenres';
import { showSpinner, hideSpinner } from './spinner';
import apiServise from './api-servise';

const refs = {
  filmsGallery: document.querySelector('#films-gallery'),
  searchForm: document.querySelector('#search-form'),
  notice: document.querySelector('.header-search-warning-show'),
  pagination: document.querySelector('#pagination'),
};

const path = 'https://api.themoviedb.org/3';
const key = 'ffddee44025dd24685ea61d637d56d24';

function listenSearchFormSubmit(event) {
  event.preventDefault();

  (refs.pagination.innerHTML = ''), apiServise.resetPage();
  // console.log('apiServise.page: ', apiServise.page);

  refs.notice.classList.add('is-hidden');

  const form = event.currentTarget;
  const input = form.elements.query;

  apiServise.setQuery(input.value);
  // console.log('apiServise.query: ', apiServise.query);

  if (input.value === '') {
    refs.notice.classList.remove('is-hidden');
    refs.notice.textContent =
      'Unable to make a search query. Please enter any text!';

    // return;
  }

  showSpinner();
  refs.paginationContainer = document.querySelector('#pagination');
  setPagination(apiServise.query).catch(console.log).finally(hideSpinner);

  form.reset();
  return;
}

function setPagination() {
  return renderFilmsGallery().then(({ totalAmountOfFilms }) => {
    // console.log('totalAmountOfFilms: ', totalAmountOfFilms);
    paginateFilms(totalAmountOfFilms);
    paginateOnClick(totalAmountOfFilms);
  });
}

function paginateOnClick(totalAmountOfFilms) {
  refs.paginationContainer.addEventListener(
    'click',
    handleOnPaginationContainerClick,
  );

  function handleOnPaginationContainerClick(event) {
    if (event.target.nodeName !== 'A') {
      return;
    }

    refs.filmsGallery.innerHTML = '';

    showSpinner();

    const button = event.target;

    // console.dir(button);
    // console.log('button.className: ', button.className);

    switch (button.className) {
      case 'tui-page-btn':
        apiServise.setPage(Number(button.textContent));
        // console.log('page: ', apiServise.page);
        renderFilmsGallery().finally(hideSpinner);
        return;

      case 'tui-page-btn tui-prev':
        apiServise.decrementPage();
        // console.log('page: ', apiServise.page);
        renderFilmsGallery().finally(hideSpinner);
        return;

      case 'tui-page-btn tui-next':
        apiServise.incrementPage();
        // console.log('page: ', apiServise.page);
        renderFilmsGallery().finally(hideSpinner);
        return;

      case 'tui-page-btn tui-first':
        apiServise.resetPage();
        // console.log('page: ', apiServise.page);
        renderFilmsGallery().finally(hideSpinner);
        return;

      case 'tui-page-btn tui-last':
        apiServise.setPage(totalAmountOfFilms / 20);
        // console.log('page: ', apiServise.page);
        renderFilmsGallery().finally(hideSpinner);
        return;

      case 'tui-page-btn tui-first-child':
        apiServise.resetPage();
        // console.log('page: ', apiServise.page);
        renderFilmsGallery().finally(hideSpinner);
        return;

      case 'tui-page-btn tui-prev-is-ellip tui-first-child':
        const activeBtnRef1 = document.querySelector('.tui-is-selected');
        apiServise.setPage(Number(activeBtnRef1.textContent));
        // console.log('page: ', apiServise.page);
        renderFilmsGallery().finally(hideSpinner);
        return;

      case 'tui-page-btn tui-next-is-ellip tui-last-child':
        const activeBtnRef2 = document.querySelector('.tui-is-selected');
        apiServise.setPage(Number(activeBtnRef2.textContent));
        // console.log('page: ', apiServise.page);
        renderFilmsGallery().finally(hideSpinner);
        return;

      default:
        console.log('Hi!');
    }
  }
}

function renderFilmsGallery() {
  return fetchMoviesByKeyword().then(({ results, total_results }) => {
    // console.log(results);
    // console.log(total_results);

    if (results.length === 0) {
      refs.notice.classList.remove('is-hidden');
      refs.notice.textContent =
        'Your search did not match any films. Please clarify the request!';

      return;
    }

    refs.filmsGallery.innerHTML = '';

    updateFilmsGalleryMarkup(results);

    const data = {
      totalAmountOfFilms: total_results,
    };

    return data;
  });
}

function fetchMoviesByKeyword() {
  return fetch(
    `${path}/search/movie?api_key=${key}&language=en-US&page=${apiServise.page}&include_adult=false&query=${apiServise.query}`,
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

    if (release_date) {
      release_date;
    } else {
      release_date = 'Unknown release date';
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

    refs.filmsGallery.insertAdjacentHTML('beforeend', markup);
  });
}

// =====================================================================

refs.searchForm.addEventListener('submit', listenSearchFormSubmit);
export default listenSearchFormSubmit;
