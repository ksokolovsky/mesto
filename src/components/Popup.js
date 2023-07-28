export default class Popup {
    constructor(popupContainer) {
        this._popupElement = document.querySelector(popupContainer);
        this._handleEscClose = this._handleEscClose.bind(this);
        this._handleOverlayClose = this._handleOverlayClose.bind(this);
        this._saveBtn = this._popupElement.querySelector('.popup__save-button');
    }

    openPopup() {
        // if (this._popupElement.classList.contains('popup-add')) {
        //     this._saveBtn.textContent = 'Создать';
        // } else {
        //     this._saveBtn.textContent = 'Сохранить';
        // }

        this._popupElement.classList.add('popup_opened');
        document.addEventListener('keydown', this._handleEscClose);
    }

    closePopup() {
        this._popupElement.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEscClose);
    }

    _handleEscClose(evt) {
        if (evt.key === 'Escape') {
                this.closePopup();
        }
    }

    _handleOverlayClose(evt) {
        if (evt.target === evt.currentTarget) {
            this.closePopup();
        }
    }

    setEventListeners() {
        this._popupElement.querySelector('.popup__close').addEventListener('click', () => this.closePopup());
        this._popupElement.addEventListener('mousedown', this._handleOverlayClose.bind(this));
    }
}