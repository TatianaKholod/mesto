export default class UserInfo {
  constructor(selectorName, selectorJob, selectorAvatar) {
    this._dataProfile = {
      nameElement: document.querySelector(selectorName),
      jobElement: document.querySelector(selectorJob),
      avatarElement: document.querySelector(selectorAvatar)
    }
  }
  getUserInfo() {
    return ({
      'name': this._dataProfile.nameElement.textContent,
      'job': this._dataProfile.jobElement.textContent
    })
  }

  getUserId() {
    return this._data._id;
  }

  getUserAvatar() {
    return ({ 'src-avatar': this._data.avatar});
  }

  setUserAvatar(srcAvatar){
      const src = this._dataProfile.avatarElement.src;
      const p = new Promise((resolve,reject) => {
      this._dataProfile.avatarElement.src = srcAvatar;
      this._dataProfile.avatarElement.onload = () => resolve(srcAvatar);
      this._dataProfile.avatarElement.onerror = () => {reject('Ошибка загрузки изображения аватара.'); this._dataProfile.avatarElement.src = src}
      });
     return p;
  }
  updateDataUser(data) {
    this._data = data;
  }
  setUserInfo(data) {
    this.updateDataUser(data);
    this._dataProfile.nameElement.textContent = data.name;
    this._dataProfile.jobElement.textContent = data.about;
  }
}

