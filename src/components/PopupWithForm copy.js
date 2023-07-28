import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor(popupContainer, handleFormSubmit, api) {
        super(popupContainer);
        this._handleFormSubmit = handleFormSubmit;
        this._form = this._popupElement.querySelector('form');
        this._inputList = this._form.querySelectorAll('input');
        this._api = api;
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
            const inputValues = this._getInputValues();
            this._api.changeUserInfo(inputValues)
            .then(res => res.json())
            .then(res => {
                document.querySelector('.profile__name').textContent = res.name;
                document.querySelector('.profile__profession').textContent = res.about;
                this.closePopup();
            })
            .catch(err => alert(`Произошла ошибочка: ${err}!`))

            //this._handleFormSubmit(this._getInputValues());
            
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