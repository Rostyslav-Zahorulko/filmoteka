const refs = {
  headerSearchWarningShow() {
    return document.querySelector('#header-search-warning-show');
  },
  filmsGallery: document.querySelector('#films-gallery'),
  header: document.querySelector('.header-container-js'),
  logo: document.querySelector('.header-logo-js'),
  homeLink: document.querySelector('.navigation-list-item-link-home'),
  spinner: document.querySelector('.js-spinner'),
  openModalBtn: document.querySelector('[data-action="open-modal"]'),
  closeModalBtn: document.querySelector('[data-action="close-modal"]'),
  backdrop: document.querySelector('.js-backdrop'),
  logOutbutton: document.querySelector('.js-singOut-button'),
  userName: document.querySelector('.js-display-username'),
  paginationContainer: document.querySelector('#pagination'),
};

export default refs;
