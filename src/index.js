import './sass/main.scss';
import './js/movieSearch.js'
import * as homePageRendering from './js/homePageRendering';
import * as modalMovie from './js/modalMovie';

import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';


const refs = {
  filmsGallery: document.querySelector('.films-gallery'),
};
const path = 'https://api.themoviedb.org/3';
const key = 'ffddee44025dd24685ea61d637d56d24';
function renderFilmsGallery(page) {
  fetchTrends(page)
    .then(({ results }) => {
      fetchGenres().then(({ genres }) => {
        updateFilmsGalleryMarkup(results, genres);
      });
    })
    .catch(console.log);
}


function fetchTrends(page) {
  return fetch(
    `${path}/trending/movie/day?api_key=${key}&page=${page}`,
  ).then(response => response.json());
}
function fetchGenres() {
  return fetch(`${path}/genre/movie/list?api_key=${key}`).then(response =>
    response.json(),
  );
}
function updateFilmsGalleryMarkup(films, genres) {
  // console.log('genres: ', genres);
  films.map(({ id, poster_path, title, release_date, genre_ids }) => {
    const filteredGenres = genres.filter(genre => genre_ids.includes(genre.id));
    // console.log("filteredGenres: ", filteredGenres);
    const mapedGenres = filteredGenres.map(({ name }) => name);
    // console.log("mapedGenres: ", mapedGenres);
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
let currentPage = 1;
renderFilmsGallery(currentPage);



const options = {
  totalItems: 20000,
  itemsPerPage: 20,
  visiblePages: 10,
  page: 1,
  centerAlign: false,
  firstItemClassName: 'tui-first-child',
  lastItemClassName: 'tui-last-child',
  template: {
    page: `<a href="#" class="tui-page-btn qwerty">{{page}}</a>`,
    currentPage:
      '<strong class="tui-page-btn tui-is-selected">{{page}}</strong>',
    moveButton:
      '<a href="#" class="tui-page-btn tui-{{type}}">' +
      '<span class="tui-ico-{{type}}">{{type}}</span>' +
      '</a>',
    disabledMoveButton:
      '<span class="tui-page-btn tui-is-disabled tui-{{type}}">' +
      '<span class="tui-ico-{{type}}">{{type}}</span>' +
      '</span>',
    moreButton:
      '<a href="#" class="tui-page-btn tui-{{type}}-is-ellip">' +
      '<span class="tui-ico-ellip">...</span>' +
      '</a>',
  },
};
const pagination = new Pagination('pagination', options);
const paginationContainer = document.querySelector('#pagination');
// console.log(paginationContainer);
paginationContainer.addEventListener('click', handleOnPaginationContainerClick);
function handleOnPaginationContainerClick(event) {
  refs.filmsGallery.innerHTML = '';
  if (event.target.nodeName !== 'A') {
    return;
  }
  const button = +event.target.textContent
  // const button
  if (Number.isInteger(button)) {
    currentPage = button
    renderFilmsGallery(currentPage)
  }
  console.log(event.target);
    if (event.target.attributes[1].nodeValue === 'tui-page-btn tui-next') {
    currentPage+=1
    renderFilmsGallery(currentPage)
  }
  if (event.target.attributes[1].nodeValue === 'tui-page-btn tui-prev') {
    currentPage-=1
    renderFilmsGallery(currentPage)
  }
  if (event.target.attributes[1].nodeValue === 'tui-page-btn tui-first') {
    currentPage = 1
    renderFilmsGallery(currentPage)
  }
  if (event.target.attributes[1].nodeValue === 'tui-page-btn tui-last') {
    currentPage = 2000
    renderFilmsGallery(currentPage)
  }
  
  }
 









/* ----------------------------------- */
// const query = '12'
// let pageNumber = 1
// let url = `language=en-US&query=${query}&page=${pageNumber}&include_adult=false`;


// const qwe = document.querySelector('.paginationjs-pages');
// console.log(qwe);
// $(function () {

//     (function(name) {
//         var container = $('#pagination-' + name);
//         container.pagination({
//           dataSource: `https://api.themoviedb.org/3/search/movie?api_key=ffddee44025dd24685ea61d637d56d24&${url}`,
//           totalNumber: 916,
//             locator: 'results',
//             pageSize: 20,
//           pageNumber: 1,
//           pageRange: 2,
//           ajax: {
//               beforeSend: function () {
//                   container.prev().html('Loading data from flickr.com ...');
//               },
             
//           },
//           callback: function (response, pagination) {
//               window.console && console.log(10, response, pagination);
//               console.log('pagination', pagination);
//               pageNumber = pagination.pageNumber,
//                   console.log(pageNumber);

//             //  pageRange()
//               console.log(pageNumber)
             
                    
//           var dataHtml = '<ul>';

//         $.each(response, function (index, results) {
//             dataHtml += '<li class="films-gallery-item list-item">' + results.title + '</li>';
//             dataHtml += `<img  <img class="films-gallery-item-image" src="https://image.tmdb.org/t/p/original${results.poster_path}" ></img>`;
//         });

//         dataHtml += '</ul>';

//               container.prev().html(dataHtml);
//         }
//     })
//   })('demo2');
// })


