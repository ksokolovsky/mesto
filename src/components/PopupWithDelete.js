import PopupWithForm from "./PopupWithForm";

export default class PopupWithDelete extends PopupWithForm {
    constructor(popupSelector, handleFormSubmit){
        super(popupSelector, handleFormSubmit);
        this._handleFormSubmit = handleFormSubmit;
        this._popupDeleteForm = document.querySelector('.popup-delete__content');
    }
    
    setSubmitAction(action) {
        this._handleFormSubmit = action;
    }

    openPopup(cardData, cardElement) {
        this._cardData = cardData;
        this._cardElement = cardElement;
        super.openPopup();
    }

    setEventListeners() {
        super.setEventListeners();
        this._popupDeleteForm.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleFormSubmit(this._cardData, this._cardElement);
        });
    }
}
