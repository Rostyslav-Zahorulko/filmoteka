const headerTemplates = {
  homeHeader: `<div class=" header home-header header-container">
  
  <form action="" class="header-search-form" id="search-form">
    <input type="text" name="query" class="header-search-form-input" placeholder="Поиск фильмов">
    <button class="header-search-form-btn" type="submit"></button>
  </form>
  <p id="header-search-warning-show"  class="header-search-warning-show is-hidden">Search result not successful. Enter the correct movie name and</p>

  

  <div class="header-backdrop js-backdrop">
          <div class="header-modal">
            <div id="firebaseui-auth-container"></div>
            <button type="button" class="button-close-modal" data-action="close-modal">
              Close
            </button>
          </div>
        </div>
</div>`,
  myLibraryHeader: `<div class=" header my-library-header header-container">
  
  <ul class="header-button-list">
    <li class="header-button-item"><button class="header-button header-button-watched is-active-btn">watched</button></li>
    <li class="header-button-item"><button class="header-button header-button-queue">queue</button></li>
  </ul>

   

    <div class="header-backdrop js-backdrop">
          <div class="header-modal">
            <div id="firebaseui-auth-container"></div>
            <button type="button" class="button-close-modal" data-action="close-modal">
              Close
            </button>
          </div>
        </div>
  
</div>`,
  modalHeader: `<div class="header modal-header header-container">
  

   


    <div class="header-backdrop js-backdrop">
          <div class="header-modal">
            <div id="firebaseui-auth-container"></div>
            <button type="button" class="button-close-modal" data-action="close-modal">
              Close
            </button>
          </div>
        </div>
</div>`,
};
export default headerTemplates;
