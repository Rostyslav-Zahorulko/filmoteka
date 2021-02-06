import Pagination from 'tui-pagination';
import { renderFilmsGallery} from './homePageRendering';
import { showSpinner, hideSpinner } from './spinner';
import apiServise from './api-servise';

const refs = {
  filmsGallery: document.querySelector('#films-gallery'),
  paginationContainer: document.querySelector('#pagination'),
};

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
  refs.paginationContainer.addEventListener(
    'click',
    handleOnPaginationContainerClick
  );

  function handleOnPaginationContainerClick(event) {
    console.log("сработало: " + handleOnPaginationContainerClick);
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

export { paginateFilms, paginateOnClick };
