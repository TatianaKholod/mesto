//массив карточек для отображения
export const initialCards = [
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

//данные попап с картинкой
const divPopupImage = document.querySelector('.popup_form_image');
const popupImage = divPopupImage.querySelector('.popup__image');
const popupImgCaption = divPopupImage.querySelector('.popup__image-caption');


export class Card {
  constructor({ cardObj:data, displayPopup }, templateSelector) {
    this._link = data.link;
    this._name = data.name;
    this._templateSelector = templateSelector;
    this._displayPopup = displayPopup;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.gallery__card')
      .cloneNode(true);

    return cardElement;
  }

  _handleToggleLike(evt) {
    evt.target.classList.toggle('gallery__like-toggle_on');
  }

  _handleDeleteCard() {
    this._element.remove();
  }

  _handleOpenPopup() {
    popupImage.src = this._link;
    popupImage.alt = this._name;
    popupImgCaption.textContent = this._name;
    this._displayPopup(divPopupImage);
  }

  _setEventListeners() {
    this._element.querySelector('.gallery__like-toggle').addEventListener('click', (evt) => {
      this._handleToggleLike(evt);
    });

    this._element.querySelector('.gallery__card-delete').addEventListener('click', () => {
      this._handleDeleteCard();
    });

    this._cardImage.addEventListener('click', () => {
      this._handleOpenPopup();
    });
  }

  generateCard() {
    this._element = this._getTemplate();

    this._cardImage = this._element.querySelector('.gallery__card-image');
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;

    this._element.querySelector('.gallery__text-name').textContent = this._name;

    this._setEventListeners();

    return this._element;
  }
}
