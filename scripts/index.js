import { initialCards } from './constans/index_const.js';
import Card from './Card.js';
import Section from './Section.js';
import PopupWithImage from './PopupWithImage.js';
import PopupWithForm from './PopupWithForm.js';

const popupWithImage = new PopupWithImage('.popup_form_image');
popupWithImage.setListenerClosePopup();

const createCards = (cardObj) => {
  const card = new Card(({ cardObj, handleCardClick: (data) => { popupWithImage.open(data) } }), '#card-template');
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

function handleFormSubmitAddCard(evt,cardObj) {
  evt.preventDefault();
  galleryList.addItem(createCards({name:cardObj['name-card'],link:cardObj['src-card']}));
  popupCardAdd.close();
}

const popupCardAdd = new PopupWithForm(({'name-card':'','src-card':''}), handleFormSubmitAddCard , '.popup_form_addCard');
popupCardAdd.setEventListeners();
//слушатель на кнопку, вызывающую форму добавления карточки
document.querySelector('.profile__add-button').addEventListener('click', () => popupCardAdd.open());

const profileContainer = document.querySelector('.profile__info-container');

const dataProfile = {
  nameElement: profileContainer.querySelector('.profile__name'),
  jobElement: profileContainer.querySelector('.profile__job')
};
const popupEditProfile = new PopupWithForm(({'name': dataProfile.nameElement.textContent,'job': dataProfile.jobElement.textContent}), handleFormSubmitProfile, '.popup_form_editProfile');
popupEditProfile.setEventListeners();

function handleFormSubmitProfile(evt, { name, job }) {
  evt.preventDefault();
  dataProfile.nameElement.textContent = name;
  dataProfile.jobElement.textContent = job;
  popupEditProfile.close();
}

//слушатель на кнопку, вызывающую форму изменения профиля
profileContainer.querySelector('.profile__edit-button').addEventListener('click', () => {popupEditProfile.setInputValues();popupEditProfile.open()});

galleryList.renderItems();

