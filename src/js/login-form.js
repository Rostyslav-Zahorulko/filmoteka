import firebase from 'firebase/app';
import 'firebaseui';
import '../../node_modules/firebaseui/dist/firebaseui.css';
import './modal-login';

const logOutbutton = document.querySelector('.js-singOut-button');

const openModalBtn = document.querySelector('[data-action="open-modal"]');


const userName = document.querySelector('.js-display-username');

const qwert = document.querySelector('.logButton');
console.log(qwert);
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

logOutbutton.addEventListener('click', e => {
  firebase.auth().signOut();
});
const uiStart = () => ui.start('#firebaseui-auth-container', uiConfig);
const uiConfig = {
  callbacks: {
    signInSuccessWithAuthResult: function (authResult, redirectUrl) {
      if (authResult) {
        console.log(
          'здесь можно что-то здесь можно что-то добавить после входа после входа',
        );

        console.log(authResult);
      }
    },
  },
  signInFlow: 'popup',
  signInOptions: [
    firebase.auth.PhoneAuthProvider.PROVIDER_ID,
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
    firebaseui.auth.AnonymousAuthProvider.PROVIDER_ID,
  ],
};

//phoneAuth

const provider = new firebase.auth.PhoneAuthProvider();

// login state

firebase.auth().onAuthStateChanged(firebaseUser => {
  if (firebaseUser) {
    logOutbutton.classList.remove('is-hidden');
    let displayName = firebaseUser.displayName;

    if (displayName === null) {
      displayName = 'guest';
    }

    userName.innerHTML = `${displayName}`;

    document.body.classList.remove('show-modal');
    openModalBtn.classList.add('is-hidden');
    

    console.log(firebaseUser.displayName + ' is logIn');
  } else {
    userName.innerHTML = '';
    openModalBtn.classList.remove('is-hidden');
    logOutbutton.classList.add('is-hidden');
    console.log('not logget in');
    uiStart();
  }
});
