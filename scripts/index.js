import { initialCards } from './cards.js'

//данные попап с картинкой
const divPopupImage = document.querySelector('.popup_form_image');
const popupImage = divPopupImage.querySelector('.popup__image');
const popupImgCaption = divPopupImage.querySelector('.popup__image-caption');

//данные галереи
const galleryList = document.querySelector('.gallery__card-list');
const cardTemplate = document.querySelector('#card-template').content;

function displayPopup(divPopup) {
  divPopup.classList.add('popup_opened');
}

function closePopup(evt, divPopup, buttonCloseElem = '') {
  if ((evt.type != 'submit') && (buttonCloseElem != evt.target) && (evt.currentTarget != evt.target)) return;
  divPopup.classList.remove('popup_opened');
  //очистим сообщения валидации и погасим кнопку
  divPopup.querySelectorAll(".popup__input").forEach((inputElementPopup) => { hideInputError(inputElementPopup.closest('.popup__form'), inputElementPopup) });
  if (evt.type === 'submit') inactiveBtnSubmit(evt.submitter);
}

function handleFormSubmitProfile(evt, { nameElement, jobElement }) {
  const formPopup = evt.target;
  formPopup['save-button'].setAttribute('disabled', 'disabled');
  evt.preventDefault();
  nameElement.textContent = formPopup['name'].value;
  jobElement.textContent = formPopup['job'].value;
  closePopup(evt, formPopup.closest('.popup'));
}

function setInputProfile(formPopupProfile, { nameElement, jobElement }) {
  const nameInputElem = formPopupProfile["name"];
  const jobInputElem = formPopupProfile["job"];
  const saveBtnElem = formPopupProfile["save-button"];

  nameInputElem.value = nameElement.textContent;
  jobInputElem.value = jobElement.textContent;

  toggleButtonState([nameInputElem, jobInputElem], saveBtnElem);
}

function creatCard(cardObj) {
  const newCard = cardTemplate.querySelector('.gallery__card').cloneNode(true);

  const cardImage = newCard.querySelector('.gallery__card-image');
  cardImage.src = cardObj.link;
  cardImage.alt = cardObj.name;
  newCard.querySelector('.gallery__text-name').textContent = cardObj.name;

  newCard.querySelector('.gallery__like-toggle').addEventListener('click', (evt) => evt.target.classList.toggle('gallery__like-toggle_on'));
  newCard.querySelector('.gallery__card-delete').addEventListener('click', (evt) => evt.target.closest('.gallery__card').remove());
  newCard.querySelector('.gallery__card-image').addEventListener('click', (evt) => {
    popupImage.src = evt.target.src;
    popupImage.alt = evt.target.alt;
    popupImgCaption.textContent = evt.target.alt;
    displayPopup(divPopupImage);
  });

  return newCard;
}

function renderCards(arrObjCards) {
  const arrayCards = arrObjCards.map((card) => creatCard(card));
  galleryList.prepend(...arrayCards); //Добавить массив один раз более экономно по ресурсам, чем каждую карточку отдельно
}

function handleFormSubmitAddCard(evt) {
  const formPopup = evt.target;
  formPopup['creat-card-btn'].setAttribute('disabled', 'disabled');
  const cardObj = {
    name: formPopup['name-card'].value,
    link: formPopup['src-card'].value
  };
  evt.preventDefault();
  renderCards([cardObj]);
  closePopup(evt, formPopup.closest('.popup'));
  formPopup.reset();
}
//*******************************************
const showInputError = (formPopup, inputElemPopup, errorMessage) => {
  const errorElement = formPopup.querySelector(`.${inputElemPopup.name}-error`);
  errorElement.textContent = errorMessage;
  inputElemPopup.classList.add('popup__input_type_error');
};

const hideInputError = (formPopup, inputElemPopup) => {
  const errorElement = formPopup.querySelector(`.${inputElemPopup.name}-error`);
  errorElement.textContent = '';
  inputElemPopup.classList.remove('popup__input_type_error');
};

const checkInputValidity = (formPopup, inputElemPopup) => {
  if (!inputElemPopup.validity.valid) {
    showInputError(formPopup, inputElemPopup, inputElemPopup.validationMessage);
  } else {
    hideInputError(formPopup, inputElemPopup);
  }
};

const hasInvalidInput = (inputListPopup) => {
  return inputListPopup.some((inputElement) => {
    return !inputElement.validity.valid;
  })
}

const activeBtnSubmit = (buttonSubmitElem) => {
  buttonSubmitElem.classList.remove('popup_button_inactive');
  buttonSubmitElem.removeAttribute('disabled');
}
const inactiveBtnSubmit = (buttonSubmitElem) => {
  buttonSubmitElem.classList.add('popup_button_inactive');
  buttonSubmitElem.setAttribute('disabled', 'disabled');
}

const toggleButtonState = (inputListPopup, buttonSubmitElem) => {
  if (hasInvalidInput(inputListPopup))
    inactiveBtnSubmit(buttonSubmitElem)
  else
    activeBtnSubmit(buttonSubmitElem);
}

const setEventListenersValidation = (formPopup) => {
  const inputListPopup = Array.from(formPopup.querySelectorAll('.popup__input'));
  const buttonSubmitElem = formPopup.querySelector('.popup__button-save');
  toggleButtonState(inputListPopup, buttonSubmitElem);
  inputListPopup.forEach((inputElemPopup) => {
    inputElemPopup.addEventListener('input', function () {
      checkInputValidity(formPopup, inputElemPopup);
      toggleButtonState(inputListPopup, buttonSubmitElem);
    });
  });
}

const setEventListenersForm = (formPopup) => {
  const formName = formPopup.attributes.name.value;
  const divPopupElem = formPopup.closest('.popup');
  switch (formName) {
    case "form-profile-edit":
      //данные профиля
      const profileContainer = document.querySelector('.profile__info-container');
      const dataProfile = {
        nameElement: profileContainer.querySelector('.profile__name'),
        jobElement: profileContainer.querySelector('.profile__job')
      };
      //слушатель на кнопку, вызывающую форму изменения профиля
      profileContainer.querySelector('.profile__edit-button').addEventListener('click', (evt) => {
        setInputProfile(formPopup, dataProfile);
        displayPopup(divPopupElem);
      });
      //слушатель на submit формы
      formPopup.addEventListener('submit', (evt) => handleFormSubmitProfile(evt, dataProfile));
      break;
    case "form-card-add":
      //слушатель на кнопку, вызывающую форму добавления карточки
      document.querySelector('.profile__add-button').addEventListener('click', () => displayPopup(divPopupElem));
      //слушатель на submit формы
      formPopup.addEventListener('submit', handleFormSubmitAddCard);
      break;
  };
  //слушатель для закрытия формы
  const buttonCloseElem = divPopupElem.querySelector('.popup__button-close');
  divPopupElem.addEventListener('click', (evt) => closePopup(evt, divPopupElem, buttonCloseElem));
}

const initializeForms = () => {
  const formList = document.querySelectorAll('.popup__form');
  formList.forEach((formPopup) => {
    setEventListenersForm(formPopup,);
    setEventListenersValidation(formPopup);
  });
}

renderCards(initialCards);
initializeForms();
