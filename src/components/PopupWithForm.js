import Popup from './Popup.js';
export default class PopupWithForm extends Popup {
  constructor(handleFormSubmit, selector) {
    super(selector);
    this._handleFormSubmit = handleFormSubmit;
  }

  _getInputValues() {
    const data = {};
    this._inputList.forEach((inputElement) => { data[inputElement.name] = inputElement.value });
    return data;
  }

  setInputValues(dataInput, hideInputError) {
    this._inputList.forEach((input) => {
      input.value = dataInput[input.name];
      hideInputError(input);
    });
  }

  getFormElement() {
    return this._formElement;
  }

  setEventListeners() {
    this._formElement = this._popup.querySelector('.popup__form');
    this._btnSubmitElement = this._formElement.querySelector('.popup__button-save');
    //this._textSubmitBtn = this._btnSubmitElement.textContent;
    this._inputList = this._formElement.querySelectorAll('.popup__input');
    this._formElement.addEventListener('submit', (evt) => {
      const initialText = this._btnSubmitElement.textContent;
      this._btnSubmitElement.textContent = "Сохранение...";
      this._handleFormSubmit(evt, this._getInputValues())
        .then(() => this.close())
        .finally(() => { this._btnSubmitElement.textContent = initialText });
    });
    super.setListenerClosePopup();
  }

  close() {
    super.close();
    this._formElement.reset();
  }
}
