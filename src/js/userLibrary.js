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

export function addToLocalQueue(array) {
  // console.log(array);
  localStorage.setItem('localQueue', JSON.stringify(array));
}
