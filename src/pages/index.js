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
import Api from "../components/Api.js"
import PopupWithDelete from '../components/PopupWithDelete';
import {
    changeAvatarPopupForm,
    profileEditButton,
    editPopupForm,
    addCardPopupSubmit,
    cardTemplate,
    cardGrid,
    popups
} from '../utils/constants.js';

const api = new Api({
        baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-71',
        headers: {
            authorization: "4b68c666-b982-4c2d-8723-a6eb18fa04f6",
            'Content-Type': 'application/json'
        }
    });

let currentUser = null;
let userId = null;


//bil vtoroi paramtr cardId
const renderCardElement = (cardElement) => {
    cardSection.addItem(cardElement);     
};

function createCard(item) {
        const card = new Card(
            item, 
            cardTemplate, 
            handleCardClick, 
            (cardId) => api.likeCard(cardId), 
            (cardId) => api.dislikeCard(cardId),
            userId,
            deleteCardPopup,
            api
        );
        const cardElement = card.renderCard();
        return cardElement
}

let cardSection = new Section({
    items: [], 
    renderer: (cardData) => {
        const card = createCard(cardData)
        cardSection.addItem(card);
    }
}, '.elements');

Promise.all([api.getUserData(), api.getInitialCard()])
    .then(([userData, initialCards]) => {
        userInfo.setUserInfo({ name: userData.name, profession: userData.about, userAvatar: userData.avatar });
        currentUser = userData;
        userId = userData._id;
        
        cardSection.setItems(initialCards);
        cardSection.renderItems();
    })
    .catch((err) => console.log(err));

const userInfo = new UserInfo ({
    userName: '.profile__name',
    userProfession: '.profile__profession',
    userAvatar: '.profile__avatar'
});

const handleCardClick = (cardData) => {
    zoomImage.openPopup(cardData.name, cardData.link);
}

const editFormValidator = new FormValidator(config, editPopupForm);
editFormValidator.enableValidation();

const addCardFormValidator = new FormValidator(config, addCardPopupSubmit);
addCardFormValidator.enableValidation();

const addAvatarFormValidator = new FormValidator(config, changeAvatarPopupForm);
addAvatarFormValidator.enableValidation();

const zoomImage = new PopupWithImage('.popup-zoom')
zoomImage.setEventListeners();

const editProfilePopup = new PopupWithForm('.popup-edit', (userData) => {
    const submitBtn = document.querySelector('.popup__save-button');
    console.log(submitBtn);
    submitBtn.textContent = 'Обновляем данные';
    api.changeUserInfo(userData)
            .then(res => {
                userInfo.setUserInfo({
                    name: res.name, 
                    profession: res.about
                });
            })
            .then(() => {
                editProfilePopup.closePopup();
            })
            .catch(err => alert(`Произошла ошибочка: ${err}!`))
            .finally(() => {
                
                submitBtn.textContent = 'Сохранить';
            })
    userInfo.setUserInfo(userData);
}, editFormValidator);
editProfilePopup.setEventListeners();

const addCardPopup = new PopupWithForm('.popup-add', (cardData) => {
    const submitBtn = document.querySelector('.popup-add__save-button');
    submitBtn.textContent = 'Создаем карточку';
    console.log(cardData.name);
    api.addCard(cardData)
        .then(cardData => {
            const newCard = createCard(cardData);
            renderCardElement(newCard, cardData._id);
        })
        .then(() => {
            addCardPopup.closePopup();
        })
        .catch(err => alert(`Произошла ошибочка: ${err}!`))
        .finally(() => {
            
            submitBtn.textContent = 'Сохранить';
        });
}, addCardFormValidator);
addCardPopup.setEventListeners();




const deleteCardPopup = new PopupWithDelete('.popup-delete', (cardData, cardElement) => {
    api.deleteCard(cardData._id)
        .then(() => {
            cardElement.remove();
            cardElement = null;
            
        })
        .catch(err => console.log(err))
        .finally(() => {
            deleteCardPopup.closePopup();
        })
});
deleteCardPopup.setEventListeners();


const popupWithAvatar = new PopupWithForm('.popup-avatar', ({avatarLink}) => {
    const submitBtn = document.querySelector('.popup-avatar__save-button');
    submitBtn.textContent = 'Обновляем аватар';
    api.changeAvatar(avatarLink)
    .then((res) => {
        userInfo.setUserInfo({ userAvatar: res.avatar });
        
    })
    .then(() => {
        popupWithAvatar.closePopup();
    })
    .catch((err) => {
        console.log(err);
    })
    .finally(() => {
        
        submitBtn.textContent = 'Сохранить';
    })
}, addAvatarFormValidator);
popupWithAvatar.setEventListeners();

// function createDeleteCardHandler(cardId, cardElement) {
//     return function() {
//         api.deleteCard(cardId)
//             .then(() => {
//                 cardElement.remove();
//                 deleteCardPopup.closePopup();
//             })
//             .catch((err) => console.log(err));
//     }
// }

profileEditButton.addEventListener('click', () => {
    const userData = userInfo.getUserInfo();
    editProfilePopup.openPopup(userData);   
});

document.querySelector('.profile__add-button').addEventListener('click', () => {
    addCardPopup.openPopup();
});

document.querySelector('.profile__avatar').addEventListener('click', () => {
    popupWithAvatar.openPopup();
} )

// Функция развешивания анимации на закрытие и открытие попапа, потому что иначе анимация срабатывает при обновлении страницы
    popups.forEach(popup => {
        popup.classList.add('popup_initialized');
    });
    

