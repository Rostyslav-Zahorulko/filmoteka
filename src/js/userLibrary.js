const _ = require('lodash');
import toastr from 'toastr';
import '../../node_modules/toastr/build/toastr.css';

toastr.options = {
  closeButton: true,
  debug: false,
  newestOnTop: true,
  progressBar: false,
  positionClass: 'toast-bottom-right',
  preventDuplicates: false,
  onclick: null,
  showDuration: '200',
  hideDuration: '400',
  timeOut: '2000',
  extendedTimeOut: '1000',
  showEasing: 'swing',
  hideEasing: 'linear',
  showMethod: 'fadeIn',
  hideMethod: 'fadeOut',
};

// WATCHED LIBRARY (ADD MOVIES TO USER WATCHeD IN THE LOCAL STORAGE)
// LOCAL STORAGE KEY = localWatched

export function updateUserWatched(movieData) {
  let userWatched = [];
  let localWatched = localStorage.getItem('localWatched');

  if (localWatched) {
    userWatched = JSON.parse(localWatched);
    const isDublicate = userWatched.some(function (movie) {
      return movie.id === movieData.id;
    });
    if (isDublicate) {
      console.log('this movie has already been added');
      toastr['warning']('This movie has already been added');
      return userWatched;
    } else if (!isDublicate) {
      userWatched.push(movieData);
      toastr['success']('Added to your Watched list');
      return userWatched;
    }
    return userWatched;
  } else {
    userWatched.push(movieData);
    toastr['success']('Added to your Watched list');
  }

  return userWatched;
}

export function addToLocalWatched(array) {
  // console.log(array);
  localStorage.setItem('localWatched', JSON.stringify(array));
}

// QUEUE LIBRARY (ADD MOVIES TO USER QUEUE IN THE LOCAL STORAGE)
// LOCAL STORAGE KEY = localQueue

export function updateUserQueue(movieData) {
  let userQueue = [];
  let localQueue = localStorage.getItem('localQueue');

  if (localQueue) {
    userQueue = JSON.parse(localQueue);

    if (isInWatched(movieData)) {
      console.log('you`ve already watched this movie');
      toastr['warning']('You`ve alredy watched this movie');
      return userQueue;
    }

    const isDublicate = userQueue.some(function (movie) {
      return movie.id === movieData.id;
    });
    if (isDublicate) {
      console.log('this movie has already been added');
      toastr['warning']('This movie has already been added');
      return userQueue;
    } else if (!isDublicate) {
      userQueue.push(movieData);
      toastr['success']('Added to your Queue');
      return userQueue;
    }
  } else {
    userQueue.push(movieData);
    toastr['success']('Added to your Queue');
    return userQueue;
  }
}

export function addToLocalQueue(array) {
  // console.log(array);
  localStorage.setItem('localQueue', JSON.stringify(array));
}

// CHECK IF WATCHED MOVIE IS ON QUEUE. DELETE IF SO
export function checkIfInQueue(movieData) {
  // let userQueue = [];
  let localQueue = localStorage.getItem('localQueue');

  if (localQueue) {
    let userQueue = JSON.parse(localQueue);
    const isDublicate = userQueue.some(function (movie) {
      return movie.id === movieData.id;
    });
    if (isDublicate) {
      let movieIndex = userQueue.findIndex(movie => movie.id === movieData.id);
      userQueue.splice(movieIndex, 1);
      console.log('movie was deleted wrom Queue and added to watched');
      addToLocalQueue(userQueue);
    }
    // return;
  }
}

// IS THIS MOVIE IS ALREADY WATCHED (DO NOT ADD TO QUEUE)
function isInWatched(movieData) {
  let userWatched = [];
  let localWatched = localStorage.getItem('localWatched');

  if (localWatched) {
    userWatched = JSON.parse(localWatched);
    const isDublicate = userWatched.some(function (movie) {
      return movie.id === movieData.id;
    });
    return isDublicate;
  } else {
    return false;
  }
}
