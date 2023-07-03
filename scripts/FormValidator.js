export class FormValidator {
    constructor(config, formElement) {
        this._config = config;
        this._formElement = formElement;
        this._inputList = Array.from(this._formElement.querySelectorAll(this._config.inputSelector));
        this._formButton = this._formElement.querySelector(this._config.submitButtonSelector);
    }

    enableValidation() {
        this._formElement.addEventListener('submit', function (evt) {
            evt.preventDefault();
        });

        this._setEventListeners();
    }

    clearValidationErrors() {
        this._inputList.forEach((inputElement) => {
            const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
            errorElement.textContent = '';
            inputElement.classList.remove(this._config.inputErrorClass);
        });
    }

    _changeButtonState() {
        if (this._hasInvalidInput()) {
            this._disableButton();
        } else {
            this._formButton.removeAttribute('disabled');
        }
    }

    _hasInvalidInput() {
        return this._inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        });
    }

    _getErrorElement(input) {
        return document.querySelector(`#${input.id}-error`);
    }

    _showError(input) {
        const errorElement = this._getErrorElement(input);
        errorElement.textContent = input.validationMessage;
    }

    _hideError(input) {
        const errorElement = this._getErrorElement(input);
        errorElement.textContent = '';
    }

    _validateInput(input) {
        if (!input.validity.valid) {
            this._showError(input);
        } else {
            this._hideError(input);
        }
    }

    _disableButton() {
        this._formButton.setAttribute('disabled', true);
    }

    _setEventListeners() {
        this._formElement.addEventListener('reset', () => {
            this._disableButton();
        });
        
        this._changeButtonState();

        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._validateInput(inputElement);
                this._changeButtonState();
            });
        });
    }
}
