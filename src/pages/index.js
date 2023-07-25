import './index.css';
import { Card } from "../components/Card.js"
import { initialCards } from "../utils/utils.js";
import { FormValidator } from "../components/FormValidator.js";
import { config } from "../utils/constants.js";
import Section  from "../components/Section.js";
import Popup from "../components/Popup.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import {
    profileEditButton,
    editPopupForm,
    addCardPopupSubmit,
    cardTemplate,
    cardGrid,
    popups
} from '../utils/constants.js';


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
    console.log(userData);
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
