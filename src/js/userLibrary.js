const _ = require('lodash');

// userWatched

export let userWatched = [];

export function updateUserWatched(movieData) {
  let savedWatched = localStorage.getItem('userWatched');
  if (savedWatched) {
    userWatched = JSON.parse(savedWatched);
  } else {
    userWatched = [];
  }

  userWatched.map(movie => {
    if (movie.id === movieData.id) {
      return console.log('already added');
      // здесь добавить нотификейшн
    }
  });

  userWatched.push(movieData);
  console.log(userWatched);
  // const uniqWatched = _.uniq(userWatched, 'title');
  // console.log(uniqWatched);
  localStorage.setItem('userWatched', JSON.stringify(userWatched));
}

// QUEUE
export let userQueue = [];

export function updateUserQueue(movieData) {
  let savedQueue = localStorage.getItem('userQueue');
  if (savedQueue) {
    userQueue = JSON.parse(savedQueue);
  } else {
    userQueue = [];
  }

  userQueue.map(movie => {
    if (movie.id === movieData.id) {
      return console.log('already added');
      // здесь добавить нотификейшн
    }
  });

  userQueue.push(movieData);
  console.log(userQueue);
  // const uniqQueue = _.uniq(userQueue, 'id');
  // console.log(uniqQueue);
  localStorage.setItem('userQueue', JSON.stringify(userQueue));
}
