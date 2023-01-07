let editButton = document.querySelector('.profile__edit-button');
let popup =  document.querySelector('.popup');
let closeButton = popup.querySelector('.popup__button-close');
console.log(editButton);
editButton.addEventListener('click', function(){popup.classList.add('popup_opened');});
closeButton.addEventListener('click', function(){popup.classList.remove('popup_opened');});
