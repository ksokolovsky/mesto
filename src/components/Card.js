export class Card {
    
    constructor(cardData, cardTemplate, handleCardClick, handleLikeCard, handleDislikeCard, userId, deleteCardPopup, api) {
        this._cardData = cardData;
        this._cardTemplate = cardTemplate; 
        this._handleCardClick = handleCardClick;
        this._handleLikeCard = handleLikeCard;
        this._handleDislikeCard = handleDislikeCard;
        //this._handleDeleteCard = handleDeleteCard;
        this._userId = userId;
        this._deleteCardPopup = deleteCardPopup;
        this._deleteButton = document.querySelector('element__delete-button');
        this._deleteForm = document.querySelector('.popup-delete__content');
        this._api = api;
        
    }

    _setEventListeners() {
        this._likeButton.addEventListener('click', () => this._likeCard());
        this._cardImage.addEventListener('click', () => this._handleCardClick(this._cardData));
        this._deleteButton.addEventListener('click', () => {
            const deleteCardHandler = this.createDeleteCardHandler(this._cardData._id, this._card);
            this._deleteCardPopup.setSubmitAction(deleteCardHandler);
            this._deleteCardPopup.openPopup();
        });   
    }

    createDeleteCardHandler(cardId, cardElement) {
        return function() {
            this._api.deleteCard(cardId)
                .then(() => {
                    cardElement.remove();
                    this._deleteCardPopup.closePopup();
                })
                .catch((err) => console.log(err));
        }.bind(this);
    }

    _deleteCard() {
        this._card.remove();
        this._card = null;
    }

    _likeCard() {
        if (this._likeButton.classList.contains('element__heart_active')) {
            this._handleDislikeCard(this._cardData._id)
                .then(data => {
                    this._likeButton.classList.toggle('element__heart_active');
                    this._likeCounter.textContent = data.likes.length;
                })
                .catch(err => console.log(err));
        } else {
            this._handleLikeCard(this._cardData._id)
                .then(data => {
                    this._likeButton.classList.toggle('element__heart_active');
                    this._likeCounter.textContent = data.likes.length;
                })
                .catch(err => console.log(err));
        }
    }
    
    renderCard() {
        this._card = this._cardTemplate.content.cloneNode(true).children[0];
        this._deleteButton = this._card.querySelector('.element__delete-button');
        this._cardImage = this._card.querySelector('.element__image');
        this._likeButton = this._card.querySelector('.element__heart');
        this._likeCounter = this._card.querySelector('.element__like-counter');
        this._cardName = this._card.querySelector('.element__name');

        this._cardName.textContent = this._cardData.name;
        this._cardImage.src = this._cardData.link;
        this._cardImage.alt = "На фото " + this._cardData.name;
        this._likeCounter.textContent = this._cardData.likes ? this._cardData.likes.length : 0;

        if (this._cardData.owner && this._cardData.owner._id === this._userId) {
            this._deleteButton.style.display = 'block';
        } else {
            this._deleteButton.style.display = 'none';
        }

        if (this._cardData.likes && this._cardData.likes.some(user => user._id === this._userId)) {
            this._likeButton.classList.add('element__heart_active');
        }
        
        this._deleteButton.addEventListener('click', () => this._deleteCardPopup.openPopup(this._cardData, this._card));

        this._setEventListeners();

        return this._card;
    }
    
} 