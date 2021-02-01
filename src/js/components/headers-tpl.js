const headerTemplates = {
  homeHeader: `<div class=" header home-header header-container">
  <div class="header-nav-container">
    <a href="" class="header-logo logo link header-logo-js">
    <span class="header-logo-img header-logo-js"></span>
    <span class="header-logo-txt header-logo-js">Filmoteka</span></a>
    <div class="header-nav-container-right-side">
  
<nav class="header-navigation">
  <ul class="header-navigation-list">
    <li class="header-navigation-list-item"><a href=""
        class="navigation-list-item-link link navigation-list-item-link-home current">HOME</a></li>
    <li class="header-navigation-list-item"><a href=""
        class="navigation-list-item-link link navigation-list-item-link-my-library">MY LIBRARY</a>
    </li>
    
  </ul>
</nav>
          <button class="js-singOut-button logButton" type="button">
          sign Out
        </button>
        <button data-action="open-modal" class="logButton" type="button">
          log In
        </button></div>

        </div>

  <form action="" class="header-search-form" id="search-form">
    <input type="text" name="query" class="header-search-form-input" placeholder="Поиск фильмов">
    <button class="header-search-form-btn" type="submit"></button>
  </form>
  <p id="header-search-warning-show"  class="header-search-warning-show is-hidden">Search result not successful. Enter the correct movie name and</p>

  <div class='display-userinfo'><span class='display-user-logo'></span> <span class='js-display-username'></span></div>
</div>`,
  myLibraryHeader: `<div class=" header my-library-header header-container">
  <div class="header-nav-container">
    <a href="" class="header-logo logo link header-logo-js">
      <span class="header-logo-img header-logo-js"></span>
      <span class="header-logo-txt header-logo-js">Filmoteka</span></a>
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
      <span class="header-logo-img header-logo-js"></span>
      <span class="header-logo-txt header-logo-js">Filmoteka</span></a>
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
