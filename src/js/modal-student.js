import * as basicLightbox from 'basiclightbox';
import students from './list-students';

const markupStudent = students.reduce(
  (string, { src, link, name, role }) =>
    string +
    `
<div class="team-card">
 <img class="team-image" src="${src}" alt="${name}">
    <h2 class="team-name">${name}</h2>
    <p class="team-role">${role}</p>
</div>`,
  '',
);

const container = document.querySelector('.open-modal-develop');

container.addEventListener('click', openModalStudent);

const modal = basicLightbox.create(
  `<div class="team-wrapper">${markupStudent}</div>`,
);

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
