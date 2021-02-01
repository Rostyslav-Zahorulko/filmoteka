const spinnerRef = document.querySelector('.js-spinner');

function showSpinner() {
  spinnerRef.classList.add('is-open');
}

function hideSpinner() {
  spinnerRef.classList.remove('is-open');
}

export { showSpinner, hideSpinner };
