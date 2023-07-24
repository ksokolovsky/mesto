export default class UserInfo {
    constructor({ userName, userProfession }) {
        this._userNameElement = document.querySelector(userName);
        this._userProfessionElement = document.querySelector(userProfession);
    }

    getUserInfo() {
        return {
        name: this._userNameElement.textContent,
        profession: this._userProfessionElement.textContent
        }
    }



    setUserInfo({name, profession}) {
        this._userNameElement.textContent = name;
        this._userProfessionElement.textContent = profession;
    }
}

