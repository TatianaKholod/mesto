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

  setUserInfo(name,job) {
    this._dataProfile.nameElement.textContent = name;
    this._dataProfile.jobElement.textContent = job;
  }
}

