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

  _hasInvalidInput = (inputListPopup) => {
    return inputListPopup.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  }

  _activeBtnSubmit = (buttonSubmitElem, inactiveButtonClass) => {
    buttonSubmitElem.classList.remove(inactiveButtonClass);
    buttonSubmitElem.removeAttribute('disabled');
  }
  _inactiveBtnSubmit = (buttonSubmitElem, inactiveButtonClass) => {
    buttonSubmitElem.classList.add(inactiveButtonClass);
    buttonSubmitElem.setAttribute('disabled', 'disabled');
  }

  _toggleButtonState = (inputListPopup, buttonSubmitElem) => {
    if (this._hasInvalidInput(inputListPopup))
      this._inactiveBtnSubmit(buttonSubmitElem, this._selectors.inactiveButtonClass)
    else
      this._activeBtnSubmit(buttonSubmitElem, this._selectors.inactiveButtonClass);
  }

  _setEventListenersValidation = () => {
    const inputListPopup = Array.from(this._formElement.querySelectorAll(this._selectors.inputSelector));
    const buttonSubmitElem = this._formElement.querySelector(this._selectors.submitButtonSelector);
    // деактивируем кнопку при 1й загрузке сайта
    this._toggleButtonState(inputListPopup, buttonSubmitElem);

    this._formElement.addEventListener('reset', () => {
      // `setTimeout` нужен для того, чтобы дождаться очищения формы (вызов уйдет в конце стэка) и только потом вызвать `toggleButtonState`
      setTimeout(() => {
        this._toggleButtonState(inputListPopup, buttonSubmitElem);
      }, 0); // достаточно указать 0 миллисекунд, чтобы после `reset` уже сработало действие
    });

    inputListPopup.forEach((inputElemPopup) => {
      inputElemPopup.addEventListener('input', () => {
        this._checkInputValidity(inputElemPopup);
        this._toggleButtonState(inputListPopup, buttonSubmitElem);
      });
    });
  }

  enableValidation = () => {
    this._setEventListenersValidation();
  }
}
