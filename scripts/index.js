//массив карточек для отображения
const initialCards = [
  {
    name: 'Санкт-Петербург',
    link: '../images/Kazanskiy.jpg'
  },
  {
    name: 'Петергоф',
    link: '../images/Petergof.jpg'
  },
  {
    name: 'Пушкин',
    link: '../images/Pushkin.jpg'
  },
  {
    name: 'Ломоносов',
    link: '../images/Oranienbaum.jpg'
  },
  {
    name: 'Выборг',
    link: '../images/Viborg.jpg'
  },
  {
    name: 'Карелия',
    link: '../images/Ruskeala.jpg'
  }
];

//данные профиля
const profileContainer = document.querySelector('.profile__info-container');
const editButton = profileContainer.querySelector('.profile__edit-button');
const profileName = profileContainer.querySelector('.profile__name');
const profileJob = profileContainer.querySelector('.profile__job');

//данные попап
const divPopup = document.querySelector('.popup');
const closeButton = divPopup.querySelector('.popup__button-close');

const formPopup = document.querySelector('.popup__form');
const nameInput = formPopup.querySelector('.popup__text-input[name="name"]');
const jobInput = formPopup.querySelector('.popup__text-input[name="job"]');

//данные галереи
const galleryList = document.querySelector('.gallery__card-list');
const cardTemplate = document.querySelector('#card-template').content;


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

function displayPopup() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  divPopup.classList.add('popup_opened');
}

function closePopup() {
  divPopup.classList.remove('popup_opened');
}


function handleFormSubmit(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup();
}

fillGalleryList();
//отображаем попап
editButton.addEventListener('click', displayPopup);
//скрываем попап
closeButton.addEventListener('click', closePopup);
//сохраняем данные профиля
// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formPopup.addEventListener('submit', handleFormSubmit);
