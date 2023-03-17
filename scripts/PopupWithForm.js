import Popup from './Popup.js';
import FormValidator from './Validate.js';
import { configForm } from './constans/index_const.js';

export default class PopupWithForm extends Popup {
  constructor(dataInput, handleFormSubmit, selector) {
    super(selector);
    this._handleFormSubmit = handleFormSubmit;
    this._dataInput = dataInput;
  }

_setValidatorForm() {
    const formValidator = new FormValidator(configForm, this._form);
    formValidator.enableValidation();
    return formValidator;
  }

  _getInputValues(){
    const data = {};
      for (let key in this._dataInput){
        data[key] = this._form[key].value;
      };
    return data;
  }

  setInputValues(){
    for (let key in this._dataInput){
       this._form[key].value = this._dataInput[key];
       this._formValidatorForm.hideInputError(this._form[key]);
    };
  }

  setEventListeners() {
    this._form = this._popup.querySelector('.popup__form');
    this._form.addEventListener('submit', (evt) => {this._handleFormSubmit(evt,this._getInputValues())});
    super.setListenerClosePopup();
    this._formValidatorForm = this._setValidatorForm();
  }

  close(){
    super.close();
    this._form.reset();
  }
}
