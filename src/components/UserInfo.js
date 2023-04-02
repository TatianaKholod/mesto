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

  setUserAvatar(data){
    this._data = data;
    this._dataProfile.avatarElement.src = data.avatar;
  }
  setUserInfo(data) {
    this._data = data;
    this._dataProfile.nameElement.textContent = data.name;
    this._dataProfile.jobElement.textContent = data.about;
  }
}

