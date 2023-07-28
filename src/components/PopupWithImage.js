import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor(popupContainer){
    super(popupContainer);
    this._image = this._popupElement.querySelector('.popup-zoom__image');
    this._caption = this._popupElement.querySelector('.popup-zoom__image-name');
}

// Не забыть: сюда будут подставляться inputValue 
openPopup(name, link) {
    this._image.src = link;
    this._image.alt = `${name} крупным планом`;
    this._caption.textContent = name;

    super.openPopup();
}

}