import { initialCards, Card } from './Card.js';
import { configForm } from './constans/index_const.js';
import FormValidator from './Validate.js';

//данные галереи
const galleryList = document.querySelector('.gallery__card-list');

const handleKeydown = (evt) => {
  if (evt.key != 'Escape') return;
  const divPopupElem = document.querySelector(".popup_opened");
  closePopup(divPopupElem);
}

function displayPopup(divPopup) {
  divPopup.classList.add('popup_opened');
  document.addEventListener('keydown', handleKeydown);
}

function closePopup(divPopup) {
  divPopup.classList.remove('popup_opened');
  document.removeEventListener('keydown', handleKeydown);
}

function handleFormSubmitProfile(evt, { nameElement, jobElement }) {
  const formPopup = evt.target;
  evt.preventDefault();
  nameElement.textContent = formPopup['name'].value;
  jobElement.textContent = formPopup['job'].value;
  closePopup(formPopup.closest('.popup'));
}

function setInputProfile(formPopupProfile, { nameElement, jobElement }) {
  const nameInputElem = formPopupProfile["name"];
  const jobInputElem = formPopupProfile["job"];

  nameInputElem.value = nameElement.textContent;
  jobInputElem.value = jobElement.textContent;
}

function renderCards(arrObjCards) {
  const arrayCards = arrObjCards.map((cardObj) => {
    const card = new Card(({cardObj, displayPopup}), '#card-template');
    return card.generateCard();
  });
  galleryList.prepend(...arrayCards); //Добавить массив один раз более экономно по ресурсам, чем каждую карточку отдельно
}

function handleFormSubmitAddCard(evt) {
  const formPopup = evt.target;
  const cardObj = {
    name: formPopup['name-card'].value,
    link: formPopup['src-card'].value
  };
  evt.preventDefault();
  renderCards([cardObj]);
  closePopup(formPopup.closest('.popup'));
  formPopup.reset();
}

const setListenersEditProfile = (divPopup, formPopup, formValidator) => {
  //данные профиля
  const profileContainer = document.querySelector('.profile__info-container');
  const dataProfile = {
    nameElement: profileContainer.querySelector('.profile__name'),
    jobElement: profileContainer.querySelector('.profile__job')
  };

  //слушатель на кнопку, вызывающую форму изменения профиля
  profileContainer.querySelector('.profile__edit-button').addEventListener('click', () => {
    setInputProfile(formPopup, dataProfile);
    divPopup.querySelectorAll(configForm.inputSelector).forEach((inputElementPopup) => {
      formValidator.hideInputError(inputElementPopup);
    });
    displayPopup(divPopup);
  });
  //слушатель на submit формы
  formPopup.addEventListener('submit', (evt) => handleFormSubmitProfile(evt, dataProfile));
}

const setListenerAddCard = (divPopup, formPopup) => {
  //слушатель на кнопку, вызывающую форму добавления карточки
  document.querySelector('.profile__add-button').addEventListener('click', () => displayPopup(divPopup));
  //слушатель на submit формы
  formPopup.addEventListener('submit', handleFormSubmitAddCard);
}

const setListenerClosePopup = (divPopup) => {
  //слушатель для закрытия попапов
  divPopup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup_opened')) closePopup(divPopup);
    if (evt.target.classList.contains('popup__button-close')) closePopup(divPopup);
  });
}

const initializePopups = () => {
  const popupList = document.querySelectorAll('.popup');
  popupList.forEach((divPopup) => {
    if (!divPopup.className.includes('popup_form_image')) {
      const formPopup = divPopup.querySelector(configForm.formSelector);
      //валидация форм
      const formValidator = new FormValidator(configForm, formPopup);
      formValidator.enableValidation();
      if (divPopup.className.includes('popup_form_addCard'))
        setListenerAddCard(divPopup, formPopup);

      if (divPopup.className.includes('popup_form_editProfile'))
        setListenersEditProfile(divPopup, formPopup, formValidator);
    };
    setListenerClosePopup(divPopup);
  });
}

renderCards(initialCards);
initializePopups();
