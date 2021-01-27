const refs = {
  filmsGallery: document.querySelector('.films-gallery'),
};
const path = 'https://api.themoviedb.org/3';
const key = 'ffddee44025dd24685ea61d637d56d24';
function fetchTrends() {
  fetch(`${path}/trending/movie/day?api_key=${key}`)
    .then(response => response.json())
    .then(({ results }) => {
      fetchGenres().then(({ genres }) => {
        updateFilmsGalleryMarkup(results, genres);
      });
    });
}
function fetchGenres() {
  return fetch(`${path}/genre/movie/list?api_key=${key}`).then(response =>
    response.json(),
  );
}
function updateFilmsGalleryMarkup(films, genres) {
    // console.log('genres:', genres);
  films.map(({ id, poster_path, title, release_date, genre_ids }) => {
    const filteredGenres = genres.filter(genre => genre_ids.includes(genre.id));
    // console.log(arr);
    const mapedGenres = filteredGenres.map(({ name }) => name);
    // console.log(genresArr);
    const markup = `
  <li class="films-gallery-item" data-id="${id}">
    <img
      class="films-gallery-item-image"
      src="https://image.tmdb.org/t/p/w342${poster_path}"
      alt="«${title}» film poster"
    >
    <p class="films-gallery-item-title films-gallery-item-description">${title.toUpperCase()}</p>
    <p class="films-gallery-item-info films-gallery-item-description">${mapedGenres.slice(0,3).join(', ')} | ${
      release_date.split('-')[0]
    }</p>    
  </li>
  `;
    refs.filmsGallery.insertAdjacentHTML('beforeend', markup);
  });
}
fetchTrends();