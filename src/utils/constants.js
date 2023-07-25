export const profileEditButton = document.querySelector('.profile__edit-button');
export const editPopupForm = document.forms['change-profile-info-form'];
export const addCardPopupSubmit = document.querySelector('.popup-add__content');
export const cardTemplate = document.getElementById('card-template');
export const cardGrid = document.querySelector('.elements');
export const popups = document.querySelectorAll('.popup');

  export const config = {
    formSelector: '.popup__content',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save-button',
    inactiveButtonClass: 'popup__button_disabled', // not used
    inputErrorClass: 'popup__input-error', 
    errorClass: 'popup__error_visible', // not used
  };