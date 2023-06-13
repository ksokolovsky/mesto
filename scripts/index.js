import { initialCards } from "./constants.js";
import { config } from "./constants.js";
import { changeButtonState } from "./validate.js";

const profileEditButton = document.querySelector('.profile__edit-button');
const profileName = document.querySelector('.profile__name');
const profileProfession = document.querySelector('.profile__profession');

const editProfilePopup = document.querySelector('.popup-edit');
const editPopupInputName = editProfilePopup.querySelector('#popup__input-name');
const editPopupInputProfession = editProfilePopup.querySelector('#popup__input-profession');
const editPopupCloseButton = editProfilePopup.querySelector('.popup__close');
const editPopupForm = document.forms['change-profile-info-form'];

const addCardPopup = document.querySelector('.popup-add');
const addCardPopupButton = document.querySelector('.profile__add-button');
const addCardPopupCloseButton = addCardPopup.querySelector('.popup-add__close');
const addCardPopupSubmit = addCardPopup.querySelector('.popup-add__content');
const cardTemplate = document.getElementById('card-template');
const cardGrid = document.querySelector('.elements');

const zoomImagePopup = document.querySelector('.popup-zoom');
const zoomImagePopupCloseButton = zoomImagePopup.querySelector('.popup-zoom__close-button');

const profileForm = document.getElementsByName("change-profile-info-form");

const nameInput = document.querySelector('.popup-add__input-name');
const urlInput = document.querySelector('.popup-add__input-link');

const zoomImage = document.querySelector('.popup-zoom__image');
const zoomImageName = document.querySelector('.popup-zoom__image-name');

const popupSaveButton = document.querySelector('.popup__save-button');

const popups = document.querySelectorAll('.popup')

// !Добавление карточки. Забор из данных из инпутов
const handleAddCard = (event) => {
    
    event.preventDefault();
    

    const name = nameInput.value;
    const link = urlInput.value;

    const cardData = {
        name,
        link,
    };

    renderCardElement(createCardElement(cardData));
    addCardPopupSubmit.reset();
    closePopup(addCardPopup);
}

addCardPopupSubmit.addEventListener('submit', handleAddCard);



// Добавление карточки. Сбор элемента.
const createCardElement = (cardData) => {
    const cardElement = cardTemplate.content.querySelector('.element').cloneNode(true);

    const cardName = cardElement.querySelector('.element__name');
    cardName.textContent = cardData.name;

    const cardPicture = cardElement.querySelector('.element__image');
    cardPicture.src = cardData.link;
    cardPicture.alt = "На фото " + cardData.name;

    // Лайк карточки
    const likeButton = cardElement.querySelector('.element__heart');
    const handlLike = () => {
            likeButton.classList.toggle('element__heart_active');
        };
    likeButton.addEventListener('click', handlLike);

    // Удаление карточки.
    const deleteButton = cardElement.querySelector('.element__delete-button')
    const handlDelete = () => {
            cardElement.remove();
        };
    deleteButton.addEventListener('click', handlDelete);

    // Открыть попап с фотографией
    const openZoomImagePopup = () => {
        zoomImage.src = cardData.link;
        zoomImageName.textContent = cardData.name;
        zoomImage.alt = `${cardData.name} крупным планом`;

        openPopup(zoomImagePopup);

    }
    cardPicture.addEventListener('click', openZoomImagePopup);


    return cardElement;
}


// Объединение закрывашек и открывашек - не было времени углубиться =(
popups.forEach((popup) => {
    popup.addEventListener('mousedown', (evt) => {
        if (evt.target.classList.contains('popup_opened')) {
            closePopup(popup)
        }

        if (evt.target.classList.contains('popup__close')) {
            closePopup(popup)
          } 
    })
}) 


// Добавление карточки. Создание хтмл элемента в ДОМе
const renderCardElement = (cardElement) => {
    cardGrid.prepend(cardElement);
}

// Изначальные карточки из массива
initialCards.forEach((card) => {
    renderCardElement(createCardElement(card));
});


// Открытие и закрытие попапов
const openPopup = (popup) => {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', closeOnEscKey);
    
}

const closePopup = (popup) => {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', closeOnEscKey);
}

// Закрытие по Esc 
function closeOnEscKey(evt) {
    if (evt.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_opened');
        if (openedPopup) {
            closePopup(openedPopup);
        }
    }
}

// Открытие & закрытие попапа с добавлением карточки
const openAddCardPopup = () => {
    openPopup(addCardPopup);
}
addCardPopupButton.addEventListener('click', openAddCardPopup);

const closeAddCardPopup = () => { 
    closePopup(addCardPopup);
}
addCardPopupCloseButton.addEventListener('click', closeAddCardPopup);


// Открытие & закрытие попапа с редактированием профайла

const fillInputsEditProfilePopup = () => {
    editPopupInputName.value = profileName.textContent;
    editPopupInputProfession.value = profileProfession.textContent;
    openPopup(editProfilePopup);
} 
profileEditButton.addEventListener('click', fillInputsEditProfilePopup);

const closeEditProfilePopup = () => {
    closePopup(editProfilePopup);
}
editPopupCloseButton.addEventListener('click', closeEditProfilePopup);



// Редактирование профайла
const editProfile = function(event) {
    event.preventDefault();
    profileName.textContent = editPopupInputName.value;
    profileProfession.textContent = editPopupInputProfession.value;
    closePopup(editProfilePopup);
} 
editPopupForm.addEventListener('submit', editProfile);


/*
// Закрытие по оверлею
const closePopupByOverlayClick = function (event) {
    if(event.target === event.currentTarget) {
        closePopup(event.currentTarget);

    }
} 
*/

//editProfilePopup.addEventListener('click', closePopupByOverlayClick);
//addCardPopup.addEventListener('click', closePopupByOverlayClick);
//zoomImagePopup.addEventListener('click', closePopupByOverlayClick);

/*
// Закрытие попапа с картинкой через крестик
const closeZoomImagePopup = () => {
    closePopup(zoomImagePopup);
}
zoomImagePopupCloseButton.addEventListener('click', closeZoomImagePopup);
*/