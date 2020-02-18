/**
 * Written by A. Hinds with Z. Afzal 2018 for UNSW CSE.
 * 
 * Updated 2019.
 */

// Assignment 2 Seddit
// Dean Hou z5163159
// last editted: 14/08/2019

// import your own scripts here.
import { navBar, mainPage } from './home.js';
import { showLogin, closeLogin, createLoginMod, checkLogin } from './login.js';
import { showSignup, closeSignup, createSigninMod, checkSignup } from './registration.js';

// your app must take an apiUrl as an argument --
// this will allow us to verify your apps behaviour with 
// different datasets.


// the initApp contains the functions for the main page
// calls functions to create the main page
// contains all of the event listeners
function initApp(apiUrl) {
  // first remove all of the contents in the root
  const root = document.getElementById('root');
  while (root.firstChild) {
    root.removeChild(root.firstChild);
  }

  // add contents to the root
  navBar();
  mainPage();
  createLoginMod();
  createSigninMod();
  //console.log(apiUrl);
  // log in listeners
  document.getElementById('login-button').addEventListener('click', showLogin);
  document.getElementById('cancel-login').addEventListener('click', closeLogin);
  document.getElementById('close-login').addEventListener('click', closeLogin);
  document.getElementById('login-form').addEventListener('submit', (event) => {
    event.preventDefault();
    checkLogin(apiUrl);
  });

  // sign up listeners
  document.getElementById('signup-button').addEventListener('click', showSignup);
  document.getElementById('cancel-signup').addEventListener('click', closeSignup);
  document.getElementById('close-signup').addEventListener('click', closeSignup);
  document.getElementById('signup-form').addEventListener('submit', (event) => {
    event.preventDefault();
    checkSignup(apiUrl);
  });
  
}



export default initApp;
