import { Card } from "./Card.js"
import { initialCards } from "./constants.js";
import { FormValidator } from "./FormValidator.js";
import { config } from "./constants.js";
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
const nameInput = document.querySelector('.popup-add__input-name');
const urlInput = document.querySelector('.popup-add__input-link');
const zoomImage = document.querySelector('.popup-zoom__image');
const zoomImageName = document.querySelector('.popup-zoom__image-name');
const popups = document.querySelectorAll('.popup')

const editFormValidator = new FormValidator(config, editPopupForm);
editFormValidator.enableValidation();

const addCardFormValidator = new FormValidator(config, addCardPopupSubmit);
addCardFormValidator.enableValidation();

const createCard = (cardData) => {
    return new Card(cardData, cardTemplate, openZoomImagePopup);
};

// !Добавление карточки. Забор из данных из инпутов
const handleAddCard = (event) => {
    event.preventDefault();
    const name = nameInput.value;
    const link = urlInput.value;
    const cardData = {
        name,
        link,
    };

    const newCard = createCard(cardData);
    renderCardElement(newCard.renderCard());
    addCardPopupSubmit.reset();
    closePopup(addCardPopup);
}
addCardPopupSubmit.addEventListener('submit', handleAddCard);

// Открыть попап с фотографией
const openZoomImagePopup = (cardData) => {
        
    zoomImage.src = cardData.link;
    zoomImageName.textContent = cardData.name;
    zoomImage.alt = `${cardData.name} крупным планом`;

    openPopup(zoomImagePopup);

}

// Объединение закрывашек и открывашек - не было времени углубиться =(
popups.forEach((popup) => {
    popup.addEventListener('mousedown', (evt) => {
        if (evt.target.classList.contains('popup_opened') || evt.target.classList.contains('popup__close')) {
            closePopup(popup)
        }
    })
}) 

// Функция развешивания анимации на закрытие и открытие попапа, потому что иначе анимация срабатывает при обновлении страницы
popups.forEach(popup => {
    popup.classList.add('popup_initialized');
});

// Добавление карточки. Создание хтмл элемента в ДОМе
const renderCardElement = (cardElement) => {
    cardGrid.prepend(cardElement);
}

// Изначальные карточки из массива
initialCards.forEach((cardData) => {
    const card = createCard(cardData);
    const cardElement = card.renderCard();
    renderCardElement(cardElement);
});

// Открытие и закрытие попапов
const openPopup = (popup, formValidator) => {
    if (formValidator) {
        formValidator.clearValidationErrors();
    }
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
    openPopup(addCardPopup, addCardFormValidator);
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
    openPopup(editProfilePopup, editFormValidator);
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

