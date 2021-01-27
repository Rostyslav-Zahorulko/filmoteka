import './sass/main.scss';
import headertTemplates from './templates/header-templates';



const headerRef = document.querySelector('.header-container-js');


headerRef.insertAdjacentHTML('beforeend', headertTemplates.homeHeader);