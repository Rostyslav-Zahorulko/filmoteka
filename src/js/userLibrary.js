import firebase from 'firebase/app';
import 'firebaseui';
import 'firebase/database';
import '../../node_modules/firebaseui/dist/firebaseui.css';
import refs from './refs';
import { currentUserId, filmotekaDatabase } from './login-form';

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

// ========================VARIABLES==============================
// export let currentUserId = JSON.parse(localStorage.getItem('currentUserId'));

// let userWatched = getUserWatchedFromDatabase(currentUserId);
// let userQueue = getUserQueueFromDatabase(currentUserId);

// ==================INITIALAZING DATABASE========================
filmotekaDatabase.on('value', elem => {
  const usersBase = elem.val();
  console.log(usersBase);
});

// ==================ADDING TO USER WATCHED LIBRARY===============
export function updateUserWatched(movieData) {
  let userData = getUserLibraryFromDatabase(currentUserId);
  if (!userData) {
    toastr['error']('Please LOG IN to add the movie');
    return;
  }

  if (userData.userWatched) {
    if (!userData.userQueue) {
      userData.userQueue = [];
      updateUserDatabase(currentUserId, userData);
      // console.log(userData.userQueue);
    }
    if (refs.addToWatchedBtn.classList.contains('js-is-in-watched')) {
      let movieIndex = userData.userWatched.findIndex(
        movie => movie.id === movieData.id,
      );
      movieData.isInWatched = false;
      userData.userWatched.splice(movieIndex, 1);
      updateUserDatabase(currentUserId, userData);
      changeWatchedBtnToAdd();
      toastr['success']('Removed from your Watched list');
      return userData.userWatched;
    } else {
      const isDublicate = userData.userWatched.some(function (movie) {
        return movie.id === movieData.id;
      });
      if (isDublicate) {
        toastr['warning']('This movie has already been added');
        return userData.userWatched;
      } else if (!isDublicate) {
        movieData.isInWatched = true;
        userData.userWatched.push(movieData);
        updateUserDatabase(currentUserId, userData);
        toastr['success']('Added to your Watched list');
        changeWatchedBtnToRemove();
        return userData.userWatched;
      }
      return userData.userWatched;
    }
  } else {
    movieData.isInWatched = true;
    userData.userWatched = [];
    userData.userWatched.push(movieData);

    if (!userData.userQueue) {
      userData.userQueue = [];
      updateUserDatabase(currentUserId, userData);
      // console.log(userData.userQueue);
    } else {
      updateUserDatabase(currentUserId, userData);
    }
    toastr['success']('Added to your Watched list');
    changeWatchedBtnToRemove();
  }
  // getUserWatchedFromDatabase(currentUserId);
}

// ==================ADDING TO USER QUEUE LIBRARY===============
export function updateUserQueue(movieData) {
  let userData = getUserLibraryFromDatabase(currentUserId);
  if (!userData) {
    toastr['error']('Please LOG IN to add the movie');
    return;
  }

  // console.log(userData.userQueue);
  if (userData.userQueue) {
    if (!userData.userWatched) {
      userData.userWatched = [];
      updateUserDatabase(currentUserId, userData);
    }
    if (refs.addToQueueBtn.classList.contains('js-is-in-queue')) {
      let movieIndex = userData.userQueue.findIndex(
        movie => movie.id === movieData.id,
      );
      movieData.isInQueue = false;
      userData.userQueue.splice(movieIndex, 1);
      updateUserDatabase(currentUserId, userData);
      changeQueueBtnToAdd();
      toastr['success']('Removed from your Queue');
      return userData.userQueue;
    } else {
      if (isInWatched(movieData)) {
        console.log('you`ve already watched this movie');
        toastr['warning']('You`ve alredy watched this movie');
        return userData.userQueue;
      } else {
        const isDublicate = userData.userQueue.some(function (movie) {
          return movie.id === movieData.id;
        });

        if (isDublicate) {
          console.log('this movie has already been added');
          toastr['warning']('This movie has already been added');
          return userData.userQueue;
        } else if (!isDublicate) {
          movieData.isInQueue = true;
          userData.userQueue.push(movieData);
          updateUserDatabase(currentUserId, userData);
          toastr['success']('Added to your Queue');
          // изменение текста кнопки
          changeQueueBtnToRemove();
          return userData.userQueue;
        }
      }
    }
  } else {
    if (!userData.userWatched) {
      userData.userWatched = [];
      userData.userQueue = [];
      updateUserDatabase(currentUserId, userData);
      // console.log(userData.userQueue);
    }
    if (isInWatched(movieData)) {
      console.log('you`ve already watched this movie');
      toastr['warning']('You`ve alredy watched this movie');
      return userData.userQueue;
    }
    userData.userQueue = [];
    movieData.isInQueue = true;
    userData.userQueue.push(movieData);

    if (!userData.userWatched) {
      userData.userQueue = [];
      updateUserDatabase(currentUserId, userData);
    } else {
      updateUserDatabase(currentUserId, userData);
    }

    toastr['success']('Added to your Queue');
    // изменение текста кнопки
    changeQueueBtnToRemove();
    return userData.userQueue;
  }
}

// ===============CHECK IF WATCHED MOVIE IS IN QUEUE. DELETE IF SO=================
export function checkIfInQueue(movieData) {
  let userData = getUserLibraryFromDatabase(currentUserId);
  // console.log(userData.userQueue);
  if (!userData) {
    return;
  }

  if (userData.userQueue) {
    if (!userData.userWatched) {
      userData.userWatched = [];
      updateUserDatabase(currentUserId, userData);
    }

    const isDublicate = userData.userQueue.some(function (movie) {
      return movie.id === movieData.id;
    });
    if (isDublicate) {
      let movieIndex = userData.userQueue.findIndex(
        movie => movie.id === movieData.id,
      );
      movieData.isInQueue = false;
      userData.userQueue.splice(movieIndex, 1);
      changeQueueBtnToAdd();
      console.log('movie was deleted wrom Queue and added to watched');
      updateUserDatabase(currentUserId, userData);
    }
    // getUserQueueFromDatabase(currentUserId);
  }
}

// =============IS THIS MOVIE IS ALREADY WATCHED (DO NOT ADD TO QUEUE)=======
function isInWatched(movieData) {
  let userData = getUserLibraryFromDatabase(currentUserId);

  if (userData.userWatched) {
    const isDublicate = userData.userWatched.some(function (movie) {
      return movie.id === movieData.id;
    });
    console.log(isDublicate);
    return isDublicate;
  } else {
    return false;
  }
}

// ================ DATABASE FUNCTIONS==========================
// GET ALL LIBRARY DATA FROM DATABASE
export function getUserLibraryFromDatabase(userId) {
  let userBase = {};
  filmotekaDatabase.on('value', elem => {
    userBase = elem.val()[`${userId}`];
    console.log(userBase);
  });
  return userBase;
}

// GET USERWATCHED DATA FROM DATABASE
export function getUserWatchedFromDatabase(userId) {
  if (!userId) {
    return;
  }
  let userWatched = [];
  filmotekaDatabase.on('value', elem => {
    userWatched = elem.val()[`${userId}`][`userWatched`];
    // console.log(userWatched);
  });
  return userWatched;
}

// GET USERQUEUE DATA FROM DATABASE
export function getUserQueueFromDatabase(userId) {
  if (!userId) {
    return;
  }
  let userQueue = [];
  filmotekaDatabase.on('value', elem => {
    userQueue = elem.val()[`${userId}`][`userQueue`];
    // console.log(userQueue);
  });
  return userQueue;
}

// UPDATE DATABaSE
function updateUserDatabase(userId, userData) {
  // if (!userData) {
  //   return;
  // }
  const userLibrary = {
    userId: userId,
    userWatched: userData.userWatched,
    userQueue: userData.userQueue,
  };
  const updates = {};
  updates['users/' + userId] = userLibrary;
  return firebase.database().ref().update(updates);
}

// ==========================BUTTONS HANDLERS===============================
function changeWatchedBtnToRemove() {
  refs.addToWatchedBtn.textContent = 'Watched (remove)';
  refs.addToWatchedBtn.classList.add('js-is-in-watched');
}

function changeWatchedBtnToAdd() {
  refs.addToWatchedBtn.textContent = 'Add to Watched';
  refs.addToWatchedBtn.classList.remove('js-is-in-watched');
}

function changeQueueBtnToRemove() {
  refs.addToQueueBtn.textContent = 'In queue (remove)';
  refs.addToQueueBtn.classList.add('js-is-in-queue');
}

function changeQueueBtnToAdd() {
  refs.addToQueueBtn.textContent = 'Add to Queue';
  refs.addToQueueBtn.classList.remove('js-is-in-queue');
}

// UPDATE BUTTONS IN MOVIECARD IF USER HAS WATCHeD THE MOVIE
export function checkIfIsInUserLibrary(movieData) {
  let userData = getUserLibraryFromDatabase(currentUserId);

  if (!userData) {
    toastr['error']('Please LOG IN to add the movie');
    return;
  }
  // CHECK USER WATCHeD
  if (userData.userWatched) {
    const isDublicate = userData.userWatched.some(
      movie => movie.id === movieData.id,
    );
    // console.log(isDublicate);
    if (isDublicate) {
      let movieIndex = userData.userWatched.findIndex(
        movie => movie.id === movieData.id,
      );
      console.log(movieIndex);
      if (userData.userWatched[movieIndex].isInWatched) {
        changeWatchedBtnToRemove();
      }
    }
  }
  // CHECK USER QUEUE
  if (userData.userQueue) {
    const isDublicate = userData.userQueue.some(
      movie => movie.id === movieData.id,
    );
    console.log(isDublicate);
    if (isDublicate) {
      let movieIndex = userData.userQueue.findIndex(
        movie => movie.id === movieData.id,
      );
      console.log(movieIndex);
      if (userData.userQueue[movieIndex].isInQueue) {
        changeQueueBtnToRemove();
      }
    }
  }
}
