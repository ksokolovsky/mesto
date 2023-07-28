export default class UserInfo {
    constructor({ userName, userProfession, userAvatar }) {
        this._userNameElement = document.querySelector(userName);
        this._userProfessionElement = document.querySelector(userProfession);
        this._userAvatarElement = document.querySelector(userAvatar);
    }

    getUserInfo() {
        return {
        name: this._userNameElement.textContent,
        profession: this._userProfessionElement.textContent,
        userAvatar: this._userAvatarElement.style.backgroundImage.slice(5, -2)
        }
    }

    setUserInfo({name, profession, userAvatar}) {
        if (name) this._userNameElement.textContent = name;
        if (profession) this._userProfessionElement.textContent = profession;
        if (userAvatar) this._userAvatarElement.style.backgroundImage = `url(${userAvatar})`;
        }
    }


