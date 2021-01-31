const _ = require('lodash');

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
      // ЗДЕСЬ ДОБАВИТЬ НОТИФИКЕЙШН
      return userWatched;
    } else if (!isDublicate) {
      userWatched.push(movieData);
      return userWatched;
    }
    return userWatched;
  } else {
    userWatched.push(movieData);
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

  if (isInWatched(movieData)) {
    console.log('you`ve already watched this movie');
    // ЗДЕСЬ ДОБАВИТЬ НОТИФИКЕЙШН
    return userQueue;
  } else {
    let localQueue = localStorage.getItem('localQueue');

    if (localQueue) {
      userQueue = JSON.parse(localQueue);
      const isDublicate = userQueue.some(function (movie) {
        return movie.id === movieData.id;
      });
      if (isDublicate) {
        console.log('this movie has already been added');
        // ЗДЕСЬ ДОБАВИТЬ НОТИФИКЕЙШН
        return userQueue;
      } else if (!isDublicate) {
        userQueue.push(movieData);
        return userQueue;
      }
      return userQueue;
    } else {
      userQueue.push(movieData);
    }

    return userQueue;
  }
}

export function addToLocalQueue(array) {
  // console.log(array);
  localStorage.setItem('localQueue', JSON.stringify(array));
}

// CHECK IF WATCHED MOVIE IS ON QUEUE. DELETE IF SO
export function checkIfInQueue(movieData) {
  let userQueue = [];
  let localQueue = localStorage.getItem('localQueue');

  if (localQueue) {
    userQueue = JSON.parse(localQueue);
    const isDublicate = userQueue.some(function (movie) {
      return movie.id === movieData.id;
    });
    if (isDublicate) {
      function getIndex(item) {
        _.indexOf(userQueue, item);
      }
      _.remove(userQueue, getIndex(movieData));
      console.log('movie was deleted wrom Queue and added to watched');
      // ЗДЕСЬ ДОБАВИТЬ НОТИФИКЕЙШН
      addToLocalQueue(userQueue);
    }
    return;
  }
}

// IS THIS MOWIE IS ALREADY WATCHED (DO NOT ADD TO QUEUE)
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
