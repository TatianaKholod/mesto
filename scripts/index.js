import { initialCards } from './cards.js'
import { configForm } from './constans/index_const.js'

//данные попап с картинкой
const divPopupImage = document.querySelector('.popup_form_image');
const popupImage = divPopupImage.querySelector('.popup__image');
const popupImgCaption = divPopupImage.querySelector('.popup__image-caption');

//данные галереи
const galleryList = document.querySelector('.gallery__card-list');
const cardTemplate = document.querySelector('#card-template').content;

const handleKeydown = (evt) => {
  if (evt.key != 'Escape') return;
  const divPopupElem = document.querySelector(".popup_opened");
  closePopup(evt, divPopupElem);
}

function displayPopup(divPopup) {
  divPopup.classList.add('popup_opened');
  document.addEventListener('keydown', handleKeydown);
}

function closePopup(evt, divPopup, buttonCloseElem = '') {
  if ((evt.type != 'submit')
    && (evt.type != 'keydown')
    && (buttonCloseElem != evt.target)
    && (evt.currentTarget != evt.target))
    return;
  divPopup.classList.remove('popup_opened');
  //очистим сообщения валидации и погасим кнопку
  divPopup.querySelectorAll(".popup__input").forEach((inputElementPopup) => {
    hideInputError(inputElementPopup.closest('.popup__form'), inputElementPopup, configForm.inputErrorClass)
  });
  if (evt.type === 'submit') inactiveBtnSubmit(evt.submitter, configForm.inactiveButtonClass);

  document.removeEventListener('keydown', handleKeydown);
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

  toggleButtonState([nameInputElem, jobInputElem], saveBtnElem, configForm.inactiveButtonClass);
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

const setEventListenersPopup = (divPopup) => {
  //console.dir(divPopup.className.includes('popup_form_editProfile'));
  const formPopup = divPopup.querySelector(configForm.formSelector);

  switch (true) {
    case divPopup.className.includes('popup_form_editProfile'):
      //данные профиля
      const profileContainer = document.querySelector('.profile__info-container');
      const dataProfile = {
        nameElement: profileContainer.querySelector('.profile__name'),
        jobElement: profileContainer.querySelector('.profile__job')
      };
      //слушатель на кнопку, вызывающую форму изменения профиля
      profileContainer.querySelector('.profile__edit-button').addEventListener('click', (evt) => {
        setInputProfile(formPopup, dataProfile);
        displayPopup(divPopup);
      });
      //слушатель на submit формы
      formPopup.addEventListener('submit', (evt) => handleFormSubmitProfile(evt, dataProfile));
      break;

    case divPopup.className.includes('popup_form_addCard'):
      //слушатель на кнопку, вызывающую форму добавления карточки
      document.querySelector('.profile__add-button').addEventListener('click', () => displayPopup(divPopup));
      //слушатель на submit формы
      formPopup.addEventListener('submit', handleFormSubmitAddCard);
      break;
  };
  //слушатель для закрытия попапов
  const buttonCloseElem = divPopup.querySelector('.popup__button-close');
  divPopup.addEventListener('click', (evt) => closePopup(evt, divPopup, buttonCloseElem));
}

const initializeForms = () => {
  const popupList = document.querySelectorAll('.popup');
  popupList.forEach((divPopup) => {
    setEventListenersPopup(divPopup);
  });
}

renderCards(initialCards);
initializeForms();
enableValidation(configForm);
