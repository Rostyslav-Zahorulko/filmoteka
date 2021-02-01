const refs = {
  ulListMovie: document.querySelector('.list-movie-search-js'),
  liFilmsGalleryItem: document.querySelector('.films-gallery-item'),
  headerSearchWarningShow() {
    return document.querySelector('#header-search-warning-show');
  },
  spinner: document.querySelector('.js-spinner'),
  filmsGalleryId: document.querySelector('#films-gallery'),
  header: document.querySelector('.header-container-js'),
  logo: document.querySelector('.header-logo-js'),
  homeLink: document.querySelector('.navigation-list-item-link-home'),
};

export default refs;
