// Event Listener for 'new account' inputs
// First Page
const emailButton = document.querySelector('.next');
const emailInput = document.querySelector('.email');
emailInput.addEventListener('input', stateHandle);

function stateHandle() {
    if (emailInput.value === "") {
        emailButton.disabled = true;
    }
    else {
        emailButton.disabled = false;
    }
}

// Second Page
const signInButton = document.querySelector('.sign-in');
const nameInput = document.querySelector('.name');
const passInput = document.querySelector('.password');

// Ideas for 2nd event listener and function
// - Nested event listener? If the first is good, then 2nd fires off
// - Use of the && operator (and)
nameInput.addEventListener('input', stateHandle2);
passInput.addEventListener('input', stateHandle2);

function stateHandle2() {
    if (nameInput.value !== "" && passInput.value !== "") {
        signInButton.disabled = false;
    }
    else {
        signInButton.disabled = true;
    }
}

// Sign-in page functions
function nextPage(item) {
    var container = item.parentElement.parentElement;
    var container2 = document.querySelector('.container-2');
    var email = container.querySelector('.email').value;
    
    container.style.display = "none";
    container2.style.display = "flex";
    container2.getElementsByClassName('email-text')[0].innerText = email;
}

function signIn(item) {
    var container = item.parentElement.parentElement;
    var email = container.getElementsByClassName('email-text')[0].innerText;
    var name = container.getElementsByClassName('name')[0].value;

    localStorage.setItem('myEmail', email);
    localStorage.setItem('myName', name);

    window.location.replace("./index.html");
}