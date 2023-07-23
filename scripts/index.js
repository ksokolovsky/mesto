import { Card } from "./Card.js"
import { initialCards } from "./constants.js";
import { FormValidator } from "./FormValidator.js";
import { config } from "./constants.js";
import Section  from "./Section.js";
//import Popup from "./Popup.js";
import UserInfo from "./UserInfo.js";
import PopupWithForm from "./PopupWithForm.js";
import PopupWithImage from "./PopupWithImage.js";


const profileEditButton = document.querySelector('.profile__edit-button');
const editPopupForm = document.forms['change-profile-info-form'];
const addCardPopupSubmit = document.querySelector('.popup-add__content');
const cardTemplate = document.getElementById('card-template');
const cardGrid = document.querySelector('.elements');
const popups = document.querySelectorAll('.popup')

const editFormValidator = new FormValidator(config, editPopupForm);
editFormValidator.enableValidation();

const addCardFormValidator = new FormValidator(config, addCardPopupSubmit);
addCardFormValidator.enableValidation();

const zoomImage = new PopupWithImage('.popup-zoom')
zoomImage.setEventListeners();

const handleCardClick = (cardData) => {
    zoomImage.openPopup(cardData.name, cardData.link);
}

const createCard = (cardData) => {
    return new Card(cardData, cardTemplate, handleCardClick);
};

const userInfo = new UserInfo ({
    userName: '.profile__name',
    userProfession: '.profile__profession'
});

const editProfilePopup = new PopupWithForm('.popup-edit', (userData) => {
    userInfo.setUserInfo(userData);
});
editProfilePopup.setEventListeners();

const addCardPopup = new PopupWithForm('.popup-add', (cardData) => {
    const newCard = createCard(cardData);
    renderCardElement(newCard.renderCard());
});
addCardPopup.setEventListeners();

const renderCardElement = (cardElement) => {
    cardGrid.prepend(cardElement);
}

const cardsSection = new Section({
    items: initialCards,
    renderer: (cardData) => {
        const card = createCard(cardData);
        return card.renderCard();
    }
}, '.elements');
cardsSection.renderItems();

profileEditButton.addEventListener('click', () => {
    const userData = userInfo.getUserInfo();
    editProfilePopup.openPopup(userData);
});

document.querySelector('.profile__add-button').addEventListener('click', () => {
    addCardPopup.openPopup();
});


// Функция развешивания анимации на закрытие и открытие попапа, потому что иначе анимация срабатывает при обновлении страницы
    popups.forEach(popup => {
        popup.classList.add('popup_initialized');
    });
    
// Изначальные карточки из массива
initialCards.forEach((cardData) => {
    const card = createCard(cardData);
    const cardElement = card.renderCard();
    renderCardElement(cardElement);
});
