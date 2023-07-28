import PopupWithForm from "./PopupWithForm";

export default class PopupWithAvatar extends PopupWithForm {
    constructor(popupContainer, handleFormSubmit){
        super(popupContainer, handleFormSubmit);
        this._avatarError = document.getElementById('popup-avatar__input-link-error');
    }

    setSubmitAction(action) {
        this._handleFormSubmit = action;
    }

    closePopup() {
        this._avatarError.textContent = '';
        super.closePopup();
    }

 }