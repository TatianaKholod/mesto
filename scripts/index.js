import { initialCards, configForm } from './constans/index_const.js';
import Card from './Card.js';
import FormValidator from './Validate.js';
import Section from './Section.js';

//данные попап с картинкой
export const divPopupImage = document.querySelector('.popup_form_image');
export const popupImage = divPopupImage.querySelector('.popup__image');
export const popupImgCaption = divPopupImage.querySelector('.popup__image-caption');


const handleKeydown = (evt) => {
  if (evt.key != 'Escape') return;
  const divPopupElem = document.querySelector(".popup_opened");
  closePopup(divPopupElem);
}

function displayPopup(divPopup) {
  divPopup.classList.add('popup_opened');
  document.addEventListener('keydown', handleKeydown);
}

function displayImagePopup(data) {
  popupImage.src = data.link;
  popupImage.alt = data.name;
  popupImgCaption.textContent = data.name;
  displayPopup(divPopupImage);
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

const createCards = (cardObj) => {
  const card = new Card(({ cardObj, displayImagePopup }), '#card-template');
  const cardElement = card.generateCard();
  return cardElement;
}
//данные галереи
const galleryList = new Section({
  items: initialCards,
  renderer: createCards
},
  '.gallery__card-list'
);


function handleFormSubmitAddCard(evt) {
  const formPopup = evt.target;
  const cardObj = {
    name: formPopup['name-card'].value,
    link: formPopup['src-card'].value
  };
  evt.preventDefault();
  galleryList.addItem(createCards(cardObj));
  closePopup(formPopup.closest('.popup'));
  formPopup.reset();
}

const setValidatorForm = (formPopup) => {
  const formValidator = new FormValidator(configForm, formPopup);
  formValidator.enableValidation();
  return formValidator;
}

const handleFormEditProfile = (profilePopup, formPopup, dataProfile, formValidator) => {
  setInputProfile(formPopup, dataProfile);
  profilePopup.querySelectorAll(configForm.inputSelector).forEach((inputElementPopup) => {
    formValidator.hideInputError(inputElementPopup);
  });
  displayPopup(profilePopup);
}

const setListenersEditProfile = (profilePopup) => {
  const formPopup = profilePopup.querySelector(configForm.formSelector);
  const formValidator = setValidatorForm(profilePopup);

  //данные профиля
  const profileContainer = document.querySelector('.profile__info-container');
  const dataProfile = {
    nameElement: profileContainer.querySelector('.profile__name'),
    jobElement: profileContainer.querySelector('.profile__job')
  };

  //слушатель на кнопку, вызывающую форму изменения профиля
  profileContainer.querySelector('.profile__edit-button').addEventListener('click',
    () => handleFormEditProfile(profilePopup, formPopup, dataProfile, formValidator)
  );
  //слушатель на submit формы
  formPopup.addEventListener('submit', (evt) => handleFormSubmitProfile(evt, dataProfile));
}

const setListenerAddCard = (addCardPopup) => {
  const formPopup = addCardPopup.querySelector(configForm.formSelector);
  setValidatorForm(formPopup);
  //слушатель на кнопку, вызывающую форму добавления карточки
  document.querySelector('.profile__add-button').addEventListener('click', () => displayPopup(addCardPopup));
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

  const profilePopup = document.querySelector('.popup_form_editProfile');
  setListenersEditProfile(profilePopup);
  setListenerClosePopup(profilePopup);

  const addCardPopup = document.querySelector('.popup_form_addCard');
  setListenerAddCard(addCardPopup);
  setListenerClosePopup(addCardPopup);

  setListenerClosePopup(document.querySelector('.popup_form_image'));
}
galleryList.renderItems();
initializePopups();
