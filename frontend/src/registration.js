// Assignment 2 Seddit
// Dean Hou z5163159
// last editted: 14/08/2019

// file is for all things to do with registration

// create sign up button with data id sign up
function signButton() {
    const signButton = document.createElement('button');
    signButton.style.display = 'inline';
    signButton.setAttribute('data-id-signup', '');
    signButton.id = 'signup-button';
    signButton.className = 'button button-secondary';
    signButton.innerText = 'Sign Up';
    return signButton;
}

// actons when registration is clicked
// takes user to sign up form
function createSigninMod() {
    const root = document.getElementById('root');
    // create modal form on document
    // divide form into three parts
    // top close button
    // middle input
    // close cancel button
    
    // create the div for the whole form
    const signupDiv = document.createElement('div');
    signupDiv.id = 'signup-modal';
    signupDiv.className = 'modal';

    // create the form
    const signupForm = document.createElement('form');
    signupForm.id = 'signup-form';
    signupForm.name = 'signup';
    signupForm.className = 'modal-content';

    // create the TOP form with close button
    const closeDiv = document.createElement('div');
    closeDiv.id = 'sig-top';
    closeDiv.className = 'container';
    const close = document.createElement('span');
    close.id = 'close-signup';
    close.className = 'close';
    close.title = 'Close Modal';
    close.innerText = 'x';
    closeDiv.appendChild(close);

    // create MIDDLE section for the form inputs
    const formInputs = document.createElement('div');
    formInputs.id = 'sig-mid';
    formInputs.className = 'container';

    // create labels and inputs for username 
    const userLabel = document.createElement('label');
    userLabel.htmlFor = 'uname';
    userLabel.innerText = 'Create Username';
    userLabel.style.fontWeight = '900';
    const userInput = document.createElement('input');
    userInput.id = 'signup-uname';
    userInput.type = 'text';
    userInput.placeholder = 'Username';
    //userInput.required = 1;

    // create labels and inputs for name 
    const nameLabel = document.createElement('label');
    nameLabel.htmlFor = 'name';
    nameLabel.innerText = 'Enter name';
    nameLabel.style.fontWeight = '900';
    const nameInput = document.createElement('input');
    nameInput.id = 'signup-name';
    nameInput.type = 'text';
    nameInput.placeholder = 'John Doe';
    //nameInput.required = 1;

    // create labels and inputs for email
    const email = document.createElement('label');
    email.htmlFor = 'email';
    email.innerText = 'Enter Email';
    email.style.fontWeight = '900';
    const emailInput = document.createElement('input');
    emailInput.id = 'signup-email';
    emailInput.type = 'text';
    emailInput.placeholder = 'Email';
    //emailInput.required = 1;
    
    // create labels and inputs for password
    const passLabel1 = document.createElement('label');
    passLabel1.htmlFor = 'pword';
    passLabel1.innerText = 'Password';
    passLabel1.style.fontWeight = '900';
    const passInput1 = document.createElement('input');
    passInput1.id = 'signup-pword1'
    passInput1.type = 'password';
    passInput1.placeholder = 'Enter Passsword';
    //passInput1.required = 1;

    const passLabel2 = document.createElement('label');
    passLabel2.htmlFor = 'pword';
    passLabel2.innerText = 'Reenter Password';
    passLabel2.style.fontWeight = '900';
    const passInput2 = document.createElement('input');
    passInput2.id = 'signup-pword2'
    passInput2.type = 'password';
    passInput2.placeholder = 'Reenter Password';
    //passInput2.required = 1;

    // submit button
    const submit = document.createElement('button');
    submit.className = 'loginbutton';
    submit.type = 'submit';
    submit.innerText = 'Sign up';

    formInputs.appendChild(userLabel);
    formInputs.appendChild(userInput);
    formInputs.appendChild(nameLabel);
    formInputs.appendChild(nameInput);
    formInputs.appendChild(email);
    formInputs.appendChild(emailInput);
    formInputs.appendChild(passLabel1);
    formInputs.appendChild(passInput1);
    formInputs.appendChild(passLabel2);
    formInputs.appendChild(passInput2);
    formInputs.appendChild(submit);

    // create END of form
    const endForm = document.createElement('div');
    endForm.id ='sig-end';
    endForm.className = 'container';

    const cancel = document.createElement('button');
    cancel.id = 'cancel-signup';
    cancel.type = 'cancel';
    cancel.className = 'cancelbtn';
    cancel.innerText = 'Cancel';

    endForm.appendChild(cancel);

    signupForm.appendChild(closeDiv);
    signupForm.appendChild(formInputs);
    signupForm.appendChild(endForm);

    signupDiv.appendChild(signupForm);
    
    root.appendChild(signupDiv);
}


// make the signup visible
function showSignup() {
    const show = document.getElementById('signup-modal');
    show.style.display = 'block';
}

// hide the signup page
function closeSignup() {
    const show = document.getElementById('signup-modal');
    show.style.display = 'none';
}

// confirm sign up
function checkSignup(url) {
    const uname = document.getElementById('signup-uname').value;
    const name = document.getElementById('signup-name').value;
    const pword1 = document.getElementById('signup-pword1').value;
    const pword2 = document.getElementById('signup-pword2').value;
    const email = document.getElementById('signup-email').value;
    // check that passwords match
    const block = document.getElementById('sig-mid');
    // first getrid of all errors
    if (block.childNodes[2].innerText === 'Username Taken') {
        block.removeChild(block.childNodes[2]);
    }
    if (block.childNodes[10].innerText === 'Username and password must be filled out') {
        block.removeChild(block.childNodes[10]);
    }
    if (block.childNodes[8].innerText === 'Passwords don\'t match') {
        block.removeChild(block.childNodes[8]);
        block.removeChild(block.childNodes[10]);
    }
    
    if (pword1 !== pword2) {
        if (block.childNodes[8].innerText === 'Passwords don\'t match') {
            block.removeChild(block.childNodes[8]);
            block.removeChild(block.childNodes[10]);
        }
        const text1 = document.createElement('p');
        text1.className = 'error';
        text1.innerText = 'Passwords don\'t match';
        const text2 = document.createElement('p');
        text2.className = 'error';
        text2.innerText = 'Passwords don\'t match';
        block.insertBefore(text1, block.childNodes[8]);
        block.insertBefore(text2, block.childNodes[11]);
        return;
    }
    // input for api request
    const options = {
        method: 'POST',
        body: JSON.stringify({
            'username': uname,
            'password': pword1,
            'email': email,
            'name': name
        }),
        headers: {
            'Content-Type': 'application/json',
        }
    }
    // fetch the backend for cerification
    fetch(`${url}/auth/signup`, options)
        .then(r=> r.json())
        .then(r => {
            const block = document.getElementById('sig-mid');
            // the user inputed missing values, place error in signup page
            if (r.message === 'Malformed Request') {
                const text1 = document.createElement('p');
                text1.className = 'error';
                text1.innerText = 'Username and password must be filled out';
                block.insertBefore(text1, block.childNodes[10]);
            // user name taken condition
            } else if (r.message === 'Username Taken') {
                const block = document.getElementById('sig-mid');
                const text1 = document.createElement('p');
                text1.className = 'error';
                text1.innerText = 'Username Taken';
                block.insertBefore(text1, block.childNodes[2]);
            // successful signin
            } else {
                return;
            }
        });

}

export { signButton, showSignup, closeSignup, createSigninMod, checkSignup };