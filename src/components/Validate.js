export default class FormValidator {
  constructor(configForm, formPopup) {
    this._selectors = configForm;
    this._formElement = formPopup;
  }

  _showInputError = (inputElemPopup, errorMessage) => {
    const errorElement = this._formElement.querySelector(`.${inputElemPopup.name}-error`);
    errorElement.textContent = errorMessage;
    inputElemPopup.classList.add(this._selectors.inputErrorClass);
  }

  hideInputError = (inputElemPopup) => {
    const errorElement = this._formElement.querySelector(`.${inputElemPopup.name}-error`);
    errorElement.textContent = '';
    inputElemPopup.classList.remove(this._selectors.inputErrorClass);
  }

  _checkInputValidity = (inputElemPopup) => {
    if (!inputElemPopup.validity.valid) {
      this._showInputError(inputElemPopup, inputElemPopup.validationMessage);
    } else {
      this.hideInputError(inputElemPopup);
    }
  }

  _hasInvalidInput = () => {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  }

  _activeBtnSubmit = () => {
    this._buttonSubmitElem.classList.remove(this._selectors.inactiveButtonClass);
    this._buttonSubmitElem.removeAttribute('disabled');
  }
  _inactiveBtnSubmit = () => {
    this._buttonSubmitElem.classList.add(this._selectors.inactiveButtonClass);
    this._buttonSubmitElem.setAttribute('disabled', 'disabled');
  }

  _toggleButtonState = () => {
    if (this._hasInvalidInput(this._inputList))
      this._inactiveBtnSubmit()
    else
      this._activeBtnSubmit();
  }

  _setEventListenersValidation = () => {
    this._inputList = Array.from(this._formElement.querySelectorAll(this._selectors.inputSelector));
    this._buttonSubmitElem = this._formElement.querySelector(this._selectors.submitButtonSelector);
    // деактивируем кнопку при 1й загрузке сайта
    this._toggleButtonState();

    this._formElement.addEventListener('reset', () => {
      // `setTimeout` нужен для того, чтобы дождаться очищения формы (вызов уйдет в конце стэка) и только потом вызвать `toggleButtonState`
      setTimeout(() => {
        this._toggleButtonState();
      }, 0); // достаточно указать 0 миллисекунд, чтобы после `reset` уже сработало действие
    });

    this._inputList.forEach((inputElemPopup) => {
      inputElemPopup.addEventListener('input', () => {
        this._checkInputValidity(inputElemPopup);
        this._toggleButtonState();
      });
    });
  }

  enableValidation = () => {
    this._setEventListenersValidation();
  }
}
