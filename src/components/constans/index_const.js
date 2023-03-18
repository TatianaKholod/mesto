export const configForm = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button-save',
  inactiveButtonClass: 'popup_button_inactive',
  inputErrorClass: 'popup__input_type_error',
};
//массив карточек для отображения
import Kazanskiy from '../../images/Kazanskiy.jpg';
import Petergof from '../../images/Petergof.jpg';
import Pushkin from '../../images/Pushkin.jpg';
import Oranienbaum from '../../images/Oranienbaum.jpg';
import Viborg from '../../images/Viborg.jpg';
import Ruskeala from '../../images/Ruskeala.jpg';

export const initialCards = [
  {
    name: 'Санкт-Петербург',
    link: Kazanskiy
  },
  {
    name: 'Петергоф',
    link: Petergof
  },
  {
    name: 'Пушкин',
    link: Pushkin
  },
  {
    name: 'Ломоносов',
    link: Oranienbaum
  },
  {
    name: 'Выборг',
    link: Viborg
  },
  {
    name: 'Карелия',
    link: Ruskeala
  }
];
