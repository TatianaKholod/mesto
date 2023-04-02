export default class Card {
  constructor({ cardObj: data, handleCardClick, handelDelIconClick, handleToggleLike }, templateSelector) {
    this._link = data.link;
    this._name = data.name;
    this._cardId = data._id;
    this._liksArr = data.likes;
    this._ownerId = data.owner._id;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handelDelIconClick = handelDelIconClick;
    this._handleToggleLike = handleToggleLike;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.gallery__card')
      .cloneNode(true);

    return cardElement;
  }

  _updateLiksCount(liksCount) {
    this._elementLikeCounter.textContent = (liksCount > 0) ? liksCount : '';
  }

  addLike() {
    this._likeElement.classList.add('gallery__like-toggle_on');
    this._updateLiksCount(this._liksArr.length);
  }
  delLike() {
    this._likeElement.classList.remove('gallery__like-toggle_on');
    this._updateLiksCount(this._liksArr.length);
  }

  isLiked(userId) {
    return this._liksArr.some(i => { return i._id === userId })
  }

  updateLikesArr(newArr) {
    this._liksArr = newArr;
  }

  deleteCard() {
    this._element.remove();
  }

  _handleOpenPopup() {
    this._handleCardClick(({ name: this._name, link: this._link }));
  }

  _setEventListeners() {
    this._likeElement = this._element.querySelector('.gallery__like-toggle');
    this._likeElement.addEventListener('click', () => {
      this._handleToggleLike(this);
    });

    this._cardImage.addEventListener('click', () => {
      this._handleOpenPopup();
    });
  }

  _setEventListenerDel() {
    this._element.querySelector('.gallery__card-delete').addEventListener('click', () => {
      this._handelDelIconClick(this);
    });
  }

  generateCard(userId) {
    this._element = this._getTemplate();

    if (this._ownerId != userId) { this._element.querySelector('.gallery__card-delete').remove(); }
    else
      this._setEventListenerDel();

    this._cardImage = this._element.querySelector('.gallery__card-image');
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;

    this._element.querySelector('.gallery__text-name').textContent = this._name;

    this._elementLikeCounter = this._element.querySelector('.gallery__like-counter');
    //this._updateLiksCount(this._liksArr.length);

    this._setEventListeners();
    if (this.isLiked(userId)) {
      this.addLike();
    }
    else {
      this._updateLiksCount(this._liksArr.length);
    };
    return this._element;
  }
}
