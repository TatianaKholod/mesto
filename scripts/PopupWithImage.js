import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(selector) {
    super(selector);
  }

  open(data) {
    const popupImage = this._popup.querySelector('.popup__image');
    popupImage.src = data.link;
    popupImage.alt = data.name;
    this._popup.querySelector('.popup__image-caption').textContent = data.name;
    super.open();
  }
}
