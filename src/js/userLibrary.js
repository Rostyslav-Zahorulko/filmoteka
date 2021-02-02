import refs from './refs';

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

    if (refs.addToWatchedBtn.classList.contains('js-is-in-watched')) {
      let movieIndex = userWatched.findIndex(
        movie => movie.id === movieData.id,
      );
      movieData.isInWatched = false;
      userWatched.splice(movieIndex, 1);
      refs.addToWatchedBtn.textContent = 'Add to Watched';
      refs.addToWatchedBtn.classList.remove('js-is-in-watched');
      toastr['success']('Removed from your Watched list');

      return userWatched;
    } else {
      const isDublicate = userWatched.some(function (movie) {
        return movie.id === movieData.id;
      });
      if (isDublicate) {
        console.log('this movie has already been added');
        toastr['warning']('This movie has already been added');
        return userWatched;
      } else if (!isDublicate) {
        movieData.isInWatched = true;
        userWatched.push(movieData);
        toastr['success']('Added to your Watched list');
        // изменение текста кнопки
        refs.addToWatchedBtn.textContent = 'Watched (remove)';
        refs.addToWatchedBtn.classList.add('js-is-in-watched');

        return userWatched;
      }
      return userWatched;
    }
  } else {
    movieData.isInWatched = true;
    userWatched.push(movieData);
    toastr['success']('Added to your Watched list');
    // изменение текста кнопки
    refs.addToWatchedBtn.textContent = 'Watched (remove)';
    refs.addToWatchedBtn.classList.add('js-is-in-watched');
  }

  return userWatched;
}

export function addToLocalWatched(array) {
  // console.log(array);
  localStorage.setItem('localWatched', JSON.stringify(array));
}

// QUEUE LIBRARY (ADD MOVIES TO USER QUEUE IN THE LOCAL STORAGE)
// LOCAL STORAGE KEY = localQueue

// export function updateUserQueue(movieData) {
//   let userQueue = [];
//   let localQueue = localStorage.getItem('localQueue');

//   if (localQueue) {
//     userQueue = JSON.parse(localQueue);

//     if (isInWatched(movieData)) {
//       console.log('you`ve already watched this movie');
//       toastr['warning']('You`ve alredy watched this movie');
//       return userQueue;
//     }

//     const isDublicate = userQueue.some(function (movie) {
//       return movie.id === movieData.id;
//     });
//     if (isDublicate) {
//       console.log('this movie has already been added');
//       toastr['warning']('This movie has already been added');
//       return userQueue;
//     } else if (!isDublicate) {
//       userQueue.push(movieData);
//       toastr['success']('Added to your Queue');
//       return userQueue;
//     }
//   } else {
//     userQueue.push(movieData);
//     toastr['success']('Added to your Queue');
//     return userQueue;
//   }
// }

export function updateUserQueue(movieData) {
  let userQueue = [];
  let localQueue = localStorage.getItem('localQueue');

  if (localQueue) {
    userQueue = JSON.parse(localQueue);

    if (refs.addToQueueBtn.classList.contains('js-is-in-queue')) {
      let movieIndex = userQueue.findIndex(movie => movie.id === movieData.id);
      movieData.isInQueue = false;
      userQueue.splice(movieIndex, 1);
      refs.addToQueueBtn.textContent = 'Add to Queue';
      refs.addToQueueBtn.classList.remove('js-is-in-queue');
      toastr['success']('Removed from your Queue');
      return userQueue;
    } else {
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
        movieData.isInQueue = true;
        toastr['success']('Added to your Queue');
        // изменение текста кнопки
        refs.addToQueueBtn.textContent = 'In Queue (remove)';
        refs.addToQueueBtn.classList.add('js-is-in-queue');
        return userQueue;
      }
    }
  } else {
    userQueue.push(movieData);
    movieData.isInQueue = true;
    toastr['success']('Added to your Queue');
    // изменение текста кнопки
    refs.addToQueueBtn.textContent = 'In Queue (remove)';
    refs.addToQueueBtn.classList.add('js-is-in-queue');
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
      movieData.isInQueue = false;

      refs.addToQueueBtn.textContent = 'Add to Queue';
      refs.addToQueueBtn.classList.remove('js-is-in-queue');

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

// UPDATE BUTTONS IN MOVIECARD IF USER HAS wATCHeD THE MOVIE
export function checkIfIsInUserLibrary(movieData) {
  // CHECK UZER WATCHeD
  let localWatched = localStorage.getItem('localWatched');

  if (localWatched) {
    let userWatched = JSON.parse(localWatched);
    const isDublicate = userWatched.some(movie => movie.id === movieData.id);
    console.log(isDublicate);
    if (isDublicate) {
      let movieIndex = userWatched.findIndex(
        movie => movie.id === movieData.id,
      );
      console.log(movieIndex);
      if (userWatched[movieIndex].isInWatched) {
        refs.addToWatchedBtn.textContent = 'Watched (remove)';
        refs.addToWatchedBtn.classList.add('js-is-in-watched');
      }
    }
  }
  // CHECK USER QUEUE
  let localQueue = localStorage.getItem('localQueue');

  if (localQueue) {
    let userQueue = JSON.parse(localQueue);
    const isDublicate = userQueue.some(movie => movie.id === movieData.id);
    console.log(isDublicate);
    if (isDublicate) {
      let movieIndex = userQueue.findIndex(movie => movie.id === movieData.id);
      console.log(movieIndex);
      if (userQueue[movieIndex].isInQueue) {
        refs.addToQueueBtn.textContent = 'In queue (remove)';
        refs.addToQueueBtn.classList.add('js-is-in-queue');
      }
    }
  }
}
