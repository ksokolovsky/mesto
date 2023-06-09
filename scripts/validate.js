const profileForm = document.querySelector('.popup__content');
const addForm = document.querySelector('.popup-add__content');

function buttonChangeState (form) {
    const button = form.querySelector('.popup__save-button')
    if (!form.checkValidity()) {
        button.setAttribute('disabled', true);
    } else {
        button.removeAttribute('disabled');
    }
}

function getErrorElement(input) {
    return document.querySelector(`#${input.id}-error`);
}

function showError(input) {
    const errorElement = getErrorElement(input);
    errorElement.textContent = input.validationMessage;
}

function hideError(input) {
    const errorElement = getErrorElement(input);
    errorElement.textContent = '';
}

function enableValidation() {

}

function validateInput(input) {
    if (!input.validity.valid) {
        showError(input);
    } else {
        hideError(input);
    }
}

function sendForm(evt) {
    evt.preventDefault();
    const form = evt.target;
    if (!form.checkValidity()) {
        console.log('Invalid')
    } else {
        console.log('Valid')
    }
}

profileForm.addEventListener('input', (evt) => {
    const input = evt.target;
    const form = evt.currentTarget;
    validateInput(input);
    buttonChangeState(form);
}, true);

profileForm.addEventListener('submit', sendForm)

addForm.addEventListener('input', (evt) => {
    console.log(evt);
});