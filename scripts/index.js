
const profileEditButton = document.querySelector('.profile__edit-button');
const profileName = document.querySelector('.profile__name');
const profileProfession = document.querySelector('.profile__profession');

const popupElement = document.querySelector('.popup');
const popupInputName = popupElement.querySelector('#popup__input-name');
const popupInputProfession = popupElement.querySelector('#popup__input-profession');
const popupCloseButton = popupElement.querySelector('.popup__close');
const popupForm = popupElement.querySelector('.popup__content')

const addCard = document.querySelector('.popup-add');
const addCardButton = addCard.querySelector('.popup-add__save-button');
const popupAddButton = document.querySelector('.profile__add-button');
const popupAddCloseButton = document.querySelector('.popup-add__close');
const addCardSubmit = addCard.querySelector('.popup-add__content');

const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ];

const handleAddCard = (event) => {
    event.preventDefault();
    const nameInput = document.querySelector('.popup-add__input-name');
    const urlInput = document.querySelector('.popup-add__input-link');

    const name = nameInput.value;
    const link = urlInput.value;

    const cardData = {
        name,
        link,
    };

    renderCardElement(createCardElement(cardData));
    closePopupAdd();
}

addCardSubmit.addEventListener('submit', handleAddCard);



const cardTemplate = document.getElementById('card-template');
const cardGrid = document.querySelector('.elements');



const createCardElement = (cardData) => {
    const cardElement = cardTemplate.content.querySelector('.element').cloneNode(true);

    const cardName = cardElement.querySelector('.element__name');
    cardName.innerHTML = cardData.name;

    const cardPicture = cardElement.querySelector('.element__image');
    cardPicture.src = cardData.link;

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


    return cardElement;
}

const renderCardElement = (cardElement) => {
    cardGrid.prepend(cardElement);
}

initialCards.forEach((card) => {
    renderCardElement(createCardElement(card));
});

/*  // Из работы 4.
    const openPopup = function() {
    popupInputName.value = profileName.textContent;
    popupInputProfession.value = profileProfession.textContent;
    popupElement.classList.add('popup_opened');
} */

const openPopup = () => {
    popupElement.classList.add('popup_opened');
}

const openPopupAddCard = () => {
    addCard.classList.add('popup_opened');
}


const editProfilePopupFillInputs = () => {
    popupInputName.value = profileName.textContent;
    popupInputProfession.value = profileProfession.textContent;
    openPopup();
}

/* // Из работы 4.
    const closePopup = function() {
    popupElement.classList.remove('popup_opened');
    
} */

const closePopup = () => {
    popupElement.classList.remove('popup_opened');
    
}



const closePopupAdd = () => { 
    addCard.classList.remove('popup_opened'); 
}



const closePopupByOverlayClick = function (event) {
    if(event.target === event.currentTarget) {
        closePopup();
    }
    
} 

const editProfile = function(event) {
    profileName.textContent = `${popupInputName.value}`;
    profileProfession.textContent = `${popupInputProfession.value}`;
    event.preventDefault();
    closePopup();
} 


popupForm.addEventListener('submit', editProfile);
profileEditButton.addEventListener('click', openPopup);
popupAddButton.addEventListener('click', openPopupAddCard);
popupCloseButton.addEventListener('click', closePopup);
popupElement.addEventListener('click', closePopupByOverlayClick);
popupAddCloseButton.addEventListener('click', closePopupAdd);


