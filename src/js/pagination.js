import Pagination from 'tui-pagination';
import renderFilmsGallery from './homePageRendering';
import genres from './decodingJenres';
import { showSpinner, hideSpinner } from './spinner';

function paginateFilms(totalAmountOfFilms) {
  const options = {
    totalItems: totalAmountOfFilms,
    itemsPerPage: 20,
    visiblePages: 5,
    page: 1,
    centerAlign: false,
    firstItemClassName: 'tui-first-child',
    lastItemClassName: 'tui-last-child',
    template: {
      page: '<a href="#" class="tui-page-btn">{{page}}</a>',
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

  new Pagination('pagination', options);
}

function paginateOnClick(totalAmountOfFilms) {
  const paginationContainer = document.querySelector('#pagination');
  const filmsGallery = document.querySelector('#films-gallery');

  let currentPage = 1;

  paginationContainer.addEventListener(
    'click',
    handleOnPaginationContainerClick,
  );

  function handleOnPaginationContainerClick(event) {
    if (event.target.nodeName !== 'A') {
      return;
    }

    filmsGallery.innerHTML = '';

    showSpinner();

    const button = event.target;

    // console.dir(button);
    // console.log('button.className: ', button.className);

    switch (button.className) {
      case 'tui-page-btn':
        currentPage = Number(button.textContent);
        // console.log('currentPage: ', currentPage);
        renderFilmsGallery(currentPage, genres).finally(hideSpinner);
        return;

      case 'tui-page-btn tui-prev':
        currentPage -= 1;
        // console.log('currentPage: ', currentPage);
        renderFilmsGallery(currentPage, genres).finally(hideSpinner);
        return;

      case 'tui-page-btn tui-next':
        currentPage += 1;
        // console.log('currentPage: ', currentPage);
        renderFilmsGallery(currentPage, genres).finally(hideSpinner);
        return;

      case 'tui-page-btn tui-first':
        currentPage = 1;
        // console.log('currentPage: ', currentPage);
        renderFilmsGallery(currentPage, genres).finally(hideSpinner);
        return;

      case 'tui-page-btn tui-last':
        currentPage = totalAmountOfFilms / 20;
        // console.log('currentPage: ', currentPage);
        renderFilmsGallery(currentPage, genres).finally(hideSpinner);
        return;

      case 'tui-page-btn tui-first-child':
        currentPage = 1;
        // console.log('currentPage: ', currentPage);
        renderFilmsGallery(currentPage, genres).finally(hideSpinner);
        return;

      case 'tui-page-btn tui-prev-is-ellip tui-first-child':
        const a = document.querySelector('.tui-is-selected');
        console.log('activeBtnRef.textContent: ', a.textContent);

        // Тут має бути якась логіка

        return;

      case 'tui-page-btn tui-next-is-ellip tui-last-child':
        const b = document.querySelector('.tui-is-selected');
        console.log('activeBtnRef.textContent: ', b.textContent);

        // Тут має бути якась логіка

        return;

      default:
        console.log('Hi!');
    }
  }
}

export { paginateFilms, paginateOnClick };
