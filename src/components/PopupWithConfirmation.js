import Popup from './Popup.js';

export default class PopupWithConfirmation extends Popup {
  constructor(selector) {
    super(selector);
  }

  sethandleFormSubmit(handleFormSubmit) {
    this._handleFormSubmit = handleFormSubmit;
  }

  setEventListeners() {
    this._popup.querySelector('.popup__form').addEventListener('submit', (evt) => { evt.preventDefault(); this._handleFormSubmit() });
    super.setListenerClosePopup();
  }
}
