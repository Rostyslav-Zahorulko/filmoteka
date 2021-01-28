const headerTemplates = {
  homeHeader: `<div class=" header home-header header-container">
  <div class="header-nav-container">
    <a href="" class="header-logo logo link header-logo-js">
    <svg class="header-logo-img" width="24" height="24">
      <use class="qwer" href="./images/sprite.svg#icon-film"></use>
    </svg>
    <span class="header-logo-txt">Filmoteka</span></a>
  
<nav class="header-navigation">
  <ul class="header-navigation-list">
    <li class="header-navigation-list-item"><a href=""
        class="navigation-list-item-link link navigation-list-item-link-home current">HOME</a></li>
    <li class="header-navigation-list-item"><a href=""
        class="navigation-list-item-link link navigation-list-item-link-my-library">MY LIBRARY</a>
    </li>
  </ul>
</nav></div>
  <form action="" class="header-search-form" id="search-form">
    <input type="text" name="query" class="header-search-form-input" placeholder="Поиск фильмов">
    <button class="header-search-form-btn" type="submit"><svg class="header-form-btn-img" width="12" height="12">
      <use href="./images/sprite.svg#icon-search"></use>
    </svg></button>
  </form>
  <p class="header-search-warning">Search result not successful. Enter the correct movie name and</p>
</div>`,
  myLibraryHeader: `<div class=" header my-library-header header-container">
  <div class="header-nav-container">
    <a href="" class="header-logo logo link header-logo-js">
      <svg class="header-logo-img" width="24" height="24">
        <use class="qwer" href="./images/sprite.svg#icon-film"></use>
      </svg>
      <span class="header-logo-txt">Filmoteka</span></a>
  <nav class="header-navigation">
    <ul class="header-navigation-list">
      <li class="header-navigation-list-item"><a href=""
          class="navigation-list-item-link link navigation-list-item-link-home">HOME</a></li>
      <li class="header-navigation-list-item"><a href=""
          class="navigation-list-item-link link navigation-list-item-link-my-library current">MY LIBRARY</a>
      </li>
  
    </ul>
  </nav>
  </div>
  <ul class="header-button-list">
    <li class="header-button-item"><button class="header-button header-button-watched is-active-btn">watched</button></li>
    <li class="header-button-item"><button class="header-button header-button-queue">queue</button></li>
  </ul>
  
</div>`,
  modalHeader: `<div class="header modal-header header-container">
  <div class="header-nav-container">
    <a href="" class="header-logo logo link header-logo-js">
      <svg class="header-logo-img" width="24" height="24">
        <use class="qwer" href="./images/sprite.svg#icon-film"></use>
      </svg>
      <span class="header-logo-txt">Filmoteka</span></a>
    <nav class="header-navigation">
      <ul class="header-navigation-list">
        <li class="header-navigation-list-item"><a href="" class="navigation-list-item-link link navigation-list-item-link-home">HOME</a></li>
        <li class="header-navigation-list-item"><a href="" class="navigation-list-item-link link navigation-list-item-link-my-library">MY LIBRARY</a>
        </li>
      </ul>
    </nav>
  </div>
</div>`,
};
export default headerTemplates;
