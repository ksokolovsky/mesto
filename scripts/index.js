const popupElement = document.querySelector('.popup');
const popupCloseButton = popupElement.querySelector('.popup__close');
const profileEditButton = document.querySelector('.profile__edit-button');
const popupInputName = popupElement.querySelector('.popup__input-name');
const popupInputProffesion = popupElement.querySelector('.popup__input-profession');
const popupSaveButton = popupElement.querySelector('.popup__input-profession');

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


profileEditButton.addEventListener('click', openPopup);
popupCloseButton.addEventListener('click', closePopup);
popupElement.addEventListener('click', ClosePopupByOverlayClick);