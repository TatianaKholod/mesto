//данные профиля
let profileContainer = document.querySelector('.profile__info-container');
let editButton = profileContainer.querySelector('.profile__edit-button');
let profileName = profileContainer.querySelector('.profile__name');
let profileJob = profileContainer.querySelector('.profile__job');

//данные попап
let divPopup = document.querySelector('.popup');
let closeButton = divPopup.querySelector('.popup__button-close');
// Находим форму в DOM
let formPopup = document.querySelector('.popup__form');
// Находим поля формы в DOM
let nameInput = formPopup.querySelector('.popup__profile-info[name="name"]');
let jobInput = formPopup.querySelector('.popup__profile-info[name="job"]');
console.log(nameInput);

function displayPopup() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  divPopup.classList.add('popup_opened');
}

function ClosePopup() {
  divPopup.classList.remove('popup_opened');
}

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleFormSubmit(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  ClosePopup();
}

//отображаем попап
editButton.addEventListener('click', displayPopup);
//скрываем попап
closeButton.addEventListener('click', ClosePopup);
//сохраняем данные профиля
// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formPopup.addEventListener('submit', handleFormSubmit);
