export default class Api {
  constructor(options) {
    this.baseUrl = options.baseUrl;
    this.headers = options.headers;
  }

  getInitialCards() {
    return fetch(this.baseUrl + '/cards', {
      headers: this.headers
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`)
    })
    .then((res) => {
      return res;
    })
    .catch((err) => {
        console.log('Запрос не выполнен - ' + err);
      });
  }

  getInitProfile() {
    return fetch(this.baseUrl + '/users/me', {
      headers: this.headers
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`)
      })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        console.log('Запрос не выполнен - ' + err);
      });
  }
}
