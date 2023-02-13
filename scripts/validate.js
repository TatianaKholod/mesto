const showInputError = (formPopup, inputElemPopup, errorMessage, inputErrorClass) => {
  const errorElement = formPopup.querySelector(`.${inputElemPopup.name}-error`);
  errorElement.textContent = errorMessage;
  inputElemPopup.classList.add(inputErrorClass);
};

const hideInputError = (formPopup, inputElemPopup, inputErrorClass) => {
  const errorElement = formPopup.querySelector(`.${inputElemPopup.name}-error`);
  errorElement.textContent = '';
  inputElemPopup.classList.remove(inputErrorClass);
};

const checkInputValidity = (formPopup, inputElemPopup, inputErrorClass) => {
  if (!inputElemPopup.validity.valid) {
    showInputError(formPopup, inputElemPopup, inputElemPopup.validationMessage, inputErrorClass);
  } else {
    hideInputError(formPopup, inputElemPopup, inputErrorClass);
  }
};

const hasInvalidInput = (inputListPopup) => {
  return inputListPopup.some((inputElement) => {
    return !inputElement.validity.valid;
  })
}

const activeBtnSubmit = (buttonSubmitElem, inactiveButtonClass) => {
  buttonSubmitElem.classList.remove(inactiveButtonClass);
  buttonSubmitElem.removeAttribute('disabled');
}
const inactiveBtnSubmit = (buttonSubmitElem, inactiveButtonClass) => {
  buttonSubmitElem.classList.add(inactiveButtonClass);
  buttonSubmitElem.setAttribute('disabled', 'disabled');
}

const toggleButtonState = (inputListPopup, buttonSubmitElem, inactiveButtonClass) => {
  if (hasInvalidInput(inputListPopup))
    inactiveBtnSubmit(buttonSubmitElem, inactiveButtonClass)
  else
    activeBtnSubmit(buttonSubmitElem, inactiveButtonClass);
}

const setEventListenersValidation = (formPopup, configForm) => {
  const inputListPopup = Array.from(formPopup.querySelectorAll(configForm.inputSelector));
  const buttonSubmitElem = formPopup.querySelector(configForm.submitButtonSelector);
  // деактивируем кнопку при 1й загрузке сайта
  toggleButtonState(inputListPopup, buttonSubmitElem, configForm.inactiveButtonClass);

  formPopup.addEventListener('reset', () => {
    // `setTimeout` нужен для того, чтобы дождаться очищения формы (вызов уйдет в конце стэка) и только потом вызвать `toggleButtonState`
    setTimeout(() => {
      toggleButtonState(inputListPopup, buttonSubmitElem, configForm.inactiveButtonClass);
    }, 0); // достаточно указать 0 миллисекунд, чтобы после `reset` уже сработало действие
  });

  inputListPopup.forEach((inputElemPopup) => {
    inputElemPopup.addEventListener('input', function () {
      checkInputValidity(formPopup, inputElemPopup, configForm.inputErrorClass);
      toggleButtonState(inputListPopup, buttonSubmitElem, configForm.inactiveButtonClass);
    });
  });
}

const enableValidation = (configForm) => {
  const formList = document.querySelectorAll(configForm.formSelector);
  formList.forEach((formPopup) => {
    setEventListenersValidation(formPopup, configForm);
  });
}
