import './sass/main.scss';
import './js/movieSearch.js'
import * as homePageRendering from './js/homePageRendering';
import * as modalMovie from './js/modalMovie';

/* Пагинация пока тут */

// var items = $(".list-wrapper .list-item");
//     var numItems = items.length;
//     var perPage = 3;

//     items.slice(perPage).hide();

//     $('#pagination-container').pagination({
//         items: numItems,
//         itemsOnPage: perPage,
//         prevText: "&laquo;",
//         nextText: "&raquo;",
//         onPageClick: function (pageNumber) {
//             var showFrom = perPage * (pageNumber - 1);
//             var showTo = showFrom + perPage;
//             items.hide().slice(showFrom, showTo).show();
//         }
//     });