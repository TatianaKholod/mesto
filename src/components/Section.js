export default class Section {
  constructor(renderer, containerSelector) {
    this._renderer = renderer;

    this._container = document.querySelector(containerSelector);
  }

  addItem(element) {
    this._container.prepend(element);
  }

  renderItems(renderedItems) {
    const arrayCards = renderedItems.map((item) => { return this._renderer(item) });
    this._container.prepend(...arrayCards); //Добавить массив один раз более экономно по ресурсам, чем каждую карточку отдельно
  }
}
