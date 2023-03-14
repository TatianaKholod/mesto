export default class Card {
  constructor({ cardObj: data, displayImagePopup }, templateSelector) {
    this._link = data.link;
    this._name = data.name;
    this._templateSelector = templateSelector;
    this._displayImagePopup = displayImagePopup;
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
    this._displayImagePopup(({ name: this._name, link: this._link }));
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
