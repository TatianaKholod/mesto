export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._renderedItems = items;
    this._renderer = renderer;

    this._container = document.querySelector(containerSelector);
  }

  addItem(element) {
    this._container.prepend(element);
  }

  renderItems() {
    const arrayCards = this._renderedItems.map((item) => {return this._renderer(item)});
    this._container.prepend(...arrayCards);
  }
}
