import * as basicLightbox from 'basiclightbox';
import photoRed from '../images/photo-red.jpg';
import students from './list-students'
console.log(students);

let markup = ''


const markupStudent = students.reduce(
  (string, item) => string + `
<div class="team-card">
 <img class="team-image" src="${item.src}" alt="${item.name}">
    <p class="team-name">${item.name}</p>
    <p class="team-role">${item.role}</p>
</div>`
,
  ""
);

const container = document.querySelector('.open-modal-develop');

container.addEventListener('click', openModalStudent);

const modal = basicLightbox.create(`<div class="team-wrapper">${markupStudent}</div>`);

function openModalStudent(e) {
  modal.show();

  window.addEventListener('keydown', closeModalHandler);

  function closeModalHandler(e) {
    if (e.code === 'Escape') {
      modal.close();
      window.removeEventListener('keydown', closeModalHandler);
    }
  }
}
