//массив карточек для отображения
const initialCards = [
  {
    name: 'Санкт-Петербург',
    link: './images/Kazanskiy.jpg'
  },
  {
    name: 'Петергоф',
    link: './images/Petergof.jpg'
  },
  {
    name: 'Пушкин',
    link: './images/Pushkin.jpg'
  },
  {
    name: 'Ломоносов',
    link: './images/Oranienbaum.jpg'
  },
  {
    name: 'Выборг',
    link: './images/Viborg.jpg'
  },
  {
    name: 'Карелия',
    link: './images/Ruskeala.jpg'
  }
];

//данные профиля
const profileContainer = document.querySelector('.profile__info-container');
const editButton = profileContainer.querySelector('.profile__edit-button');
const profileName = profileContainer.querySelector('.profile__name');
const profileJob = profileContainer.querySelector('.profile__job');

const addCardBtn = document.querySelector('.profile__add-button');

//данные попап
const divPopupEditProfile = document.querySelector('.popup_form_editProfile');

const divPopupAddCard = document.querySelector('.popup_form_addCard');

const divPopupImage = document.querySelector('.popup_form_image');
const popupImage = divPopupImage.querySelector('.popup__image');
const popupImgCaption = divPopupImage.querySelector('.popup__image-caption');

const formProfilePopup = document.querySelector('.popup__form[name="form-profile-edit"]');
const nameInput = formProfilePopup.querySelector('.popup__text-input[name="name"]');
const jobInput = formProfilePopup.querySelector('.popup__text-input[name="job"]');

const formAddPopup = document.querySelector('.popup__form[name="form-card-add"]');

//данные галереи
const galleryList = document.querySelector('.gallery__card-list');
const cardTemplate = document.querySelector('#card-template').content;

function displayPopup(divPopup) {
  divPopup.classList.add('popup_opened');
}

function closePopup(evt, divPopup) {
  if ((evt.type === 'submit') || (divPopup.querySelector('.popup__button-close') === evt.target) || (evt.currentTarget === evt.target))
    divPopup.classList.remove('popup_opened');
}

function handleFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(evt, divPopupEditProfile);
}

function setInputProfile() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}

function addCard(cardName, cardImageSrc) {
  const newCard = cardTemplate.querySelector('.gallery__card').cloneNode(true);

  const cardImage = newCard.querySelector('.gallery__card-image');
  cardImage.src = cardImageSrc;
  cardImage.alt = cardName;
  newCard.querySelector('.gallery__text-name').textContent = cardName;

  return newCard;
}

function fillGalleryList() {
  const arrayCards = initialCards.map((card) => addCard(card.name, card.link));
  galleryList.append(...arrayCards); //Добавить массив один раз более экономно по ресурсам, чем каждую карточку отдельно
}

fillGalleryList();

//отображаем попап
editButton.addEventListener('click', function () {
  setInputProfile();
  displayPopup(divPopupEditProfile);
});
addCardBtn.addEventListener('click', function () { displayPopup(divPopupAddCard) });

//скрываем попап
//теперь будем слушать нажатие на попап, а не на кнопку
divPopupEditProfile.addEventListener('click', function (evt) { closePopup(evt, divPopupEditProfile) });
divPopupAddCard.addEventListener('click', function (evt) { closePopup(evt, divPopupAddCard) });
divPopupImage.addEventListener('click', function (evt) { closePopup(evt, divPopupImage) });

//переключаем лайк и удаление карточки
galleryList.addEventListener('click', function (evt) {
   if (evt.target.name === 'like-toggle') {
    evt.target.classList.toggle('gallery__like-toggle_on');
    return;
   }
   if (evt.target.name === 'card-delete'){
    evt.target.parentNode.remove();
    return
   }
   console.dir(evt.target);
   if (evt.target.classList.contains('gallery__card-image')){
    popupImage.src = evt.target.src;
    popupImage.alt = evt.target.alt;
    popupImgCaption.textContent = evt.target.alt;
    displayPopup(divPopupImage);
   }
   });

//сохраняем данные профиля
formProfilePopup.addEventListener('submit', handleFormSubmit);
//добавляем карточку
formAddPopup.addEventListener('submit', function (evt) {
  evt.preventDefault();
  galleryList.prepend(
    addCard(divPopupAddCard.querySelector('.popup__text-input[name="name-card"]').value,
      divPopupAddCard.querySelector('.popup__text-input[name="src-card"]').value)
  );
  closePopup(evt, divPopupAddCard);
  evt.target.reset();
});

