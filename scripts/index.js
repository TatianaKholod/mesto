//данные профиля
let profileContainer = document.querySelector('.profile__info-container');
let editButton = profileContainer.querySelector('.profile__edit-button');
let profileName = profileContainer.querySelector('.profile__name');
let profileJob = profileContainer.querySelector('.profile__job');

//данные попап
let divPopup = document.querySelector('.popup');
let closeButton = divPopup.querySelector('.popup__button-close');
// Находим форму в DOM
let formPopup = document.querySelector('.popup__form[name="form-profile-edit"]');
// Находим поля формы в DOM
let nameInput = formPopup.querySelector('.popup__text-input[name="name"]');
let jobInput = formPopup.querySelector('.popup__text-input[name="job"]');

function displayPopup() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  divPopup.classList.add('popup_opened');
}

function closePopup() {
  divPopup.classList.remove('popup_opened');
}

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleFormSubmit(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup();
}

//отображаем попап
editButton.addEventListener('click', displayPopup);
//скрываем попап
closeButton.addEventListener('click', closePopup);
//сохраняем данные профиля
// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formPopup.addEventListener('submit', handleFormSubmit);
