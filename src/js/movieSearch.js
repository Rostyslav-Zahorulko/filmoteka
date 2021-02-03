// import refs from './refs.js';
// import decGenres from './decodingJenres.js';

// function searchFilm() {
//   const headerSearchForm = document.querySelector('.header-search-form');

//   headerSearchForm.addEventListener('submit', e => {
//     const liFilmsGalleryItem = document.querySelector('.films-gallery-item');
//     const listMovie = document.querySelector('.list-movie-search-js');
//     const paginationRostisl = document.querySelector('#pagination');

//     paginationRostisl.innerHTML = '';

//     if (liFilmsGalleryItem) {
//       listMovie.innerHTML = '';
//     }
//     e.preventDefault();
//     fetchApiSearch(e.target[0].value);
//     e.target[0].value = '';
//     console.log('Вывожу фильмы по запросу', e.target[0].value);
//     refs.spinner.classList.add('is-open');
//     const filmsGalleryId = document.querySelector('#films-gallery');
//     filmsGalleryId.innerHTML = '';
//   });
// }

// function fetchApiSearch(imputValue) {
//   // const startingUrl = 'https://image.tmdb.org/t/p/original'
//   const pageNumber = 1;
//   const query = imputValue;
//   const API = `https://api.themoviedb.org/3/search/movie?api_key=ffddee44025dd24685ea61d637d56d24&language=en-US&query=${query}&page=${pageNumber}&include_adult=false`;
//   fetch(API)
//     .then(res => res.json())
//     .then(data => {
//       showMoveNotFound(data);
//       makeNewObjectFilms(data);
//       refs.spinner.classList.remove('is-open');
//       console.log(data);

//       var items = $('.list-wrapper .list-item');
//       var numItems = data.total_pages;
//       var perPage = 20;

//       items.slice(perPage).hide();

//       $('#pagination-container').pagination({
//         items: numItems,
//         itemsOnPage: perPage,
//         prevText: '&laquo;',
//         nextText: '&raquo;',
//         onPageClick: function (pageNumber) {
//           const listMovie = document.querySelector('.list-movie-search-js');
//           listMovie.innerHTML = '';
//           fetch(
//             `https://api.themoviedb.org/3/search/movie?api_key=ffddee44025dd24685ea61d637d56d24&language=en-US&query=${query}&page=${pageNumber}&include_adult=false`,
//           )
//             .then(res => res.json())
//             .then(data => {
//               showMoveNotFound(data);
//               makeNewObjectFilms(data);
//               console.log(data);
//               // var showFrom = perPage * (pageNumber - 1);
//               // var showTo = showFrom + perPage;
//             });
//         },
//       });
//     });

//   const makeNewObjectFilms = function (data) {
//     const newData = data.results.map(item => {
//       let curentGenres = [];
//       item.genre_ids.map(id => {
//         const found = decGenres.find(item => item.id === id);
//         curentGenres.push(found.name);
//       });
//       if (curentGenres.length >= 3) {
//         const normalizedGenres = curentGenres.slice(0, 2);
//         normalizedGenres.push('Other');
//         item.genre_ids = normalizedGenres.join(', ');
//         item.release_date = item.release_date.slice(0, 4);
//       } else {
//         item.genre_ids = curentGenres.join(', ');
//         if (item.release_date)
//           item.release_date = item.release_date.slice(0, 4);
//       }

//       addMarkup(item);
//     });
//   };
// }

// function addMarkup(item) {
//   return refs.ulListMovie.insertAdjacentHTML(
//     'beforeend',
//     `
//         <li class="films-gallery-item" data-id="${item.id}">
//         <img class="films-gallery-item-image" src="https://image.tmdb.org/t/p/original${item.poster_path}" alt="${item.original_title}" width="150px"/>
//         <p class="films-gallery-item-title films-gallery-item-description">${item.original_title}</p>
//         <p class="films-gallery-item-info films-gallery-item-description">${item.genre_ids} | ${item.release_date}</p>
//         </li>
//       `,
//   );
// }

// function showMoveNotFound(data) {
//   if (data.results.length === 0) {
//     console.log(refs.headerSearchWarningShow());
//     refs.headerSearchWarningShow().classList.remove('is-hidden');
//   }
// }

// searchFilm();

// ______________________________________________________________________

import { paginateFilms, paginateOnClick } from './pagination';
import genres from './decodingJenres';
import { showSpinner, hideSpinner } from './spinner';

const refs = {
  filmsGallery: document.querySelector('#films-gallery'),
  searchForm: document.querySelector('#search-form'),
  notice: document.querySelector('.header-search-warning-show'),
};

const path = 'https://api.themoviedb.org/3';
const key = 'ffddee44025dd24685ea61d637d56d24';

function listenSearchFormSubmit() {
  refs.searchForm.addEventListener('submit', event => {
    event.preventDefault();

    refs.notice.classList.add('is-hidden');

    let page = 1;
    let query = '';

    const form = event.currentTarget;
    const input = form.elements.query;

    if (input.value === '') {
      refs.notice.classList.remove('is-hidden');
      // console.dir(refs.notice.textContent);
      // refs.notice.textContent ===
      //   'Unable to make a search query. Please enter any text!';

      return;
    }

    query = input.value;

    refs.filmsGallery.innerHTML = '';

    showSpinner();

    renderFilmsGallery(page, query, genres)
      .then(({ totalAmountOfFilms }) => {
        paginateFilms(totalAmountOfFilms);
        paginateOnClick(totalAmountOfFilms);
      })
      .catch(console.log)
      .finally(hideSpinner);

    paginateOnClick();

    form.reset();
  });
}

function renderFilmsGallery(page, query, genres) {
  return fetchMoviesByKeyword(page, query).then(
    ({ results, total_results }) => {
      console.log(results);
      console.log(total_results);

      if (results.length === 0) {
        refs.notice.classList.remove('is-hidden');
        // console.dir(refs.notice.textContent);
        // refs.notice.textContent ===
        //   'Your search did not match any films. Please clarify the request!';

        return;
      }

      updateFilmsGalleryMarkup(results, genres);

      const data = {
        totalAmountOfFilms: total_results,
      };

      return data;
    },
  );
}

function fetchMoviesByKeyword(page, query) {
  return fetch(
    `${path}/search/movie?api_key=${key}&language=en-US&page=${page}&include_adult=false&query=${query}`,
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

listenSearchFormSubmit();
