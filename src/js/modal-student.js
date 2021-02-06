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
// {/* </div> */}
// console.log(`);



// console.log(markup);
//  =
// <div class="team-card">
//      <img
//     class="team-image"
//     src="https://ca.slack-edge.com/T01AD58HHH7-U01A5LX36UT-d79e95c64409-5122"
//   >
//     <p class="team-name">Arkadii Basovych</p>
//     <p class="team-role">Scrum Master</p>
    
// </div>
// <div class="team-card">
//     <img
//     class="team-image"
//     src="https://ca.slack-edge.com/T01AD58HHH7-U01A9LTBZA8-06cbe1fcd7b6-512"
//   >
//     <p class="team-name">Oksana Cherepanova</p>
//     <p class="team-role">Developer</p>
    
// </div>
// <div class="team-card">
//     <img
//     class="team-image"
//     src="https://ca.slack-edge.com/T01AD58HHH7-U019WN8GZJS-380c6cd06280-512"
//   >
//     <p class="team-name">Natalia Duvirak</p>
//     <p class="team-role">Developer</p>
    
// </div>
// <div class="team-card">
//     <img
//     class="team-image"
//     src="https://ca.slack-edge.com/T01AD58HHH7-U01AT710YLQ-3a6d16128ec7-512"
//   >
//     <p class="team-name">David<br>Shakaya</p>
//     <p class="team-role">Developer</p>
    
// </div>
// <div class="team-card">
//     <img
//     class="team-image"
//     src="https://ca.slack-edge.com/T01AD58HHH7-U01A3HTTQE6-4c9caf01316f-512"
//   >
//     <p class="team-name">Oleksii Maistriuk</p>
//     <p class="team-role">Developer</p>
    
// </div>
// <div class="team-card">
//    <img
//     class="team-image"
//     src="https://ca.slack-edge.com/T01AD58HHH7-U01ATCQ5GKA-46dd5abf2215-512"
//   >
//     <p class="team-name">Zoe<br>Baletska</p>
//     <p class="team-role">Developer</p>
    
// </div>
// <div class="team-card">
//     <img
//     class="team-image"
//     src="https://ca.slack-edge.com/T01AD58HHH7-U019WKPR89L-21c1789a67bc-512"
//   >
//     <p class="team-name">Serhii<br>Koziuba</p>
//     <p class="team-role">Developer</p>
    
// </div>
// <div class="team-card">
//     <img
//     class="team-image"
//     src="https://ca.slack-edge.com/T01AD58HHH7-U019WP9NVN2-6122ddfef0b5-512"
//   >
//     <p class="team-name">Konstantin Bruno</p>
//     <p class="team-role">Developer</p>
    
// </div>
// <div class="team-card">
//     <img
//     class="team-image"
//     src="${photoRed}"
//   >
//     <p class="team-name">Iryna<br>Redka</p>
//     <p class="team-role">Developer</p>
    
// </div>
// <div class="team-card">
//    <img
//     class="team-image"
//     src="https://ca.slack-edge.com/T01AD58HHH7-U019P8QMTUP-6513aed3ebc7-512"
//   >
//     <p class="team-name">Larysa Smyrnova</p>
//     <p class="team-role">Developer</p>
// </div>
// </div>`;
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
