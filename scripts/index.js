const popupElement = document.querySelector('.popup');
const popupCloseButton = popupElement.querySelector('.popup__close');
const profileEditButton = document.querySelector('.profile__edit-button');

const profileInputProffesion = popupElement.querySelector('.popup__input-profession');
let profileName = document.querySelector('.profile__name');
let profileProfession = document.querySelector('.profile__profession');
const profileSaveButton = document.querySelector('.popup__save-button');

const openPopup = function() {
    popupElement.classList.add('popup_opened');
}

const closePopup = function(event) {
    popupElement.classList.remove('popup_opened');
    
}

const ClosePopupByOverlayClick = function (event) {
    if(event.target === event.currentTarget) {
        closePopup();
    }
    event.preventDefault();
} 

const editProfile = function() {
    let profileInputName = popupElement.querySelector('.popup__input-name');
    let profileInputProffesion = popupElement.querySelector('.popup__input-profession');
    profileName.innerHTML = `${profileInputName.value}`;
    profileProfession.innerHTML = `${profileInputProffesion.value}`;
    closePopup();
}


profileEditButton.addEventListener('click', openPopup);
popupCloseButton.addEventListener('click', closePopup);
popupElement.addEventListener('click', ClosePopupByOverlayClick);
profileSaveButton.addEventListener('click', editProfile);