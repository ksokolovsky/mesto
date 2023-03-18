const popupElement = document.querySelector('.popup');
const popupCloseButton = popupElement.querySelector('.popup__close');
const profileEditButton = document.querySelector('.profile__edit-button');
const popupInputProfession = popupElement.querySelector('#popup__input-profession');
const profileSaveButton = document.querySelector('.popup__save-button'); 

const profileName = document.querySelector('.profile__name');
const profileProfession = document.querySelector('.profile__profession');
const popupInputName = popupElement.querySelector('#popup__input-name');


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


profileEditButton.addEventListener('click', openPopup);
popupCloseButton.addEventListener('click', closePopup);
popupElement.addEventListener('click', closePopupByOverlayClick);
profileSaveButton.addEventListener('click', editProfile);