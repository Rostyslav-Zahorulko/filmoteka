import headerTemplates from './components/headers-tpl';
import searchFilm from './movieSearch.js';
import genres from './decodingJenres';

const refs = {
  filmsGallery: document.querySelector('#films-gallery'),
  header: document.querySelector('.header-container-js'),
  logo: document.querySelector('.header-logo-js'),
  homeLink: document.querySelector('.navigation-list-item-link-home'),
};

const path = 'https://api.themoviedb.org/3';
const key = 'ffddee44025dd24685ea61d637d56d24';

let currentPage = 1;

function renderHomePage(headerTemplates, currentPage, genres) {
  updateHeaderMarkup(headerTemplates);
  renderFilmsGallery(currentPage, genres);
}

function updateHeaderMarkup(headerTemplates) {
  refs.header.insertAdjacentHTML('beforeend', headerTemplates);
}

function renderFilmsGallery(page, genres) {
  fetchTrends(page)
    .then(({ results }) => updateFilmsGalleryMarkup(results, genres))
    .catch(console.log);
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

    const markup = `
<li class="films-gallery-item" data-id="${id}">
  <img
    class="films-gallery-item-image"
    src="https://image.tmdb.org/t/p/w342${poster_path}"
    alt="«${title}» film poster"
  >
  <p class="films-gallery-item-title">${title.toUpperCase()}</p>
  <p class="films-gallery-item-info">${mapedGenres.slice(0, 3).join(', ')} | ${
      release_date.split('-')[0]
    }</p>
</li>
`;

    refs.filmsGallery.insertAdjacentHTML('beforeend', markup);
  });
}

renderHomePage(headerTemplates.homeHeader, currentPage, genres);

// Функция поиска и рендера фильма
searchFilm();

export default renderFilmsGallery;
