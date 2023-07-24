import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor(popupContainer, handleFormSubmit) {
        super(popupContainer);
        this._handleFormSubmit = handleFormSubmit;
        this._form = this._popupElement.querySelector('form');
        this._inputList = this._form.querySelectorAll('input');
    }

    _getInputValues() {
        this._formValues = {};
        this._inputList.forEach(input => {
            this._formValues[input.name] = input.value;
        });
        return this._formValues;
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleFormSubmit(this._getInputValues());
            this.closePopup();
        });
    }

    openPopup(userData) {
        if(userData) {
            this._inputList.forEach(input => {
                input.value = userData[input.name];
            });
        }
        super.openPopup();
    }

    closePopup() {
        super.closePopup();
        this._form.reset();
    }
}