// Assignment 2 Seddit
// Dean Hou z5163159
// last editted: 14/08/2019

// file is for managing the login tasks

// credits to https://www.w3schools.com/howto/howto_css_modals.asp
// for basic modal tutorial

import { readPosts, feedHeader } from './feed.js';

// creates login button, with data id 
function loginButton() {
    const loginButton = document.createElement('button');
    loginButton.style.display = 'inline';
    loginButton.setAttribute('data-id-login', '');
    loginButton.id = 'login-button';
    loginButton.className = 'button button-primary';
    loginButton.innerText = 'Log In';
    return loginButton;
}


// creates a login form
// opens up a modal form, which prompts username and password
function createLoginMod() {
    const root = document.getElementById('root');
    // create modal form on document
    // divide form into three parts
    // top close button
    // middle input
    // close cancel button
    
    // create the div for the whole form
    const loginDiv = document.createElement('div');
    loginDiv.id = 'login-modal';
    loginDiv.className = 'modal';
    loginDiv.style.display = 'none';

    // create the form itself
    const loginForm = document.createElement('form');
    loginForm.id = 'login-form';
    loginForm.name = 'login'
    loginForm.className = 'modal-content';

    // create the TOP form with close button
    const closeDiv = document.createElement('div');
    closeDiv.id = 'log-top';
    closeDiv.className = 'container';
    const close = document.createElement('span');
    close.id = 'close-login';
    close.className = 'close';
    close.title = 'Close Modal'
    close.innerText = 'x';
    closeDiv.appendChild(close);

    // create MIDDLE section for the form inputs
    const formInputs = document.createElement('div');
    formInputs.id = 'log-mid';
    formInputs.className = 'container';

    // create labels and inputs for username 
    const userLabel = document.createElement('label');
    userLabel.htmlFor = 'uname';
    userLabel.innerText = 'Username';
    userLabel.style.fontWeight = '900';
    const userInput = document.createElement('input');
    userInput.id = 'login-uname';
    userInput.type = 'text';
    userInput.placeholder = 'Enter Username';
    //userInput.required = 1;
    
    // create labels and inputs for password
    const passLabel = document.createElement('label');
    passLabel.innerText = 'Password';
    passLabel.style.fontWeight = '900';
    const passInput = document.createElement('input');
    passInput.id = 'login-pword'
    passInput.type = 'password';
    passInput.placeholder = 'Enter Password';
    passInput.required = 1;

    // submit button
    const submit = document.createElement('button');
    submit.className = 'loginbutton';
    submit.type = 'submit';
    submit.innerText = 'Login';

    formInputs.appendChild(userLabel);
    formInputs.appendChild(userInput);
    formInputs.appendChild(passLabel);
    formInputs.appendChild(passInput);
    formInputs.appendChild(submit);

    // crete END of form with cancel button
    const endForm = document.createElement('div');
    endForm.id ='log-end';
    endForm.className = 'container';

    const cancel = document.createElement('button');
    cancel.id = 'cancel-login';
    cancel.type = 'cancel';
    cancel.className = 'cancelbtn';
    cancel.innerText = 'Cancel';

    endForm.appendChild(cancel);
    
    loginForm.appendChild(closeDiv);
    loginForm.appendChild(formInputs);
    loginForm.appendChild(endForm);

    loginDiv.appendChild(loginForm);
    
    root.appendChild(loginDiv);
}

// make the login visible
function showLogin() {
    const show = document.getElementById('login-modal');
    show.style.display = 'block';
}

// hide the login page
function closeLogin() {
    const show = document.getElementById('login-modal');
    show.style.display = 'none';
}

// check login pword and uname
// sample pword: password, uname: Anon
// sample2 monday_match, James
function checkLogin(url) {
    const uname = document.getElementById('login-uname').value;
    const pword = document.getElementById('login-pword').value;
    //POST /login
    //GET /post/public
    //console.log(uname, pword);
    //console.log(url);
    const options = {
        method: 'POST',
        body: JSON.stringify({
            'username': uname,
            'password': pword
        }),
        headers: {
            'Content-Type': 'application/json',
        }
    }
    fetch(`${url}/auth/login`, options)
        .then(r=> r.json())
        .then(r => {
            const block = document.getElementById('log-mid');
            // get rid of prevous errors
            if (block.childNodes[2].innerText === 'Invalid Username/Password' || block.childNodes[2].innerText === 'Missing Username/Password') {
                block.removeChild(block.childNodes[2]);
                block.removeChild(block.childNodes[4]);
            }
            // the user not found/missing values, place error message in login page
            if (r.message === 'Invalid Username/Password' || r.message === 'Missing Username/Password') {
                const text1 = document.createElement('p');
                text1.className = 'error';
                text1.innerText = r.message;
                const text2 = document.createElement('p');
                text2.className = 'error';
                text2.innerText = r.message;
                block.insertBefore(text1, block.childNodes[2]);
                block.insertBefore(text2, block.childNodes[5]);
            // else request the page for that user
            } else {
                // call some function
                return;
            }
        });

}

export { loginButton, createLoginMod, showLogin, closeLogin, checkLogin};