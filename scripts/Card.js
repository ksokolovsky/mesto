export class Card {
    
    constructor(cardData, cardTemplate, openZoomImagePopup) {
        this._cardData = cardData;
        this._cardTemplate = cardTemplate; 
        this._openZoomImagePopup = openZoomImagePopup;
    }

    _setEventListeners() {
        this._likeButton.addEventListener('click', () => this._likeCard());
        this._deleteButton.addEventListener('click', () => this._deleteCard());
        this._cardImage.addEventListener('click', () => this._openZoomImagePopup(this._cardData));
    }

    _deleteCard() {
        this._card.remove();
        this._card = null;
    }

    _likeCard() {
        this._likeButton.classList.toggle('element__heart_active');
    }

    renderCard() {
        this._card = this._cardTemplate.content.cloneNode(true).children[0];
        this._deleteButton = this._card.querySelector('.element__delete-button');
        this._cardImage = this._card.querySelector('.element__image');
        this._likeButton = this._card.querySelector('.element__heart');
        this._cardName = this._card.querySelector('.element__name');

        this._cardName.textContent = this._cardData.name;
        this._cardImage.src = this._cardData.link;
        this._cardImage.alt = "На фото " + this._cardData.name;

        this._setEventListeners();

        return this._card;
    }
    
} 