import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(selector) {
    super(selector);
    this._popupImage = this._popup.querySelector('.popup__image');
    this._imageCaption = this._popup.querySelector('.popup__image-caption');

  }

  open(data) {
    this._popupImage.src = data.link;
    this._popupImage.alt = data.name;
    this._imageCaption.textContent = data.name;
    super.open();
  }
}
