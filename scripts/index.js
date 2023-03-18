import { initialCards } from './constans/index_const.js';
import Card from './Card.js';
import Section from './Section.js';
import PopupWithImage from './PopupWithImage.js';
import PopupWithForm from './PopupWithForm.js';
import UserInfo from './UserInfo.js';

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

const popupEditProfile = new PopupWithForm(handleFormSubmitProfile, '.popup_form_editProfile');
popupEditProfile.setEventListeners();

const userInfo = new UserInfo('.profile__name', '.profile__job');

function handleFormSubmitProfile(evt, { name, job }) {
  evt.preventDefault();
  userInfo.setUserInfo(name, job);
  popupEditProfile.closeSubmit();
}

//слушатель на кнопку, вызывающую форму изменения профиля
document.querySelector('.profile__edit-button').addEventListener('click', () => {
  popupEditProfile.open(userInfo.getUserInfo())
});

galleryList.renderItems();

