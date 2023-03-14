const popupElement = document.querySelector('.popup');
const popupCloseButton = popupElement.querySelector('.popup__close');
const profileEditButton = document.querySelector('.profile__edit-button');
const profileInputProfession = popupElement.querySelector('#popup__input-profession');
const profileSaveButton = document.querySelector('.popup__save-button');

let profileName = document.querySelector('.profile__name');
let profileProfession = document.querySelector('.profile__profession');
let profileInputName = popupElement.querySelector('#popup__input-name');
let profileInputProffesion = popupElement.querySelector('#popup__input-profession');


const openPopup = function() {
    profileInputName.innerHTML = `${profileName.value}`;
    profileInputProfession.innerHTML = `${profileProfession.value}`;
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
    profileName.innerHTML = `${profileInputName.value}`;
    profileProfession.innerHTML = `${profileInputProfession.value}`;
    closePopup();
}


profileEditButton.addEventListener('click', openPopup);
popupCloseButton.addEventListener('click', closePopup);
popupElement.addEventListener('click', closePopupByOverlayClick);
profileSaveButton.addEventListener('click', editProfile);