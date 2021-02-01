import headerTemplates from './components/headers-tpl';
import genres from './decodingJenres';

const refs = {
  header: document.querySelector('.header-container-js'),
  filmsGallery: document.querySelector('#films-gallery'),
  spinner: document.querySelector('.js-spinner'),
};

refs.spinner.classList.add('is-open');
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
    .catch(console.log)
    .finally(() => {
      refs.spinner.classList.remove('is-open');
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

renderHomePage(headerTemplates.homeHeader, currentPage, genres);

export default renderFilmsGallery;
