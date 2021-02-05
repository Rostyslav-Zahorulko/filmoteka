import { paginateFilms, paginateOnClick } from './pagination';
import genres from './decodingJenres';
import { showSpinner, hideSpinner } from './spinner';
import apiServise from './api-servise';

const refs = {
  filmsGallery: document.querySelector('#films-gallery'),
  searchForm: document.querySelector('#search-form'),
  notice: document.querySelector('.header-search-warning-show'),
};

const path = 'https://api.themoviedb.org/3';
const key = 'ffddee44025dd24685ea61d637d56d24';

function listenSearchFormSubmit(event) {
    event.preventDefault();

    apiServise.resetPage();
    // console.log('apiServise.page: ', apiServise.page);

    refs.notice.classList.add('is-hidden');

    const form = event.currentTarget;
    const input = form.elements.query;

    if (input.value === '') {
      refs.notice.classList.remove('is-hidden');
      refs.notice.textContent =
        'Unable to make a search query. Please enter any text!';

      return;
    }

    apiServise.setQuery(input.value);
    // console.log('apiServise.query: ', apiServise.query);

    showSpinner();
    setPagination().catch(console.log).finally(hideSpinner);

  form.reset();
};

function setPagination() {
  return renderFilmsGallery().then(({ totalAmountOfFilms }) => {
    // console.log('totalAmountOfFilms: ', totalAmountOfFilms);

    paginateFilms(totalAmountOfFilms);
    paginateOnClick(totalAmountOfFilms);
  });
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

refs.searchForm.addEventListener('submit', listenSearchFormSubmit);
export default listenSearchFormSubmit;
