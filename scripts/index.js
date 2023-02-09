import { initialCards } from './cards.js'
//данные профиля
const profileContainer = document.querySelector('.profile__info-container');
const profileName = profileContainer.querySelector('.profile__name');
const profileJob = profileContainer.querySelector('.profile__job');

//данные попап
const divPopupEditProfile = document.querySelector('.popup_form_editProfile');

const divPopupAddCard = document.querySelector('.popup_form_addCard');

const divPopupImage = document.querySelector('.popup_form_image');
const popupImage = divPopupImage.querySelector('.popup__image');
const popupImgCaption = divPopupImage.querySelector('.popup__image-caption');

const formProfilePopup = document.querySelector('.popup__form[name="form-profile-edit"]');
const nameInput = formProfilePopup.querySelector('.popup__input[name="name"]');
const jobInput = formProfilePopup.querySelector('.popup__input[name="job"]');

const formAddPopup = document.querySelector('.popup__form[name="form-card-add"]');

//данные галереи
const galleryList = document.querySelector('.gallery__card-list');
const cardTemplate = document.querySelector('#card-template').content;

function displayPopup(divPopup) {
  divPopup.classList.add('popup_opened');
}

function closePopup(divPopup) {
  divPopup.classList.remove('popup_opened');
}

function callClosingPopup(button) {
  button.addEventListener('click', () => closePopup(button.closest('.popup')));
}

function handleFormSubmitProfile(evt) {
  const formPopup = evt.target;
  evt.preventDefault();
  profileName.textContent = formPopup['name'].value;
  profileJob.textContent = formPopup['job'].value;
  closePopup(formPopup.closest('.popup'));
}

function setInputProfile() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
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
  const cardObj = {
    name: formPopup['name-card'].value,
    link: formPopup['src-card'].value
  };
  evt.preventDefault();
  renderCards([cardObj]);
  closePopup(formPopup.closest('.popup'));
  formPopup.reset();
}
//*******************************************
const showInputError = (formPopup, inputElemPopup, errorMessage) => {
  const errorElement = formPopup.querySelector(`.${inputElemPopup.name}-error`);
  errorElement.textContent = errorMessage;
};

const hideInputError = (formPopup, inputElemPopup) => {
  const errorElement = formPopup.querySelector(`.${inputElemPopup.name}-error`);
  errorElement.textContent = '';
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

const toggleButtonState = (inputListPopup, buttonElemPopup) => {
  if (hasInvalidInput(inputListPopup))
    buttonElemPopup.classList.add('popup_button_inactive')
  else
    buttonElemPopup.classList.remove('popup_button_inactive');
}

const setEventListenersImput = (formPopup) => {
  const inputListPopup = Array.from(formPopup.querySelectorAll('.popup__input'));
  const buttonElemPopup = formPopup.querySelector('.popup__button-save');
  toggleButtonState(inputListPopup, buttonElemPopup);
  inputListPopup.forEach((inputElemPopup) => {
    inputElemPopup.addEventListener('input', function () {
      checkInputValidity(formPopup, inputElemPopup);
      toggleButtonState(inputListPopup, buttonElemPopup);
    });
  });
}


renderCards(initialCards);
setEventListenersImput(formProfilePopup);

//скрываем попап (в callClosingPopup слушаем кнопки закрытия для каждого попапа)
document.querySelectorAll('.popup__button-close').forEach(callClosingPopup);

//отображаем попап
profileContainer.querySelector('.profile__edit-button').addEventListener('click', () => {
  setInputProfile();
  displayPopup(divPopupEditProfile);
});

document.querySelector('.profile__add-button').addEventListener('click', () => displayPopup(divPopupAddCard));

//сохраняем данные профиля
formProfilePopup.addEventListener('submit', handleFormSubmitProfile);
//добавляем карточку
formAddPopup.addEventListener('submit', handleFormSubmitAddCard);

