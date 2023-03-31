import './index.css';
import { configForm } from '../components/constans/index_const.js';
import Api from '../components/Api.js';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import FormValidator from '../components/Validate.js';

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-63',
  headers: {
    authorization: '08ce7d7d-6a89-4c4e-8dc5-e37c7f4a1b05',
    'Content-Type': 'application/json'
  }
});

const popupWithImage = new PopupWithImage('.popup_form_image');
popupWithImage.setListenerClosePopup();

const createCards = (cardObj) => {
  const card = new Card(({ cardObj, handleCardClick: (data) => { popupWithImage.open(data) } }), '#card-template');
  const cardElement = card.generateCard();
  //console.log(card.cardId + "- "+ card._name);//удалить
  return cardElement;
}

api.getInitialCards()
  .then((dataCards) => {
    galleryList.renderItems(dataCards);
  });

const galleryList = new Section(  createCards , '.gallery__card-list');

function handleFormSubmitAddCard(evt, cardObj) {
  evt.preventDefault();
  api.createNewCard(cardObj['name-card'],cardObj['src-card'])
  .then((dataCard) =>{
    galleryList.addItem(createCards(dataCard));
  });
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
api.getInitProfile()
  .then(data =>
    userInfo.setUserInfo(data.name, data.about)
  );

function handleFormSubmitProfile(evt, { name, job }) {
  evt.preventDefault();
  api.updateProfile(name, job)
  .then(data =>
    userInfo.setUserInfo(data.name, data.about)
  );
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

//api.deleteCard('642719f377f24d3b98350d84'); //удалить

