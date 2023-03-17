export default class Popup {
  constructor(selector) {
    this._popup = document.querySelector(selector);
  }

  _handleEscClose = (evt) => {
    if (evt.key != 'Escape') return;
    this.close();
  }

  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
  }

  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }

  setListenerClosePopup() {
    this._popup.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains('popup_opened')) this.close();
      if (evt.target.classList.contains('popup__button-close')) this.close();
    });
  }
}
