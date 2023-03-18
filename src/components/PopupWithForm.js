import Popup from './Popup.js';
import FormValidator from './Validate.js';
import { configForm } from './constans/index_const.js';

export default class PopupWithForm extends Popup {
  constructor(handleFormSubmit, selector) {
    super(selector);
    this._handleFormSubmit = handleFormSubmit;
  }

  _setValidatorForm() {
    const formValidator = new FormValidator(configForm, this._formElement);
    formValidator.enableValidation();
    return formValidator;
  }

  _getInputValues() {
    const data = {};
    this._formElement.querySelectorAll(configForm.inputSelector).forEach((inputElement) => { data[inputElement.name] = inputElement.value });
    return data;
  }

  open(dataInput) {
    for (let key in dataInput) {
      this._formElement[key].value = dataInput[key];
      this._formValidatorForm.hideInputError(this._formElement[key]);
    };
    super.open();
  }

  setEventListeners() {
    this._formElement = this._popup.querySelector('.popup__form');
    this._formElement.addEventListener('submit', (evt) => { this._handleFormSubmit(evt, this._getInputValues()) });
    super.setListenerClosePopup();
    this._formValidatorForm = this._setValidatorForm();
  }

  closeSubmit() {
    super.close();
    this._formElement.reset();
  }
}
