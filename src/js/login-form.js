import firebase from 'firebase/app';
import 'firebase/database';
import 'firebaseui';
import '../../node_modules/firebaseui/dist/firebaseui.css';
import './modal-login';
import refs from './refs';
import { getUserLibraryFromDatabase } from './userLibrary';

const firebaseConfig = {
  apiKey: 'AIzaSyC7TRb9mfyMhzQU-yq3pDKTxl2-zaHwRmo',
  authDomain: 'filmoteka-login.firebaseapp.com',
  databaseURL:
    'https://filmoteka-login-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'filmoteka-login',
  storageBucket: 'filmoteka-login.appspot.com',
  messagingSenderId: '658952655924',
  appId: '1:658952655924:web:26304edc0b944079c1e661',
};
firebase.initializeApp(firebaseConfig);
const ui = new firebaseui.auth.AuthUI(firebase.auth());
const uiStart = () => ui.start('#firebaseui-auth-container', uiConfig);
//phoneAuth
new firebase.auth.PhoneAuthProvider();

// =======VARIABLE FOR WORKING WITH USER LIBRARY========
export const filmotekaDatabase = firebase.database().ref('users');
export let currentUserId = '';
console.log(currentUserId);

const uiConfig = {
  signInFlow: 'popup',
  signInOptions: [
    firebase.auth.PhoneAuthProvider.PROVIDER_ID,
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
    firebaseui.auth.AnonymousAuthProvider.PROVIDER_ID,
  ],
  callbacks: {
    signInSuccessWithAuthResult: function (authResult) {
      if (authResult) {
        location.reload();

        setUserData(firebaseUser.uid);
        return true;
      }
    },
  },
};
refs.logOutbutton.addEventListener('click', e => {
  firebase.auth().signOut();
  localStorage.removeItem('currentUserId');
  window.location.reload();
});

// login state
firebase.auth().onAuthStateChanged(firebaseUser => {
  if (firebaseUser) {
    let displayName = firebaseUser.displayName;
    if (displayName === null) {
      displayName = 'guest';
    }
    refs.userName.innerHTML = `${displayName}`;
    document.body.classList.remove('show-modal');
    showLogOutbutton();
    localStorage.setItem('currentUserId', JSON.stringify(firebaseUser.uid));
    currentUserId = JSON.parse(localStorage.getItem('currentUserId'));
    console.log(currentUserId);

    if (!getUserLibraryFromDatabase(currentUserId)) {
      setUserData(currentUserId);
    }
  } else {
    refs.userName.innerHTML = '';
    showOpenModalBtn();
    uiStart();
  }
});

function showLogOutbutton() {
  refs.logOutbutton.classList.remove('is-hidden');
  refs.openModalBtn.classList.add('is-hidden');
}

function showOpenModalBtn() {
  refs.openModalBtn.classList.remove('is-hidden');
  refs.logOutbutton.classList.add('is-hidden');
}

function setUserData(userId) {
  const userLibrary = {
    userId: userId,
    userWatched: [],
    userQueue: [],
  };
  const updates = {};
  updates['users/' + userId] = userLibrary;
  return firebase.database().ref().update(updates);
}
