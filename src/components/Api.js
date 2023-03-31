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
      .catch((err) => {
        console.log('Запрос не выполнен - ' + err);
      });
  }

  updateProfile(name, job) {
    return fetch(this.baseUrl + '/users/me', {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        name: name,
        about: job
      })
    })
      .then(res => {
        if (res.ok)
          return res.json();
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .catch((err) => {
        console.log('Запрос не выполнен - ' + err);
      });
  }
  createNewCard(name, link) {
    return fetch(this.baseUrl + '/cards', {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({
        name: name,
        link: link
      })
    })
      .then(res => {
        if (res.ok)
          return res.json();
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .catch((err) => {
        console.log('Запрос не выполнен - ' + err);
      });
  }
  deleteCard(cardId){
    return fetch(this.baseUrl + '/cards/' + cardId, {
      method: 'DELETE',
      headers: this.headers
    })
    .catch((err) => {
        console.log('Запрос не выполнен - ' + err);
      });
  }
}
