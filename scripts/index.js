let ProfileContainer = document.querySelector('.profile__info-container');
let editButton = ProfileContainer.querySelector('.profile__edit-button');

// Находим форму в DOM
let formPopup = document.querySelector('.popup');
// Находим поля формы в DOM
let closeButton = formPopup.querySelector('.popup__button-close');
let nameInput = formPopup.querySelector('.popup__profile-info[name="profile-name"]');
let jobInput = formPopup.querySelector('.popup__profile-info[name="profile-info"]');

function DisplayPopup() {
  let profileName = ProfileContainer.querySelector('.profile__name');
  let profileJob = ProfileContainer.querySelector('.profile__job');
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  formPopup.classList.add('popup_opened');
}

function ClosePopup() {
  formPopup.classList.remove('popup_opened');
}

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleFormSubmit(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  // Выберите элементы, куда должны быть вставлены значения полей
  let profileName = ProfileContainer.querySelector('.profile__name');
  let profileJob = ProfileContainer.querySelector('.profile__job');
  // Вставьте новые значения с помощью textContent
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  ClosePopup();
}

//отображаем попап
editButton.addEventListener('click', DisplayPopup);
//скрываем попап
closeButton.addEventListener('click', ClosePopup);
//сохраняем данные профиля
// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formPopup.addEventListener('submit', handleFormSubmit);
