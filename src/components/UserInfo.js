export default class UserInfo {
  constructor(selectorName, selectorJob) {
    this._dataProfile = {
      nameElement: document.querySelector(selectorName),
      jobElement: document.querySelector(selectorJob)
    }
  }
  getUserInfo() {
    return ({
      'name': this._dataProfile.nameElement.textContent,
      'job': this._dataProfile.jobElement.textContent
    })
  }

  getUserId(){
    return this._data._id;
  }

  setUserInfo(data) {
    this._data = data;
    this._dataProfile.nameElement.textContent = data.name;
    this._dataProfile.jobElement.textContent = data.about;
  }
}

