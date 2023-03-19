import './index.css';
import { initialCards, configForm } from '../components/constans/index_const.js';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import FormValidator from '../components/Validate.js';


const popupWithImage = new PopupWithImage('.popup_form_image');
popupWithImage.setListenerClosePopup();

const createCards = (cardObj) => {
  const card = new Card(({ cardObj, handleCardClick: (data) => { popupWithImage.open(data) } }), '#card-template');
  const cardElement = card.generateCard();
  return cardElement;
}

const galleryList = new Section({ items: initialCards, renderer: createCards }, '.gallery__card-list');

function handleFormSubmitAddCard(evt, cardObj) {
  evt.preventDefault();
  galleryList.addItem(createCards({ name: cardObj['name-card'], link: cardObj['src-card'] }));
  popupCardAdd.closeSubmit();
}

const popupCardAdd = new PopupWithForm(handleFormSubmitAddCard, '.popup_form_addCard');
popupCardAdd.setEventListeners();
//слушатель на кнопку, вызывающую форму добавления карточки
document.querySelector('.profile__add-button').addEventListener('click', () => popupCardAdd.open());
//валидация
const formValidatorCard = new FormValidator(configForm, popupCardAdd.getFormElement());
formValidatorCard.enableValidation();

const popupEditProfile = new PopupWithForm(handleFormSubmitProfile, '.popup_form_editProfile');
popupEditProfile.setEventListeners();

const userInfo = new UserInfo('.profile__name', '.profile__job');

function handleFormSubmitProfile(evt, { name, job }) {
  evt.preventDefault();
  userInfo.setUserInfo(name, job);
  popupEditProfile.close();
}

//валидация профиля
const formValidatorProfile = new FormValidator(configForm, popupEditProfile.getFormElement());
formValidatorProfile.enableValidation();

//слушатель на кнопку, вызывающую форму изменения профиля
document.querySelector('.profile__edit-button').addEventListener('click', () => {
  popupEditProfile.setInputValues(userInfo.getUserInfo(), formValidatorProfile.hideInputError);
  popupEditProfile.open();
});

galleryList.renderItems();

