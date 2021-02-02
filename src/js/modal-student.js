import * as basicLightbox from 'basiclightbox';
const markupStudent = `<div class="team-wrapper">
<div class="team-card">
 <img
    class="team-image"
    src="https://ca.slack-edge.com/T01AD58HHH7-U01A3BS63M0-aac3cdcbf412-512"
  >
    <p class="team-name">Rostyslav Zahorulko</p>
    <p class="team-role">Team Lead</p>
    
</div>
<div class="team-card">
     <img
    class="team-image"
    src="https://ca.slack-edge.com/T01AD58HHH7-U01A5LX36UT-d79e95c64409-5122"
  >
    <p class="team-name">Arkadii Basovych</p>
    <p class="team-role">Scrum Master</p>
    
</div>
<div class="team-card">
    <img
    class="team-image"
    src="https://ca.slack-edge.com/T01AD58HHH7-U01A9LTBZA8-d98ef4f21eca-512"
  >
    <p class="team-name">Oksana Cherepanova</p>
    <p class="team-role">Developer</p>
    
</div>
<div class="team-card">
    <img
    class="team-image"
    src="https://ca.slack-edge.com/T01AD58HHH7-U019WN8GZJS-380c6cd06280-512"
  >
    <p class="team-name">Natalia Duvirak</p>
    <p class="team-role">Developer</p>
    
</div>
<div class="team-card">
    <img
    class="team-image"
    src="https://ca.slack-edge.com/T01AD58HHH7-U01A3BS63M0-aac3cdcbf412-512"
  >
    <p class="team-name">David Shakaya</p>
    <p class="team-role">Developer</p>
    
</div>
<div class="team-card">
    <img
    class="team-image"
    src="https://ca.slack-edge.com/T01AD58HHH7-U01A3HTTQE6-4c9caf01316f-512"
  >
    <p class="team-name">Oleksii Maistriuk</p>
    <p class="team-role">Developer</p>
    
</div>
<div class="team-card">
   <img
    class="team-image"
    src="https://ca.slack-edge.com/T01AD58HHH7-U01ATCQ5GKA-46dd5abf2215-512"
  >
    <p class="team-name">Zoe Baletska</p>
    <p class="team-role">Developer</p>
    
</div>
<div class="team-card">
    <img
    class="team-image"
    src="https://ca.slack-edge.com/T01AD58HHH7-U01A3BS63M0-aac3cdcbf412-512"
  >
    <p class="team-name">Serhii Koziuba</p>
    <p class="team-role">Developer</p>
    
</div>
<div class="team-card">
    <img
    class="team-image"
    src="https://ca.slack-edge.com/T01AD58HHH7-U019WP9NVN2-6122ddfef0b5-512"
  >
    <p class="team-name">Konstantin Bruno</p>
    <p class="team-role">Developer</p>
    
</div>
<div class="team-card">
    <img
    class="team-image"
    src="https://ca.slack-edge.com/T01AD58HHH7-U01A3BS63M0-aac3cdcbf412-512"
  >
    <p class="team-name">Iryna Redka</p>
    <p class="team-role">Developer</p>
    
</div>
<div class="team-card">
   <img
    class="team-image"
    src="https://ca.slack-edge.com/T01AD58HHH7-U019P8QMTUP-6513aed3ebc7-512"
  >
    <p class="team-name">Larysa Smyrnova</p>
    <p class="team-role">Developer</p>
</div>
</div>`;
const container = document.querySelector('.open-modal-develop');

container.addEventListener('click', openModalStudent);

const modal = basicLightbox.create(markupStudent);

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
