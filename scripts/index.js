const profileEditButton = document.querySelector('.profile__edit-button');
const profileName = document.querySelector('.profile__name');
const profileProfession = document.querySelector('.profile__profession');

const popupElement = document.querySelector('.popup');
const popupInputProfession = popupElement.querySelector('#popup__input-profession');
const popupCloseButton = popupElement.querySelector('.popup__close');
const popupInputName = popupElement.querySelector('#popup__input-name');
const popupForm = popupElement.querySelector('.popup__content')

const openPopup = function() {
    popupInputName.textContent = `${profileName.value}`;
    popupInputProfession.textContent = `${profileProfession.value}`;
    popupElement.classList.add('popup_opened');
}

const closePopup = function() {
    popupElement.classList.remove('popup_opened');
    
}

const closePopupByOverlayClick = function (event) {
    event.preventDefault();
    if(event.target === event.currentTarget) {
        closePopup();
    }
    
} 

const editProfile = function(event) {
    event.preventDefault();
    profileName.textContent = `${popupInputName.value}`;
    profileProfession.textContent = `${popupInputProfession.value}`;
    closePopup();
} 


popupForm.addEventListener('submit', editProfile);
profileEditButton.addEventListener('click', openPopup);
popupCloseButton.addEventListener('click', closePopup);
popupElement.addEventListener('click', closePopupByOverlayClick);


