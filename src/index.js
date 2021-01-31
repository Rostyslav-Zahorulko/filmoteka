import './sass/main.scss';
import './js/movieSearch.js'
import * as homePageRendering from './js/homePageRendering';
import * as modalMovie from './js/modalMovie';










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


